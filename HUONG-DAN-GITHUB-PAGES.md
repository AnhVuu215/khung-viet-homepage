# Đưa Khung Việt lên GitHub Pages

## 1. Chuẩn bị repository

1. Đăng nhập GitHub và chọn **New repository**.
2. Đặt tên repository: `khung-viet-homepage`.
3. Chọn **Public**.
4. Không chọn tạo README, `.gitignore` hoặc license trên GitHub.
5. Nhấn **Create repository**.

## 2. Push code bằng PowerShell

Giải nén `khung-viet-homepage.zip`, mở thư mục vừa giải nén trong File Explorer, bấm chuột phải và chọn **Open in Terminal**. Sau đó chạy lần lượt:

```powershell
git init
git add .
git commit -m "Hoan thien homepage Khung Viet"
git branch -M main
git remote add origin https://github.com/TEN_GITHUB_CUA_BAN/khung-viet-homepage.git
git push -u origin main
```

Thay `TEN_GITHUB_CUA_BAN` bằng username GitHub thật.

Nếu Git yêu cầu tên và email trước khi commit:

```powershell
git config --global user.name "Ten cua ban"
git config --global user.email "email-dang-ky-github@example.com"
```

Sau đó chạy lại lệnh `git commit` và các lệnh còn lại.

## 3. Bật website công khai

1. Mở repository vừa push trên GitHub.
2. Vào **Settings** → **Pages**.
3. Tại **Build and deployment**, chọn **Deploy from a branch**.
4. Chọn nhánh **main**, thư mục **/(root)**.
5. Nhấn **Save** và đợi khoảng 1–3 phút.

Website sẽ có địa chỉ:

```text
https://TEN_GITHUB_CUA_BAN.github.io/khung-viet-homepage/
```

## 4. Cập nhật website sau này

Sau mỗi lần chỉnh sửa, mở Terminal trong thư mục website và chạy:

```powershell
git add .
git commit -m "Cap nhat homepage"
git push
```

GitHub Pages sẽ tự cập nhật website sau ít phút.

## Lưu ý

- Không đổi cấu trúc thư mục `assets`.
- File `index.html` phải nằm ở thư mục gốc repository.
- Website là bản tĩnh; biểu mẫu tạo thẻ hoạt động ngay trên trình duyệt và không gửi dữ liệu tới máy chủ.
- Font Google cần kết nối Internet. Nếu trình chiếu ngoại tuyến, trình duyệt sẽ dùng font dự phòng có sẵn.
