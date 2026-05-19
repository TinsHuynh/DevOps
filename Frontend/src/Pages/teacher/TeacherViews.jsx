import React, { useState } from 'react';
import Modal from '../../Components/common/Modal';
import StatsCard from '../../Components/common/StatsCard';
import Badge from '../../Components/common/Badge';
import { useToast } from '../../Components/common/ToastNotification';
import { teacherClasses, teacherStudents, teacherTasks } from '../../data/portalData';

// ─── Overview ────────────────────────────────────────────────────────────────
export const TeacherOverviewView = () => {
  const stats = [
    { title: 'Lớp phụ trách', value: teacherClasses.length, icon: 'fas fa-chalkboard', colorClass: 'text-[#2E7D32]', bgClass: 'bg-green-50' },
    { title: 'Học sinh theo dõi', value: teacherStudents.length, icon: 'fas fa-user-graduate', colorClass: 'text-[#3F51B5]', bgClass: 'bg-indigo-50' },
    { title: 'Chuyên cần TB', value: '94%', icon: 'fas fa-clipboard-check', colorClass: 'text-[#EF6C00]', bgClass: 'bg-orange-50' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#2E7D32]">Tổng Quan</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900">Dashboard Giáo Viên</h1>
        <p className="mt-2 text-sm text-slate-500">Theo dõi lớp học, học sinh và thực hiện các thao tác nhanh.</p>
      </header>

      <section className="mt-6 grid gap-6 md:grid-cols-3">
        {stats.map((item) => <StatsCard key={item.title} {...item} />)}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Lớp phụ trách */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Lớp & Môn phụ trách</h2>
          <div className="space-y-3">
            {teacherClasses.map((item) => (
              <div key={item.name} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">Lớp {item.name}</p>
                    <p className="text-sm text-slate-500">Môn: {item.subject}</p>
                  </div>
                  <Badge type={item.attendance > 95 ? 'Nam' : 'Nữ'} text={`${item.attendance}%`} />
                </div>
                <div className="mt-2 flex gap-3 text-xs text-slate-500">
                  <span className="rounded-full bg-white px-3 py-1 border">Sĩ số: {item.size}</span>
                  <span className="rounded-full bg-white px-3 py-1 border">Tiếp theo: {item.nextLesson}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nhiệm vụ */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Nhiệm vụ cần làm</h2>
          <div className="space-y-3">
            {teacherTasks.map((task) => (
              <div key={task} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <i className="fas fa-circle-check text-green-500" />
                {task}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── Classes ─────────────────────────────────────────────────────────────────
export const TeacherClassesView = () => (
  <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#2E7D32]">Quản Lý</p>
      <h1 className="mt-1 text-3xl font-black text-slate-900">Lớp Phụ Trách</h1>
    </header>
    <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {teacherClasses.map((item) => (
        <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center">
              <i className="fas fa-chalkboard text-[#2E7D32] text-xl" />
            </div>
            <Badge type={item.attendance > 95 ? 'Nam' : 'Nữ'} text={`${item.attendance}% chuyên cần`} />
          </div>
          <h3 className="mt-4 text-xl font-black text-slate-900">Lớp {item.name}</h3>
          <p className="text-sm text-slate-500 mt-1">Môn: {item.subject}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-xs text-slate-400 mb-1">Sĩ số</p>
              <p className="font-bold text-slate-900">{item.size}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-xs text-slate-400 mb-1">Buổi tiếp</p>
              <p className="font-bold text-slate-900 text-xs">{item.nextLesson}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  </div>
);

// ─── Students List ────────────────────────────────────────────────────────────
export const TeacherStudentsView = () => (
  <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#2E7D32]">Theo Dõi</p>
      <h1 className="mt-1 text-3xl font-black text-slate-900">Danh Sách Học Sinh</h1>
    </header>
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-6 py-4 font-semibold">MSSV</th>
            <th className="px-6 py-4 font-semibold">Họ tên</th>
            <th className="px-6 py-4 font-semibold">Lớp</th>
            <th className="px-6 py-4 font-semibold">Điểm</th>
            <th className="px-6 py-4 font-semibold">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {teacherStudents.map((student) => (
            <tr key={student.id} className="hover:bg-slate-50/50 transition">
              <td className="px-6 py-4 font-mono text-slate-500">{student.id}</td>
              <td className="px-6 py-4 font-semibold text-slate-900">{student.name}</td>
              <td className="px-6 py-4 text-slate-600">{student.className}</td>
              <td className="px-6 py-4 font-bold text-[#2E7D32]">{student.score}</td>
              <td className="px-6 py-4">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  student.attendance === 'Vắng'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-green-50 text-green-700'
                }`}>
                  {student.attendance}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </div>
);

// ─── Attendance ───────────────────────────────────────────────────────────────
export const TeacherAttendanceView = () => {
  const [rows, setRows] = useState(teacherStudents);
  const [saved, setSaved] = useState(false);
  const toast = useToast();

  const toggle = (id) => {
    setRows((prev) =>
      prev.map((s) =>
        s.id !== id ? s : { ...s, attendance: s.attendance === 'Vắng' ? 'Có mặt' : 'Vắng' }
      )
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast('Đã lưu kết quả điểm danh.');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2E7D32]">Chuyên Cần</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">Điểm Danh</h1>
        </div>
        <button
          onClick={handleSave}
          className="rounded-xl bg-[#2E7D32] px-4 py-3 text-sm font-semibold text-white hover:bg-green-800 transition"
        >
          <i className="fas fa-save mr-2" />Lưu điểm danh
        </button>
      </header>

      {saved && (
        <div className="mt-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          <i className="fas fa-check-circle mr-2" />Đã lưu kết quả điểm danh thành công.
        </div>
      )}

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Sinh viên</th>
              <th className="px-6 py-4 font-semibold">Lớp</th>
              <th className="px-6 py-4 font-semibold">Trạng thái</th>
              <th className="px-6 py-4 font-semibold text-right">Đổi trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-4 font-semibold text-slate-900">{student.name}</td>
                <td className="px-6 py-4 text-slate-600">{student.className}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    student.attendance === 'Vắng' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {student.attendance}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => toggle(student.id)}
                    className="rounded-lg bg-[#2E7D32] px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 transition"
                  >
                    Đổi trạng thái
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

// ─── Announcements ────────────────────────────────────────────────────────────
export const TeacherAnnouncementsView = () => {
  const toast = useToast();
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast('Vui lòng nhập nội dung thông báo.', 'error');
      return;
    }
    setSent((prev) => [{ content: text, time: 'Vừa xong' }, ...prev]);
    setText('');
    setIsOpen(false);
    toast('Đã gửi thông báo đến lớp.');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2E7D32]">Truyền Thông</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">Gửi Thông Báo</h1>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-xl bg-[#2E7D32] px-4 py-3 text-sm font-semibold text-white hover:bg-green-800 transition"
        >
          <i className="fas fa-bullhorn mr-2" />Tạo thông báo mới
        </button>
      </header>

      <section className="mt-6 space-y-4">
        {sent.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <i className="fas fa-bullhorn text-4xl text-slate-300 mb-4" />
            <p className="text-slate-500">Chưa có thông báo nào được gửi trong phiên này.</p>
          </div>
        ) : (
          sent.map((item, idx) => (
            <article key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <i className="fas fa-bullhorn text-[#2E7D32]" />
                  </div>
                  <span className="font-semibold text-slate-900">Thông báo cho lớp</span>
                </div>
                <span className="text-xs text-slate-400">{item.time}</span>
              </div>
              <p className="text-sm text-slate-600 leading-6">{item.content}</p>
            </article>
          ))
        )}
      </section>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Gửi thông báo cho lớp">
        <form onSubmit={handleSend} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Nội dung thông báo</span>
            <textarea
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2E7D32] focus:ring-4 focus:ring-green-100"
              placeholder="Nhập nội dung thông báo cho lớp hoặc sinh viên..."
            />
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Hủy</button>
            <button type="submit" className="rounded-xl bg-[#2E7D32] px-4 py-2.5 text-sm font-semibold text-white">Gửi thông báo</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// ─── Tasks ────────────────────────────────────────────────────────────────────
export const TeacherTasksView = () => {
  const [tasks, setTasks] = useState(teacherTasks.map((t, i) => ({ id: i, text: t, done: false })));

  const toggle = (id) => setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#2E7D32]">Công Việc</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900">Nhiệm Vụ</h1>
      </header>
      <section className="mt-6 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggle(task.id)}
            className={`flex items-center gap-4 rounded-2xl border p-5 cursor-pointer transition ${
              task.done ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:border-green-300'
            }`}
          >
            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
              task.done ? 'bg-[#2E7D32] border-[#2E7D32]' : 'border-slate-300'
            }`}>
              {task.done && <i className="fas fa-check text-white text-xs" />}
            </div>
            <span className={`text-sm font-medium transition ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
              {task.text}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};
