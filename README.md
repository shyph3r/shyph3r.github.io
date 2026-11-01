# Khang Vo — Personal Portfolio

Portfolio tiếng Anh của Khang Vo, sinh viên Computer Science / Cybersecurity tại Arizona State University. Website tĩnh dùng HTML, CSS và JavaScript, không cần cài thư viện hoặc build.

## Xem website

Mở `index.html` trong trình duyệt hoặc dùng Live Server của VS Code. Chức năng sao chép email hoạt động trên HTTPS/localhost; nếu trình duyệt không cho phép, trang hướng dẫn sao chép trực tiếp.

## Nội dung

- Giới thiệu, học vấn tại ASU và VNU-HCM University of Technology.
- Dự án nổi bật Security & Attack Homelab, cùng Derich Robots và Mobile App Projects.
- pwn.college Orange Belt, kinh nghiệm gia sư toán, thành tích CTF và lập trình, Imagine Cup Junior.
- Kỹ năng, liên hệ và tải `Khang_Vo_Resume.pdf`.

Thông tin và liên kết được chuyển từ resume người dùng cung cấp. Hình robotics/mobile là minh họa bằng CSS, được ghi rõ trên giao diện; không phải ảnh chụp sản phẩm thực tế. Sơ đồ homelab thể hiện kiến trúc mô tả trong resume. Chỉ số trên 90% của homelab là mức độ khớp kết quả kiểm thử với cảnh báo Wazuh trong lab, không phải tỷ lệ phát hiện tổng quát.

Resume dùng chung một liên kết Google Drive cho Homelab và Derich Robots; website giữ nguyên hai liên kết đó. Chưa có GitHub/LinkedIn cá nhân trong resume nên không thêm liên kết phỏng đoán. Quyền truy cập các thư mục Drive chưa được kiểm tra.

## Chỉnh sửa

- `index.html`: nội dung hiển thị, email, điện thoại, các liên kết và metadata.
- `script.js`: nội dung chi tiết của ba dự án trong `projectDetails`, menu và sao chép email.
- `styles.css`: giao diện; bảng màu nằm trong `:root`.
- `favicon.svg`: biểu tượng chữ k.
- `Khang_Vo_Resume.pdf`: bản resume gốc để tải xuống; thay file cùng tên khi cập nhật.

Font Be Vietnam Pro tải từ Google Fonts, có Arial/sans-serif dự phòng. Không có backend hay analytics.

## Deploy GitHub Pages

1. Tạo repository, ví dụ `portfolio`.
2. Upload `index.html`, `styles.css`, `script.js`, `favicon.svg`, `Khang_Vo_Resume.pdf`, `.nojekyll`, `.gitignore` và `README.md` vào thư mục gốc nhánh `main`.
3. Trong GitHub **Settings → Pages → Build and deployment**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, rồi **Save**.
4. Xem URL GitHub trả về sau khi deployment hoàn tất. Các đường dẫn tài nguyên tương đối hỗ trợ repository Pages.

Nếu dùng Git và thư mục chưa có Git/remote:

```sh
git init
git add index.html styles.css script.js favicon.svg Khang_Vo_Resume.pdf .nojekyll .gitignore README.md
git commit -m "Build Khang Vo cybersecurity portfolio"
git branch -M main
git remote add origin https://github.com/<username>/portfolio.git
git push -u origin main
```

Thay `<username>` bằng tài khoản thật. `test.py` không cần đưa lên website.

## Kiểm tra trước khi gửi nhà tuyển dụng

Kiểm tra website trên máy tính và điện thoại, tải resume, mở chi tiết cả ba dự án và thử các liên kết Drive trong cửa sổ ẩn danh để xác nhận nhà tuyển dụng có quyền xem. Có thể thêm GitHub/LinkedIn và ảnh sản phẩm thật khi có.
