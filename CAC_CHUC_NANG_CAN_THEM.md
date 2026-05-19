# Các chức năng cần thêm cho hệ thống

Tài liệu này mô tả các chức năng cần bổ sung cho hệ thống quản lý sinh viên, bao gồm 4 trang chính: đăng nhập, học sinh, giáo viên và admin.

## 1. Trang đăng nhập

Mục tiêu của trang này là xác thực người dùng trước khi vào hệ thống.

Chức năng cần có:

- Đăng nhập bằng tài khoản và mật khẩu.
- Kiểm tra dữ liệu đầu vào hợp lệ trước khi gửi yêu cầu.
- Phân quyền sau khi đăng nhập thành công theo vai trò người dùng.
- Hiển thị thông báo lỗi khi sai tài khoản, sai mật khẩu hoặc tài khoản bị khóa.
- Cho phép ghi nhớ đăng nhập nếu cần.
- Hỗ trợ đăng xuất và tự động chuyển về màn hình đăng nhập khi phiên làm việc hết hạn.


## 2. Trang học sinh

Mục tiêu của trang này là hỗ trợ học sinh xem và quản lý thông tin cá nhân của mình.

Chức năng cần có:

- Xem thông tin cá nhân của học sinh.
- Cập nhật thông tin cơ bản như họ tên, ngày sinh, lớp, số điện thoại và địa chỉ.
- Xem danh sách lớp học hoặc môn học đang theo học.
- Xem điểm số, kết quả học tập hoặc trạng thái học tập nếu hệ thống có lưu dữ liệu này.
- Tra cứu thông báo từ nhà trường hoặc giáo viên.
- Đổi mật khẩu cá nhân.
- Xem lịch học, lịch kiểm tra hoặc các mốc quan trọng khác.

## 3. Trang giáo viên

Mục tiêu của trang này là hỗ trợ giáo viên quản lý lớp học và theo dõi học sinh.

Chức năng cần có:

- Xem danh sách lớp hoặc môn học được phân công.
- Xem danh sách học sinh trong từng lớp.
- Cập nhật điểm số, nhận xét hoặc trạng thái học tập cho học sinh.
- Điểm danh hoặc ghi nhận tình trạng chuyên cần.
- Gửi thông báo cho lớp hoặc từng học sinh.
- Tạo, sửa, xóa bài kiểm tra hoặc nội dung học tập nếu cần.
- Xem thống kê nhanh về sĩ số, tỷ lệ chuyên cần và kết quả học tập.

## 4. Trang admin

Mục tiêu của trang này là quản trị toàn bộ hệ thống.

Chức năng cần có:

- Quản lý tài khoản người dùng gồm học sinh, giáo viên và admin.
- Phân quyền và thay đổi vai trò người dùng.
- Thêm, sửa, xóa dữ liệu học sinh.
- Thêm, sửa, xóa dữ liệu giáo viên.
- Quản lý lớp học, khoa, môn học hoặc các danh mục liên quan.
- Xem dashboard tổng quan với các số liệu thống kê quan trọng.
- Quản lý thông báo hệ thống.
- Theo dõi nhật ký hoạt động nếu cần bảo mật và kiểm soát.

## 5. Gợi ý phân chia module

- Trang đăng nhập: dùng chung cho toàn hệ thống.
- Trang học sinh: chỉ hiển thị dữ liệu cá nhân và chức năng liên quan đến học sinh.
- Trang giáo viên: tập trung vào lớp học, điểm số và học sinh được quản lý.
- Trang admin: chứa toàn bộ chức năng quản trị và phân quyền.

## 6. Hướng phát triển tiếp theo

- Xây dựng router riêng cho từng vai trò.
- Tạo middleware kiểm tra đăng nhập và phân quyền.
- Thiết kế giao diện riêng cho từng trang.
- Tách API backend theo từng nhóm chức năng.
- Bổ sung thông báo, xác nhận và xử lý lỗi đồng bộ giữa frontend và backend.
