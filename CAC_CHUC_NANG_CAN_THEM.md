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
- [x] Student, teacher dashboard đã được liên kết dữ liệu thật hoàn toàn từ API.
- [x] CategoriesView đã được kết nối với backend API thật (Khoa, Lớp học, Môn học, Ngành học).
- [x] Các API nghiệp vụ sâu hơn như điểm số (GPA), chuyên cần (attendanceRate) và thông báo đã được kết nối thực tế.

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

Ghi chú trạng thái: Phase này đã hoàn thành xuất sắc ở cả Frontend và Backend.

## Phase 2 - Trang học sinh

Mục tiêu: hiển thị thông tin cá nhân và các nội dung liên quan đến học tập của học sinh.

- [x] Xem thông tin cá nhân của học sinh (Họ tên, lớp, khoa, ngành từ database).
- [x] Cập nhật số điện thoại, địa chỉ (Đồng bộ trực tiếp lên API backend).
- [x] Xem danh sách môn học đang theo học (Đồng bộ theo chương trình đào tạo).
- [x] Xem điểm số và trạng thái học tập (Hiển thị GPA và chuyên cần thật từ DB).
- [x] Xem thông báo từ nhà trường hoặc giáo viên bộ môn gửi cho lớp học.
- [x] Xem lịch học gần nhất theo lớp học.
- [x] Đổi mật khẩu cá nhân (Đồng bộ băm mật khẩu tại Backend).
- [x] Đồng bộ dữ liệu học sinh với backend theo tài khoản thật.
- [x] Xem lịch kiểm tra và các mốc học tập từ nguồn dữ liệu thật.

Ghi chú trạng thái: Học sinh Portal đã được tích hợp đầy đủ API thật, loại bỏ hoàn toàn mock data.

## Phase 3 - Trang giáo viên

Mục tiêu: hỗ trợ giáo viên theo dõi lớp học và thực hiện các thao tác nhanh.

- [x] Xem danh sách lớp hoặc môn học được phân công giảng dạy.
- [x] Xem danh sách học sinh trong lớp được quản lý.
- [x] Điểm danh và cập nhật tỉ lệ chuyên cần (`attendanceRate`) cho học sinh.
- [x] Gửi thông báo cho lớp giảng dạy kết nối trực tiếp bảng `Notification`.
- [x] Xem thống kê nhanh về sĩ số và chuyên cần của lớp giảng dạy.
- [x] Cập nhật điểm số GPA học sinh thời gian thực qua API backend.
- [x] Đồng bộ dữ liệu lớp, học sinh và chuyên cần với API thật.

Ghi chú trạng thái: Giáo viên Portal đã kết nối đầy đủ các API nghiệp vụ nhập điểm, điểm danh và thông báo lớp học.

## Phase 4 - Trang admin

Mục tiêu: quản trị tài khoản, phân quyền và các dữ liệu hệ thống.

- [x] Xem dashboard tổng quan với các chỉ số chính (tổng hợp trực tiếp từ DB).
- [x] Xem danh sách tài khoản người dùng.
- [x] Thay đổi vai trò người dùng.
- [x] Thêm, sửa, xóa dữ liệu sinh viên (StudentsView + API).
- [x] Thêm, sửa, xóa dữ liệu giáo viên (TeachersView + API đầy đủ).
- [x] Tùy chọn tự động cấp/xóa tài khoản User tương ứng khi CRUD học viên/giáo viên.
- [x] Chỉ định phân lớp học giảng dạy cho Giáo viên lấy động từ Categories.
- [x] Lưu thông báo hệ thống xuống backend (NotificationsView nối API).
- [x] Kết nối nhật ký hoạt động với nguồn dữ liệu thật (ActivityLogsView nối API).
- [x] Quản lý danh mục (lớp, khoa, môn học, ngành học) kết nối với backend API thật.

Ghi chú trạng thái: Hoàn thành 100% tất cả nghiệp vụ cốt lõi dành cho quản trị hệ thống.

## Phase 5 - Hoàn thiện backend và kiến trúc

Mục tiêu: chuẩn hóa luồng dữ liệu giữa frontend và backend để các màn hình không còn phụ thuộc demo data.

- [x] Có API đăng nhập `/api/auth/login`.
- [x] Có API danh sách, thêm, sửa, xóa người dùng.
- [x] Có API danh sách, thêm, sửa, xóa sinh viên.
- [x] Có API danh sách, thêm, sửa, xóa giáo viên.
- [x] Có API thông báo (list, create, delete).
- [x] Có API nhật ký hoạt động (list, getRecent, getByModule).
- [x] Có middleware/route bảo vệ ở mức frontend.
- [x] Đồng bộ dữ liệu thật cho profile, lịch học, điểm số của student/teacher.

## Danh sách todo còn lại (Đã hoàn thành)

- [x] **[Admin]** Nối CategoriesView (quản lý lớp, khoa, môn học) với backend API thật.
- [x] **[Student]** Nối StudentDashboard với API thật (profile, thông báo published, lịch học).
- [x] **[Teacher]** Nối TeacherDashboard với API thật (danh sách lớp, điểm danh, cập nhật điểm).
- [x] **[Admin]** Tự động đồng bộ tài khoản User và Hồ sơ (Sinh viên/Giáo viên).
- [x] **[Admin]** Thêm chức năng phân công lớp học phụ trách cho giáo viên.
- [x] **[Student/Teacher Form]** Thêm tùy chọn tự động cấp tài khoản đăng nhập khi tạo hồ sơ mới.
