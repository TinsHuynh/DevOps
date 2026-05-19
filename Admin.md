# Các chức năng phân hệ Quản trị viên (Admin Portal)

Tài liệu checklist chi tiết về các chức năng thuộc giao diện quản trị hệ thống dành cho Admin và sự liên kết với các phân hệ khác.

> **Cập nhật lần cuối:** 2026-05-19
> **Liên kết phân hệ:** [Phân hệ Giáo viên](./Teacher.md) | [Phân hệ Sinh viên](./Student.md)

---

## 1. Giao diện Tổng quan & Nhật ký hoạt động
- [x] **Dashboard tổng quan:** Xem số liệu thống kê chung của hệ thống (Số sinh viên, giáo viên, lớp học).
- [x] **Nhật ký hoạt động (Activity Logs):** Xem và theo dõi lịch sử thao tác của các tài khoản trên hệ thống (Kết nối API thật).

---

## 2. Quản lý Tài khoản & Phân quyền
- [x] **Xem danh sách tài khoản:** Hiển thị toàn bộ người dùng trong hệ thống kèm trạng thái và vai trò.
- [x] **CRUD tài khoản:** Cho phép thêm, sửa, khóa, xóa tài khoản và thay đổi vai trò (Admin, Giáo viên, Sinh viên).
- [x] **Đồng bộ hồ sơ tự động:** Tự động tạo mới/xóa bỏ hồ sơ sinh viên hoặc giáo viên tương ứng khi thao tác trên tài khoản User, đảm bảo tính toàn vẹn dữ liệu.
  - *Liên kết:* Dùng làm tài khoản đăng nhập cho [Giáo viên](./Teacher.md) và [Sinh viên](./Student.md).

---

## 3. Quản lý Danh mục Hệ thống (Categories)
- [x] **Quản lý Khoa & Ngành:** Thêm/sửa/xóa Khoa, Ngành học (Kết nối API thật).
- [x] **Quản lý Lớp & Môn học:** Thêm/sửa/xóa Lớp học, Môn học (Kết nối API thật).
  - *Liên kết:* Dữ liệu Khoa, Ngành, Lớp, Môn học được đồng bộ dùng chung cho [Giáo viên](./Teacher.md) và [Sinh viên](./Student.md).

---

## 4. Quản lý Sinh viên (Students Management)
- [x] **CRUD Sinh viên:** Thêm, sửa, xóa thông tin sinh viên (Kết nối API thật).
- [x] **Liên kết danh mục:** Khi thêm sinh viên, tự động load danh sách Khoa, Ngành, Lớp từ danh mục hệ thống.
- [x] **Tùy chọn tạo tài khoản đi kèm:** Cho phép tích chọn tạo tài khoản đăng nhập User (mật khẩu mặc định `123456`) đồng bộ trực tiếp khi tạo mới sinh viên.
  - *Liên kết:* Hồ sơ này quyết định thông tin hiển thị trên [Hồ sơ Sinh viên](./Student.md#2-thong-tin-ca-nhan--ho-so-student-profile-management) và danh sách lớp giảng dạy của [Giáo viên](./Teacher.md#2-quan-ly-lop-hoc--hoc-sinh-classes--students-management).

---

## 5. Quản lý Giáo viên (Teachers Management)
- [x] **CRUD Giáo viên:** Thêm, sửa, xóa thông tin giáo viên (Kết nối API thật).
- [x] **Liên kết danh mục:** Tự động lấy dữ liệu Khoa, Ngành từ danh mục khi quản lý giáo viên.
- [x] **Phân lớp giảng dạy:** Cho phép Admin chỉ định, phân chia lớp học cho từng Giáo viên phụ trách trực tiếp qua dropdown lớp học lấy động từ danh mục Lớp học.
- [x] **Tùy chọn tạo tài khoản đi kèm:** Cho phép tích chọn tạo tài khoản đăng nhập User (mật khẩu mặc định `123456`) đồng bộ trực tiếp khi tạo mới giáo viên.
  - *Liên kết:* Quyết định các lớp giảng dạy và nhiệm vụ trên [Giao diện Giáo viên](./Teacher.md#1-giao-dien-tong-quan-teacher-dashboard-overview).

---

## 6. Truyền thông & Thông báo Hệ thống
- [x] **Tạo thông báo toàn trường:** Soạn thảo và lưu thông báo hệ thống xuống backend (Kết nối API thật).
  - *Liên kết:* Sinh viên sẽ nhận được thông báo này tại [Thông báo Sinh viên](./Student.md#5-nhan--xem-thong-bao-announcements--notifications).