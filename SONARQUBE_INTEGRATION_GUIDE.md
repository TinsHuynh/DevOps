# Hướng Dẫn Tích Hợp SonarQube cho Dự Án QuanLySinhVien

## Tổng Quan

SonarQube là một nền tảng mã nguồn mở để phân tích chất lượng mã nguồn, bắt lỗi tiềm ẩn, code smell, security hotspot, và độ phức tạp mã. Nó là yêu cầu chính của CLO3 (Kiểm thử phần mềm) trong đề thi DevOps.

---

## 1. Cấu Hình SonarQube cho Backend

### 1.1 File `sonar-project.properties`

Đã được tạo sẵn tại `Backend/sonar-project.properties` với các cài đặt:

```properties
sonar.projectKey=QuanLySinhVien:Backend           # ID dự án duy nhất
sonar.projectName=QuanLySinhVien Backend API      # Tên hiển thị
sonar.sources=src                                  # Thư mục source code
sonar.tests=tests                                  # Thư mục test
sonar.exclusions=node_modules/**,build/**,...    # Loại trừ thư mục không cần scan
```

**Ý nghĩa:**
- `sonar.projectKey`: Định danh duy nhất trên SonarQube server, format là `domain:project`
- `sonar.sources`: Thư mục chứa code chính (không bao gồm test)
- `sonar.tests`: Thư mục chứa test files
- `sonar.exclusions`: Bỏ qua `node_modules` và các thư mục build để tăng tốc độ scan

---

## 2. Hai Cách Triển Khai SonarQube

### Cách A: SonarCloud (Đề Xuất cho Bài Thi) ⭐

**Ưu điểm:**
- Miễn phí cho public repository
- Không cần tạo server riêng
- Tích hợp sẵn với GitHub
- Phù hợp để demo trong bài thi

**Bước thiết lập:**

1. **Vào SonarCloud** (https://sonarcloud.io) và đăng nhập bằng GitHub account

2. **Tạo Organization:**
   - Click "+" → "Create new organization"
   - Chọn "From GitHub"
   - Chọn repository `QuanLySinhVien`

3. **Tạo Project:**
   - Tên: `QuanLySinhVien:Backend`
   - Organization: vừa tạo ở bước 2

4. **Lấy SonarCloud Token:**
   - My Account → Security → Generate token
   - Copy token này lưu vào GitHub Secrets

5. **Thêm Secret vào GitHub:**
   - Repository Settings → Secrets and variables → New repository secret
   - Name: `SONAR_TOKEN`
   - Value: Token vừa tạo

6. **GitHub Actions sẽ tự chạy** khi bạn push code lên

---

### Cách B: SonarQube Server (Tùy Chọn cho Staging/Production)

Nếu muốn triển khai SonarQube server riêng:

1. **Cài đặt trên Ubuntu 22.04:**
   - Làm theo hướng dẫn trong `SonerQube.txt`
   - Cần: OpenJDK, PostgreSQL, Nginx, SSL

2. **Sau khi cài xong:**
   - Truy cập `https://sonarqube.example.com`
   - Tạo project và token
   - Cập nhật `sonar.host.url` trong workflow

---

## 3. GitHub Actions Integration

### 3.1 Workflow Pipeline

File `.github/workflows/devops-pipeline.yml` định nghĩa ba giai đoạn:

```
Giai đoạn 1: Test Backend + SonarQube Scan
  ├─ npm install
  ├─ npm test (Jest - Unit & Integration Test)
  └─ SonarQube scan → phân tích code

Giai đoạn 2: Build Frontend
  ├─ npm install
  └─ npm run build

Giai đoạn 3: Quality Gate Check & Deploy
  └─ Chỉ chạy khi push vào main branch
  └─ Thông báo deploy tới Render/Vercel
```

### 3.2 Cách Workflow Hoạt Động

1. **Bước 1 - Checkout & Setup Node.js:**
   ```yaml
   - uses: actions/checkout@v3
   - uses: actions/setup-node@v3
   ```
   Lấy code từ repository và chuẩn bị môi trường Node.js

2. **Bước 2 - Cài dependencies & Chạy Test:**
   ```yaml
   - npm install
   - npm test -- --coverage
   ```
   Chạy Jest tests và tạo coverage report

3. **Bước 3 - SonarQube Scan:**
   ```yaml
   - uses: SonarSource/sonarcloud-github-action@master
   ```
   Gửi kết quả test và code lên SonarQube để phân tích:
   - Bug: lỗi logic, null pointer, race condition
   - Code Smell: code khó bảo trì, lặp code
   - Security: lỗ hổng bảo mật
   - Coverage: tỷ lệ test coverage

4. **Bước 4 - Quality Gate:**
   - Nếu pass → Deploy tới Staging
   - Nếu fail → Dừng lại, đợi fix code

---

## 4. Demo cho Giảng Viên & Hội Đồng Chấm Thi

### Bước Demo (Live):

1. **Mở repository trên GitHub:**
   ```
   https://github.com/YourUsername/QuanLySinhVien
   ```

2. **Nhấn vào Tab "Actions":**
   - Xem lịch sử chạy các pipeline
   - Hiển thị status xanh (✓ PASS) hoặc đỏ (✗ FAIL)

3. **Nhấn vào một pipeline thành công:**
   - Xem chi tiết từng bước (test, scan, build)
   - Xem logs của SonarQube scan
   - Chỉ ra các bugs/smells được phát hiện

4. **Mở SonarCloud Dashboard:**
   - https://sonarcloud.io/organizations/[your-org]/projects
   - Hiển thị:
     - Overall Code Quality Grade (A, B, C, ...)
     - Bugs, Vulnerabilities, Code Smells count
     - Code Coverage %
     - Duplications %

5. **Thực hiện thay đổi nhỏ (Optional):**
   - Thêm 1 line code lỗi intentionally
   - `git push` lên repository
   - GitHub Actions tự chạy lại trong vòng 2-3 phút
   - Cho thầy cô xem pipeline tự phát hiện bug

---

## 5. Kết Quả Mong Đợi

Sau khi tích hợp xong:

✅ **CLO3 (Kiểm thử phần mềm):**
- Unit Test: 56 tests pass (Jest)
- Integration Test: Controller layer test
- Static Code Analysis: SonarQube scan

✅ **CLO5 (CI/CD Pipeline):**
- GitHub Actions workflow tự động chạy
- Test → Analyze → Build → Deploy
- Không cần thực hiện bằng tay

✅ **Điểm Demo:**
- Chỉ vào Actions tab → thấy status xanh
- Mở SonarCloud → thấy quality metrics
- Thuyết minh được "Tự động phát hiện lỗi trước khi deploy"

---

## 6. Troubleshooting

### SonarQube Scan Fail?

**Kiểm tra:**
1. SONAR_TOKEN có đúng không? (GitHub Secrets)
2. Organization name có khớp không?
3. projectKey có duy nhất không?

**Fix:**
```bash
# Local test trước
cd Backend
sonar-scanner -Dsonar.login=[YOUR_TOKEN]
```

### Workflow không chạy?

**Kiểm tra:**
1. File `.github/workflows/devops-pipeline.yml` có đúng vị trí?
2. Syntax YAML có lỗi?
3. Branch trigger có đúng (main/develop)?

**Fix:**
- GitHub sẽ hiển thị lỗi YAML tại Actions tab
- Fix theo hướng dẫn

---

## 7. Cấu Trúc File Tóm Tắt

```
QuanLySinhVien/
├── Backend/
│   ├── sonar-project.properties       ← Cấu hình SonarQube
│   ├── package.json                   ← Jest, Supertest
│   ├── tests/
│   │   ├── unit/services/             ← 5 Unit Test Suites
│   │   └── integration/               ← Controller Integration Tests
│   └── src/
├── Frontend/
├── .github/
│   └── workflows/
│       └── devops-pipeline.yml        ← CI/CD Pipeline (Test + Scan + Build + Deploy)
└── DEVOPS_EXAM_BLUEPRINT.md
```

---

## 8. Lợi Ích cho Bài Thi DevOps

| CLO | Lợi Ích |
|-----|---------|
| **CLO2** | Git log cho thấy từng thành viên commit test/scan config |
| **CLO3** | Chứng minh Unit Test (Jest) + Integration Test + Static Analysis (SonarQube) |
| **CLO5** | GitHub Actions tự chạy toàn bộ pipeline: Test → Analyze → Build → Deploy |
| **Demo** | Live demo SonarQube report, hiển thị quality metrics, chỉ ra bugs/smells |

---

**Tóm lại:** SonarQube + GitHub Actions + Jest tạo nên một CI/CD pipeline hoàn chỉnh, tự động phát hiện lỗi sớm, thích hợp cho đề thi DevOps cấp độ mức 4 (tuyệt đối).
