# Các chức năng cần thêm cho hệ thống

Tài liệu này được chuyển sang dạng phase + todo checklist để theo dõi trực tiếp những gì đã hoàn thành trong code hiện tại, những gì mới ở mức demo UI, và những phần còn thiếu cần làm tiếp.

> **Cập nhật lần cuối:** 2026-05-19

## Trạng thái tổng quan

- [x] Đã có trang đăng nhập và phân quyền theo vai trò.
- [x] Đã có router riêng cho student, teacher, admin và route bảo vệ.
- [x] Đã có CRUD sinh viên ở admin.
- [x] Đã có CRUD giáo viên ở admin (TeachersView + backend API đầy đủ).
- [x] Đã có quản lý thông báo nối backend (NotificationsView).
- [x] Đã có nhật ký hoạt động nối backend (ActivityLogsView).
- [~] Student, teacher dashboard đã có UI và dữ liệu mẫu/demonstration.
- [x] CategoriesView đã được kết nối với backend API thật (Khoa, Lớp học, Môn học, Ngành học).
- [ ] Các API nghiệp vụ sâu hơn như điểm số, lịch học chưa được nối.

## Phase 1 - Xác thực và phân quyền

Mục tiêu: đưa người dùng vào đúng không gian theo vai trò và quản lý phiên đăng nhập ổn định.

- [x] Đăng nhập bằng tài khoản và mật khẩu.
- [x] Kiểm tra dữ liệu đầu vào bắt buộc trước khi gửi request.
- [x] Trả lỗi rõ ràng khi sai tài khoản, sai mật khẩu hoặc tài khoản bị khóa.
- [x] Phân quyền sau khi đăng nhập thành công theo role.
- [x] Ghi nhớ đăng nhập bằng `localStorage` hoặc `sessionStorage`.
- [x] Tự động đăng xuất khi phiên hết hạn.
- [x] Hỗ trợ đăng xuất thủ công.
- [x] Điều hướng về trang phù hợp theo role.
- [x] Bảo vệ route theo quyền truy cập.

Ghi chú trạng thái: phase này đã hoàn thành ở mức chạy được, cả frontend lẫn backend đều đã có luồng xác thực cơ bản.

## Phase 2 - Trang học sinh

Mục tiêu: hiển thị thông tin cá nhân và các nội dung liên quan đến học tập của học sinh.

- [~] Xem thông tin cá nhân của học sinh.
- [~] Cập nhật họ tên, ngày sinh, lớp, số điện thoại, địa chỉ.
- [~] Xem danh sách môn học đang theo học.
- [~] Xem điểm số và trạng thái học tập.
- [~] Xem thông báo từ nhà trường hoặc giáo viên.
- [~] Xem lịch học gần nhất.
- [~] Đổi mật khẩu cá nhân.
- [ ] Đồng bộ dữ liệu học sinh với backend theo tài khoản thật.
- [ ] Xem lịch kiểm tra và các mốc học tập từ nguồn dữ liệu thật.

Ghi chú trạng thái: giao diện và luồng thao tác đã có, nhưng phần lớn đang dùng dữ liệu mẫu trên frontend.

## Phase 3 - Trang giáo viên

Mục tiêu: hỗ trợ giáo viên theo dõi lớp học và thực hiện các thao tác nhanh.

- [~] Xem danh sách lớp hoặc môn học được phân công.
- [~] Xem danh sách học sinh trong lớp.
- [~] Điểm danh hoặc ghi nhận tình trạng chuyên cần.
- [~] Gửi thông báo cho lớp.
- [~] Xem thống kê nhanh về sĩ số và chuyên cần.
- [~] Ghi nhận nhận xét/ghi chú mẫu trên giao diện.
- [ ] Cập nhật điểm số và nhận xét vào backend.
- [ ] Quản lý bài kiểm tra hoặc nội dung học tập.
- [ ] Đồng bộ dữ liệu lớp, học sinh và chuyên cần với API thật.

Ghi chú trạng thái: phase này đã có dashboard và tương tác demo, nhưng chưa phải quy trình nghiệp vụ đầy đủ.

## Phase 4 - Trang admin

Mục tiêu: quản trị tài khoản, phân quyền và các dữ liệu hệ thống.

- [x] Xem dashboard tổng quan với các chỉ số chính.
- [x] Xem danh sách tài khoản người dùng.
- [x] Thay đổi vai trò người dùng.
- [x] Thêm, sửa, xóa dữ liệu sinh viên (StudentsView + API).
- [x] Thêm, sửa, xóa dữ liệu giáo viên (TeachersView + API đầy đủ).
- [x] Lưu thông báo hệ thống xuống backend (NotificationsView nối API).
- [x] Kết nối nhật ký hoạt động với nguồn dữ liệu thật (ActivityLogsView nối API).
- [x] Quản lý danh mục (lớp, khoa, môn học, ngành học) kết nối với backend API thật.

Ghi chú trạng thái: hầu hết admin đã hoàn thành. Còn lại duy nhất là CategoriesView chưa nối backend.

## Phase 5 - Hoàn thiện backend và kiến trúc

Mục tiêu: chuẩn hóa luồng dữ liệu giữa frontend và backend để các màn hình không còn phụ thuộc demo data.

- [x] Có API đăng nhập `/api/auth/login`.
- [x] Có API danh sách, thêm, sửa, xóa người dùng.
- [x] Có API danh sách, thêm, sửa, xóa sinh viên.
- [x] Có API danh sách, thêm, sửa, xóa giáo viên.
- [x] Có API thông báo (list, create, delete).
- [x] Có API nhật ký hoạt động (list, getRecent, getByModule).
- [x] Có middleware/route bảo vệ ở mức frontend.
- [ ] Bổ sung middleware kiểm tra đăng nhập và quyền ở **backend** (hiện tại `req.user` chưa được inject).
- [ ] Chuẩn hóa xử lý lỗi và thông báo giữa frontend và backend.
- [ ] Đồng bộ dữ liệu thật cho profile, lịch học, điểm số của student/teacher.

## Danh sách todo còn lại (ưu tiên)

- [ ] **[Backend]** Thêm middleware xác thực JWT để bảo vệ các route `/api/teachers`, `/api/notifications`, `/api/logs` — hiện tại `req.user` luôn là `undefined`.
- [x] **[Admin]** Nối CategoriesView (quản lý lớp, khoa, môn học) với backend API thật.
- [ ] **[Student]** Nối StudentDashboard với API thật (profile, thông báo published, lịch học).
- [ ] **[Teacher]** Nối TeacherDashboard với API thật (danh sách lớp, điểm danh, cập nhật điểm).
- [ ] **[Backend]** Chuẩn hóa xử lý lỗi (error handler middleware tập trung).
- [ ] **[Test]** Bổ sung test cho luồng đăng nhập, phân quyền và CRUD chính.
