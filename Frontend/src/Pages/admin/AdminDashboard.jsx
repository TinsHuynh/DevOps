import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import StatsCard from '../../components/common/StatsCard';
import { useToast } from '../../components/common/ToastNotification';
import { useAuth } from '../../contexts/AuthContext';
import { adminLogs, adminOverview, adminUsers } from '../../data/portalData';
import userService from '../../services/userService';

const AdminDashboard = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { currentUser, logout } = useAuth();
	const [users, setUsers] = useState(adminUsers);
	const [loadingUsers, setLoadingUsers] = useState(false);
	const [isNoticeOpen, setIsNoticeOpen] = useState(false);
	const [systemNotice, setSystemNotice] = useState('');

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

	const roleCounts = useMemo(
		() => ({
			student: users.filter((user) => user.role === 'student').length,
			teacher: users.filter((user) => user.role === 'teacher').length,
			admin: users.filter((user) => user.role === 'admin').length,
		}),
		[users],
	);

	const handleLogout = () => {
		logout();
		navigate('/login', { replace: true });
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

	const submitNotice = (event) => {
		event.preventDefault();
		if (!systemNotice.trim()) {
			toast('Vui lòng nhập nội dung thông báo.', 'error');
			return;
		}

		setSystemNotice('');
		setIsNoticeOpen(false);
		toast('Đã tạo thông báo hệ thống.');
	};

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] text-slate-900">
			<div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
				<header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3F51B5]">Trang admin</p>
							<h1 className="mt-2 text-3xl font-black">{currentUser?.fullName || 'Quản trị hệ thống'}</h1>
							<p className="mt-2 text-sm text-slate-500">Quản lý tài khoản, phân quyền, thông báo hệ thống và giám sát hoạt động.</p>
						</div>

						<div className="flex flex-wrap gap-3">
							<button onClick={() => navigate('/admin/students')} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#3F51B5] hover:text-[#3F51B5]">
								Quản lý sinh viên
							</button>
							<button onClick={() => setIsNoticeOpen(true)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
								Tạo thông báo
							</button>
							<button onClick={handleLogout} className="rounded-xl bg-[#3F51B5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
								Đăng xuất
							</button>
						</div>
					</div>
				</header>

				<section className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
					{adminOverview.map((item) => {
						const palette = {
							blue: { colorClass: 'text-[#3F51B5]', bgClass: 'bg-[#E8EAF6]' },
							green: { colorClass: 'text-[#2E7D32]', bgClass: 'bg-[#E8F5E9]' },
							amber: { colorClass: 'text-[#EF6C00]', bgClass: 'bg-[#FFF3E0]' },
							rose: { colorClass: 'text-[#C2185B]', bgClass: 'bg-[#FCE4EC]' },
						}[item.tone];

						return <StatsCard key={item.title} title={item.title} value={item.value} icon={item.icon} {...palette} />;
					})}
				</section>

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

					<div className="space-y-6">
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

						<div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Nhật ký gần nhất</p>
							<div className="mt-4 space-y-3 text-sm text-slate-300">
								{adminLogs.map((log) => (
									<div key={log} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
										{log}
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
					<h2 className="text-xl font-bold text-slate-900">Tác vụ nhanh</h2>
					<div className="mt-4 grid gap-4 md:grid-cols-3">
						{[
							['Quản lý sinh viên', 'Đi tới trang CRUD sinh viên.', '/admin/students'],
							['Xem trang giáo viên', 'Kiểm tra các chức năng lớp học.', '/teacher'],
							['Xem trang học sinh', 'Kiểm tra hồ sơ và lịch học.', '/students'],
						].map(([title, description, path]) => (
							<button key={title} onClick={() => navigate(path)} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-[#3F51B5] hover:bg-white">
								<p className="text-base font-semibold text-slate-900">{title}</p>
								<p className="mt-2 text-sm text-slate-500">{description}</p>
							</button>
						))}
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

export default AdminDashboard;