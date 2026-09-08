# Thư mục Nguồn Tài liệu Gốc (Source Authority)

Thư mục này là nơi lưu trữ văn bản gốc chính thức dùng để thẩm định (certify) toàn bộ 600 câu hỏi lý thuyết sát hạch lái xe.

## File thẩm định yêu cầu

- **Đường dẫn**: `source/official-600-questions-2025.pdf`
- **Tên tài liệu**: *600 CÂU HỎI DÙNG CHO SÁT HẠCH LÁI XE CƠ GIỚI ĐƯỜNG BỘ*
- **Cơ quan ban hành**: Cục Cảnh sát giao thông (Bộ Công an), Hà Nội 2025

---

## Kiến trúc Thẩm định & Phân tầng Dữ liệu (Source Provenance Hierarchy)

```
[source/official-600-questions-2025.pdf] (Single Physical Authority)
                 │
                 ▼
     [scripts/certify_source.py] (Deterministic Verifier / Harness)
                 │
                 ▼
        [data/questions.json] (Derived Canonical Artifact)
                 │
        ┌────────┴────────┐
        ▼                 ▼
   [Exam Engine]   [Learning Engine]
```

### Phân biệt 2 cấp độ kiểm định:

1. **DATA_INTEGRITY (Tính toàn vẹn dữ liệu)**:
   - Cấu trúc JSON hợp lệ.
   - Đủ 600 câu hỏi (ID từ 1 đến 600, không trùng lặp, không ngắt quãng).
   - Đáp án đúng nằm trong dải chỉ mục options hợp lệ (0-based index).
   - Toàn bộ 319 file hình ảnh câu hỏi trong `assets/questions/` tồn tại đầy đủ, 0 file mồ côi, 0 liên kết gãy.
   - Bộ đề thi thử (30 câu, 20 phút, điểm liệt) chạy đúng theo quy chuẩn.

2. **SOURCE_CERTIFICATION (Thẩm định nguồn gốc đối chiếu PDF)**:
   - Từng câu hỏi (nội dung câu hỏi, danh sách đáp án, đáp án đúng) được đối chiếu trực tiếp từng byte/kí tự với văn bản PDF gốc.
   - Danh sách 60 câu hỏi điểm liệt được xác nhận trực tiếp từ dấu hiệu định danh trong PDF chính thức.
   - Trạng thái hiện tại khi chưa có file PDF vật lý trong thư mục `source/`:
     - `DATA_INTEGRITY`: **VALID (100%)**
     - `SOURCE_CERTIFICATION`: **UNVERIFIED (Pending PDF)**
     - `Candidate Critical Questions`: **60 (UNVERIFIED)**
     - `Certified Critical Questions`: **0 (Chờ đối chiếu PDF)**

---

## Cách chạy Thẩm định

Khi đã đặt file `official-600-questions-2025.pdf` vào thư mục `source/`:

```bash
npm run certify
# hoặc
python3 scripts/certify_source.py
```

Harness sẽ:
1. Đọc và trích xuất từng trang của file PDF gốc.
2. Đối chiếu câu hỏi, đáp án, và dấu hiệu điểm liệt với `data/questions.json`.
3. Xuất báo cáo sai lệch chi tiết (nếu có) ra màn hình và lưu tại `source/certification_report.json`.
4. **Không bao giờ tự ý ghi đè dữ liệu** mà không có sự kiểm tra và xác nhận có chủ đích.
