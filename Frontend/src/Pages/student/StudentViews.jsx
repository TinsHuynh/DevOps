import React, { useState } from 'react';
import Badge from '../../Components/common/Badge';
import Modal from '../../Components/common/Modal';
import StatsCard from '../../Components/common/StatsCard';
import { useToast } from '../../Components/common/ToastNotification';
import { useAuth } from '../../contexts/AuthContext';
import {
  studentAnnouncements,
  studentCourses,
  studentProfileSeed,
  studentSchedule,
} from '../../data/portalData';

// ─── Overview ───────────────────────────────────────────────────────────────
export const StudentOverviewView = () => {
  const { currentUser } = useAuth();
  const profile = studentProfileSeed;

  const stats = [
    { title: 'GPA hiện tại', value: profile.gpa.toFixed(2), icon: 'fas fa-chart-line', colorClass: 'text-[#0E7490]', bgClass: 'bg-cyan-50' },
    { title: 'Chuyên cần', value: `${profile.attendance}%`, icon: 'fas fa-calendar-check', colorClass: 'text-[#2E7D32]', bgClass: 'bg-green-50' },
    { title: 'Trạng thái', value: profile.status, icon: 'fas fa-user-check', colorClass: 'text-[#EF6C00]', bgClass: 'bg-orange-50' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0E7490]">Tổng Quan</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900">
          Xin chào, {currentUser?.fullName || profile.name}!
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Theo dõi tình hình học tập, lịch học và thông báo từ nhà trường.
        </p>
      </header>

      <section className="mt-6 grid gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Môn học gần nhất */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Môn học đang theo học</h2>
          <div className="space-y-3">
            {studentCourses.map((course) => (
              <div key={course.code} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">{course.name}</p>
                  <p className="text-sm text-slate-500">{course.code}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{course.score}</p>
                  <p className="text-xs text-slate-500">{course.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thông báo mới nhất */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Thông báo mới nhất</h2>
          <div className="space-y-3">
            {studentAnnouncements.map((item) => (
              <article key={item.title} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{item.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── Profile ─────────────────────────────────────────────────────────────────
export const StudentProfileView = () => {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState(studentProfileSeed);
  const [draft, setDraft] = useState(studentProfileSeed);
  const [isOpen, setIsOpen] = useState(false);

  const saveProfile = (e) => {
    e.preventDefault();
    setProfile(draft);
    setIsOpen(false);
    toast('Đã cập nhật hồ sơ cá nhân.');
  };

  const fields = [
    ['MSSV', profile.studentId],
    ['Họ tên', profile.name],
    ['Ngày sinh', new Date(profile.dob).toLocaleDateString('vi-VN')],
    ['Lớp', profile.studentClass],
    ['Ngành học', profile.major],
    ['Email', profile.email],
    ['Số điện thoại', profile.phone],
    ['Địa chỉ', profile.address],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#0E7490]">Hồ Sơ</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">Thông Tin Cá Nhân</h1>
        </div>
        <button
          onClick={() => { setDraft(profile); setIsOpen(true); }}
          className="rounded-xl bg-[#0E7490] px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-700 transition"
        >
          <i className="fas fa-pen mr-2" />Cập nhật hồ sơ
        </button>
      </header>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Chi tiết hồ sơ</h2>
          <Badge type="Nam" text="Sinh viên" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(([label, value]) => (
            <div key={label} className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Cập nhật thông tin cá nhân">
        <form onSubmit={saveProfile} className="space-y-4">
          {[
            ['name', 'Họ tên'],
            ['phone', 'Số điện thoại'],
            ['address', 'Địa chỉ'],
            ['studentClass', 'Lớp'],
            ['major', 'Ngành học'],
          ].map(([name, label]) => (
            <label key={name} className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
              <input
                type="text"
                value={draft[name]}
                onChange={(e) => setDraft((p) => ({ ...p, [name]: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0E7490] focus:ring-4 focus:ring-cyan-100"
              />
            </label>
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Hủy</button>
            <button type="submit" className="rounded-xl bg-[#0E7490] px-4 py-2.5 text-sm font-semibold text-white">Lưu thay đổi</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// ─── Courses & Grades ─────────────────────────────────────────────────────────
export const StudentCoursesView = () => (
  <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#0E7490]">Học Tập</p>
      <h1 className="mt-1 text-3xl font-black text-slate-900">Môn Học & Điểm Số</h1>
    </header>
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-6 py-4 font-semibold">Mã môn</th>
            <th className="px-6 py-4 font-semibold">Tên môn học</th>
            <th className="px-6 py-4 font-semibold">Điểm</th>
            <th className="px-6 py-4 font-semibold">Xếp loại</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {studentCourses.map((course) => (
            <tr key={course.code} className="hover:bg-slate-50/50 transition">
              <td className="px-6 py-4 font-mono text-slate-500">{course.code}</td>
              <td className="px-6 py-4 font-semibold text-slate-900">{course.name}</td>
              <td className="px-6 py-4 font-bold text-[#0E7490]">{course.score}</td>
              <td className="px-6 py-4">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  course.status === 'Giỏi' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {course.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </div>
);

// ─── Schedule ─────────────────────────────────────────────────────────────────
export const StudentScheduleView = () => (
  <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#0E7490]">Thời Khóa Biểu</p>
      <h1 className="mt-1 text-3xl font-black text-slate-900">Lịch Học</h1>
    </header>
    <section className="mt-6 space-y-4">
      {studentSchedule.map((item) => (
        <div
          key={`${item.day}-${item.subject}`}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-50 flex items-center justify-center">
              <i className="fas fa-calendar-day text-[#0E7490] text-xl" />
            </div>
            <div>
              <p className="font-bold text-slate-900">{item.day}</p>
              <p className="text-sm text-slate-500">{item.time}</p>
            </div>
          </div>
          <div className="text-right sm:text-right">
            <p className="font-semibold text-slate-900">{item.subject}</p>
            <p className="text-sm text-slate-500">Phòng {item.room}</p>
          </div>
        </div>
      ))}
    </section>
  </div>
);

// ─── Announcements ────────────────────────────────────────────────────────────
export const StudentAnnouncementsView = () => (
  <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#0E7490]">Truyền Thông</p>
      <h1 className="mt-1 text-3xl font-black text-slate-900">Thông Báo</h1>
    </header>
    <section className="mt-6 space-y-4">
      {studentAnnouncements.map((item) => (
        <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                <i className="fas fa-bell text-[#0E7490]" />
              </div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
            </div>
            <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
          </div>
          <p className="mt-3 text-sm text-slate-600 leading-6">{item.content}</p>
        </article>
      ))}
    </section>
  </div>
);

// ─── Change Password ──────────────────────────────────────────────────────────
export const StudentPasswordView = () => {
  const toast = useToast();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6) {
      toast('Mật khẩu mới phải có ít nhất 6 ký tự.', 'error');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast('Xác nhận mật khẩu không khớp.', 'error');
      return;
    }
    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast('Đã đổi mật khẩu thành công.');
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-6 md:px-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0E7490]">Bảo Mật</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900">Đổi Mật Khẩu</h1>
      </header>
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ['currentPassword', 'Mật khẩu hiện tại'],
            ['newPassword', 'Mật khẩu mới'],
            ['confirmPassword', 'Xác nhận mật khẩu'],
          ].map(([name, label]) => (
            <label key={name} className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
              <input
                type="password"
                value={form[name]}
                onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0E7490] focus:ring-4 focus:ring-cyan-100"
              />
            </label>
          ))}
          <div className="flex justify-end pt-2">
            <button type="submit" className="rounded-xl bg-[#0E7490] px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700 transition">
              Cập nhật mật khẩu
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
