# Khung Việt — bản desktop

Mở `index.html` trực tiếp; không cần cài thư viện hoặc chạy backend. Google Fonts cần mạng, khi ngoại tuyến trang dùng font hệ thống dự phòng.

## Tương tác

- Slideshow bảy điểm đến, tự chuyển sau 8,5 giây; card/thumbnail mở rộng thành nền trong 1,1 giây, kèm máy bay.
- Nút trước/sau, thumbnail, phím mũi tên khi focus trong hero và nút tạm dừng. Tự dừng khi hero ra khỏi màn hình, trang bị ẩn hoặc mở gallery.
- Ba chương kể chuyện đổi ảnh theo vị trí cuộn; bộ sưu tập bảy ảnh mở gallery bằng chuột hoặc bàn phím.
- Form thẻ hành trình kiểm tra dữ liệu và tải bản TXT. Chỉ là wishlist cục bộ, không gửi dữ liệu, không xác nhận đặt tour.
- Tôn trọng tùy chọn giảm chuyển động của hệ điều hành.

## Giới hạn dữ liệu

Ảnh hiện tại là ảnh tĩnh, có chuyển cảnh và pan/zoom toàn ảnh. Chưa có chuyển động thực của lá cờ, mây hoặc nước bên trong ảnh. Cần video MP4/WebM phù hợp để bổ sung cinemagraph. GIF tham khảo chỉ dùng để nghiên cứu chuyển cảnh, không nhúng vào trang.

## Kiểm tra

Từ thư mục workspace: `node work/verify-vivu.cjs` và `node --check outputs/vivu-viet/script.js`.
Kiểm tra mô phỏng logic không thay thế kiểm tra trực quan trong trình duyệt.
