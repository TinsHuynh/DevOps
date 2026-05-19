# Đề Xuất Các Chức Năng Bổ Sung & Mở Rộng Hệ Thống

Tài liệu này tổng hợp các vị trí dữ liệu trước đây ở trạng thái chỉ đọc (Read-only), và đã được **hiện thực hóa hoàn chỉnh 100%** để hệ thống trở nên linh hoạt, trực quan và chuyên nghiệp.

---

## 1. Trạng thái các vùng dữ liệu "Chỉ đọc" đã được nâng cấp

| Phân hệ | Vùng dữ liệu | Trạng thái hiện tại | Giải pháp đã triển khai |
| :--- | :--- | :--- | :--- |
| **Sinh viên (Student)** | **Thời khóa biểu & Lịch học** | **Đã động hóa (Dynamic)** | Admin cấu hình loại "Thời khóa biểu" trực tiếp dạng JSON trong giao diện Danh mục. Sinh viên đăng nhập tự động đồng bộ lịch học theo Lớp tương ứng. |
| **Sinh viên (Student)** | **Bảng điểm môn học chi tiết** | **Đã động hóa (Dynamic)** | Giáo viên nhập 3 cột điểm thành phần (Chuyên cần, Giữa kỳ, Cuối kỳ). Điểm số lưu trực tiếp xuống Schema database và đồng bộ trực tiếp lên giao diện xem điểm của Sinh viên. |
| **Giáo viên (Teacher)** | **Hồ sơ Cá nhân & Đổi mật khẩu** | **Đã động hóa (Dynamic)** | Bổ sung tab "Hồ sơ & Bảo mật" cho Giáo viên tự thay đổi thông tin liên lạc (Email, SĐT, Chuyên môn) và đổi mật khẩu mã hóa trực tiếp. |
| **Quản trị viên (Admin)** | **Nhật ký hoạt động (Logs)** | Chỉ đọc (Read-only) | Đảm bảo tính minh bạch, ghi nhận hoạt động hệ thống chuẩn kiểm toán. |

---

## 2. Chi tiết các tính năng chỉnh sửa nâng cao đã hiện thực

### 🚀 Nghiệp vụ 1: Nhập điểm 3 thành phần & Đồng bộ sổ điểm chi tiết (ĐÃ HOÀN THÀNH - COMPLETED)
*   **Trạng thái:** **Đã hoàn thành 100%**.
*   **Chi tiết thực hiện:**
    1.  **Nâng cấp Schema Backend:** Thêm các trường `midtermScore`, `finalScore`, `attendanceScore` vào `studentSchema` (`student.model.js`).
    2.  **Giao diện Giáo viên:** Đổi nút "Nhập điểm" thành **"Nhập sổ điểm chi tiết"** với Modal 3 trường nhập liệu: Điểm Chuyên cần (10%), Điểm Giữa kỳ (30%), Điểm Cuối kỳ (60%).
    3.  **Công thức tự động:** Tính toán GPA tự động theo công thức trọng số `(midterm * 0.3 + finalScore * 0.6 + attendance * 0.1)` và quy đổi tỉ lệ chuyên cần tương ứng gửi lên Backend.
    4.  **Giao diện Sinh viên:** Bổ sung thẻ hiển thị **Sổ Điểm Thành Phần Chi Tiết** thời gian thực từ database.

### 📅 Nghiệp vụ 2: Quản lý Thời khóa biểu Động từ Admin (ĐÃ HOÀN THÀNH - COMPLETED)
*   **Trạng thái:** **Đã hoàn thành 100%**.
*   **Chi tiết thực hiện:**
    1.  **Mở rộng Danh mục Backend:** Thêm loại `'Thời khóa biểu'` vào enum của danh mục hệ thống.
    2.  **Giao diện Admin:** Thêm tùy chọn tạo danh mục loại "Thời khóa biểu lớp học" cho phép dán cấu hình JSON lịch học tương ứng (VD: `[{"day": "Thứ 2", "time": "07:30 - 10:00", "subject": "Lập trình Web", "room": "A201"}]`).
    3.  **Tự động đồng bộ Sinh viên:** Component `StudentDashboard.jsx` tự động nạp lịch học của Lớp tương ứng từ danh mục và hiển thị trực quan lên giao diện Thời khóa biểu của Sinh viên.

### 🛡️ Nghiệp vụ 3: Cập nhật Hồ sơ Giáo viên & Đổi mật khẩu (ĐÃ HOÀN THÀNH - COMPLETED)
*   **Trạng thái:** **Đã hoàn thành 100%**.
*   **Chi tiết thực hiện:**
    1.  Bổ sung tab **"Hồ sơ & Bảo mật"** tại Giao diện Giáo viên (Teacher Portal).
    2.  Cho phép giáo viên tự cập nhật: Email liên hệ, Số điện thoại di động, Chuyên ngành chính giảng dạy trực tiếp xuống database thông qua `teacherService.updateTeacher`.
    3.  Tích hợp form **"Đổi mật khẩu"** bảo mật đồng bộ băm và lưu lại mật khẩu mới thông qua `userService.updateUser`.
