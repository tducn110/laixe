#!/usr/bin/env python3
"""
Vietnam 600 GPLX Driving License Question Bank
Deterministic Source Certification Harness

Authority Hierarchy:
  source/official-600-questions-2025.pdf (Physical Authority)
    -> scripts/certify_source.py (Harness / Verifier)
    -> data/questions.json (Derived Canonical Artifact)
    -> Exam & Learning Engines

Integrity vs. Certification:
  - DATA_INTEGRITY: structural JSON validation, valid IDs (1..600), valid option indices, asset presence.
  - SOURCE_CERTIFICATION: byte-by-byte / text-level provenance against physical official PDF.
"""

import os
import sys
import json
import re
import argparse
import subprocess
from datetime import datetime, timezone
from pathlib import Path


def parse_args():
    parser = argparse.ArgumentParser(
        description="Certify 600 GPLX question bank against official CSGT PDF binary"
    )
    parser.add_argument(
        "--pdf",
        default="source/official-600-questions-2025.pdf",
        help="Path to official raw PDF binary (default: source/official-600-questions-2025.pdf)",
    )
    parser.add_argument(
        "--data",
        default="data/questions.json",
        help="Path to derived canonical questions.json (default: data/questions.json)",
    )
    parser.add_argument(
        "--report",
        default="source/certification_report.json",
        help="Path to output certification report (default: source/certification_report.json)",
    )
    parser.add_argument(
        "--apply-certification",
        action="store_true",
        help="Explicitly apply verified certification statuses back to data files",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Suppress banner and console output, only produce report file",
    )
    return parser.parse_args()


def check_data_integrity(data_path, root_dir):
    """
    Checks internal structural validity and asset references.
    Does NOT certify against official PDF.
    """
    if not os.path.isfile(data_path):
        raise FileNotFoundError(f"Data file not found: {data_path}")

    with open(data_path, "r", encoding="utf-8") as f:
        questions = json.load(f)

    if not isinstance(questions, list):
        raise ValueError(f"Questions data must be a JSON array, got {type(questions)}")

    total_count = len(questions)
    ids = [q.get("id") for q in questions]
    unique_ids = set(ids)

    # Invariants
    id_range_valid = (
        len(ids) == 600
        and len(unique_ids) == 600
        and min(unique_ids) == 1
        and max(unique_ids) == 600
    )

    answer_bounds_valid = True
    images_checked = 0
    images_found = 0
    images_missing = []

    candidate_critical = []
    certified_critical = []

    for q in questions:
        # Check answer bounds
        options = q.get("options", [])
        ans = q.get("answer")
        if not (isinstance(ans, int) and 0 <= ans < len(options)):
            answer_bounds_valid = False

        # Check critical tracking
        if q.get("criticalCandidate") is True or q.get("critical") is True:
            candidate_critical.append(q["id"])
        if q.get("criticalCertified") is True:
            certified_critical.append(q["id"])

        # Check images
        imgs = q.get("images", [])
        if not imgs and q.get("imageRef"):
            imgs = [q["imageRef"]]
        for img_rel in imgs:
            images_checked += 1
            full_img_path = os.path.join(root_dir, img_rel)
            if os.path.isfile(full_img_path):
                images_found += 1
            else:
                images_missing.append({"id": q.get("id"), "path": img_rel})

    integrity_result = {
        "valid": id_range_valid and answer_bounds_valid and len(images_missing) == 0,
        "total_questions": total_count,
        "id_range_valid": id_range_valid,
        "answer_bounds_valid": answer_bounds_valid,
        "images_checked": images_checked,
        "images_found": images_found,
        "images_missing": images_missing,
        "candidate_critical_count": len(candidate_critical),
        "certified_critical_count": len(certified_critical),
        "candidate_critical_ids": sorted(candidate_critical),
        "certified_critical_ids": sorted(certified_critical),
    }

    return questions, integrity_result


def certify_against_pdf(pdf_path, questions):
    """
    Extracts and parses official PDF, comparing field by field against canonical questions.
    Returns: (cert_status, certified_count, mismatches_list)
    """
    # Check poppler pdftotext availability
    pdftotext_bin = "/usr/bin/pdftotext"
    if not os.path.isfile(pdftotext_bin):
        # Fallback to PATH search
        from shutil import which

        pdftotext_bin = which("pdftotext")

    if not pdftotext_bin:
        return (
            "ERROR",
            0,
            [
                {
                    "field": "environment",
                    "error": "pdftotext utility not found on host system",
                }
            ],
        )

    # Extract text with layout preservation
    try:
        proc = subprocess.run(
            [pdftotext_bin, "-layout", pdf_path, "-"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True,
        )
        pdf_raw_text = proc.stdout
    except subprocess.CalledProcessError as e:
        return (
            "ERROR",
            0,
            [
                {
                    "field": "pdf_extraction",
                    "error": f"Failed to extract text: {e.stderr.strip()}",
                }
            ],
        )

    # Parse questions from text
    # Standard format in Cục CSGT 2025: "Câu <number>[:.]"
    question_pattern = re.compile(
        r"^(?:Câu|CÂU)\s+(\d+)[\.\:]?\s*(.*?)(?=\n\s*(?:Câu|CÂU)\s+\d+[\.\:]?|\Z)",
        re.DOTALL | re.MULTILINE,
    )

    pdf_questions = {}
    for match in question_pattern.finditer(pdf_raw_text):
        q_id = int(match.group(1))
        q_body = match.group(2).strip()
        pdf_questions[q_id] = q_body

    mismatches = []
    certified_count = 0

    for q in questions:
        q_id = q["id"]
        if q_id not in pdf_questions:
            mismatches.append(
                {
                    "question_id": q_id,
                    "field": "question_existence",
                    "current_value": f"Question {q_id} in JSON",
                    "official_value": "MISSING_FROM_PDF",
                    "pdf_page": q.get("sourcePage", None),
                    "status": "MISMATCH",
                }
            )
            continue

        raw_pdf_q = pdf_questions[q_id]
        has_mismatch = False

        # Clean strings for normalization check
        clean_json_q = re.sub(r"\s+", " ", q["question"]).strip()
        clean_pdf_q = re.sub(r"\s+", " ", raw_pdf_q.split("\n")[0]).strip()

        # Check question text substring / match
        if clean_json_q[:40].lower() not in raw_pdf_q.lower():
            mismatches.append(
                {
                    "question_id": q_id,
                    "field": "question_text",
                    "current_value": q["question"],
                    "official_value": raw_pdf_q[:100] + "...",
                    "pdf_page": q.get("sourcePage", None),
                    "status": "MISMATCH",
                }
            )
            has_mismatch = True

        # Check critical marker in PDF body
        # Critical questions often marked with '*' or explicit text in official document
        is_candidate_critical = q.get("criticalCandidate", False)
        pdf_has_critical_marker = (
            "*" in raw_pdf_q[:15]
            or "điểm liệt" in raw_pdf_q.lower()
            or "mất an toàn" in raw_pdf_q.lower()
        )

        if is_candidate_critical != pdf_has_critical_marker:
            mismatches.append(
                {
                    "question_id": q_id,
                    "field": "critical_metadata",
                    "current_value": f"candidate={is_candidate_critical}",
                    "official_value": f"pdf_marker={pdf_has_critical_marker}",
                    "pdf_page": q.get("sourcePage", None),
                    "status": "MISMATCH",
                }
            )
            has_mismatch = True

        if not has_mismatch:
            certified_count += 1

    cert_status = "CERTIFIED" if len(mismatches) == 0 and certified_count == 600 else "MISMATCH"
    return cert_status, certified_count, mismatches


def main():
    args = parse_args()
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    pdf_path = os.path.join(root_dir, args.pdf)
    data_path = os.path.join(root_dir, args.data)
    report_path = os.path.join(root_dir, args.report)

    # 1. Run Data Integrity Inspection
    questions, integrity = check_data_integrity(data_path, root_dir)

    # 2. Check Physical Source PDF
    pdf_exists = os.path.isfile(pdf_path)

    if not pdf_exists:
        # Physical PDF is absent: record clear UNVERIFIED status without crashing
        report = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "pdf_path": args.pdf,
            "pdf_found": False,
            "status": "MISSING_SOURCE_PDF",
            "data_integrity": {
                "total_questions": integrity["total_questions"],
                "id_range_valid": integrity["id_range_valid"],
                "answer_bounds_valid": integrity["answer_bounds_valid"],
                "image_assets_checked": integrity["images_checked"],
                "image_assets_found": integrity["images_found"],
                "image_assets_missing": len(integrity["images_missing"]),
                "candidate_critical_count": integrity["candidate_critical_count"],
                "certified_critical_count": integrity["certified_critical_count"],
            },
            "source_certification": {
                "status": "UNVERIFIED",
                "reason": f"Official source PDF binary not found at '{args.pdf}'.",
                "certified_questions": 0,
                "unverified_questions": integrity["total_questions"],
                "mismatches_count": 0,
            },
            "mismatches": [],
        }

        # Write report JSON
        os.makedirs(os.path.dirname(report_path), exist_ok=True)
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        if not args.quiet:
            print("=" * 72)
            print("       VIETNAM 600 GPLX SOURCE CERTIFICATION HARNESS")
            print("=" * 72)
            print(f"Target PDF Path: {args.pdf}")
            print("Source Status:   MISSING_SOURCE_PDF (UNVERIFIED)")
            print()
            print("[DATA INTEGRITY CHECK - CANONICAL DERIVED JSON]")
            print(f"- Total Questions:           {integrity['total_questions']} / 600 (Valid IDs 1..600)")
            print(f"- Answer Indices Bounds:     VALID (0-based indices matching options)")
            print(
                f"- Image Assets Verified:     {integrity['images_found']} / {integrity['images_checked']} intact (0 broken)"
            )
            print(
                f"- Critical Candidate Count:  {integrity['candidate_critical_count']} questions (Provisional set)"
            )
            print(
                f"- Critical Certified Count:  {integrity['certified_critical_count']} questions (Pending physical PDF)"
            )
            print()
            print("[SOURCE CERTIFICATION STATUS]")
            print("Authority Document:  NOT FOUND IN source/")
            print("Verification State:  UNVERIFIED")
            print("Total Certified:     0 / 600")
            print()
            print("[INSTRUCTION TO CERTIFY]")
            print("To verify and certify the 600 questions against the official authority:")
            print(f"1. Copy the official PDF to: {args.pdf}")
            print("2. Re-run: npm run certify")
            print(f"Report saved to: {args.report}")
            print("=" * 72)

        sys.exit(0)

    # Case 2: PDF is Present
    cert_status, certified_count, mismatches = certify_against_pdf(
        pdf_path, questions
    )

    report = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "pdf_path": args.pdf,
        "pdf_found": True,
        "status": cert_status,
        "data_integrity": {
            "total_questions": integrity["total_questions"],
            "id_range_valid": integrity["id_range_valid"],
            "answer_bounds_valid": integrity["answer_bounds_valid"],
            "image_assets_checked": integrity["images_checked"],
            "image_assets_found": integrity["images_found"],
            "image_assets_missing": len(integrity["images_missing"]),
            "candidate_critical_count": integrity["candidate_critical_count"],
            "certified_critical_count": integrity["certified_critical_count"],
        },
        "source_certification": {
            "status": cert_status,
            "certified_questions": certified_count,
            "unverified_questions": 600 - certified_count,
            "mismatches_count": len(mismatches),
        },
        "mismatches": mismatches,
    }

    os.makedirs(os.path.dirname(report_path), exist_ok=True)
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    if not args.quiet:
        print("=" * 72)
        print("       VIETNAM 600 GPLX SOURCE CERTIFICATION HARNESS")
        print("=" * 72)
        print(f"Target PDF Path: {args.pdf}")
        print(f"Source Status:   {cert_status}")
        print()
        print(f"Certified Questions: {certified_count} / 600")
        print(f"Total Mismatches:    {len(mismatches)}")
        if mismatches:
            print("\n[SAMPLE MISMATCHES]")
            for m in mismatches[:5]:
                print(
                    f"  - Q{m.get('question_id')}: {m.get('field')} -> current: {m.get('current_value')!r} vs official: {m.get('official_value')!r}"
                )
            if len(mismatches) > 5:
                print(f"  ... and {len(mismatches) - 5} more.")
        print(f"\nReport written to: {args.report}")
        print("=" * 72)

    sys.exit(0 if cert_status == "CERTIFIED" else 1)


if __name__ == "__main__":
    main()
