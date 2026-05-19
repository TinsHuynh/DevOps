# Các chức năng phân hệ Giáo viên (Teacher Portal)

Tài liệu checklist chi tiết về tiến độ thực hiện các chức năng thuộc giao diện và nghiệp vụ dành cho Giáo viên (Teacher).

> **Cập nhật lần cuối:** 2026-05-19
> **Liên kết phân hệ:** [Phân hệ Admin](./Admin.md) | [Phân hệ Sinh viên](./Student.md)

---

## 1. Giao diện Tổng quan (Teacher Dashboard Overview)
Mục tiêu: Cung cấp cái nhìn toàn cảnh về các lớp đang phụ trách, sĩ số, chuyên cần và các đầu việc cần giải quyết.

- [x] **Thẻ thống kê tổng quan:** Hiển thị số lượng lớp học phụ trách, tổng số học sinh theo dõi, tỉ lệ chuyên cần trung bình. (Đã đồng bộ hóa động từ backend qua dữ liệu nhập của Admin).
- [x] **Danh sách Lớp & Môn phụ trách nhanh:** Xem nhanh các lớp đang dạy, môn học tương ứng, sĩ số lớp và buổi học tiếp theo. (Tự động nhóm và phân tích từ dữ liệu học sinh thật).
  - *Liên kết:* Lấy dữ liệu lớp học được phân công bởi [Admin](./Admin.md#3-quan-ly-danh-muc-he-thong-categories).
- [~] **Nhiệm vụ cần làm nhanh:** Liệt kê các nhiệm vụ giảng dạy cần thực hiện ngay trong ngày. (Đang dùng dữ liệu mẫu).

---

## 2. Quản lý Lớp học & Học sinh (Classes & Students Management)
Mục tiêu: Giúp giáo viên quản lý chi tiết thông tin các lớp được phân công và hồ sơ học tập của học sinh trong lớp.

- [x] **Xem danh sách lớp phụ trách:** Xem chi tiết thông tin từng lớp (Tên lớp, môn học, sĩ số, chuyên cần, lịch học). (Đồng bộ hóa động từ backend).
- [x] **Xem danh sách học sinh theo lớp:** Bảng hiển thị thông tin học sinh (MSSV, Họ tên, Lớp học, Điểm số trung bình, trạng thái điểm danh buổi gần nhất). (Đồng bộ hóa động từ backend).
  - *Liên kết:* Dữ liệu học sinh được đồng bộ từ danh sách do [Admin](./Admin.md#4-quan-ly-sinh-vien-students-management) quản lý.

---

## 3. Điểm danh Chuyên cần (Attendance Management)
Mục tiêu: Ghi nhận tình trạng hiện diện (Có mặt/Vắng) của học sinh trong mỗi buổi học một cách thuận tiện.

- [x] **Giao diện điểm danh:** Bảng danh sách học sinh tích hợp nút bấm chuyển đổi nhanh trạng thái "Có mặt" / "Vắng" của từng học sinh (Đã đồng bộ danh sách học sinh thật).
- [x] **Thông báo lưu kết quả:** Hiển thị toast và banner thông báo khi bấm lưu kết quả điểm danh thành công trên giao diện.
- [x] **Đồng bộ backend:** Gửi dữ liệu điểm danh thực tế lên database thật của hệ thống. (Đã kết nối qua API `/api/students/:id` để cập nhật `attendanceRate`).
  - *Liên kết:* Dữ liệu điểm danh sau khi đồng bộ backend sẽ trực tiếp cập nhật vào phần chuyên cần trên [Giao diện Sinh viên](./Student.md#1-giao-dien-tong-quan-student-dashboard-overview).

---

## 4. Truyền thông & Thông báo (Announcements & Notifications)
Mục tiêu: Cho phép giáo viên gửi các thông báo quan trọng đến toàn thể học sinh trong lớp phụ trách.

- [x] **Modal tạo thông báo mới:** Giao diện soạn thảo nội dung thông báo cho lớp học, có kiểm tra dữ liệu đầu vào (không được để trống).
- [x] **Xem lịch sử thông báo đã gửi:** Hiển thị danh sách các thông báo đã gửi dưới dạng dòng thời gian (timeline).
- [x] **Lưu xuống database:** Kết nối API gửi thông báo để lưu trữ vào backend, giúp học sinh khi đăng nhập có thể thấy được thông báo này. (Đã kết nối hoàn chỉnh với `/api/notifications`).
  - *Liên kết:* Tin nhắn sẽ hiển thị trong trang [Thông báo Sinh viên](./Student.md#5-nhan--xem-thong-bao-announcements--notifications) của lớp đó.

---

## 5. Danh sách Nhiệm vụ giảng dạy (Tasks Checklist)
Mục tiêu: Giúp giáo viên quản lý các đầu việc cá nhân, đánh dấu hoàn thành trực quan.

- [x] **Xem danh sách nhiệm vụ:** Liệt kê các nhiệm vụ cần thực hiện (Ví dụ: Chấm điểm bài kiểm tra, soạn giáo án mới, điểm danh lớp học...).
- [x] **Đổi trạng thái hoàn thành:** Tích chọn trực tiếp vào ô nhiệm vụ để gạch ngang đánh dấu hoàn thành, đổi màu nền trực quan.

---

## 6. Các nghiệp vụ chuyên sâu cần phát triển thêm (Đã hoàn thành đồng bộ)
Mục tiêu: Hoàn thiện quy trình giảng dạy và đánh giá học lực của học sinh.

- [x] **Nhập và cập nhật điểm số:** Chức năng cho phép giáo viên nhập điểm (chuyên cần, giữa kỳ, cuối kỳ) cho học sinh theo lớp/môn học cụ thể. (Đã kết nối qua API `/api/students/:id` để lưu điểm GPA trực tiếp lên backend).
  - *Liên kết:* Điểm số sau khi cập nhật sẽ hiển thị trên bảng [Điểm số Sinh viên](./Student.md#3-mon-hoc--diem-so-courses--grades).
- [ ] **Quản lý lịch học/Lịch giảng dạy:** Cho phép giáo viên xem chi tiết lịch dạy theo tuần/tháng được phân công từ Admin.

---

## 7. Nhiệm vụ tích hợp Backend & API hệ thống
Mục tiêu: Gỡ bỏ hoàn toàn dữ liệu mẫu (mockup) trên Frontend và đồng bộ hóa quy trình với Database thật.

- [x] **Xây dựng API Phân hệ Giáo viên:**
  - [x] Lấy danh sách lớp được phân công tự động dựa trên lớp của sinh viên thực tế trong hệ thống.
  - [x] Lấy danh sách học sinh thuộc một lớp học cụ thể để xem điểm và điểm danh.
  - [x] Ghi nhận kết quả điểm danh chuyên cần của một lớp học và cập nhật tỉ lệ chuyên cần (`attendanceRate`) cho sinh viên.
  - [x] Gửi thông báo đến lớp học kết nối trực tiếp với bảng `Notification` backend.
  - [x] Cập nhật điểm số học lực GPA của học sinh trực tiếp qua API.
- [ ] **Bảo mật và Phân quyền Backend:**
  - [ ] Áp dụng middleware xác thực JWT để lấy thông tin giáo viên đang đăng nhập từ token (`req.user`).
  - [ ] Phân quyền chặt chẽ: chỉ giáo viên được phân công mới có quyền xem thông tin lớp học, điểm danh và cập nhật điểm cho học sinh lớp đó.
- [x] **Tích hợp API lên Frontend:** Thay thế việc đọc từ `portalData.js` bằng việc tích hợp `studentService` và `notificationService` kết nối trực tiếp đến backend thật.
