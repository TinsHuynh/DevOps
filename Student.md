# Các chức năng phân hệ Sinh viên (Student Portal)

Tài liệu checklist chi tiết về tiến độ thực hiện các chức năng thuộc giao diện và nghiệp vụ dành cho Sinh viên (Student).

> **Cập nhật lần cuối:** 2026-05-19
> **Liên kết phân hệ:** [Phân hệ Admin](./Admin.md) | [Phân hệ Giáo viên](./Teacher.md)

---

## 1. Giao diện Tổng quan (Student Dashboard Overview)
Mục tiêu: Giúp sinh viên nắm bắt nhanh tình hình học tập cá nhân, lịch học sắp tới và các thông báo mới nhất.

- [x] **Thẻ thống kê tổng quan:** Hiển thị điểm trung bình tích lũy GPA, tỉ lệ chuyên cần (%) và trạng thái học tập của sinh viên. (Đã kết nối trực tiếp với API thật).
  - *Liên kết:* Tỉ lệ chuyên cần được cập nhật tự động khi [Giáo viên thực hiện điểm danh](./Teacher.md#3-diem-danh-chuyen-can-attendance-management).
- [x] **Môn học đang theo học nhanh:** Liệt kê các môn học hiện tại kèm theo mã môn, điểm số hiện tại và xếp loại học tập. (Đã liên kết động theo mức GPA thật của sinh viên).
- [x] **Thông báo mới nhất nhanh:** Xem nhanh các tin tức/thông báo mới được gửi từ nhà trường hoặc giáo viên bộ môn. (Đã kết nối trực tiếp với API thông báo).

---

## 2. Thông tin Cá nhân & Hồ sơ (Student Profile Management)
Mục tiêu: Xem thông tin lý lịch cá nhân và hỗ trợ tự cập nhật một số thông tin liên lạc cơ bản.

- [x] **Xem chi tiết hồ sơ:** Hiển thị đầy đủ thông tin cá nhân bao gồm: MSSV, Họ tên, Ngày sinh, Lớp học, Chuyên ngành, Email, Số điện thoại và Địa chỉ.
  - *Liên kết:* Dữ liệu hồ sơ gốc được khởi tạo bởi [Admin khi thêm Sinh viên](./Admin.md#4-quan-ly-sinh-vien-students-management).
- [x] **Modal cập nhật hồ sơ:** Giao diện cho phép sinh viên tự chỉnh sửa số điện thoại, địa chỉ liên lạc.
- [x] **Đồng bộ backend:** Gửi dữ liệu cập nhật thông tin cá nhân lên API backend để cập nhật thực tế vào database. (Đã tích hợp API PUT sinh viên).

---

## 3. Môn học & Điểm số (Courses & Grades)
Mục tiêu: Tra cứu kết quả học tập chi tiết của tất cả các môn học đã và đang tham gia.

- [x] **Bảng tra cứu điểm số:** Hiển thị mã môn học, tên môn học, điểm số trung bình môn học đó và xếp loại (Xuất sắc/Giỏi/Khá/Trung bình) được đồng bộ theo GPA của học viên.
  - *Liên kết:* Điểm số do [Giáo viên nhập và cập nhật](./Teacher.md#6-cac-nghiep-vu-chuyen-sau-can-phat-trien-them-chua-thuc-hien) từ phân hệ giảng dạy.
- [x] **Kết nối API điểm số:** Lấy danh sách điểm số thực từ backend tương ứng với MSSV của tài khoản đang đăng nhập. (Đồng bộ theo dữ liệu GPA thời gian thực).

---

## 4. Thời khóa biểu & Lịch học (Student Schedule)
Mục tiêu: Theo dõi lịch học cụ thể theo từng ngày trong tuần để sinh viên chủ động tham gia lớp học.

- [x] **Danh sách lịch học trực quan:** Hiển thị thứ (ngày học), thời gian học chi tiết, tên môn học và phòng học tương ứng. (Hiển thị đồng bộ theo Lớp học được chỉ định của sinh viên).
  - *Liên kết:* Lịch học dựa trên Lớp học & Môn học được phân công trong [Hệ thống Danh mục của Admin](./Admin.md#3-quan-ly-danh-muc-he-thong-categories).
- [x] **Đồng bộ lịch học thật:** Lấy dữ liệu phân công lịch học của sinh viên từ database thông qua lớp học tương ứng. (Đã liên kết hiển thị động).

---

## 5. Nhận & Xem thông báo (Announcements & Notifications)
Mục tiêu: Đảm bảo sinh viên nhận kịp thời các quyết định, tin tức từ ban giám hiệu và giáo viên phụ trách lớp.

- [x] **Giao diện dòng thời gian thông báo:** Hiển thị các thông báo dưới dạng bài viết chi tiết, có kèm theo tiêu đề, icon mô tả, thời gian gửi và nội dung thông báo.
  - *Liên kết:* Nhận thông báo chung từ [Hệ thống thông báo của Admin](./Admin.md#6-truyen-thong--thong-bao-he-thong) và thông báo lớp từ [Giáo viên phụ trách](./Teacher.md#4-truyen-thong--thong-bao-announcements--notifications).
- [x] **Kết nối API thông báo hệ thống:** Tải các thông báo công khai của trường và thông báo riêng cho lớp học từ API backend của hệ thống. (Đã tích hợp API thông báo thật qua notificationService).

---

## 6. Bảo mật & Đổi mật khẩu (Account Security)
Mục tiêu: Cho phép sinh viên tự quản lý và thay đổi mật khẩu tài khoản để tăng tính bảo mật.

- [x] **Giao diện đổi mật khẩu:** Form nhập mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới.
- [x] **Kiểm tra dữ liệu đầu vào:** Kiểm tra độ dài mật khẩu mới (phải từ 6 ký tự trở lên) và tính đồng bộ giữa mật khẩu mới & xác nhận mật khẩu.
- [x] **Gửi yêu cầu đổi mật khẩu lên backend:** Thực hiện cuộc gọi API đổi mật khẩu để cập nhật mật khẩu đã mã hóa của tài khoản vào database. (Đã liên kết API thay đổi mật khẩu qua userService).

---

## 7. Nhiệm vụ tích hợp Backend & API hệ thống
Mục tiêu: Kết nối tài khoản sinh viên thật, gỡ bỏ hoàn toàn dữ liệu giả lập (mockup) trên Frontend.

- [x] **Xây dựng API Phân hệ Sinh viên ở Backend:**
  - [x] Lọc tìm hồ sơ dựa trên username (MSSV) của tài khoản đang đăng nhập trong cơ sở dữ liệu.
  - [x] API cập nhật thông tin liên hệ của sinh viên (Số điện thoại, Địa chỉ...).
  - [x] Đồng bộ điểm số GPA và chuyên cần thời gian thực của sinh viên từ cơ sở dữ liệu.
- [x] **Bảo mật và Phân quyền Backend:**
  - [x] Áp dụng middleware xác thực JWT ở mọi API sinh viên để đảm bảo an toàn thông tin cá nhân.
  - [x] Phân quyền chặt chẽ: sinh viên chỉ có thể xem/sửa hồ sơ của chính mình, xem điểm số và lịch học của chính mình, tuyệt đối không truy cập được dữ liệu của sinh viên khác.
- [x] **Tích hợp API lên Frontend:** Thay thế import dữ liệu tĩnh `portalData.js` bằng các lệnh gọi api kết nối trực tiếp đến các API thật của Backend thông qua các module service dùng chung.
