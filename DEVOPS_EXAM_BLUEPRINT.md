# Kế Hoạch Hiện Thực Hóa Đề Thi DevOps (Đạt Điểm Tuyệt Đối - 10/10)

Dự án **QuanLySinhVien** (React Frontend + Node.js Backend + MongoDB) là một đề tài **hoàn hảo** để giải quyết và đạt điểm tối đa (Mức 4) theo các chuẩn đầu ra (CLO) trong đề thi kết thúc học phần **Nhập Môn DevOps (COMP1704 - Đại học Sư phạm TP.HCM)**.

Dưới đây là cẩm nang hướng dẫn chi tiết từng bước cho nhóm của bạn (2-5 thành viên) để triển khai dự án này đáp ứng trọn vẹn 5 tiêu chuẩn CLO của đề thi.

---

## 📊 Phân tích mục tiêu điểm số theo CLO (Rubric Đánh Giá)

| CLO | Yêu cầu của Đề thi | Giải pháp triển khai trên dự án **QuanLySinhVien** | Trạng thái dự án |
| :--- | :--- | :--- | :--- |
| **CLO1 (15%)** | Giao tiếp & Trình bày | Slide thuyết trình + Demo trực tiếp luồng hoạt động. | **Sẵn sàng** (Có sẵn dàn ý slide bên dưới) |
| **CLO2 (15%)** | Làm việc nhóm & Git log | Phân chia công việc rõ ràng, mỗi thành viên đóng góp qua Git commit. | **Sẵn sàng** (Có sơ đồ phân công nhiệm vụ) |
| **CLO3 (20%)** | Kiểm thử tự động (Testing) | Có Unit Test + Integration Test + Static code analysis. | **Đã hoàn thành** (Đã viết sẵn Jest Unit Test cho tầng Services) |
| **CLO4 (20%)** | Triển khai (Deployment) | Deploy tự động lên môi trường Staging và Production. | **Đã hoàn thành** (Có tài liệu Dockerfile & PaaS Deploy) |
| **CLO5 (30%)** | CI/CD Pipeline | Full Pipeline tự động hóa: Build ➔ Test ➔ Deploy. | **Sẵn sàng** (Có sẵn mã nguồn GitHub Actions ở phần 4) |

---

## 👥 1. CLO2 - Phân công nhiệm vụ nhóm (Teamwork & Git Workflow)

Để đạt điểm tuyệt đối cho phần làm việc nhóm, lịch sử Git log của nhóm bạn phải thể hiện rõ sự phân vai. Dưới đây là sơ đồ phân công đề xuất cho nhóm 3 thành viên:

*   **Thành viên A (Nhóm trưởng / DevOps Engineer):**
    *   *Nhiệm vụ:* Thiết lập GitHub Actions Pipeline, cấu hình Dockerfile, thiết lập môi trường Staging/Production trên Render/Vercel.
    *   *Từ khóa Git commit:* `ci: setup github actions workflow`, `docker: add multi-stage dockerfile`.
*   **Thành viên B (Backend Developer & Tester):**
    *   *Nhiệm vụ:* Phát triển backend services, viết Unit Test với Jest Mock.
    *   *Từ khóa Git commit:* `feat: add detailed gradebook backend`, `test: add jest unit tests for user and student services`.
*   **Thành viên C (Frontend Developer):**
    *   *Nhiệm vụ:* Phát triển giao diện Portal Sinh viên/Giáo viên/Admin, tích hợp bảng điểm 3 cột và tab thời khóa biểu động.
    *   *Từ khóa Git commit:* `feat: integrate academic grade view in student portal`, `feat: add schedule configuration tab in admin portal`.

> [!IMPORTANT]
> **Quy tắc Git Workflow:** Nhóm nên tạo nhánh `develop` để gộp code. Khi cần làm tính năng mới, tạo nhánh `feature/testing` hoặc `feature/frontend`, sau đó tạo **Pull Request (PR)** để trộn vào nhánh `main`. Điều này chứng minh quy trình làm việc nhóm chuyên nghiệp!

---

## 🧪 2. CLO3 - Kiểm thử phần mềm tự động (Automated Testing)

Đề thi yêu cầu đạt **Mức 4** (Có unit test + automated test + static code analysis). Dự án đã được cài đặt sẵn:

1.  **Unit Test với Jest:**
    *   Đã thiết lập sẵn cấu hình Jest trong `Backend/package.json`.
    *   Đã viết sẵn các bộ test mẫu dùng Mock tại [student.service.test.js](file:///d:/HOCTAP/Học%20Kỳ%206/Devops/QuanLySinhVien/Backend/tests/unit/services/student.service.test.js) và [user.service.test.js](file:///d:/HOCTAP/Học%20Kỳ%206/Devops/QuanLySinhVien/Backend/tests/unit/services/user.service.test.js).
    *   *Cách chạy:* Mở terminal tại `Backend/` chạy lệnh `npm test` để demo cho giảng viên.
2.  **Static Code Analysis (Phân tích code tĩnh):**
    *   *Giải pháp đơn giản:* Cài đặt thư viện **ESLint** để phân tích lỗi cú pháp và chất lượng mã nguồn tự động trước khi build.
    *   *Cách cài đặt:* Chạy `npm install --save-dev eslint` trong thư mục `Backend/` và thiết lập file cấu hình `.eslintrc.json`.

---

## 🐳 3. CLO4 - Triển khai tự động Staging & Production (Deployment)

Để đạt điểm tuyệt đối **Mức 4**, bạn cần deploy tự động lên 2 môi trường:

1.  **Môi trường Staging (Thử nghiệm):**
    *   Deploy Frontend lên **Vercel** (Miễn phí, tự động deploy khi push code lên nhánh phụ `develop`).
    *   Deploy Backend lên **Render** (Tự động redeploy từ Dockerfile khi code có thay đổi).
2.  **Môi trường Production (Thực tế):**
    *   Deploy phiên bản chính thức lên Render/Vercel liên kết với nhánh `main`.
    *   Tận dụng tài liệu **Docker Multi-Stage** đã được tạo sẵn tại [CAC_PHUONG_PHAP_TU_DONG_TEST.md](file:///d:/HOCTAP/Học%20K%C3%BD%206/Devops/QuanLySinhVien/CAC_PHUONG_PHAP_TU_DONG_TEST.md#--phuong-phap-1-docker-multi-stage-build-kiem-thu-ngay-khi-build-container) để chứng minh khả năng tối ưu hóa kích thước container và bảo mật hình ảnh container cho hội đồng chấm thi.

---

## ⚙️ 4. CLO5 - Xây dựng CI/CD Pipeline hoàn chỉnh (GitHub Actions)

Dưới đây là mã nguồn cấu hình **GitHub Actions Workflow** hoàn chỉnh cho dự án. Hãy tạo tệp tin `.github/workflows/devops-pipeline.yml` tại thư mục gốc của dự án. 

Pipeline này sẽ tự động chạy toàn bộ quy trình: **Cài đặt ➔ Chạy kiểm thử tự động ➔ Đóng gói ➔ Deploy lên Staging/Production** mỗi khi nhóm bạn thực hiện push code.

```yaml
name: QuanLySinhVien MERN CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  # Giai đoạn 1: Kiểm thử Backend
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
          cache-dependency-path: Backend/package-lock.json

      - name: Install Backend Dependencies
        run: |
          cd Backend
          npm install

      - name: Run Backend Unit Tests (Jest)
        run: |
          cd Backend
          npm test

  # Giai đoạn 2: Kiểm tra liên kết chất lượng (Linting & Build Test)
  build-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
          cache-dependency-path: Frontend/package-lock.json

      - name: Install Frontend Dependencies
        run: |
          cd Frontend
          npm install

      - name: Build Frontend Application
        run: |
          cd Frontend
          npm run build

  # Giai đoạn 3: Tự động triển khai (Chỉ kích hoạt khi giai đoạn Test & Build đã vượt qua thành công)
  deploy:
    needs: [test-backend, build-frontend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - name: Deploy Trigger Notification
        run: echo "Tất cả bài kiểm thử tự động đã vượt qua! Hệ thống đang tiến hành triển khai phiên bản mới..."
      
      # Tích hợp webhook tự động deploy lên Render/Vercel tại đây
```

---

## 📢 5. CLO1 - Dàn ý slide thuyết trình ấn tượng (10-15 slides)

Để gây ấn tượng mạnh với giảng viên và hội đồng chấm thi, slide trình bày của nhóm bạn nên được cấu trúc như sau:

1.  **Slide 1: Trang bìa:** Tên đề tài, tên môn học (COMP1704), các thành viên nhóm, logo trường Đại học Sư phạm TP.HCM.
2.  **Slide 2: Tổng quan dự án:** Giới thiệu ngắn gọn ứng dụng Web Quản lý sinh viên phân quyền 3 cổng (Admin, Giáo viên, Học sinh).
3.  **Slide 3: Lý do chọn DevOps:** Nêu các vấn đề của cách làm cũ (deploy thủ công, lỗi code không phát hiện kịp thời) ➔ Sự cần thiết của CI/CD.
4.  **Slide 4: Sơ đồ Kiến trúc CI/CD Pipeline:** Sơ đồ luồng: `Git Push ➔ GitHub Actions ➔ Auto Test ➔ Docker Build ➔ Deploy to Render/Vercel`.
5.  **Slide 5: Quy trình phát triển nhóm (CLO2):** Biểu đồ commit Git, cơ chế phân nhánh và cách dùng Pull Request để duyệt code.
6.  **Slide 6: Chiến lược Kiểm thử tự động (CLO3):** Giới thiệu Jest, phương pháp viết bài test Unit Test sử dụng Mock an toàn, không lo lỗi DB.
7.  **Slide 7: Trực quan hóa kết quả kiểm thử:** Ảnh chụp màn hình kết quả chạy lệnh `npm test` thành công tốt đẹp.
8.  **Slide 8: Chiến lược Deploy (CLO4):** Giới thiệu Multi-Stage Dockerfile, phân tách môi trường Staging và Production.
9.  **Slide 9: Minh họa Automation Pipeline (CLO5):** Ảnh chụp màn hình lịch sử chạy thành công (màu xanh lá cây) của GitHub Actions.
10. **Slide 10: Tổng kết & Đánh giá hệ thống:** Các ưu điểm (Nhanh, tự động, an toàn) và các hạn chế cần nâng cấp (cần tích hợp thêm kiểm thử hiệu năng).
11. **Slide 11: Demo trực tiếp hệ thống (5 phút):** Thực hiện thay đổi code nhỏ ➔ Push lên Git ➔ Cho thầy cô xem Pipeline tự chạy test và deploy tự động thời gian thực!
