import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import StatsCard from '../../components/common/StatsCard';
import { useToast } from '../../components/common/ToastNotification';
import { useAuth } from '../../contexts/AuthContext';
import { studentAnnouncements, studentCourses, studentProfileSeed, studentSchedule } from '../../data/portalData';

const StudentDashboard = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { currentUser, logout } = useAuth();
	const [profile, setProfile] = useState(studentProfileSeed);
	const [draftProfile, setDraftProfile] = useState(studentProfileSeed);
	const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isPasswordOpen, setIsPasswordOpen] = useState(false);

	const overview = useMemo(
		() => [
			{ title: 'GPA hiện tại', value: profile.gpa.toFixed(2), icon: 'fas fa-chart-line', colorClass: 'text-[#3F51B5]', bgClass: 'bg-[#E8EAF6]' },
			{ title: 'Chuyên cần', value: `${profile.attendance}%`, icon: 'fas fa-calendar-check', colorClass: 'text-[#2E7D32]', bgClass: 'bg-[#E8F5E9]' },
			{ title: 'Trạng thái', value: profile.status, icon: 'fas fa-user-check', colorClass: 'text-[#EF6C00]', bgClass: 'bg-[#FFF3E0]' },
		],
		[profile],
	);

	const handleLogout = () => {
		logout();
		navigate('/login', { replace: true });
	};

	const saveProfile = (event) => {
		event.preventDefault();
		setProfile(draftProfile);
		setIsProfileOpen(false);
		toast('Đã cập nhật hồ sơ cá nhân.');
	};

	const savePassword = (event) => {
		event.preventDefault();

		if (passwordForm.newPassword.length < 6) {
			toast('Mật khẩu mới phải có ít nhất 6 ký tự.', 'error');
			return;
		}

		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			toast('Xác nhận mật khẩu không khớp.', 'error');
			return;
		}

		setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
		setIsPasswordOpen(false);
		toast('Đã đổi mật khẩu thành công.');
	};

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] text-slate-900">
			<div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
				<header className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3F51B5]">Trang học sinh</p>
						<h1 className="mt-2 text-3xl font-black">Xin chào, {currentUser?.fullName || profile.name}</h1>
						<p className="mt-2 text-sm text-slate-500">Theo dõi hồ sơ, lịch học, kết quả học tập và thông báo từ nhà trường.</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<button onClick={() => setIsProfileOpen(true)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#3F51B5] hover:text-[#3F51B5]">
							Cập nhật hồ sơ
						</button>
						<button onClick={() => setIsPasswordOpen(true)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
							Đổi mật khẩu
						</button>
						<button onClick={handleLogout} className="rounded-xl bg-[#3F51B5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
							Đăng xuất
						</button>
					</div>
				</header>

				<section className="mt-6 grid gap-6 md:grid-cols-3">
					{overview.map((item) => (
						<StatsCard key={item.title} {...item} />
					))}
				</section>

				<section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
					<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-xl font-bold text-slate-900">Thông tin cá nhân</h2>
								<p className="mt-1 text-sm text-slate-500">Hồ sơ cơ bản và liên hệ của sinh viên.</p>
							</div>
							<Badge type="Nam" text="Sinh viên" />
						</div>

						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							{[
								['MSSV', profile.studentId],
								['Họ tên', profile.name],
								['Ngày sinh', new Date(profile.dob).toLocaleDateString('vi-VN')],
								['Lớp', profile.studentClass],
								['Ngành học', profile.major],
								['Email', profile.email],
								['Số điện thoại', profile.phone],
								['Địa chỉ', profile.address],
							].map(([label, value]) => (
								<div key={label} className="rounded-2xl bg-slate-50 p-4">
									<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
									<p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
								</div>
							))}
						</div>
					</div>

					<div className="space-y-6">
						<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
							<h2 className="text-xl font-bold text-slate-900">Môn học đang theo học</h2>
							<div className="mt-4 space-y-3">
								{studentCourses.map((course) => (
									<div key={course.code} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
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

						<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
							<h2 className="text-xl font-bold text-slate-900">Lịch học gần nhất</h2>
							<div className="mt-4 space-y-3">
								{studentSchedule.map((item) => (
									<div key={`${item.day}-${item.subject}`} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
										<div>
											<p className="font-semibold text-slate-900">{item.day}</p>
											<p className="text-sm text-slate-500">{item.time}</p>
										</div>
										<div className="text-right">
											<p className="font-semibold text-slate-900">{item.subject}</p>
											<p className="text-sm text-slate-500">Phòng {item.room}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="mt-6 grid gap-6 lg:grid-cols-2">
					<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
						<h2 className="text-xl font-bold text-slate-900">Thông báo</h2>
						<div className="mt-4 space-y-4">
							{studentAnnouncements.map((item) => (
								<article key={item.title} className="rounded-2xl bg-slate-50 p-4">
									<div className="flex items-center justify-between gap-4">
										<h3 className="font-semibold text-slate-900">{item.title}</h3>
										<span className="text-xs text-slate-400">{item.time}</span>
									</div>
									<p className="mt-2 text-sm text-slate-600">{item.content}</p>
								</article>
							))}
						</div>
					</div>

					<div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Trạng thái học tập</p>
						<h2 className="mt-2 text-2xl font-black">{profile.status}</h2>
						<p className="mt-3 text-sm leading-6 text-slate-300">
							Hệ thống hỗ trợ xem điểm, lịch học, thông báo và thay đổi thông tin cá nhân ngay trên trang học sinh. Các chức năng này hiện chạy trên dữ liệu demo để xác minh luồng giao diện và phân quyền.
						</p>
						<div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm font-semibold text-white">Gợi ý tiếp theo</p>
							<p className="mt-2 text-sm text-slate-300">Kết nối API backend để đồng bộ điểm, danh sách môn học và lịch kiểm tra theo tài khoản thật.</p>
						</div>
					</div>
				</section>
			</div>

			<Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} title="Cập nhật thông tin cá nhân">
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
								value={draftProfile[name]}
								onChange={(event) => setDraftProfile((prev) => ({ ...prev, [name]: event.target.value }))}
								className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#3F51B5] focus:ring-4 focus:ring-indigo-100"
							/>
						</label>
					))}
					<div className="flex justify-end gap-3 pt-2">
						<button type="button" onClick={() => setIsProfileOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
							Hủy
						</button>
						<button type="submit" className="rounded-xl bg-[#3F51B5] px-4 py-2.5 text-sm font-semibold text-white">
							Lưu thay đổi
						</button>
					</div>
				</form>
			</Modal>

			<Modal isOpen={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} title="Đổi mật khẩu">
				<form onSubmit={savePassword} className="space-y-4">
					{[
						['currentPassword', 'Mật khẩu hiện tại', 'password'],
						['newPassword', 'Mật khẩu mới', 'password'],
						['confirmPassword', 'Xác nhận mật khẩu', 'password'],
					].map(([name, label, type]) => (
						<label key={name} className="block">
							<span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
							<input
								type={type}
								value={passwordForm[name]}
								onChange={(event) => setPasswordForm((prev) => ({ ...prev, [name]: event.target.value }))}
								className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#3F51B5] focus:ring-4 focus:ring-indigo-100"
							/>
						</label>
					))}
					<div className="flex justify-end gap-3 pt-2">
						<button type="button" onClick={() => setIsPasswordOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
							Hủy
						</button>
						<button type="submit" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
							Cập nhật
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default StudentDashboard;