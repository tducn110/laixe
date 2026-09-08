const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const rootDir = path.resolve(__dirname, '..');
const questionsPath = path.join(rootDir, 'data/questions.json');
const reportPath = path.join(rootDir, 'source/certification_report.json');
const scriptPath = path.join(rootDir, 'scripts/certify_source.py');

describe('Source Certification & Data Provenance Invariants', () => {

  test('1. Certification harness executes cleanly and generates structured report when PDF is absent', () => {
    // Run certification harness in quiet mode
    execFileSync('python3', [scriptPath, '--quiet'], { cwd: rootDir });

    assert.ok(fs.existsSync(reportPath), 'source/certification_report.json must exist');
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

    assert.equal(report.status, 'MISSING_SOURCE_PDF');
    assert.equal(report.pdf_found, false);
    assert.equal(report.source_certification.status, 'UNVERIFIED');
    assert.equal(report.source_certification.certified_questions, 0);
    assert.equal(report.source_certification.unverified_questions, 600);
    assert.equal(report.data_integrity.total_questions, 600);
    assert.equal(report.data_integrity.id_range_valid, true);
    assert.equal(report.data_integrity.answer_bounds_valid, true);
    assert.equal(report.data_integrity.image_assets_missing, 0);
    assert.equal(report.data_integrity.candidate_critical_count, 60);
    assert.equal(report.data_integrity.certified_critical_count, 0);
  });

  test('2. All 600 questions have explicit certification fields and UNVERIFIED status', () => {
    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
    assert.equal(questions.length, 600);

    const requiredCertificationFields = [
      'question_text',
      'options',
      'answer',
      'image_mapping',
      'critical_metadata'
    ];

    for (const q of questions) {
      assert.ok(q.certification, `Question ${q.id} missing certification object`);
      assert.equal(q.certification.status, 'UNVERIFIED');
      assert.equal(q.certification.verifiedAgainstPdf, false);
      assert.equal(q.criticalCertified, false);

      for (const field of requiredCertificationFields) {
        assert.equal(
          q.certification.fields[field],
          'UNVERIFIED',
          `Question ${q.id} field ${field} must be UNVERIFIED pending source PDF`
        );
      }
    }
  });

  test('3. Candidate critical questions (60) are separated from certified (0)', () => {
    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
    const candidateList = questions.filter(q => q.criticalCandidate === true);
    const certifiedList = questions.filter(q => q.criticalCertified === true);

    assert.equal(candidateList.length, 60, 'Must have exactly 60 candidate critical questions');
    assert.equal(certifiedList.length, 0, 'Must have 0 certified critical questions pending PDF certification');

    for (const q of candidateList) {
      assert.equal(q.critical, true);
      assert.equal(q.criticalVerification, 'UNVERIFIED');
    }
  });

});
