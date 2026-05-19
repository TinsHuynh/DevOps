import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import StatsCard from '../../components/common/StatsCard';
import { useToast } from '../../components/common/ToastNotification';
import { useAuth } from '../../contexts/AuthContext';
import { teacherClasses, teacherStudents, teacherTasks } from '../../data/portalData';

const TeacherDashboard = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { currentUser, logout } = useAuth();
	const [announcement, setAnnouncement] = useState('');
	const [gradeNote, setGradeNote] = useState('');
	const [attendanceRows, setAttendanceRows] = useState(teacherStudents);
	const [isNoticeOpen, setIsNoticeOpen] = useState(false);

	const stats = useMemo(
		() => [
			{ title: 'Lớp phụ trách', value: teacherClasses.length, icon: 'fas fa-chalkboard', colorClass: 'text-[#3F51B5]', bgClass: 'bg-[#E8EAF6]' },
			{ title: 'Học sinh theo dõi', value: attendanceRows.length, icon: 'fas fa-user-graduate', colorClass: 'text-[#2E7D32]', bgClass: 'bg-[#E8F5E9]' },
			{ title: 'Chuyên cần trung bình', value: '94%', icon: 'fas fa-clipboard-check', colorClass: 'text-[#EF6C00]', bgClass: 'bg-[#FFF3E0]' },
		],
		[attendanceRows.length],
	);

	const handleLogout = () => {
		logout();
		navigate('/login', { replace: true });
	};

	const toggleAttendance = (studentId) => {
		setAttendanceRows((rows) =>
			rows.map((student) =>
				student.id !== studentId
					? student
					: {
							...student,
							attendance: student.attendance === 'Vắng' ? 'Có mặt' : 'Vắng',
						},
			),
		);
	};

	const submitNotice = (event) => {
		event.preventDefault();
		if (!announcement.trim()) {
			toast('Vui lòng nhập nội dung thông báo.', 'error');
			return;
		}

		setAnnouncement('');
		setIsNoticeOpen(false);
		toast('Đã gửi thông báo đến lớp.');
	};

	return (
		<div className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)] text-slate-900">
			<div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
				<header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3F51B5]">Trang giáo viên</p>
							<h1 className="mt-2 text-3xl font-black">{currentUser?.fullName || 'Giáo viên'}</h1>
							<p className="mt-2 text-sm text-slate-500">Quản lý lớp học, điểm danh, đánh giá và gửi thông báo cho sinh viên.</p>
						</div>

						<div className="flex flex-wrap gap-3">
							<button onClick={() => setIsNoticeOpen(true)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
								Gửi thông báo
							</button>
							<button onClick={handleLogout} className="rounded-xl bg-[#3F51B5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
								Đăng xuất
							</button>
						</div>
					</div>
				</header>

				<section className="mt-6 grid gap-6 md:grid-cols-3">
					{stats.map((item) => (
						<StatsCard key={item.title} {...item} />
					))}
				</section>

				<section className="mt-6 grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
					<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
						<h2 className="text-xl font-bold text-slate-900">Lớp và môn được phân công</h2>
						<div className="mt-4 space-y-4">
							{teacherClasses.map((item) => (
								<div key={item.name} className="rounded-2xl bg-slate-50 p-4">
									<div className="flex items-start justify-between gap-3">
										<div>
											<p className="font-semibold text-slate-900">Lớp {item.name}</p>
											<p className="text-sm text-slate-500">Môn: {item.subject}</p>
										</div>
										<Badge type={item.attendance > 95 ? 'Nam' : 'Nữ'} text={`${item.attendance}% chuyên cần`} />
									</div>
									<div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
										<span className="rounded-full bg-white px-3 py-1">Sĩ số: {item.size}</span>
										<span className="rounded-full bg-white px-3 py-1">Lịch học tiếp: {item.nextLesson}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
						<div className="flex items-center justify-between gap-3">
							<div>
								<h2 className="text-xl font-bold text-slate-900">Danh sách học sinh</h2>
								<p className="mt-1 text-sm text-slate-500">Điểm danh và cập nhật trạng thái nhanh.</p>
							</div>
							<button onClick={() => setGradeNote('Đã cập nhật nhận xét mẫu cho lớp CNTT01.')} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">
								Lưu nhận xét
							</button>
						</div>

						<div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
							<table className="min-w-full divide-y divide-slate-100 text-sm">
								<thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
									<tr>
										<th className="px-4 py-3">Sinh viên</th>
										<th className="px-4 py-3">Lớp</th>
										<th className="px-4 py-3">Điểm</th>
										<th className="px-4 py-3">Điểm danh</th>
										<th className="px-4 py-3"></th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100 bg-white">
									{attendanceRows.map((student) => (
										<tr key={student.id}>
											<td className="px-4 py-3 font-semibold text-slate-900">{student.name}</td>
											<td className="px-4 py-3 text-slate-600">{student.className}</td>
											<td className="px-4 py-3 text-slate-600">{student.score}</td>
											<td className="px-4 py-3 text-slate-600">{student.attendance}</td>
											<td className="px-4 py-3 text-right">
												<button onClick={() => toggleAttendance(student.id)} className="rounded-lg bg-[#3F51B5] px-3 py-2 text-xs font-semibold text-white">
													Đổi trạng thái
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{gradeNote && <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{gradeNote}</p>}
					</div>
				</section>

				<section className="mt-6 grid gap-6 lg:grid-cols-2">
					<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
						<h2 className="text-xl font-bold text-slate-900">Nhiệm vụ nhanh</h2>
						<div className="mt-4 space-y-3">
							{teacherTasks.map((task) => (
								<div key={task} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
									<i className="fas fa-circle-check text-emerald-500" />
									<span>{task}</span>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Nhận xét lớp</p>
						<p className="mt-3 text-sm leading-6 text-slate-300">
							Tỷ lệ chuyên cần đang giữ ở mức tốt. Nên ưu tiên theo dõi các sinh viên vắng nhiều buổi và gửi nhắc nhở ngay trong buổi học.
						</p>
						<div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm font-semibold text-white">Tổng quan nhanh</p>
							<p className="mt-2 text-sm text-slate-300">Tích hợp phần nhập điểm, thông báo lớp và lịch kiểm tra là bước tiếp theo để khép kín quy trình giáo viên.</p>
						</div>
					</div>
				</section>
			</div>

			<Modal isOpen={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} title="Gửi thông báo cho lớp">
				<form onSubmit={submitNotice} className="space-y-4">
					<label className="block">
						<span className="mb-1 block text-sm font-medium text-slate-700">Nội dung</span>
						<textarea
							rows="4"
							value={announcement}
							onChange={(event) => setAnnouncement(event.target.value)}
							className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#3F51B5] focus:ring-4 focus:ring-indigo-100"
							placeholder="Nhập nội dung thông báo cho lớp hoặc sinh viên..."
						/>
					</label>
					<div className="flex justify-end gap-3 pt-2">
						<button type="button" onClick={() => setIsNoticeOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
							Hủy
						</button>
						<button type="submit" className="rounded-xl bg-[#3F51B5] px-4 py-2.5 text-sm font-semibold text-white">
							Gửi thông báo
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default TeacherDashboard;