# Các chức năng cần thêm cho hệ thống

Tài liệu này được chuyển sang dạng phase + todo checklist để theo dõi trực tiếp những gì đã hoàn thành trong code hiện tại, những gì mới ở mức demo UI, và những phần còn thiếu cần làm tiếp.

## Trạng thái tổng quan

- [x] Đã có trang đăng nhập và phân quyền theo vai trò.
- [x] Đã có router riêng cho student, teacher, admin và route bảo vệ.
- [x] Đã có CRUD sinh viên ở admin.
- [~] Student, teacher và admin dashboard đã có UI và dữ liệu mẫu/demonstration.
- [ ] Các API nghiệp vụ sâu hơn như điểm số, lịch học, thông báo, nhật ký hoạt động chưa được nối đầy đủ.

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
- [x] Thêm, sửa, xóa dữ liệu sinh viên.
- [~] Quản lý thông báo hệ thống ở mức giao diện.
- [~] Theo dõi nhật ký hoạt động ở mức demo.
- [ ] Thêm, sửa, xóa dữ liệu giáo viên.
- [ ] Quản lý lớp học, khoa, môn học hoặc danh mục liên quan.
- [ ] Lưu thông báo hệ thống xuống backend.
- [ ] Kết nối nhật ký hoạt động với nguồn dữ liệu thật.

Ghi chú trạng thái: phần quản trị người dùng và CRUD sinh viên đã hoàn thành, các module quản trị mở rộng vẫn còn thiếu.

## Phase 5 - Hoàn thiện backend và kiến trúc

Mục tiêu: chuẩn hóa luồng dữ liệu giữa frontend và backend để các màn hình không còn phụ thuộc demo data.

- [x] Có API đăng nhập `/api/auth/login`.
- [x] Có API danh sách, thêm, sửa, xóa người dùng.
- [x] Có API danh sách, thêm, sửa, xóa sinh viên.
- [x] Có middleware/route bảo vệ ở mức frontend.
- [ ] Tách API riêng cho học sinh, giáo viên, admin theo nghiệp vụ.
- [ ] Bổ sung middleware kiểm tra đăng nhập và quyền ở backend.
- [ ] Chuẩn hóa xử lý lỗi và thông báo giữa frontend và backend.
- [ ] Đồng bộ dữ liệu thật cho profile, lịch học, điểm số, thông báo và nhật ký.

## Danh sách todo nên làm tiếp

- [ ] Nối student dashboard với API thật.
- [ ] Nối teacher dashboard với API thật.
- [ ] Thêm màn hình quản lý giáo viên.
- [ ] Thêm module quản lý lớp, khoa, môn học.
- [ ] Gắn thông báo hệ thống và nhật ký hoạt động vào backend.
- [ ] Bổ sung test cho luồng đăng nhập, phân quyền và CRUD chính.
