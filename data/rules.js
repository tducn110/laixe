// Dữ liệu giải thích, quy tắc và Sa hình Trainer cho 600 câu GPLX 2025
(() => {
  window.SA_HINH_TOPICS = [
  {
    "id": "all_ch6",
    "name": "Tất cả 115 câu",
    "icon": "🚦",
    "group": "all",
    "count": 115
  },
  {
    "id": "stop_yield",
    "name": "STOP / Nhường đường",
    "icon": "🛑",
    "group": "priority",
    "count": 13
  },
  {
    "id": "duong_uu_tien",
    "name": "Đường ưu tiên",
    "icon": "🔷",
    "group": "priority",
    "count": 2
  },
  {
    "id": "xe_uu_tien",
    "name": "Xe ưu tiên",
    "icon": "🚑",
    "group": "priority",
    "count": 13
  },
  {
    "id": "ben_phai_trong",
    "name": "Bên phải trống / Hướng rẽ",
    "icon": "➡️",
    "group": "priority",
    "count": 13
  },
  {
    "id": "vong_xuyen",
    "name": "Vòng xuyến (Bùng binh)",
    "icon": "🔄",
    "group": "priority",
    "count": 2
  },
  {
    "id": "den_tin_hieu",
    "name": "Đèn tín hiệu & Làn xe",
    "icon": "🚥",
    "group": "signals",
    "count": 17
  },
  {
    "id": "csgt",
    "name": "Cảnh sát giao thông",
    "icon": "👮",
    "group": "signals",
    "count": 2
  },
  {
    "id": "bien_cam_hieu_lenh",
    "name": "Biển cấm & Hiệu lệnh",
    "icon": "🚫",
    "group": "signals",
    "count": 16
  },
  {
    "id": "vuot_xe",
    "name": "Vượt xe & Tránh xe",
    "icon": "⚡",
    "group": "safety",
    "count": 12
  },
  {
    "id": "dung_do",
    "name": "Dừng / Đỗ & Quay đầu",
    "icon": "🅿️",
    "group": "safety",
    "count": 11
  },
  {
    "id": "keo_xe",
    "name": "Kéo xe & Tín hiệu đèn",
    "icon": "🚛",
    "group": "safety",
    "count": 4
  },
  {
    "id": "tinh_huong_an_toan",
    "name": "Đường sắt, Cao tốc & Tình huống",
    "icon": "🚂",
    "group": "safety",
    "count": 10
  }
];
  window.TOPIC_GROUPS = {
  "priority": {
    "name": "Quyền ưu tiên & Giao lộ",
    "badge": "Ưu tiên"
  },
  "signals": {
    "name": "Điều khiển & Báo hiệu",
    "badge": "Báo hiệu"
  },
  "safety": {
    "name": "Quy tắc di chuyển & An toàn",
    "badge": "An toàn"
  }
};
  window.QUESTION_RULES = {
  "486": {
    "topic": "den_tin_hieu",
    "why": "Xe khách và xe tải đèn đỏ nhưng vẫn đi là sai. Xe mô tô đèn đỏ rẽ trái là sai. Chỉ có xe con đèn xanh rẽ phải đúng tín hiệu.",
    "rule": "Người điều khiển phải chấp hành tín hiệu đèn giao thông và hướng mũi tên trên làn đường.",
    "tip": "Quan sát đèn trên từng làn: Đèn xanh được đi, đèn đỏ phải dừng lại.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn đỏ ở làn xe khách và xe tải; đèn xanh ở làn xe con; đối diện mô tô đèn đỏ."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có biển báo ưu tiên."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con ở làn rẽ phải đèn xanh -> rẽ phải hợp lệ."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Chỉ xe con chấp hành đúng quy tắc giao thông."
      }
    ]
  },
  "487": {
    "topic": "xe_uu_tien",
    "why": "Xe công an là xe ưu tiên nên đi đầu tiên. Tiếp theo xe tải rẽ phải (hướng ưu tiên cao nhất). Xe khách đi thẳng đi thứ 3. Xe con rẽ trái đi cuối cùng.",
    "rule": "Thứ tự: Xe ưu tiên -> Xe rẽ phải -> Xe đi thẳng -> Xe rẽ trái.",
    "tip": "Gặp xe ưu tiên cho đi trước, sau đó xét hướng rẽ: Phải -> Thẳng -> Trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Có xe Công an là xe ưu tiên -> đi trước nhất."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có biển báo phân cấp đường."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải rẽ phải -> Xe khách đi thẳng -> Xe con rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự đúng: Xe công an -> Xe tải -> Xe khách -> Xe con."
      }
    ]
  },
  "488": {
    "topic": "xe_uu_tien",
    "why": "Xe công an là xe ưu tiên đi trước nhất. Xe con nằm trên đường ưu tiên (biển 401) nên đi thứ 2. Xe tải và xe khách ở đường không ưu tiên, bên phải xe tải không vướng nên đi thứ 3, xe khách đi cuối cùng.",
    "rule": "Thứ tự: Xe ưu tiên -> Xe trên đường ưu tiên -> Quyền bên phải không vướng.",
    "tip": "Xe ưu tiên đi trước, rồi đến xe ở đường ưu tiên, rồi đến bên phải trống.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Xe công an là xe ưu tiên -> đi thứ nhất."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe con gặp biển bắt đầu đường ưu tiên -> đi thứ 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải và xe khách: bên phải xe tải không vướng -> xe tải đi trước xe khách."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự đúng: Xe công an -> Xe con -> Xe tải -> Xe khách."
      }
    ]
  },
  "489": {
    "topic": "xe_uu_tien",
    "why": "Xe công an là xe ưu tiên đi trước nhất. Xe tải nằm trên đường ưu tiên (biển hình thoi kèm biển phụ) đi thứ 2. Xe khách và xe con ở đường không ưu tiên, xe khách đi thẳng đi trước xe con rẽ trái.",
    "rule": "Thứ tự: Xe ưu tiên -> Xe đường ưu tiên -> Xe đi thẳng -> Xe rẽ trái.",
    "tip": "Xem biển phụ dưới biển ưu tiên để biết nhánh đường nào được ưu tiên.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Xe công an là xe ưu tiên -> đi thứ nhất."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển phụ chỉ đường ưu tiên rẽ về phía xe tải -> xe tải đi thứ 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe khách đi thẳng đi trước xe con rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe công an -> Xe tải -> Xe khách -> Xe con."
      }
    ]
  },
  "490": {
    "topic": "xe_uu_tien",
    "why": "Tại ngã ba không biển báo và không có xe ưu tiên, thứ tự theo hướng rẽ: Xe mô tô rẽ phải đi trước -> Xe con đi thẳng -> Xe tải rẽ trái.",
    "rule": "Quy tắc hướng rẽ tại ngã ba đồng cấp: Rẽ phải > Đi thẳng > Rẽ trái.",
    "tip": "Nhớ thứ tự hướng rẽ: Phải -> Thẳng -> Trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có biển báo giao thông."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe mô tô rẽ phải -> Xe con đi thẳng -> Xe tải rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe mô tô -> Xe con -> Xe tải."
      }
    ]
  },
  "491": {
    "topic": "vong_xuyen",
    "why": "Tại nơi đường giao nhau có biển báo hiệu đi theo vòng xuyến, người điều khiển phải nhường đường cho xe đi bên trái. Xe tải đến từ bên trái của xe con và đã đi trong vòng xuyến nên xe con phải nhường đường.",
    "rule": "Quy tắc vòng xuyến: Có biển báo vòng xuyến nhường bên TRÁI; không có biển nhường bên PHẢI.",
    "tip": "Có biển báo vòng tròn xanh (vòng xuyến) -> Nhường bên TRÁI.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Có biển hiệu lệnh vòng xuyến."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe di chuyển theo hướng mũi tên bùng binh."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con phải nhường đường cho xe tải đến từ bên trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con phải nhường đường."
      }
    ]
  },
  "492": {
    "topic": "stop_yield",
    "why": "Xe mô tô gặp biển STOP bắt buộc phải dừng lại và nhường đường. Do đó xe con được quyền đi trước.",
    "rule": "Biển STOP (Dừng lại) có hiệu lực bắt buộc tất cả phương tiện phải dừng lại nhường đường, kể cả xe ưu tiên nếu biển yêu cầu.",
    "tip": "Xe nào gặp biển STOP thì loại xe đó khỏi quyền đi trước.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu, không có CSGT."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe mô tô gặp biển STOP viền đỏ chữ trắng -> bắt buộc dừng."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con không gặp biển cản trở -> đi trước."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con được quyền đi trước."
      }
    ]
  },
  "493": {
    "topic": "duong_uu_tien",
    "why": "Xe con (A) đã vào trong ngã tư trước (nhất chớm) nên được đi đầu tiên, kể cả trước xe ưu tiên. Tiếp theo là xe cứu thương (xe ưu tiên). Cuối cùng là xe con (B).",
    "rule": "Nguyên tắc vàng sa hình: Nhất chớm (đã lọt vào giao lộ) -> Nhì ưu (xe ưu tiên) -> Tam đường -> Tứ phải -> Ngũ hướng.",
    "tip": "Xe nào đã qua vạch dừng đi vào tâm ngã tư luôn được đi trước nhất.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có CSGT hay đèn."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Xe con (A) đã chớm qua vạch vào ngã tư trước xe cứu thương."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe cứu thương là xe ưu tiên đi thứ 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con (B) chưa vào ngã tư và không ưu tiên đi cuối cùng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe con (A) -> Xe cứu thương -> Xe con (B)."
      }
    ]
  },
  "494": {
    "topic": "xe_uu_tien",
    "why": "Cả hai xe chữa cháy và cứu thương đều là xe ưu tiên. Theo Luật Giao thông: Xe chữa cháy có mức ưu tiên cao hơn xe cứu thương. Do đó thứ tự: Xe chữa cháy -> Xe cứu thương -> Xe con.",
    "rule": "Thứ tự ưu tiên: Hỏa > Sự > Công > Thương (Chữa cháy > Quân sự > Công an > Cứu thương).",
    "tip": "Ghi nhớ câu thần chú: HỎA - SỰ - CÔNG - THƯƠNG.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Có 2 xe ưu tiên: Chữa cháy và Cứu thương. Hỏa > Thương."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe chữa cháy đi thứ nhất -> Xe cứu thương đi thứ 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con là phương tiện dân sự đi cuối cùng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe chữa cháy -> Xe cứu thương -> Xe con."
      }
    ]
  },
  "495": {
    "topic": "xe_uu_tien",
    "why": "Xe cứu thương là xe ưu tiên theo Luật Giao thông đường bộ khi đang thực hiện nhiệm vụ khẩn cấp, nên được quyền đi trước xe mô tô.",
    "rule": "Xe cứu thương thuộc danh mục xe ưu tiên được quyền đi trước xe cơ giới thông thường.",
    "tip": "Xe ưu tiên luôn đi trước xe thường (trừ khi có xe đã vào ngã tư trước).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có CSGT, không đèn."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Xe cứu thương là xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Cả hai xe đều tại ngã tư."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe cứu thương đi trước."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe cứu thương được quyền đi trước."
      }
    ]
  },
  "496": {
    "topic": "stop_yield",
    "why": "Xe tải và xe con nằm trên trục đường ưu tiên. Xe khách gặp biển báo 208 (tam giác lộn ngược - Giao nhau với đường ưu tiên) và rẽ trái nên phải nhường đường đi cuối cùng.",
    "rule": "Phương tiện gặp biển 208 'Giao nhau với đường ưu tiên' phải nhường đường cho xe trên đường ưu tiên từ bất kỳ hướng nào tới.",
    "tip": "Biển tam giác ngược nhọn chúc xuống = đường không ưu tiên, phải nhường đường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe khách gặp biển tam giác ngược 208 (đường không ưu tiên)."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải và xe con trên đường ưu tiên đi trước."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe khách phải nhường đường đi cuối cùng."
      }
    ]
  },
  "497": {
    "topic": "stop_yield",
    "why": "Xe con gặp biển STOP phải dừng lại và nhường đường cho xe tải đi trước.",
    "rule": "Biển STOP buộc phương tiện phải dừng lại trước vạch dừng và quan sát, nhường đường cho các xe trên đường cắt ngang.",
    "tip": "Nhìn thấy biển STOP ở hướng xe nào thì xe đó phải nhường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe con có biển STOP ngay trước mặt."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải không có biển STOP được quyền đi."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con phải nhường đường."
      }
    ]
  },
  "498": {
    "topic": "xe_uu_tien",
    "why": "Xe chữa cháy và xe công an đều là xe ưu tiên. Theo thứ tự luật định: Xe chữa cháy (Hỏa) được quyền đi trước xe công an (Công).",
    "rule": "Thứ tự ưu tiên luật định: Hỏa > Sự > Công > Thương.",
    "tip": "Hỏa luôn đứng đầu danh sách xe ưu tiên!",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Có xe chữa cháy và xe công an."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không xét biển báo vì xe ưu tiên được đi mọi hướng trừ biển cấm đi ngược chiều trên cao tốc."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe chữa cháy đi trước xe công an."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe chữa cháy được quyền đi trước."
      }
    ]
  },
  "499": {
    "topic": "den_tin_hieu",
    "why": "Xe khách và xe con cùng hướng tín hiệu đèn màu xanh nên được phép đi. Xe tải gặp đèn đỏ phải dừng lại.",
    "rule": "Đèn xanh được phép đi, đèn đỏ phải dừng lại trước vạch dừng.",
    "tip": "Đèn xanh cùng chiều phương tiện nào thì phương tiện đó được đi.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn xanh ở làn xe con và xe khách; đèn đỏ ở làn xe tải."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Đi theo tín hiệu đèn giao thông."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con rẽ phải, xe khách đi thẳng đều đèn xanh."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con và xe khách được phép đi."
      }
    ]
  },
  "500": {
    "topic": "den_tin_hieu",
    "why": "Xe khách đèn đỏ rẽ trái là vi phạm. Xe tải đèn xanh đi thẳng đúng. Xe con đèn xanh rẽ phải đúng. Xe mô tô đèn đỏ là sai. Do đó xe con và xe tải đi đúng.",
    "rule": "Chấp hành hiệu lệnh đèn giao thông: Đèn xanh đi, đèn đỏ dừng.",
    "tip": "Quan sát đèn của từng xe: Xe con (xanh), Xe tải (xanh).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn xanh cho xe con và xe tải; đèn đỏ cho xe khách và mô tô."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có biển báo."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con rẽ phải đúng, xe tải đi thẳng đúng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con, xe tải đi đúng quy tắc giao thông."
      }
    ]
  },
  "501": {
    "topic": "xe_uu_tien",
    "why": "Xe quân sự là xe ưu tiên theo luật (thuộc nhóm Hỏa - Sự - Công - Thương) nên được quyền đi trước xe con.",
    "rule": "Xe ưu tiên được quyền đi trước tất cả các phương tiện dân sự khi phát tín hiệu ưu tiên.",
    "tip": "Xe Quân sự có chữ ký hiệu biển đỏ hoặc phù hiệu ưu tiên luôn đi trước xe thường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Xe quân sự là xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe quân sự trên đường giao nhau đi trước."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con đi sau."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe quân sự được quyền đi trước."
      }
    ]
  },
  "502": {
    "topic": "den_tin_hieu",
    "why": "Đèn chính màu đỏ, nhưng có đèn phụ hình mũi tên màu xanh chỉ hướng rẽ phải. Do đó xe tải chỉ được phép đi theo hướng 1 (rẽ phải).",
    "rule": "Khi có đèn phụ mũi tên màu xanh, các phương tiện chỉ được phép di chuyển theo hướng mũi tên chỉ dẫn.",
    "tip": "Đèn phụ rẽ phải xanh = chỉ được rẽ phải (Hướng 1).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn chính đỏ, đèn phụ mũi tên rẽ phải xanh."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có biển báo hướng đi bắt buộc khác."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Chỉ hướng 1 được rẽ phải theo đèn phụ."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Chỉ hướng 1."
      }
    ]
  },
  "503": {
    "topic": "den_tin_hieu",
    "why": "Xe khách ở làn rẽ trái nhưng đi thẳng (vi phạm). Xe tải ở làn đi thẳng nhưng rẽ trái (vi phạm). Xe mô tô ở làn đi thẳng nhưng rẽ phải hoặc vượt đèn (vi phạm). Xe con ở làn rẽ phải đi đúng.",
    "rule": "Phương tiện phải đi đúng làn đường có mũi tên chỉ hướng đi dự định và chấp hành đèn tín hiệu.",
    "tip": "Đối chiếu hướng mũi tên trên mặt đường + tín hiệu đèn so với hướng xe đang đi.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Quan sát đèn tín hiệu và vạch sơn mũi tên chỉ hướng trên mặt đường."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Làn đường có mũi tên chỉ hướng bắt buộc."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe khách, xe tải, xe mô tô đi sai hướng chỉ định của làn và đèn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe khách, xe tải, xe mô tô vi phạm."
      }
    ]
  },
  "504": {
    "topic": "xe_uu_tien",
    "why": "Xe công an (xe ưu tiên) đi trước. Tiếp theo xe mô tô ở đường ưu tiên (rẽ phải). Sau đó xe tải và xe khách: xe tải đi thẳng, xe khách rẽ trái. Xe con đi cuối.",
    "rule": "Thứ tự: Xe ưu tiên -> Đường ưu tiên -> Quyền bên phải -> Hướng rẽ.",
    "tip": "Xét xe công an trước, rồi xét xe nằm trên đường có biển ưu tiên.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Xe công an là xe ưu tiên đi trước."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Mô tô trên đường ưu tiên đi tiếp theo."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải đi thẳng -> Xe khách rẽ trái -> Xe con."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe mô tô, xe tải, xe khách, xe con (sau xe công an)."
      }
    ]
  },
  "505": {
    "topic": "dung_do",
    "why": "Biển cấm đỗ xe (1 vạch chéo đỏ) có biển phụ hình xe tải bên dưới, chỉ có hiệu lực cấm đối với xe ô tô tải. Do đó xe tải đỗ là vi phạm quy tắc.",
    "rule": "Biển báo kết hợp biển phụ: Hiệu lực cấm áp dụng riêng cho đối tượng phương tiện được vẽ trên biển phụ.",
    "tip": "Biển phụ vẽ hình xe nào thì biển cấm tác dụng lên xe đó.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển cấm đỗ có biển phụ vẽ xe tải -> chỉ cấm xe tải."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con và mô tô không bị cấm bởi biển phụ này."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe tải vi phạm quy tắc giao thông."
      }
    ]
  },
  "506": {
    "topic": "duong_uu_tien",
    "why": "Xe con (B) nằm trên đường ưu tiên (biển 401 hoặc biển tam giác đáy úp). Xe con (A) gặp biển tam giác lộn ngược 208 (Giao nhau với đường ưu tiên) nên phải nhường đường. Xe con (B) đi trước.",
    "rule": "Phương tiện trên đường ưu tiên luôn được quyền đi trước phương tiện trên đường nhánh / đường không ưu tiên.",
    "tip": "Biển tam giác đỉnh chúc xuống = phải nhường cho xe đường cắt ngang.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe con (A) có biển tam giác ngược 208; Xe con (B) có biển đường ưu tiên."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con (B) được ưu tiên qua ngã tư trước."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con (B) được quyền đi trước."
      }
    ]
  },
  "507": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Biển 2 (ở giữa) là biển cấm xe mô tô (xe máy hai bánh từ 50cc trở lên). Biển cấm xe mô tô KHÔNG cấm xe gắn máy (dưới 50cc). Do đó xe gắn máy được đi cả ba hướng 1, 2 và 3.",
    "rule": "Quy tắc biển báo: Cấm xe mô tô KHÔNG cấm xe gắn máy; Cấm xe gắn máy thì cấm xe mô tô.",
    "tip": "Xe gắn máy (dưới 50cc) được đi vào đường cấm xe mô tô.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Hướng 1 không cấm; Hướng 2 cấm mô tô (không cấm gắn máy); Hướng 3 cấm ô tô."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe gắn máy được phép đi cả 3 hướng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Cả ba hướng."
      }
    ]
  },
  "508": {
    "topic": "dung_do",
    "why": "Biển cấm dừng và đỗ xe (2 vạch chéo đỏ) có biển phụ mũi tên hai đầu chỉ lên và xuống, biểu thị biển có hiệu lực trước và sau vị trí cắm biển. Cả xe ô tô tải và xe con đều dừng đỗ trong phạm vi hiệu lực của biển.",
    "rule": "Biển phụ mũi tên hai đầu (lên - xuống) báo hiệu phạm vi tác dụng của biển ở cả trước và sau mặt biển.",
    "tip": "Mũi tên chỉ lên và xuống: Cấm cả phía trước lẫn phía sau biển.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển cấm dừng đỗ có biển phụ mũi tên 2 chiều đặt giữa 2 xe."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Cả hai xe đều đỗ trong vùng cấm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Cả hai xe đều vi phạm."
      }
    ]
  },
  "509": {
    "topic": "dung_do",
    "why": "Xe tải đỗ ngược chiều lưu thông; xe con và xe mô tô đỗ đè lên phần đường dành cho người đi bộ qua đường. Cả ba xe đều vi phạm quy định về dừng đỗ xe.",
    "rule": "Cấm đỗ xe ngược chiều lưu thông; cấm đỗ xe đè lên vạch người đi bộ qua đường.",
    "tip": "Đỗ ngược chiều hoặc đỗ đè vạch người đi bộ đều sai hoàn toàn.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Đỗ sai vị trí quy định của Luật Giao thông."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải ngược chiều, 2 xe kia đè vạch người đi bộ."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Cả ba xe đều vi phạm."
      }
    ]
  },
  "510": {
    "topic": "keo_xe",
    "why": "Luật Giao thông đường bộ quy định xe ô tô không được kéo theo xe mô tô hai bánh, mô tô ba bánh, xe gắn máy hoặc các xe cơ giới khác khi không đúng tiêu chuẩn an toàn.",
    "rule": "Cấm xe ô tô kéo xe mô tô, xe gắn máy khi tham gia giao thông.",
    "tip": "Nhìn thấy ô tô kéo xe máy/mô tô -> chọn ngay KHÔNG ĐÚNG.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Quy tắc kéo dắt xe trên đường bộ."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải kéo xe mô tô ba bánh vi phạm luật."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Không đúng."
      }
    ]
  },
  "511": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Tại ngã tư có biển báo cấm rẽ phải (hướng 1). Do đó hướng 1 là hướng xe không được phép đi.",
    "rule": "Biển cấm rẽ áp dụng cho hướng đi của mũi tên.",
    "tip": "Biển tròn viền đỏ có mũi tên rẽ phải gạch chéo = cấm rẽ phải.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển cấm rẽ phải đặt ở ngã tư đối diện hướng 1."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe được đi hướng 2, 3 nhưng cấm hướng 1."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Chỉ hướng 1."
      }
    ]
  },
  "512": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Hướng 3 có biển cấm xe ô tô (biển P.103a). Do đó xe ô tô không được phép đi vào hướng 3.",
    "rule": "Biển cấm ô tô có hiệu lực cấm tất cả các loại xe cơ giới từ 4 bánh trở lên đi vào.",
    "tip": "Biển vẽ ô tô con tròn viền đỏ = cấm tất cả ô tô.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Hướng 3 có biển P.103a (cấm ô tô)."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Các hướng 1, 2, 4 không có biển cấm ô tô."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 3."
      }
    ]
  },
  "513": {
    "topic": "vuot_xe",
    "why": "Cả xe khách và xe tải đều vượt xe khác trên đoạn đường có vạch kẻ tim đường là nét đứt, tầm nhìn thông thoáng và không có xe ngược chiều gây cản trở. Cả hai xe đều vượt đúng quy tắc.",
    "rule": "Vạch nét đứt cho phép phương tiện đè vạch để vượt xe khi đảm bảo điều kiện an toàn.",
    "tip": "Vạch nét đứt = được phép đè vạch và vượt.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch kẻ tim đường là vạch đơn nét đứt màu vàng."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Cả hai bên đều đủ điều kiện an toàn khi vượt."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Cả hai xe đều đúng."
      }
    ]
  },
  "514": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Biển hiệu lệnh đặt trước ngã tư (biển tròn nền xanh có 2 mũi tên trắng) chỉ hướng đi phải theo: đi thẳng và rẽ trái (hướng 2 và 3). Xe không được rẽ phải (hướng 1).",
    "rule": "Biển hiệu lệnh buộc các phương tiện phải chấp hành hướng đi theo mũi tên chỉ dẫn trên biển.",
    "tip": "Biển tròn xanh mũi tên thẳng và rẽ trái = Chỉ được đi hướng 2 và 3.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển hiệu lệnh đặt trước ngã tư: chỉ đi thẳng và rẽ trái."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hướng 1 rẽ phải không có trong chỉ dẫn hiệu lệnh."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 2 và 3."
      }
    ]
  },
  "515": {
    "topic": "keo_xe",
    "why": "Xe tải kéo theo xe con mà xe con lại kéo theo một rơ moóc phía sau là vi phạm nghiêm trọng quy tắc kéo xe (không được kéo nhiều hơn một rơ moóc hoặc phương tiện khác).",
    "rule": "Cấm một xe kéo nhiều phương tiện nối tiếp nhau.",
    "tip": "Kéo đoàn tàu đuôi dài như vậy là vi phạm chắc chắn.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe tải kéo xe con, xe con lại kéo rơ moóc phía sau."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Vi phạm quy định an toàn kéo dắt."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Vi phạm."
      }
    ]
  },
  "516": {
    "topic": "stop_yield",
    "why": "Phía trước xe khách có chướng ngại vật nằm trên phần đường của mình. Xe khách muốn tránh phải lấn sang làn đối diện, nên xe khách phải nhường đường cho xe tải đi trước.",
    "rule": "Khi có chướng ngại vật trên làn đường của mình, phương tiện phải giảm tốc độ và nhường đường cho xe đi chiều ngược lại không có chướng ngại vật.",
    "tip": "Bên nào có vật cản trước mặt thì bên đó phải nhường đường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Làn đường của xe khách bị vật cản che chắn."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải đi trên làn thông thoáng không bị cản trở."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe khách phải nhường đường."
      }
    ]
  },
  "517": {
    "topic": "vuot_xe",
    "why": "Phía trước xe con có chướng ngại vật, xe mô tô đi ở chiều đường thông thoáng không có chướng ngại vật nên xe mô tô được quyền đi trước.",
    "rule": "Phương tiện đi trên chiều đường thông thoáng không vướng chướng ngại vật được quyền đi trước.",
    "tip": "Xe mô tô đường thoáng đi trước; xe con đường vướng phải nhường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Chướng ngại vật nằm trước đầu xe con."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe mô tô đường thoáng đi trước."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe mô tô."
      }
    ]
  },
  "518": {
    "topic": "keo_xe",
    "why": "Xe ô tô kéo theo một rơ moóc hoặc sơ mi rơ moóc thì không được kéo thêm xe khác hoặc rơ moóc thứ hai.",
    "rule": "Cấm xe ô tô đã kéo rơ moóc lại tiếp tục kéo thêm một xe khác.",
    "tip": "Ô tô kéo xe khác đã chở hàng/kéo rơ moóc = Không đúng.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Quy tắc ghép nối và kéo phương tiện tham gia giao thông."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hành vi vi phạm kỹ thuật an toàn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Không đúng."
      }
    ]
  },
  "519": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Hướng 2 có biển cấm rẽ trái (P.123a). Do đó xe ô tô con được phép đi các hướng 1 (rẽ phải), 3 (đi thẳng) và 4 (quay đầu xe nếu vạch cho phép).",
    "rule": "Biển cấm rẽ trái cấm xe rẽ vào nhánh bên trái (hướng 2). Các hướng còn lại không bị cấm.",
    "tip": "Cấm hướng 2 -> được đi hướng 1, 3 và 4.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển cấm rẽ trái đặt ở ngã tư chỉ cấm hướng 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hướng 1, 3, 4 không có biển cấm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 1, 3 và 4."
      }
    ]
  },
  "520": {
    "topic": "duong_uu_tien",
    "why": "Xe mô tô và xe đạp nằm trên trục đường ưu tiên (biển 401 kèm biển phụ) nên được đi trước. Tiếp theo xe con (A) và xe con (B) nằm trên đường không ưu tiên, xe con (A) rẽ phải nên đi trước xe con (B) rẽ trái.",
    "rule": "Thứ tự: Xe trên đường ưu tiên đi trước, sau đó xét hướng rẽ của các xe trên đường nhánh (Phải > Trái).",
    "tip": "Xét xe trên nhánh đường ưu tiên trước, sau đó xe rẽ phải trước xe rẽ trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển phụ chỉ hướng đường ưu tiên từ hướng xe mô tô + xe đạp."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con (A) rẽ phải đi trước xe con (B) rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe mô tô + xe đạp, xe con (A), xe con (B)."
      }
    ]
  },
  "521": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Biển hiệu lệnh đặt trước ngã tư chỉ cho phép rẽ phải (hướng 1). Biển phụ vẽ xe tải bên dưới có nghĩa hiệu lệnh này chỉ bắt buộc áp dụng đối với ô tô tải. Do đó xe tải chỉ được đi hướng 1.",
    "rule": "Biển hiệu lệnh kết hợp biển phụ đối tượng nào thì chỉ bắt buộc đối tượng đó tuân thủ.",
    "tip": "Biển tròn xanh mũi tên phải + biển phụ xe tải = xe tải chỉ được đi hướng 1.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển hiệu lệnh rẽ phải có biển phụ hình xe tải."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải bắt buộc phải tuân theo hiệu lệnh rẽ phải."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Chỉ hướng 1."
      }
    ]
  },
  "522": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Hướng 1 có biển cấm ô tô tải (P.106a) và xe con đi vào hướng 1 có biển cấm rẽ phải. Hướng 4 có biển cấm máy kéo (không cấm xe tải). Xe tải được phép đi hướng 2 và 3.",
    "rule": "Biển cấm xe tải cấm hướng 1. Hướng 2 và 3 không cấm. Biển cấm máy kéo ở hướng 4 không cấm xe tải (xe tải nhỏ hơn máy kéo).",
    "tip": "Cấm tải cấm hướng 1; Cấm máy kéo không cấm tải -> đi hướng 2 và 3.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Hướng 1 cấm tải; Hướng 4 cấm máy kéo (tải đi được)."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hướng 2 (đi thẳng) và hướng 3 (rẽ trái) đi bình thường."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 2 và 3."
      }
    ]
  },
  "523": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Hướng 2 có biển cấm ô tô con (cấm ô tô con thì cấm luôn xe tải). Hướng 3 cấm xe tải rẽ trái. Hướng 4 cấm xe tải đi thẳng. Do đó xe tải chỉ được đi hướng 1 và hướng 5.",
    "rule": "Cấm xe nhỏ (ô tô con) thì cấm luôn xe lớn (ô tô tải). Biển cấm rẽ cấm theo hướng mũi tên.",
    "tip": "Cấm xe con = cấm tải (loại hướng 2, 3, 4) -> Chỉ còn hướng 1 và 5.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Quan sát các biển cấm ở từng hướng rẽ."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải chỉ được đi hướng 1 và 5."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 1 và 5."
      }
    ]
  },
  "524": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Hướng 2 có biển cấm xe tải (P.106a). Các hướng 1, 3, 4 không có biển cấm tải. Do đó xe ô tô tải được phép đi các hướng trừ hướng 2.",
    "rule": "Biển P.106a cấm ô tô tải đi vào hướng có cắm biển.",
    "tip": "Chỉ có hướng 2 cắm biển cấm tải -> Trừ hướng 2.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển cấm xe tải đặt ở lối vào hướng 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Các hướng 1, 3, 4 không có biển cấm xe tải."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Trừ hướng 2."
      }
    ]
  },
  "525": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã ba đường đồng cấp không có biển báo, xe mô tô có phía bên phải trống (không vướng xe khác) nên được quyền đi trước. Sau khi mô tô đi, bên phải xe con mới trống.",
    "rule": "Quy tắc ngã ba, ngã tư đồng cấp: Xe nào có bên phải không vướng được quyền đi trước.",
    "tip": "Nhìn vòng tròn chiều kim đồng hồ: Xe nào bên phải trống xe đó đi trước.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có biển báo ưu tiên."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Bên phải xe mô tô trống hoàn toàn -> mô tô đi trước."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe mô tô."
      }
    ]
  },
  "526": {
    "topic": "dung_do",
    "why": "Xe ô tô con quay đầu xe đè lên phần đường dành cho người đi bộ qua đường là vi phạm quy tắc giao thông đường bộ.",
    "rule": "Luật Giao thông đường bộ nghiêm cấm hành vi quay đầu xe trên phần đường dành cho người đi bộ qua đường.",
    "tip": "Quay đầu trên vạch người đi bộ = Vi phạm.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch kẻ đường dành cho người đi bộ qua đường (vạch ngựa vằn)."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Ô tô con quay đầu đè lên vạch người đi bộ."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Vi phạm."
      }
    ]
  },
  "527": {
    "topic": "dung_do",
    "why": "Xe ô tô con chuyển làn đè qua vạch kẻ đường nét liền màu trắng là vi phạm quy tắc giao thông (vạch liền cấm đè, cấm chuyển làn).",
    "rule": "Vạch kẻ phân chia các làn xe cùng chiều nét liền: Xe không được đè vạch và không được chuyển làn qua vạch này.",
    "tip": "Vạch nét liền = Cấm đè, cấm lấn.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch phân làn là vạch nét liền."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con đè qua vạch nét liền để chuyển làn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con."
      }
    ]
  },
  "528": {
    "topic": "csgt",
    "why": "Khi Cảnh sát giao thông giơ tay thẳng đứng, người tham gia giao thông ở tất cả các hướng phải dừng lại trước ngã tư, trừ những xe đã ở trong ngã tư được phép tiếp tục đi.",
    "rule": "Hiệu lệnh CSGT giơ tay thẳng đứng: Dừng lại tất cả các hướng (trừ xe đã qua vạch dừng/trong giao lộ).",
    "tip": "CSGT giơ một tay thẳng đứng = Tất cả dừng lại (trừ xe đã chớm trong ngã tư).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "CSGT giơ một tay thẳng đứng lên trời."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Hiệu lệnh CSGT cao nhất trong mọi quy tắc."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Tất cả các hướng đều phải dừng lại."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe nào đã qua vạch dừng được đi tiếp."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Tất cả các xe phải dừng lại trước ngã tư, trừ xe đã ở trong ngã tư."
      }
    ]
  },
  "529": {
    "topic": "csgt",
    "why": "Khi CSGT dang hai tay (hoặc một tay ngang), người tham gia giao thông ở phía trước và phía sau CSGT phải dừng lại; người ở phía bên phải và bên trái được đi tất cả các hướng. Ở đây xe mô tô và xe tải ở bên phải và trái nên được phép đi.",
    "rule": "Hiệu lệnh CSGT dang hai tay: Trước sau dừng lại; Phải trái được đi tất cả các hướng.",
    "tip": "Hai tay dang ngang = Trục cánh tay được đi (mô tô, xe tải), hướng trước ngực và sau lưng dừng lại.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "CSGT dang hai tay ngang vai."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Hiệu lệnh CSGT có hiệu lực cao nhất."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Người phía trước và sau CSGT dừng lại."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Mô tô và xe tải ở hai bên sườn CSGT -> được đi."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe mô tô, xe tải."
      }
    ]
  },
  "530": {
    "topic": "vuot_xe",
    "why": "Xe con vượt xe tải khi vạch kẻ tim đường phía chiều đi của xe con là vạch nét đứt và làn đường phía trước thông thoáng, không có chướng ngại vật hay xe ngược chiều. Xe con vượt đúng quy tắc.",
    "rule": "Vạch nét đứt cho phép phương tiện mượn làn để vượt khi đảm bảo điều kiện an toàn.",
    "tip": "Vạch đứt bên làn của mình = Được phép vượt an toàn.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch tim đường là vạch nét đứt."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Không có phương tiện đi ngược chiều gây nguy hiểm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Đúng."
      }
    ]
  },
  "531": {
    "topic": "vuot_xe",
    "why": "Xe khách đang bật xi nhan rẽ trái và đang chuyển hướng. Theo luật, phương tiện được phép vượt về bên phải khi xe phía trước có tín hiệu rẽ trái hoặc đang rẽ trái. Xe con vượt phải là đúng.",
    "rule": "Quy tắc vượt xe: Được phép vượt bên phải khi xe phía trước có tín hiệu rẽ trái hoặc đang rẽ trái.",
    "tip": "Xe trước rẽ trái -> Xe sau được phép vượt bên phải.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe khách phía trước bật đèn xi nhan xin rẽ trái."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con vượt bên phải làn đường của mình an toàn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con."
      }
    ]
  },
  "532": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Biển hiệu lệnh đặt trên đường chỉ cho phép đi thẳng (mũi tên hướng thẳng). Xe tải rẽ theo hướng mũi tên là không chấp hành biển hiệu lệnh nên vi phạm.",
    "rule": "Phương tiện phải chấp hành nghiêm chỉnh biển báo hiệu lệnh đặt trên đường đi.",
    "tip": "Biển tròn xanh mũi tên thẳng = Chỉ được đi thẳng, rẽ là sai.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển hiệu lệnh R.301 chỉ hướng đi thẳng."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải rẽ theo hướng mũi tên là vi phạm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe tải."
      }
    ]
  },
  "533": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã tư đồng cấp không có biển báo, bên phải xe tải không vướng (trống) nên xe tải đi trước. Khi xe tải rẽ phải xong, bên phải xe khách trống nên xe khách đi thẳng thứ hai. Cuối cùng xe con rẽ trái đi sau.",
    "rule": "Quy tắc ngã tư đồng cấp: Quyền bên phải không vướng (xe tải) -> Xe đi thẳng (xe khách) -> Xe rẽ trái (xe con).",
    "tip": "Bên phải trống đi trước -> đi thẳng -> rẽ trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có biển báo giao thông."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Bên phải xe tải trống -> xe tải đi trước; xe khách thẳng; xe con rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe tải, xe khách, xe con."
      }
    ]
  },
  "534": {
    "topic": "ben_phai_trong",
    "why": "Bên phải của xe khách và xe tải đều không vướng phương tiện nào nên xe khách (đi thẳng) và xe tải (rẽ phải) được đi cùng lúc. Xe con rẽ trái có xe bên phải vướng nên đi sau cùng.",
    "rule": "Tại ngã tư đồng cấp, các xe có bên phải không vướng được đi trước.",
    "tip": "Xe khách và xe tải không vướng nhau và bên phải đều trống -> đi cùng lúc.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có biển báo giao thông."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Bên phải xe khách và tải không vướng -> đi trước. Xe con rẽ trái đi sau."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe khách và xe tải, xe con."
      }
    ]
  },
  "535": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Biển cấm máy kéo cấm máy kéo đi vào hướng 4. Biển cấm máy kéo KHÔNG cấm xe tải (xe tải nhỏ hơn máy kéo). Tuy nhiên tại ngã ba hướng 4 có biển cấm xe tải đi vào. Các hướng 1, 2, 3 xe tải được phép đi.",
    "rule": "Biển cấm xe tải đặt ở hướng 4 cấm xe tải. Các hướng 1, 2, 3 xe tải được đi.",
    "tip": "Xem biển cấm tải ở hướng 4 -> Trừ hướng 4.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Hướng 4 có biển cấm máy kéo và cấm xe tải."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Các hướng 1, 2, 3 được phép đi."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Trừ hướng 4."
      }
    ]
  },
  "536": {
    "topic": "xe_uu_tien",
    "why": "Xe công an là xe ưu tiên nên đi trước nhất. Xe con nằm trên đường ưu tiên đi thứ hai. Xe tải và xe khách ở đường không ưu tiên, bên phải xe tải trống nên xe tải đi thứ ba, xe khách đi cuối cùng.",
    "rule": "Thứ tự: Xe ưu tiên (Công an) -> Xe đường ưu tiên (Xe con) -> Quyền bên phải không vướng (Xe tải) -> Xe khách.",
    "tip": "Xe ưu tiên -> đường ưu tiên -> bên phải trống -> còn lại.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Xe công an là xe ưu tiên đi trước."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe con ở đường ưu tiên đi thứ 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Bên phải xe tải không vướng đi trước xe khách."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe công an, xe con, xe tải, xe khách."
      }
    ]
  },
  "537": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Hướng 2 có biển cấm xe tải (P.106a). Hướng 1 rẽ phải, hướng 3 rẽ trái, hướng 4 quay đầu đều không có biển cấm. Do đó xe tải được đi các hướng 1, 3 và 4.",
    "rule": "Biển cấm xe tải đặt ở hướng 2 chỉ cấm xe tải đi vào hướng 2.",
    "tip": "Chỉ cấm hướng 2 -> Được đi hướng 1, 3 và 4.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển cấm xe tải đặt ở đầu hướng 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hướng 1, 3 và 4 không bị cấm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 1, 3 và 4."
      }
    ]
  },
  "538": {
    "topic": "den_tin_hieu",
    "why": "Xe khách rẽ trái đèn xanh đúng; xe tải đi thẳng đèn xanh đúng; xe con rẽ phải đèn xanh đúng; xe mô tô rẽ trái đèn xanh đúng. Tất cả các xe đều chấp hành đúng quy tắc.",
    "rule": "Phương tiện chấp hành đúng tín hiệu đèn và vạch kẻ chỉ hướng làn đường.",
    "tip": "Đối chiếu đèn từng làn: tất cả các xe đều đi theo đúng mũi tên đèn xanh.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn xanh bật cho các làn xe đi theo mũi tên quy định."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Tất cả các xe đều đi theo hướng đèn xanh cho phép."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Không có xe nào vượt đèn đỏ hay sai làn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Tất cả các loại xe trên."
      }
    ]
  },
  "539": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Hướng 2 có biển cấm xe mô tô hai bánh (P.105). Hướng 1 rẽ phải và hướng 3 rẽ trái không có biển cấm. Do đó xe mô tô được phép đi hướng 1 và 3.",
    "rule": "Biển P.105 cấm tất cả các loại xe mô tô đi vào hướng 2.",
    "tip": "Cấm hướng 2 -> Còn lại hướng 1 và 3.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển cấm mô tô đặt ở ngã rẽ hướng 2."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hướng 1 và hướng 3 không bị cấm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 1 và 3."
      }
    ]
  },
  "540": {
    "topic": "xe_uu_tien",
    "why": "Xe quân sự và xe công an đều là xe ưu tiên. Theo thứ tự luật định: Quân sự (Sự) được ưu tiên đi trước Công an (Công). Sau đó xe con và xe mô tô ở đường ngang đi cùng lúc vì không vướng nhau.",
    "rule": "Thứ tự xe ưu tiên: Hỏa > Sự > Công > Thương. Xe quân sự đi trước xe công an.",
    "tip": "Nhớ thứ tự: Quân sự đi trước Công an (Hỏa - SỰ - CÔNG - Thương).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Có 2 xe ưu tiên: Quân sự và Công an. Quân sự > Công an."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe quân sự đi thứ nhất -> Xe công an đi thứ hai."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con và mô tô đi sau cùng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe quân sự, xe công an, xe con + xe mô tô."
      }
    ]
  },
  "541": {
    "topic": "stop_yield",
    "why": "Tại đoạn đường dốc nguy hiểm hẹp chỉ đủ cho một xe đi, xe đang xuống dốc (Xe A) phải nhường đường cho xe đang lên dốc (Xe B).",
    "rule": "Quy tắc đường dốc: Xe xuống dốc phải nhường đường cho xe đang lên dốc.",
    "tip": "Xuống dốc phải nhường xe đang lên dốc (lên dốc đề-pa khó hơn).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Đoạn đường đèo dốc nguy hiểm có biển cảnh báo dốc."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe A đang xuống dốc, xe B đang lên dốc."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe A phải nhường đường."
      }
    ]
  },
  "542": {
    "topic": "dung_do",
    "why": "Xe con quay đầu xe đè lên vạch người đi bộ và vạch nét liền tại nơi giao nhau là vi phạm quy tắc an toàn giao thông.",
    "rule": "Cấm quay đầu xe trên phần đường dành cho người đi bộ qua đường.",
    "tip": "Quay đầu đè vạch người đi bộ = Vi phạm.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch kẻ đường dành cho người đi bộ qua đường."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con quay đầu xe trên vạch người đi bộ."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Vi phạm."
      }
    ]
  },
  "543": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Làn đường có biển chỉ dẫn phương tiện cho từng làn. Xe con (E) đi vào làn dành cho xe mô tô là sai; xe mô tô (C) đi vào làn dành cho ô tô là sai. Hai xe vi phạm là xe con (E) và xe mô tô (C).",
    "rule": "Phương tiện phải di chuyển đúng làn đường quy định theo biển báo phân làn đường (R.412).",
    "tip": "So khớp biểu tượng loại xe trên biển treo trên từng làn với xe đang chạy.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển báo phân làn đường theo loại phương tiện treo phía trên."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con (E) và mô tô (C) đi sai làn đường quy định."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con (E), xe mô tô (C)."
      }
    ]
  },
  "544": {
    "topic": "stop_yield",
    "why": "Xe con rẽ trái đã đi vào trong ngã tư trước (nhất chớm). Xe của bạn đi thẳng chưa vào ngã tư phải giảm tốc độ nhường đường cho xe con rẽ trái hoàn thành nút giao.",
    "rule": "Nguyên tắc 'Nhất chớm': Phương tiện đã vào trong giao lộ được quyền đi trước phương tiện chưa vào giao lộ.",
    "tip": "Xe nào đã qua vạch dừng vào ngã tư trước thì nhường xe đó đi trước.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe con đã đi vào vùng giao lộ."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe của bạn chưa vào vùng giao lộ -> nhường đường."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Nhường xe con rẽ trái trước."
      }
    ]
  },
  "545": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Biển hiệu lệnh đặt trước ngã ba chỉ hướng đi phải theo: đi thẳng và rẽ phải (hướng 1 và 2). Không được rẽ trái (hướng 3). Do đó người lái xe điều khiển xe đi theo hướng 1 và 2.",
    "rule": "Biển hiệu lệnh R.301e buộc phương tiện chỉ được đi thẳng hoặc rẽ phải.",
    "tip": "Biển tròn xanh mũi tên thẳng và rẽ phải = Đi hướng 1 và 2.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển hiệu lệnh chỉ cho phép đi thẳng và rẽ phải."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hướng 3 không được phép rẽ."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 1 và 2."
      }
    ]
  },
  "546": {
    "topic": "vong_xuyen",
    "why": "Tại nơi giao nhau có biển báo vòng xuyến, xe tải (A) đã ở trong vòng xuyến nên xe con (B) chưa vào vòng xuyến phải nhường đường cho xe tải.",
    "rule": "Quy tắc vòng xuyến: Nhường đường cho xe đi từ bên trái tới và xe đã ở trong bùng binh.",
    "tip": "Xe trong vòng xuyến đi trước, xe ngoài vòng xuyến phải nhường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Có biển báo hiệu lệnh đi theo vòng xuyến."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe tải (A) đã di chuyển trong vòng xuyến bên trái xe con."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con (B) đến từ hướng giao cắt ngoài phải nhường đường."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con (B)."
      }
    ]
  },
  "547": {
    "topic": "ben_phai_trong",
    "why": "Khi chuyển hướng rẽ trái tại ngã tư, người lái xe phải nhường đường cho xe đi ngược chiều đi thẳng (xe tải) và xe rẽ phải (xe buýt).",
    "rule": "Quy tắc nhường đường khi chuyển hướng: Xe rẽ trái phải nhường đường cho xe đi thẳng và xe rẽ phải đi ngược chiều tới.",
    "tip": "Rẽ trái luôn có quyền ưu tiên thấp nhất so với đi thẳng và rẽ phải.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã tư không có biển phân cấp ưu tiên."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe buýt rẽ phải và xe tải đi thẳng đi trước."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Nhường đường cho xe buýt và xe tải."
      }
    ]
  },
  "548": {
    "topic": "bien_cam_hieu_lenh",
    "why": "Biển báo phân làn treo trên cao: Làn 1 ô tô, Làn 2 ô tô, Làn 3 mô tô, Làn 4 mô tô. Xe con (E) đi vào làn xe mô tô (sai). Xe mô tô (D) đi vào làn ô tô (sai). Xe vi phạm là xe con (E) và mô tô (D).",
    "rule": "Phương tiện cơ giới phải tuân thủ biển báo hiệu phân làn đường theo phương tiện (R.412).",
    "tip": "Nhìn biển treo trên đầu từng làn để kiểm tra xe đi sai làn.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển báo phân làn treo trên giá long môn."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con (E) và xe mô tô (D) đi sai làn đường quy định."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con (E), xe mô tô (D)."
      }
    ]
  },
  "549": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã ba đường đồng cấp không biển báo: Xe tải rẽ phải (hướng ưu tiên cao nhất, bên phải không vướng) được đi trước xe con rẽ trái.",
    "rule": "Quy tắc hướng rẽ: Xe rẽ phải được quyền đi trước xe rẽ trái.",
    "tip": "Rẽ phải đi trước rẽ trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã ba đồng cấp không có biển báo."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải rẽ phải, xe con rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe tải."
      }
    ]
  },
  "550": {
    "topic": "dung_do",
    "why": "Hướng A là quay đầu trước biển cấm hoặc tại nơi không cấm. Hướng B là quay đầu đè vạch nét liền hoặc sau biển cấm. Do đó người lái xe chỉ có thể quay đầu theo hướng A.",
    "rule": "Phương tiện chỉ được quay đầu tại nơi cho phép, không được quay đầu nơi có vạch kẻ nét liền hoặc biển cấm.",
    "tip": "Quay đầu theo hướng A hợp lệ, hướng B đè vạch liền cấm.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Quan sát vạch kẻ tim đường và biển báo hiệu."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hướng A phù hợp với vạch nét đứt cho phép quay đầu."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Quay đầu theo hướng A."
      }
    ]
  },
  "551": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã tư đồng cấp: Xe của bạn rẽ phải và xe con đi thẳng có bên phải không vướng nên đi trước. Xe tải rẽ trái có xe bên phải vướng nên đi sau.",
    "rule": "Quy tắc ngã tư đồng cấp: Bên phải trống và hướng rẽ (Phải > Thẳng > Trái).",
    "tip": "Xe của bạn rẽ phải + xe con thẳng đi trước, xe tải rẽ trái đi sau.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã tư không có biển phân cấp ưu tiên."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe của bạn và xe con đi trước."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe của bạn và xe con, xe tải."
      }
    ]
  },
  "552": {
    "topic": "vuot_xe",
    "why": "Khi muốn vượt xe tải trên đường một chiều có nhiều làn hoặc đường ngoài đô thị: Bật tín hiệu báo hiệu bằng đèn hoặc còi, khi đủ điều kiện an toàn mới tăng tốc cho xe chạy vượt qua.",
    "rule": "Quy tắc an toàn khi vượt xe: Phải có tín hiệu báo trước bằng còi hoặc đèn, quan sát không có trở ngại mới được vượt.",
    "tip": "Báo hiệu bằng đèn hoặc còi + đủ điều kiện an toàn mới vượt.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Đoạn đường cho phép vượt an toàn."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Bật tín hiệu đèn/còi và kiểm tra an toàn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Bật tín hiệu báo hiệu bằng đèn hoặc còi, khi đủ điều kiện an toàn, tăng tốc cho xe chạy vượt qua."
      }
    ]
  },
  "553": {
    "topic": "den_tin_hieu",
    "why": "Tín hiệu đèn phía trước xe con và xe tải là màu đỏ, nên xe con và xe tải phải dừng lại. Xe khách và mô tô đèn xanh được đi.",
    "rule": "Chấp hành tín hiệu đèn giao thông: Đèn đỏ phải dừng lại trước vạch dừng xe.",
    "tip": "Đèn đỏ = Dừng lại (Xe con, xe tải).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn đỏ bật sáng ở phía làn xe con và xe tải."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Các xe phải chấp hành đèn tín hiệu."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con và xe tải gặp đèn đỏ phải dừng lại."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con, xe tải."
      }
    ]
  },
  "554": {
    "topic": "den_tin_hieu",
    "why": "Các xe chấp hành đúng tín hiệu làn đường và đèn giao thông: Xe con (A), xe con (C), xe con (E), xe buýt (G).",
    "rule": "Tuân thủ nghiêm chỉnh đèn tín hiệu và vạch sơn kẻ mũi tên chỉ hướng đi trên mặt đường.",
    "tip": "Xem xe nào đi đúng theo mũi tên của làn đèn xanh.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu giao thông điều khiển từng làn."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Các xe A, C, E, G đi đúng tín hiệu và làn quy định."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Các xe vi phạm là B, D."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con (A), xe con (C), xe con (E), xe buýt (G)."
      }
    ]
  },
  "555": {
    "topic": "vuot_xe",
    "why": "Nơi đường giao nhau là khu vực cấm vượt xe vì tầm nhìn bị hạn chế và có các xung đột giao thông bất ngờ.",
    "rule": "Luật Giao thông đường bộ nghiêm cấm hành vi vượt xe tại nơi đường giao nhau (ngã ba, ngã tư).",
    "tip": "Tại nơi đường giao nhau -> CẤM VƯỢT.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Khu vực nơi đường giao nhau cùng mức."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hành vi vượt xe tại giao lộ bị nghiêm cấm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Cấm vượt."
      }
    ]
  },
  "556": {
    "topic": "vuot_xe",
    "why": "Phía trước là khúc cua đường cong che khuất tầm nhìn và vạch kẻ tim đường là vạch nét liền, cấm vượt phương tiện khác.",
    "rule": "Cấm vượt xe ở đoạn đường cong có tầm nhìn bị hạn chế hoặc nơi có vạch kẻ đường nét liền.",
    "tip": "Đường cong cua khuất tầm nhìn + vạch liền = Không được vượt.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Đoạn đường cong cua dốc khuất tầm nhìn."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Vạch kẻ đường nét liền cấm lấn làn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Không được vượt."
      }
    ]
  },
  "557": {
    "topic": "dung_do",
    "why": "Vị trí A cách đường ray quá gần (dưới khoảng cách an toàn 5m). Vị trí B và C nằm ngoài phạm vi an toàn đường sắt (cách ray tối thiểu 5m) nên dừng đúng quy tắc.",
    "rule": "Khi dừng xe gần đường sắt, người lái xe phải dừng cách đường ray ngoài cùng tối thiểu 5 mét.",
    "tip": "Dừng cách đường ray tối thiểu 5 mét (Vị trí B và C).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đoạn đường giao cắt với đường sắt không có rào chắn."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vị trí A vi phạm hành lang 5m an toàn đường sắt."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Vị trí B và C đảm bảo cự ly an toàn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Vị trí B và C."
      }
    ]
  },
  "558": {
    "topic": "dung_do",
    "why": "Biển cấm dừng và đỗ xe có biển phụ mũi tên hai đầu chỉ lên và xuống, có hiệu lực cả trước và sau biển. Do đó không được dừng xe ở bất kỳ vị trí nào trong tình huống này.",
    "rule": "Biển cấm dừng và đỗ xe có biển phụ mũi tên 2 chiều cấm cả phía trước và phía sau vị trí cắm biển.",
    "tip": "Biển phụ mũi tên lên xuống = Cấm toàn bộ trước và sau.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển cấm dừng đỗ kèm biển phụ hiệu lực 2 phía."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Vị trí trước và sau biển đều nằm trong vùng cấm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Không được dừng."
      }
    ]
  },
  "559": {
    "topic": "keo_xe",
    "why": "Xe con bật đèn xi nhan xin rẽ trái nhưng lại đi trên làn đi thẳng qua ngã tư; xe mô tô bật xi nhan phải nhưng đi vào làn đi thẳng. Cả hai xe đều vi phạm quy tắc tín hiệu.",
    "rule": "Phương tiện chuyển hướng hoặc chuẩn bị rẽ phải có tín hiệu báo hướng rẽ và đi đúng làn phù hợp.",
    "tip": "Quan sát đèn xi nhan nhấp nháy màu vàng của cả hai xe: Cả hai xe đều vi phạm.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu giao thông."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe cơ giới bật tín hiệu đèn rẽ sai làn hoặc không đúng quy định."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Cả hai xe đều vi phạm quy tắc báo hiệu."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Cả hai xe."
      }
    ]
  },
  "560": {
    "topic": "den_tin_hieu",
    "why": "Xe tải đi trên làn bắt buộc đi thẳng nhưng lại rẽ theo hướng mũi tên hoặc vượt đèn tín hiệu là vi phạm quy tắc giao thông.",
    "rule": "Phương tiện phải chấp hành đúng hướng đi của mũi tên trên làn đường và tín hiệu đèn giao thông.",
    "tip": "Đối chiếu mũi tên làn đường và hướng xe chạy.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu và biển chỉ dẫn hướng đi trên làn."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe tải đi sai chỉ dẫn của đèn và mũi tên trên mặt đường."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải vi phạm quy tắc giao thông."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe tải."
      }
    ]
  },
  "561": {
    "topic": "den_tin_hieu",
    "why": "Xe khách và xe tải đi không đúng hướng mũi tên của làn đường hoặc vượt đèn đỏ tại nút giao. Những xe vi phạm là xe khách và xe tải.",
    "rule": "Chấp hành tín hiệu đèn giao thông và hướng đi bắt buộc của làn đường.",
    "tip": "Xem hướng rẽ thực tế so với đèn đỏ / xanh và vạch mũi tên sơn trên đường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Tín hiệu đèn điều khiển ngã tư."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe khách và xe tải vi phạm hướng đi hoặc đèn tín hiệu."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe khách, xe tải vi phạm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe khách, xe tải."
      }
    ]
  },
  "562": {
    "topic": "den_tin_hieu",
    "why": "Xe tải ở làn đi thẳng lại rẽ trái; xe khách ở làn rẽ trái lại đi thẳng; xe mô tô rẽ sai tín hiệu đèn. Các xe vi phạm là xe tải, xe khách, xe mô tô.",
    "rule": "Tất cả các phương tiện phải đi đúng làn đường quy định và tuân thủ đèn tín hiệu giao thông.",
    "tip": "Loại xe con đi đúng (xe con rẽ phải đúng làn đèn xanh), còn lại đều vi phạm.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu giao thông theo làn đường."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe tải, xe khách, xe mô tô đều không chấp hành đúng quy định."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con đi đúng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe tải, xe khách, xe mô tô."
      }
    ]
  },
  "563": {
    "topic": "den_tin_hieu",
    "why": "Xe khách ở làn rẽ trái nhưng đi thẳng khi đèn đỏ; xe tải ở làn đi thẳng lại rẽ trái khi đèn đỏ. Hai xe vi phạm là xe khách và xe tải.",
    "rule": "Phương tiện phải tuân thủ nghiêm ngặt chỉ huy đèn tín hiệu theo từng làn đường.",
    "tip": "Mẹo: Xe con luôn đi đúng trong dạng câu sa hình này -> Chọn đáp án KHÔNG CÓ XE CON.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu giao thông trên từng làn."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch mũi tên chỉ hướng đi trên từng làn."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con đi đúng làn đèn xanh; xe khách và xe tải đi sai hướng và đèn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe khách, xe tải."
      }
    ]
  },
  "564": {
    "topic": "vuot_xe",
    "why": "Phía trước có xe bị hỏng đột xuất: Người lái xe phải quan sát phía trước, phía sau, khi đủ điều kiện an toàn thì bật tín hiệu bằng đèn hoặc còi rồi cho xe chạy vượt qua.",
    "rule": "Quy tắc vượt chướng ngại vật: Phải quan sát an toàn hai chiều và bật tín hiệu báo trước khi vượt.",
    "tip": "Quan sát an toàn + bật tín hiệu đèn/còi rồi vượt qua.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe phía trước bị sự cố hư hỏng dừng đỗ trên đường."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Chờ đường thoáng an toàn và bật tín hiệu mới vượt."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Quan sát phía trước, phía sau, khi đủ điều kiện an toàn, bật tín hiệu bằng đèn hoặc còi rồi cho xe chạy vượt qua."
      }
    ]
  },
  "565": {
    "topic": "den_tin_hieu",
    "why": "Xe khách ở làn rẽ trái đèn xanh rẽ trái đúng. Xe mô tô ở làn rẽ trái đèn xanh rẽ trái đúng. Xe tải ở làn đi thẳng lại rẽ trái sai. Xe chấp hành đúng là xe khách và xe mô tô.",
    "rule": "Phương tiện đi đúng hướng mũi tên cho phép của đèn xanh là chấp hành đúng quy tắc.",
    "tip": "Mẹo: Xe khách và xe mô tô cùng rẽ trái theo đèn xanh -> chấp hành đúng.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn xanh rẽ trái ở làn xe khách và mô tô."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe khách và mô tô thực hiện đúng tín hiệu đèn xanh."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải vi phạm."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe khách, xe mô tô."
      }
    ]
  },
  "566": {
    "topic": "den_tin_hieu",
    "why": "Làn đường có biển phân làn: Xe tải (D) đi vào làn mô tô là sai; xe con (B) đi vào làn mô tô là sai. Những xe vi phạm là xe tải (D) và xe con (B).",
    "rule": "Phương tiện phải di chuyển đúng làn đường được chỉ định trên biển báo phân làn.",
    "tip": "Đối chiếu hình vẽ trên biển treo với phương tiện thực tế trên làn.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Biển báo hiệu phân làn đường theo loại xe (R.412)."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải (D) và xe con (B) đi sai làn đường quy định."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe tải (D), xe con (B)."
      }
    ]
  },
  "567": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã ba đường đồng cấp: Xe mô tô rẽ phải đi trước. Tiếp theo xe con đi thẳng. Xe của bạn rẽ trái đi cuối cùng.",
    "rule": "Quy tắc hướng rẽ tại ngã ba đồng cấp: Rẽ phải > Đi thẳng > Rẽ trái.",
    "tip": "Nhớ thứ tự hướng rẽ: Phải -> Thẳng -> Trái (Mô tô -> Xe con -> Xe của bạn).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã ba đồng cấp không biển báo."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Mô tô rẽ phải -> Xe con thẳng -> Xe bạn rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe mô tô, xe con, xe của bạn."
      }
    ]
  },
  "568": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã ba: Xe con rẽ phải đi trước nhất. Xe của bạn đi thẳng đi thứ hai. Xe mô tô rẽ trái đi cuối cùng.",
    "rule": "Quy tắc thứ tự hướng rẽ: Rẽ phải (Xe con) -> Đi thẳng (Xe của bạn) -> Rẽ trái (Xe mô tô).",
    "tip": "Phải -> Thẳng -> Trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã ba đồng cấp không biển báo."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con rẽ phải -> Xe bạn đi thẳng -> Xe mô tô rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe con, xe của bạn, xe mô tô."
      }
    ]
  },
  "569": {
    "topic": "den_tin_hieu",
    "why": "Xe con gặp đèn tín hiệu màu đỏ ở hướng đi của mình nên phải dừng lại. Xe rẽ theo mũi tên đèn xanh được đi.",
    "rule": "Đèn đỏ bắt buộc các phương tiện phải dừng lại trước vạch dừng, trừ khi có đèn phụ mũi tên cho phép.",
    "tip": "Gặp đèn đỏ -> Phải dừng lại.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu đỏ trước mặt xe con."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Không có đèn phụ cho phép rẽ."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con bắt buộc phải dừng lại."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con."
      }
    ]
  },
  "570": {
    "topic": "den_tin_hieu",
    "why": "Xe của bạn đang dừng ở làn đường có mũi tên trên mặt đường chỉ hướng đi thẳng và rẽ trái. Do đó xe của bạn được đi thẳng hoặc rẽ trái.",
    "rule": "Vạch mũi tên chỉ hướng trên mặt đường quy định các hướng đi được phép từ làn đường đó.",
    "tip": "Xem mũi tên dưới mặt đường làn xe đang đứng: Mũi tên thẳng và rẽ trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu giao thông."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch sơn mũi tên trên làn xe bạn chỉ đi thẳng và rẽ trái."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe của bạn được đi thẳng hoặc rẽ trái khi đèn xanh."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Đi thẳng, rẽ trái."
      }
    ]
  },
  "571": {
    "topic": "den_tin_hieu",
    "why": "Đèn tín hiệu hiện đang màu đỏ: Bạn phải dừng lại trước vạch dừng. Mũi tên trên làn đường chỉ đi thẳng và rẽ trái, nên khi đèn xanh bạn được đi thẳng hoặc rẽ trái.",
    "rule": "Phải dừng trước vạch khi đèn đỏ, và chỉ được di chuyển theo hướng mũi tên chỉ dẫn của làn đường khi đèn chuyển sang xanh.",
    "tip": "Đang đèn đỏ -> Dừng lại trước vạch, đèn xanh đi thẳng hoặc rẽ trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu đang màu đỏ."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Làn đường có mũi tên đi thẳng và rẽ trái."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Dừng lại trước vạch dừng, chờ đèn xanh mới đi thẳng hoặc rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Dừng lại trước vạch dừng và đi thẳng hoặc rẽ trái khi đèn xanh."
      }
    ]
  },
  "572": {
    "topic": "stop_yield",
    "why": "Xe của bạn chuẩn bị rẽ phải tại nút giao: Phía trước có xe tải và người đi xe đạp đang đi thẳng. Bạn phải giảm tốc độ, rẽ phải sau xe tải và xe đạp để bảo đảm an toàn.",
    "rule": "Khi chuyển hướng rẽ phải, người lái xe phải nhường đường cho các phương tiện đang đi thẳng trên phần đường ưu tiên.",
    "tip": "Rẽ phải phải nhường đường cho xe đi thẳng -> rẽ sau xe tải và xe đạp.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Giao lộ có phương tiện đi thẳng chiều cắt ngang."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe của bạn rẽ phải có xung đột với dòng xe đi thẳng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Giảm tốc độ, rẽ phải sau xe tải và xe đạp."
      }
    ]
  },
  "573": {
    "topic": "stop_yield",
    "why": "Người đi bộ đang qua đường trên vạch sang đường và xe con màu xanh đang rẽ trước: Bạn phải giảm tốc độ, nhường đường cho người đi bộ và rẽ phải sau xe con màu xanh.",
    "rule": "Quy tắc: Nhường đường cho người đi bộ qua đường tại nơi có vạch kẻ đường, giữ khoảng cách an toàn với xe phía trước.",
    "tip": "Nhường người đi bộ qua đường trước, sau đó rẽ sau xe con.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Có vạch sang đường cho người đi bộ."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Người đi bộ đang qua đường và xe con xanh đang di chuyển."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Giảm tốc độ, để người đi bộ qua đường và rẽ phải sau xe con màu xanh."
      }
    ]
  },
  "574": {
    "topic": "stop_yield",
    "why": "Xe của bạn đang rẽ trái qua ngã ba: Phía đối diện có xe khách đi thẳng và người đi xe đạp đang di chuyển. Bạn phải nhường đường cho xe đạp và xe khách.",
    "rule": "Xe rẽ trái có trách nhiệm nhường đường cho tất cả các phương tiện đi thẳng chiều đối diện tới.",
    "tip": "Rẽ trái luôn phải nhường xe đi thẳng (xe khách và xe đạp).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe bạn chuẩn bị rẽ trái."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe khách và xe đạp đi thẳng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Nhường đường cho xe đạp và xe khách."
      }
    ]
  },
  "575": {
    "topic": "stop_yield",
    "why": "Trên đoạn đường hẹp, phía trước xe tải có chướng ngại vật (xe con bị hỏng/dừng đỗ). Xe tải phải nhường đường cho xe con đi ngược chiều không có chướng ngại vật.",
    "rule": "Phương tiện có chướng ngại vật trên phần đường của mình phải nhường đường cho phương tiện đi ở phần đường thông thoáng.",
    "tip": "Bên nào có chướng ngại vật thì bên đó phải nhường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Làn đường của xe tải có vật cản phía trước."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con đi chiều thông thoáng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe tải."
      }
    ]
  },
  "576": {
    "topic": "stop_yield",
    "why": "Phía trước xe của bạn có chướng ngại vật trên làn đường, xe ngược chiều đường thông thoáng. Xe của bạn phải nhường đường cho xe ngược chiều đi qua trước.",
    "rule": "Khi có chướng ngại vật phía trước làn xe mình, phải dừng lại hoặc giảm tốc độ nhường đường cho xe ngược chiều.",
    "tip": "Làn của mình có vật cản -> Xe của mình phải nhường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vật cản nằm ngay trước đầu xe của bạn."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe ngược chiều không bị vướng chướng ngại vật."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe của bạn."
      }
    ]
  },
  "577": {
    "topic": "vuot_xe",
    "why": "Luật Giao thông đường bộ nghiêm cấm hành vi vượt xe khi gặp đoàn người đi xe đạp có tổ chức hoặc đoàn xe có người dẫn đường.",
    "rule": "Cấm vượt đoàn người đi bộ có tổ chức, đoàn xe đạp có tổ chức, đoàn xe tang hoặc đoàn xe quân sự có dẫn đường.",
    "tip": "Gặp đoàn người/xe đạp có tổ chức -> KHÔNG ĐƯỢC VƯỢT.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Đoàn người đi xe đạp di chuyển có tổ chức theo hàng ngũ."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Nghiêm cấm hành vi vượt xe gây mất an toàn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Không được vượt những người đi xe đạp."
      }
    ]
  },
  "578": {
    "topic": "dung_do",
    "why": "Phía trước có xe đang lùi vào nơi đỗ và xe con phía trước đang chuyển làn sang trái: Bạn có thể giảm tốc độ, dừng lại nếu cần hoặc quan sát an toàn rồi chuyển làn sang trái. Đáp án đúng là Cả ý 1 và ý 2.",
    "rule": "Xử lý tình huống linh hoạt: Giảm tốc độ quan sát an toàn, chuyển làn khi đủ điều kiện hoặc dừng lại chờ.",
    "tip": "Xử lý an toàn: Ý 1 và ý 2 kết hợp.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Phương tiện phía trước đang lùi vào điểm đỗ."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con trước chuyển làn sang trái tránh."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Ý 1 và ý 2."
      }
    ]
  },
  "579": {
    "topic": "dung_do",
    "why": "Phía trước có xe đang lùi ra khỏi nơi đỗ lấn ra làn đường xe chạy: Bạn phải giảm tốc độ, dừng lại nhường đường để phòng tránh va chạm đột ngột.",
    "rule": "Khi xe phía trước lùi từ ngõ, cổng hoặc nơi đỗ ra đường chính, phải giảm tốc độ hoặc dừng lại nhường đường bảo đảm an toàn.",
    "tip": "Xe trước đang lùi ra đường -> Giảm tốc độ, dừng lại nhường đường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe màu xanh đang lùi từ điểm đỗ ra phần đường lưu thông."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Tầm nhìn người lùi bị hạn chế, xe bạn phải chủ động nhường."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Giảm tốc độ, dừng lại nhường đường."
      }
    ]
  },
  "580": {
    "topic": "vuot_xe",
    "why": "Phía trước có xe màu xanh đang vượt xe màu vàng và lấn sang làn đường của bạn: Bạn phải phanh xe giảm tốc độ và đi sát lề đường bên phải để tránh va chạm trực diện.",
    "rule": "Khi phát hiện xe ngược chiều lấn làn để vượt, phải chủ động giảm tốc độ tối đa và tấp sát lề phải.",
    "tip": "Xe ngược chiều lấn làn vượt ẩu -> Phanh giảm tốc độ và tấp sát lề phải.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Tình huống nguy hiểm khẩn cấp: xe ngược chiều đối đầu."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Tuyệt đối không tăng tốc hoặc lách sang trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Phanh xe giảm tốc độ và đi sát lề đường bên phải."
      }
    ]
  },
  "581": {
    "topic": "tinh_huong_an_toan",
    "why": "Xe tải phía trước bật xi nhan xin chuyển làn đường: Bạn phải phanh xe giảm tốc độ, giữ khoảng cách an toàn chờ xe tải phía trước hoàn thành việc chuyển làn đường.",
    "rule": "Giữ khoảng cách an toàn và nhường đường khi phương tiện phía trước đã có tín hiệu chuyển làn hợp lệ.",
    "tip": "Xe trước xin chuyển làn -> Phanh giảm tốc độ chờ xe tải chuyển làn.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đường cao tốc / đường nhiều làn."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe tải bật đèn tín hiệu xin chuyển làn đường."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Phanh xe giảm tốc độ bảo đảm khoảng cách an toàn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Phanh xe giảm tốc độ chờ xe tải phía trước chuyển làn đường."
      }
    ]
  },
  "582": {
    "topic": "tinh_huong_an_toan",
    "why": "Xe của bạn đã đi qua vạch dừng vào trong ngã tư khi tín hiệu đèn chuyển: Người lái xe phải giảm tốc độ và tiếp tục đi thẳng qua ngã tư để giải phóng nút giao.",
    "rule": "Xe đã qua vạch dừng vào nơi giao nhau được phép tiếp tục di chuyển qua nút giao.",
    "tip": "Đã chớm qua vạch dừng -> Giảm tốc độ và đi thẳng qua ngã tư.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đèn tín hiệu giao thông."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe của bạn đã vượt qua vạch dừng giao lộ."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Tiếp tục hành trình qua ngã tư an toàn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Giảm tốc độ và đi thẳng qua ngã tư."
      }
    ]
  },
  "583": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã tư đồng cấp: Xe đạp rẽ phải đi trước. Tiếp theo xe mô tô đi thẳng đi thứ hai. Xe của bạn rẽ trái đi cuối cùng.",
    "rule": "Thứ tự hướng rẽ: Rẽ phải (Xe đạp) -> Đi thẳng (Xe mô tô) -> Rẽ trái (Xe của bạn).",
    "tip": "Phải -> Thẳng -> Trái (Xe đạp -> Xe mô tô -> Xe của bạn).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã tư đồng cấp không có biển ưu tiên."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe đạp rẽ phải -> Mô tô đi thẳng -> Xe bạn rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe đạp, xe mô tô, xe của bạn."
      }
    ]
  },
  "584": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã tư đồng cấp: Xe của bạn rẽ phải đi trước nhất. Xe con đi thẳng đi thứ hai. Xe tải rẽ trái đi cuối cùng.",
    "rule": "Thứ tự hướng rẽ tại ngã tư đồng cấp: Rẽ phải (Xe của bạn) -> Đi thẳng (Xe con) -> Rẽ trái (Xe tải).",
    "tip": "Phải -> Thẳng -> Trái (Xe của bạn -> Xe con -> Xe tải).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã tư đồng cấp không biển báo."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe bạn rẽ phải đi trước -> Xe con thẳng -> Xe tải rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe của bạn, xe con, xe tải."
      }
    ]
  },
  "585": {
    "topic": "stop_yield",
    "why": "Xe của bạn gặp biển báo tam giác viền đỏ lộn ngược 208 (Giao nhau với đường ưu tiên) nên xe của bạn phải giảm tốc độ và nhường đường cho các xe trên đường ưu tiên.",
    "rule": "Biển 208 báo hiệu giao nhau với đường ưu tiên: Buộc phương tiện phải nhường đường cho xe trên đường ưu tiên từ bất kỳ hướng nào tới.",
    "tip": "Gặp biển tam giác ngược 208 -> Xe của bạn phải nhường đường.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe của bạn có biển tam giác lộn ngược 208."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe trên đường cắt ngang đang trên đường ưu tiên."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe của bạn."
      }
    ]
  },
  "586": {
    "topic": "stop_yield",
    "why": "Xe của bạn rẽ trái tại ngã ba, xe con màu xanh rẽ phải và xe tải đi thẳng. Xe của bạn phải nhường đường cho cả hai xe đi thẳng và rẽ phải.",
    "rule": "Phương tiện rẽ trái phải nhường đường cho tất cả các xe đi thẳng và rẽ phải từ chiều ngược lại tới.",
    "tip": "Xe rẽ trái luôn phải nhường đường cho xe đi thẳng và rẽ phải.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe bạn chuẩn bị rẽ trái qua ngã ba."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con rẽ phải và xe tải đi thẳng."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe của bạn."
      }
    ]
  },
  "587": {
    "topic": "tinh_huong_an_toan",
    "why": "Phía trước có người đi bộ đang đi trên vạch sang đường dành cho người đi bộ: Bạn phải giảm tốc độ, dừng lại nhường đường cho người đi bộ qua đường an toàn trước khi tiếp tục.",
    "rule": "Người điều khiển phương tiện phải giảm tốc độ hoặc dừng lại nhường đường cho người đi bộ tại nơi có vạch kẻ đường dành cho người đi bộ.",
    "tip": "Giảm tốc độ, để người đi bộ sang đường trước.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Có vạch kẻ đường dành riêng cho người đi bộ qua đường."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Người đi bộ đang di chuyển trên vạch qua đường."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Giảm tốc độ, để người đi bộ sang đường trước, sau đó cho xe đi qua vạch người đi bộ sang đường."
      }
    ]
  },
  "588": {
    "topic": "duong_uu_tien",
    "why": "Xe của bạn nằm trên đường có biển báo số 401 'Bắt đầu đường ưu tiên', nên xe của bạn được quyền đi trước xe tải ở đường nhánh cắt ngang.",
    "rule": "Phương tiện đang di chuyển trên đường ưu tiên được quyền đi trước qua nơi giao nhau.",
    "tip": "Biển hình thoi viền vàng (401) = Đường ưu tiên -> Xe của bạn đi trước.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe của bạn có biển 401 (Đường ưu tiên)."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải ở đường nhánh có biển tam giác ngược nhường đường."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe của bạn."
      }
    ]
  },
  "589": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã tư đồng cấp: Xe tải rẽ phải (bên phải không vướng) đi trước. Xe con đi thẳng đi thứ hai. Xe của bạn rẽ trái đi cuối cùng.",
    "rule": "Quy tắc ngã tư đồng cấp: Quyền bên phải không vướng và hướng rẽ (Phải > Thẳng > Trái).",
    "tip": "Xe tải rẽ phải -> Xe con đi thẳng -> Xe của bạn rẽ trái.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã tư không có biển phân cấp ưu tiên."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải rẽ phải -> Xe con thẳng -> Xe bạn rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe tải, xe con, xe của bạn."
      }
    ]
  },
  "590": {
    "topic": "tinh_huong_an_toan",
    "why": "Trên đoạn đường hẹp quanh co xuất hiện xe tải ngược chiều: Người lái xe phải giảm tốc độ, đi sát về phần đường bên phải của mình để đảm bảo khoảng cách an toàn tránh nhau.",
    "rule": "Quy tắc tránh nhau trên đường hẹp: Giảm tốc độ và đi sát về bên phải theo chiều đi của mình.",
    "tip": "Đường hẹp gặp xe ngược chiều -> Giảm tốc độ, đi sát phần đường bên phải.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Đoạn đường hẹp quanh co."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải đi ngược chiều tới."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Giảm tốc độ cho xe đi sát phần đường bên phải."
      }
    ]
  },
  "591": {
    "topic": "ben_phai_trong",
    "why": "Xe tải đang lên dốc hoặc bên phải không vướng chướng ngại vật được đi trước xe con.",
    "rule": "Phương tiện trên đường lên dốc hoặc bên phải thông thoáng được quyền đi trước.",
    "tip": "Xe tải được đi trước.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Đoạn đường giao cắt."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe tải đi trước, xe con đi sau."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe tải."
      }
    ]
  },
  "592": {
    "topic": "tinh_huong_an_toan",
    "why": "Khi có tàu hỏa chạy qua hoặc tại nơi giao cắt đường sắt, phương tiện phải dừng cách đường ray ngoài cùng tối thiểu 5m. Xe con dừng cách 6m là đúng, xe mô tô dừng cách 3m là vi phạm khoảng cách an toàn.",
    "rule": "Quy tắc dừng xe tại nơi giao cắt đường sắt: Dừng lại cách ray ngoài cùng tối thiểu 5 mét.",
    "tip": "Cự ly tối thiểu dừng trước đường ray sắt là 5 MÉT. Xe con (6m) đúng, mô tô (3m) sai.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Khu vực giao cắt đường sắt không rào chắn."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Quy định khoảng cách an toàn đường sắt tối thiểu 5 mét."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con dừng cách 6m (> 5m) đúng; mô tô dừng cách 3m (< 5m) sai."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Xe con."
      }
    ]
  },
  "593": {
    "topic": "ben_phai_trong",
    "why": "Tại ngã tư đồng cấp: Xe của bạn rẽ phải đi trước. Tiếp theo xe tải đi thẳng đi thứ hai. Xe đạp rẽ trái đi cuối cùng.",
    "rule": "Thứ tự hướng rẽ ngã tư đồng cấp: Rẽ phải (Xe của bạn) -> Đi thẳng (Xe tải) -> Rẽ trái (Xe đạp).",
    "tip": "Phải -> Thẳng -> Trái (Xe của bạn -> Xe tải -> Xe đạp).",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã tư đồng cấp không biển báo."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe bạn rẽ phải -> Xe tải thẳng -> Xe đạp rẽ trái."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Thứ tự: Xe của bạn, xe tải, xe đạp."
      }
    ]
  },
  "594": {
    "topic": "tinh_huong_an_toan",
    "why": "Khi điều khiển xe rẽ trái tại ngã ba/ngã tư, người lái xe phải đi theo hướng 1 (vòng qua tâm ngã tư an toàn, không cắt góc ngược chiều). Hướng 2 cắt góc ngã tư là vi phạm và nguy hiểm.",
    "rule": "Quy tắc rẽ trái: Phải cho xe vòng qua tâm điểm của nút giao cắt, không được cắt chéo góc lấn làn ngược chiều.",
    "tip": "Rẽ trái an toàn theo hướng 1, không cắt góc hướng 2.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Ngã ba đường giao nhau."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Hướng 1 mở cua an toàn vòng qua tâm nút giao."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Hướng 1."
      }
    ]
  },
  "595": {
    "topic": "tinh_huong_an_toan",
    "why": "Khi gặp xe ngược chiều bật đèn pha (chiếu xa) gây chói mắt: Giữ nguyên đèn chiếu gần (đèn cốt), giảm tốc độ và bám theo xe phía trước để đảm bảo quan sát an toàn.",
    "rule": "Xử lý khi bị chói đèn pha: Giữ đèn chiếu gần, giảm tốc độ, không bật pha trả đũa gây nguy hiểm cho cả hai bên.",
    "tip": "Giữ nguyên đèn chiếu gần, giảm tốc độ, đi sau xe phía trước.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Lái xe ban đêm có xe đi ngược chiều."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe ngược chiều bật đèn pha gây lóa mắt."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Giảm tốc độ, giữ đèn cốt và quan sát vạch đường bên phải."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Giữ nguyên đèn chiếu gần, giảm tốc độ, đi sau xe phía trước."
      }
    ]
  },
  "596": {
    "topic": "tinh_huong_an_toan",
    "why": "Khi rào chắn đường sắt đang dịch chuyển đóng lại: Người lái xe phải lập tức dừng lại trước rào chắn một khoảng cách an toàn, tuyệt đối không cố vượt qua.",
    "rule": "Khi đèn đỏ nhấp nháy, chuông reo hoặc rào chắn đang dịch chuyển, tất cả phương tiện phải dừng lại trước vạch dừng hoặc rào chắn an toàn.",
    "tip": "Rào chắn đang chuyển dịch -> Dừng lại trước rào chắn một khoảng cách an toàn.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Tín hiệu đèn chuông và rào chắn đường sắt hoạt động."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Đoàn tàu sắt chuẩn bị chạy qua."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Rào chắn đang dịch chuyển đóng lối đi."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Dừng lại chờ rào chắn mở hoàn toàn."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Dừng lại trước rào chắn một khoảng cách an toàn."
      }
    ]
  },
  "597": {
    "topic": "tinh_huong_an_toan",
    "why": "Xe con màu đỏ nhập làn cao tốc bằng cách cắt ngang vạch xương cá và vạch liền là hoàn toàn sai quy tắc. Xe phải đi hết làn tăng tốc đạt tốc độ phù hợp mới được chuyển làn.",
    "rule": "Quy tắc vào đường cao tốc: Phải có tín hiệu xin vào và phải nhường đường cho xe đang chạy trên đường cao tốc; chỉ vào đường cao tốc ở nơi có làn tăng tốc, phải cho xe chạy trên làn tăng tốc trước khi nhập làn.",
    "tip": "Cắt ngang vạch xương cá nhập làn ngay lập tức = SAI.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Lối vào đường cao tốc."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch xương cá (vạch chỉ hướng cấm đè) và làn tăng tốc."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con màu đỏ đè vạch xương cá cắt thẳng vào làn cao tốc là sai."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Sai."
      }
    ]
  },
  "598": {
    "topic": "vuot_xe",
    "why": "Phía trước xe con màu xanh đang thực hiện vượt xe tải: Xe con màu đỏ phía sau không được phép vượt cùng lúc (cấm vượt xe khi xe phía trước cũng đang vượt xe khác).",
    "rule": "Luật Giao thông đường bộ nghiêm cấm hành vi vượt xe khi xe phía trước đang có tín hiệu hoặc đang vượt xe khác.",
    "tip": "Xe trước đang vượt -> Xe sau TUYỆT ĐỐI KHÔNG ĐƯỢC VƯỢT.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Đường ngoài đô thị."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe con màu xanh đang chiếm làn vượt xe tải."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Khoảng trống và tầm nhìn không đủ an toàn cho xe thứ hai vượt."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Không được vượt."
      }
    ]
  },
  "599": {
    "topic": "vuot_xe",
    "why": "Vạch kẻ tim đường phía làn của xe con màu vàng là vạch nét đứt, làn đường ngược chiều thông thoáng và xe đỏ phía trước không xin vượt hay có chướng ngại vật: Xe con màu vàng vượt là đúng quy tắc.",
    "rule": "Vạch nét đứt bên làn của mình cho phép mượn làn vượt xe khi đảm bảo điều kiện an toàn.",
    "tip": "Vạch nét đứt phía xe của mình -> Vượt đúng quy tắc.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Không có đèn tín hiệu."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Vạch đôi: một bên nét đứt (bên xe vàng), một bên nét liền (bên ngược chiều)."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Xe con màu vàng được phép đè vạch nét đứt để vượt."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Đúng."
      }
    ]
  },
  "600": {
    "topic": "tinh_huong_an_toan",
    "why": "Xe đầu kéo container có chiều dài lớn và thân xe chiếm nhiều diện tích khi rẽ, tạo ra vùng điểm mù rất lớn phía sau và bên phải: Xe con màu xanh và xe máy phía sau phải giảm tốc độ chờ xe container rẽ xong rồi mới tiếp tục đi.",
    "rule": "Quy tắc an toàn gần xe siêu trường siêu trọng: Giữ khoảng cách lớn, không đi vào điểm mù hoặc chen lấn khi xe dài đang chuyển hướng rẽ.",
    "tip": "Xe container rẽ phải tạo điểm mù lớn -> Giảm tốc độ chờ container rẽ xong.",
    "steps": [
      {
        "title": "Bước 1: Hiệu lệnh & Đèn",
        "content": "Nơi đường giao nhau."
      },
      {
        "title": "Bước 2: Xe ưu tiên",
        "content": "Không có xe ưu tiên."
      },
      {
        "title": "Bước 3: Biển báo & Đường ưu tiên",
        "content": "Xe đầu kéo kéo rơ moóc đang bật xi nhan rẽ phải."
      },
      {
        "title": "Bước 4: Bên phải & Hướng rẽ",
        "content": "Nguy cơ bị đuôi rơ moóc ép chèn khi ôm cua."
      },
      {
        "title": "Bước 5: Quyết định",
        "content": "Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi."
      }
    ]
  }
};

  // Quy tắc chuẩn 5 bước phân tích sa hình
  window.TRAINER_FRAMEWORK = [
    {
      step: 1,
      title: "Hiệu lệnh & Đèn tín hiệu",
      icon: "👮",
      rule: "Hiệu lệnh CSGT cao nhất (cao hơn đèn và biển báo). Đèn đỏ dừng, đèn xanh đi, đèn vàng dừng trước vạch.",
      checklist: ["Có Cảnh sát giao thông điều khiển không?", "Tín hiệu đèn giao thông màu gì? Có đèn phụ mũi tên không?"]
    },
    {
      step: 2,
      title: "Xe ưu tiên (Hỏa - Sự - Công - Thương)",
      icon: "🚑",
      rule: "Xe đã vào giao lộ ('nhất chớm') đi trước xe ưu tiên. Thứ tự xe ưu tiên: Chữa cháy > Quân sự > Công an > Cứu thương.",
      checklist: ["Có xe nào đã qua vạch dừng lọt vào tâm ngã tư trước không?", "Có xe ưu tiên (Cứu hỏa, Quân sự, Công an, Cứu thương) không?"]
    },
    {
      step: 3,
      title: "Biển báo & Đường ưu tiên",
      icon: "🔷",
      rule: "Xe trên đường ưu tiên (biển 401, 207) được đi trước. Xe gặp biển STOP hoặc Tam giác ngược (biển 208) phải nhường đường.",
      checklist: ["Xe nào đang trên đường ưu tiên?", "Xe nào gặp biển STOP hoặc Tam giác lộn ngược phải nhường đường?"]
    },
    {
      step: 4,
      title: "Quyền bên phải & Hướng rẽ",
      icon: "➡️",
      rule: "Tại giao lộ đồng cấp: Xe nào có bên phải trống được đi trước. Vòng xuyến nhường bên trái. Thứ tự hướng rẽ: Phải > Thẳng > Trái.",
      checklist: ["Tại ngã tư đồng cấp: Bên phải xe nào không vướng (trống)?", "Xét hướng rẽ: Rẽ phải > Đi thẳng > Rẽ trái > Quay đầu."]
    },
    {
      step: 5,
      title: "Quyết định thứ tự các xe",
      icon: "🏁",
      rule: "Tổng hợp từ bước 1 đến bước 4 để chọn thứ tự chính xác nhất.",
      checklist: ["Đối chiếu các đáp án trắc nghiệm với thứ tự vừa phân tích."]
    }
  ];

  // Helper lấy thông tin giải thích cho câu hỏi bất kỳ
  window.getQuestionExplanation = function(q) {
    if (!q) return null;
    const r = window.QUESTION_RULES[q.id];
    if (r) return r;

    // Fallback thông minh cho các chương khác
    let topicName = "Quy tắc chung";
    let ruleText = "Căn cứ Luật Trật tự, an toàn giao thông đường bộ và tài liệu 600 câu hỏi Cục CSGT 2025.";
    let tipText = "Đọc kỹ câu hỏi, chú ý các từ khóa 'bị nghiêm cấm', 'giảm tốc độ', 'nhường đường'.";
    if (q.chapter === 5) {
      topicName = "Biển báo hiệu";
      ruleText = "Quy chuẩn kỹ thuật quốc gia về báo hiệu đường bộ (QCVN 41).";
      tipText = "Biển tròn đỏ = CẤM; Biển tam giác vàng = NGUY HIỂM; Biển tròn xanh = HIỆU LỆNH; Biển chữ nhật xanh = CHỈ DẪN.";
    } else if (q.chapter === 2) {
      topicName = "Đạo đức & Văn hóa";
      ruleText = "Quy tắc ứng xử văn hóa, đạo đức người lái xe và kỹ năng cứu hộ PCCC.";
    } else if (q.chapter === 3) {
      topicName = "Kỹ thuật lái xe";
      ruleText = "Kỹ thuật điều khiển phương tiện an toàn trong các điều kiện thực tế.";
    } else if (q.chapter === 4) {
      topicName = "Cấu tạo & Sửa chữa";
      ruleText = "Kiến thức cơ bản về kết cấu và bảo dưỡng kỹ thuật ô tô.";
    }

    return {
      topic: "general",
      topicName: topicName,
      why: `Đáp án đúng là "${q.options[q.answer]}". Lựa chọn này tuân thủ đầy đủ quy định về an toàn kỹ thuật và trật tự an toàn giao thông đường bộ.`,
      rule: ruleText,
      tip: tipText,
      steps: null
    };
  };
})();
