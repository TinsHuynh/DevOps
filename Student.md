# Các chức năng phân hệ Sinh viên (Student Portal)

Tài liệu checklist chi tiết về tiến độ thực hiện các chức năng thuộc giao diện và nghiệp vụ dành cho Sinh viên (Student).

> **Cập nhật lần cuối:** 2026-05-19
> **Liên kết phân hệ:** [Phân hệ Admin](./Admin.md) | [Phân hệ Giáo viên](./Teacher.md)

---

## 1. Giao diện Tổng quan (Student Dashboard Overview)
Mục tiêu: Giúp sinh viên nắm bắt nhanh tình hình học tập cá nhân, lịch học sắp tới và các thông báo mới nhất.

- [~] **Thẻ thống kê tổng quan:** Hiển thị điểm trung bình tích lũy GPA, tỉ lệ chuyên cần (%) và trạng thái học tập của sinh viên. (Đang dùng dữ liệu mẫu `portalData.js`).
  - *Liên kết:* Tỉ lệ chuyên cần được cập nhật tự động khi [Giáo viên thực hiện điểm danh](./Teacher.md#3-diem-danh-chuyen-can-attendance-management).
- [~] **Môn học đang theo học nhanh:** Liệt kê các môn học hiện tại kèm theo mã môn, điểm số hiện tại và xếp loại học tập. (Đang dùng dữ liệu mẫu).
- [~] **Thông báo mới nhất nhanh:** Xem nhanh các tin tức/thông báo mới được gửi từ nhà trường hoặc giáo viên bộ môn. (Đang dùng dữ liệu mẫu).

---

## 2. Thông tin Cá nhân & Hồ sơ (Student Profile Management)
Mục tiêu: Xem thông tin lý lịch cá nhân và hỗ trợ tự cập nhật một số thông tin liên lạc cơ bản.

- [x] **Xem chi tiết hồ sơ:** Hiển thị đầy đủ thông tin cá nhân bao gồm: MSSV, Họ tên, Ngày sinh, Lớp học, Chuyên ngành, Email, Số điện thoại và Địa chỉ.
  - *Liên kết:* Dữ liệu hồ sơ gốc được khởi tạo bởi [Admin khi thêm Sinh viên](./Admin.md#4-quan-ly-sinh-vien-students-management).
- [x] **Modal cập nhật hồ sơ:** Giao diện cho phép sinh viên tự chỉnh sửa họ tên, số điện thoại, địa chỉ, lớp và ngành học.
- [ ] **Đồng bộ backend:** Gửi dữ liệu cập nhật thông tin cá nhân lên API backend để cập nhật thực tế vào database. (Hiện tại mới chỉ cập nhật local React state).

---

## 3. Môn học & Điểm số (Courses & Grades)
Mục tiêu: Tra cứu kết quả học tập chi tiết của tất cả các môn học đã và đang tham gia.

- [~] **Bảng tra cứu điểm số:** Hiển thị mã môn học, tên môn học, điểm số trung bình môn học đó và xếp loại (Xuất sắc/Giỏi/Khá/Trung bình). (Đang dùng dữ liệu mẫu).
  - *Liên kết:* Điểm số do [Giáo viên nhập và cập nhật](./Teacher.md#6-cac-nghiep-vu-chuyen-sau-can-phat-trien-them-chua-thuc-hien) từ phân hệ giảng dạy.
- [ ] **Kết nối API điểm số:** Lấy danh sách điểm số thực từ backend tương ứng với MSSV của tài khoản đang đăng nhập. (Chưa kết nối API).

---

## 4. Thời khóa biểu & Lịch học (Student Schedule)
Mục tiêu: Theo dõi lịch học cụ thể theo từng ngày trong tuần để sinh viên chủ động tham gia lớp học.

- [~] **Danh sách lịch học trực quan:** Hiển thị thứ (ngày học), thời gian học chi tiết, tên môn học và phòng học tương ứng. (Đang dùng dữ liệu mẫu).
  - *Liên kết:* Lịch học dựa trên Lớp học & Môn học được phân công trong [Hệ thống Danh mục của Admin](./Admin.md#3-quan-ly-danh-muc-he-thong-categories).
- [ ] **Đồng bộ lịch học thật:** Lấy dữ liệu phân công lịch học của sinh viên từ database thông qua lớp học tương ứng. (Chưa kết nối API).

---

## 5. Nhận & Xem thông báo (Announcements & Notifications)
Mục tiêu: Đảm bảo sinh viên nhận kịp thời các quyết định, tin tức từ ban giám hiệu và giáo viên phụ trách lớp.

- [~] **Giao diện dòng thời gian thông báo:** Hiển thị các thông báo dưới dạng bài viết chi tiết, có kèm theo tiêu đề, icon mô tả, thời gian gửi và nội dung thông báo. (Đang dùng dữ liệu mẫu).
  - *Liên kết:* Nhận thông báo chung từ [Hệ thống thông báo của Admin](./Admin.md#6-truyen-thong--thong-bao-he-thong) và thông báo lớp từ [Giáo viên phụ trách](./Teacher.md#4-truyen-thong--thong-bao-announcements--notifications).
- [ ] **Kết nối API thông báo hệ thống:** Tải các thông báo công khai của trường và thông báo riêng cho lớp học từ API backend của hệ thống. (Chưa kết nối API).

---

## 6. Bảo mật & Đổi mật khẩu (Account Security)
Mục tiêu: Cho phép sinh viên tự quản lý và thay đổi mật khẩu tài khoản để tăng tính bảo mật.

- [x] **Giao diện đổi mật khẩu:** Form nhập mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới.
- [x] **Kiểm tra dữ liệu đầu vào:** Kiểm tra độ dài mật khẩu mới (phải từ 6 ký tự trở lên) và tính đồng bộ giữa mật khẩu mới & xác nhận mật khẩu.
- [ ] **Gửi yêu cầu đổi mật khẩu lên backend:** Thực hiện cuộc gọi API đổi mật khẩu để cập nhật mật khẩu đã mã hóa của tài khoản vào database. (Hiện tại mới chỉ hiển thị toast thông báo giả lập thành công).

---

## 7. Nhiệm vụ tích hợp Backend & API hệ thống
Mục tiêu: Kết nối tài khoản sinh viên thật, gỡ bỏ hoàn toàn dữ liệu giả lập (mockup) trên Frontend.

- [ ] **Xây dựng API Phân hệ Sinh viên ở Backend:**
  - [ ] `GET /api/students/profile`: Lấy thông tin chi tiết của sinh viên đang đăng nhập dựa trên JWT token.
  - [ ] `PUT /api/students/profile`: API cập nhật thông tin liên hệ của sinh viên (Số điện thoại, Địa chỉ...).
  - [ ] `GET /api/students/courses`: Lấy danh sách môn học kèm điểm số của sinh viên hiện tại.
  - [ ] `GET /api/students/schedule`: Lấy lịch học theo tuần của lớp mà sinh viên đang tham gia.
  - [ ] `GET /api/students/announcements`: Lấy danh sách thông báo chung của hệ thống và thông báo riêng của lớp học sinh viên đó.
- [ ] **Bảo mật và Phân quyền Backend:**
  - [ ] Áp dụng middleware xác thực JWT ở mọi API sinh viên để đảm bảo an toàn thông tin cá nhân.
  - [ ] Phân quyền chặt chẽ: sinh viên chỉ có thể xem/sửa hồ sơ của chính mình, xem điểm số và lịch học của chính mình, tuyệt đối không truy cập được dữ liệu của sinh viên khác.
- [ ] **Tích hợp API lên Frontend:** Thay thế import dữ liệu tĩnh `portalData.js` bằng các lệnh gọi `axios` kết nối trực tiếp đến các API thật của Backend.
