import React, { useEffect, useState } from 'react';
import Badge from '../../components/common/Badge';
import { useToast } from '../../components/common/ToastNotification';
import userService from '../../services/userService';

const AccountsView = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      try {
        const data = await userService.fetchUsers();
        setUsers(data);
      } catch {
        toast('Không tải được danh sách tài khoản từ backend.', 'error');
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, [toast]);

  const roleCounts = {
    student: users.filter((user) => user.role === 'student').length,
    teacher: users.filter((user) => user.role === 'teacher').length,
    admin: users.filter((user) => user.role === 'admin').length,
  };

  const updateRole = (userId, role) => {
    userService
      .updateUser(userId, { role })
      .then((updatedUser) => {
        setUsers((prev) => prev.map((user) => (user._id === userId || user.id === userId ? updatedUser : user)));
        toast('Đã cập nhật vai trò tài khoản.');
      })
      .catch(() => {
        toast('Không thể cập nhật vai trò.', 'error');
      });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3F51B5]">Quản lý hệ thống</p>
            <h1 className="mt-2 text-3xl font-black">Tài Khoản & Phân Quyền</h1>
            <p className="mt-2 text-sm text-slate-500">Quản lý tài khoản người dùng và phân quyền truy cập hệ thống.</p>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-bold text-slate-900">Tài khoản và phân quyền</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Người dùng</th>
                    <th className="px-4 py-3">Tài khoản</th>
                    <th className="px-4 py-3">Vai trò</th>
                    <th className="px-4 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {loadingUsers && users.length === 0 ? (
                    <tr>
                      <td className="px-4 py-4 text-sm text-slate-500" colSpan={4}>
                        Đang tải danh sách tài khoản...
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id || user.id}>
                        <td className="px-4 py-3 font-semibold text-slate-900">{user.fullName || user.name}</td>
                        <td className="px-4 py-3 text-slate-600">{user.username}</td>
                        <td className="px-4 py-3">
                          <select
                            value={user.role}
                            onChange={(event) => updateRole(user._id || user.id, event.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#3F51B5]"
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <Badge type={user.status === 'active' ? 'Nam' : 'Nữ'} text={user.status === 'active' ? 'Hoạt động' : 'Đã khóa'} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-bold text-slate-900">Phân bố vai trò</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>Học sinh</span>
                <span className="font-semibold">{roleCounts.student}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>Giáo viên</span>
                <span className="font-semibold">{roleCounts.teacher}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>Admin</span>
                <span className="font-semibold">{roleCounts.admin}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountsView;
