import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import { useToast } from '../../components/common/ToastNotification';

const NotificationsView = () => {
  const toast = useToast();
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [systemNotice, setSystemNotice] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Bảo trì hệ thống',
      content: 'Hệ thống sẽ bảo trì vào ngày thứ ba từ 2:00 AM đến 4:00 AM',
      date: '2024-05-15',
      status: 'published',
    },
    {
      id: 2,
      title: 'Cập nhật chính sách',
      content: 'Chính sách học tập mới đã được cập nhật. Vui lòng kiểm tra lại.',
      date: '2024-05-10',
      status: 'published',
    },
  ]);

  const submitNotice = (event) => {
    event.preventDefault();
    if (!systemNotice.trim()) {
      toast('Vui lòng nhập nội dung thông báo.', 'error');
      return;
    }

    const newNotification = {
      id: notifications.length + 1,
      title: 'Thông báo mới',
      content: systemNotice,
      date: new Date().toISOString().split('T')[0],
      status: 'published',
    };

    setNotifications([newNotification, ...notifications]);
    setSystemNotice('');
    setIsNoticeOpen(false);
    toast('Đã tạo thông báo hệ thống.');
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    toast('Đã xóa thông báo.');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3F51B5]">Quản lý hệ thống</p>
            <h1 className="mt-2 text-3xl font-black">Thông Báo Hệ Thống</h1>
            <p className="mt-2 text-sm text-slate-500">Tạo và quản lý thông báo gửi đến người dùng.</p>
          </div>
          <button
            onClick={() => setIsNoticeOpen(true)}
            className="rounded-xl bg-[#3F51B5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            + Tạo thông báo
          </button>
        </header>

        <section className="mt-6">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center">
                <i className="fas fa-inbox text-4xl text-slate-300 mb-4" />
                <p className="text-slate-500">Không có thông báo nào</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">{notif.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{notif.content}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                        <span>
                          <i className="fas fa-calendar-alt mr-2" />
                          {notif.date}
                        </span>
                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-green-700 font-semibold">
                          {notif.status === 'published' ? 'Đã phát hành' : 'Nháp'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="ml-4 text-slate-400 hover:text-red-600 transition"
                    >
                      <i className="fas fa-trash text-lg" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <Modal isOpen={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} title="Tạo thông báo hệ thống">
        <form onSubmit={submitNotice} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Nội dung thông báo</span>
            <textarea
              rows="4"
              value={systemNotice}
              onChange={(event) => setSystemNotice(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#3F51B5] focus:ring-4 focus:ring-indigo-100"
              placeholder="Nhập thông báo áp dụng cho toàn hệ thống..."
            />
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsNoticeOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
              Hủy
            </button>
            <button type="submit" className="rounded-xl bg-[#3F51B5] px-4 py-2.5 text-sm font-semibold text-white">
              Lưu thông báo
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NotificationsView;
