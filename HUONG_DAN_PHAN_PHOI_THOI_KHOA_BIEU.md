# Hướng Dẫn Phân Phối Thời Khóa Biểu (Dành Cho Admin)

Tài liệu này hướng dẫn chi tiết cách Quản trị viên (Admin) thiết lập, phân phối và đồng bộ hóa **Thời khóa biểu (TKB) động** cho từng lớp học trong hệ thống **QuanLySinhVien**.

---

## 1. Nguyên lý hoạt động
Hệ thống sử dụng mô hình dữ liệu động thông qua phân hệ **Danh mục (Categories)**:
1. **Admin** tạo một danh mục thời khóa biểu mới với tên trùng với **Mã lớp học** (Ví dụ: `CNTT01`, `CNTT02`, `HTTT01`).
2. **Admin** nhập cấu hình lịch học dưới định dạng **mảng JSON chuẩn**.
3. **Sinh viên** khi đăng nhập sẽ tự động được hệ thống kiểm tra lớp học của họ, truy vấn Thời khóa biểu khớp với lớp học đó từ database và hiển thị thời gian thực lên giao diện.

---

## 2. Các bước thực hiện phân phối Thời khóa biểu

### 📥 Bước 1: Truy cập màn hình quản lý
1. Đăng nhập vào tài khoản **Admin**.
2. Trên thanh menu điều hướng bên trái, chọn **"Quản Lý Danh Mục"**.

### ➕ Bước 2: Tạo mới hoặc chỉnh sửa lịch học
1. Nhấp vào nút **"+ Thêm Danh Mục"** (hoặc nhấp biểu tượng **Bút chì** để sửa một lịch học hiện có).
2. Thiết lập các trường thông tin như sau:
   * **Tên Danh Mục:** Nhập chính xác **Mã lớp học** cần gán lịch (Ví dụ: `CNTT01`).
   * **Loại:** Chọn **"Thời khóa biểu lớp học"** (Hệ thống sẽ tự nhận diện và hiển thị ô cấu hình JSON).
   * **Cấu hình Thời khóa biểu:** 
     > [!TIP]
     > Nhấn nút **"✨ Tải mẫu chuẩn"** ở góc phải trên ô nhập liệu để hệ thống tự động điền mẫu lịch học chuẩn JSON. Bạn chỉ cần sửa tên môn, phòng học theo thực tế rất tiện lợi!
   * **Trạng thái:** Chọn **"Hoạt động"**.
3. Nhấn **"Thêm Mới"** hoặc **"Lưu Thay Đổi"** để hoàn tất.

---

## 3. Định dạng JSON Lịch học chuẩn (Mẫu copy nhanh)

Ô cấu hình yêu cầu định dạng mảng JSON chứa các đối tượng môn học. Dưới đây là mẫu chuẩn gồm 3 buổi học trong tuần, Admin có thể sao chép và chỉnh sửa nhanh:

```json
[
  {
    "day": "Thứ 2",
    "time": "07:30 - 10:00",
    "subject": "Lập trình ứng dụng Web",
    "room": "Phòng máy A201"
  },
  {
    "day": "Thứ 4",
    "time": "13:00 - 15:30",
    "subject": "Cơ sở dữ liệu nâng cao",
    "room": "Hội trường B105"
  },
  {
    "day": "Thứ 6",
    "time": "07:30 - 10:00",
    "subject": "Toán rời rạc & Toán ứng dụng",
    "room": "Giảng đường C302"
  }
]
```

### ⚠️ Lưu ý quan trọng về định dạng:
* Các khóa: `"day"`, `"time"`, `"subject"`, `"room"` phải viết thường và đặt trong dấu ngoặc kép đôi `" "`.
* Không sử dụng dấu phẩy `,` sau đối tượng cuối cùng trong mảng để tránh lỗi cú pháp JSON.

---

## 4. Cơ chế tự động đồng bộ & Dự phòng (Fail-safe)

Để đảm bảo hệ thống luôn vận hành ổn định và không bị gián đoạn, cơ chế đồng bộ được thiết lập tự động như sau:
* **Khớp lớp học:** Sinh viên thuộc lớp `CNTT01` sẽ chỉ nhìn thấy lịch học cấu hình cho lớp `CNTT01`.
* **Cơ chế dự phòng (Fallback):** Nếu Admin chưa cấu hình thời khóa biểu cho lớp đó, hoặc cấu hình định dạng JSON bị lỗi cú pháp, hệ thống sẽ tự động hiển thị **Thời khóa biểu mặc định** của trường thay vì báo lỗi trắng màn hình.
* **Thời gian thực (Real-time):** Mọi chỉnh sửa của Admin sẽ có hiệu lực ngay lập tức khi sinh viên tải lại trang mà không cần khởi động lại máy chủ.
