import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, getRoleHome } from '../../contexts/AuthContext';
import { demoAccounts } from '../../data/portalData';

const LoginPage = () => {
	const navigate = useNavigate();
	const { currentUser, login } = useAuth();
	const [formData, setFormData] = useState({ username: 'student01', password: '123456', rememberMe: true });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const demoSummary = useMemo(() => demoAccounts.filter((account) => account.status === 'active'), []);

	useEffect(() => {
		if (currentUser) {
			navigate(getRoleHome(currentUser.role), { replace: true });
		}
	}, [currentUser, navigate]);

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		try {
			const user = await login(formData);
			navigate(getRoleHome(user.role), { replace: true });
		} catch (loginError) {
			setError(loginError.message || 'Không thể đăng nhập.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(63,81,181,0.22),_transparent_34%),linear-gradient(135deg,_#eef2ff_0%,_#f8fafc_55%,_#ffffff_100%)] px-4 py-8 flex items-center justify-center">
			<div className="w-full max-w-6xl grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
				<section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl shadow-slate-900/20 overflow-hidden relative">
					<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(63,81,181,0.35),transparent_35%,rgba(14,165,233,0.15))]" />
					<div className="relative z-10">
						<span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-slate-100">
							SIS PORTAL
						</span>
						<h1 className="mt-6 max-w-xl text-4xl font-black leading-tight md:text-5xl">
							Đăng nhập một lần để đi vào đúng không gian học tập của bạn.
						</h1>
						<p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
							Hệ thống đã tách sẵn màn hình cho học sinh, giáo viên và admin. Đăng nhập bằng tài khoản demo để kiểm tra luồng phân quyền, nhớ đăng nhập và tự động chuyển trang.
						</p>

						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							{[
								{ label: 'Học sinh', value: 'Hồ sơ, điểm số, lịch học' },
								{ label: 'Giáo viên', value: 'Lớp học, điểm danh, thông báo' },
								{ label: 'Admin', value: 'Tài khoản, vai trò, nhật ký' },
							].map((item) => (
								<div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
									<p className="text-sm font-semibold text-white">{item.label}</p>
									<p className="mt-2 text-xs leading-5 text-slate-300">{item.value}</p>
								</div>
							))}
						</div>

						<div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
							<p className="text-sm font-semibold text-white">Tài khoản mẫu</p>
							<div className="mt-4 grid gap-3 sm:grid-cols-3">
								{demoSummary.map((account) => (
									<button
										key={account.username}
										type="button"
										onClick={() => setFormData((prev) => ({ ...prev, username: account.username, password: account.password }))}
										className="rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 text-left transition hover:bg-white/10"
									>
										<p className="text-sm font-semibold text-white">{account.title}</p>
										<p className="mt-1 text-xs text-slate-300">{account.username}</p>
									</button>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
					<div className="mb-6">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3F51B5]">Xác thực người dùng</p>
						<h2 className="mt-2 text-3xl font-extrabold text-slate-900">Đăng nhập hệ thống</h2>
						<p className="mt-2 text-sm text-slate-500">Nhập tài khoản và mật khẩu để vào đúng trang theo vai trò.</p>
					</div>

					{error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

					<form onSubmit={handleSubmit} className="space-y-5">
						<label className="block">
							<span className="mb-2 block text-sm font-medium text-slate-700">Tài khoản</span>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								autoComplete="username"
								required
								className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#3F51B5] focus:bg-white focus:ring-4 focus:ring-indigo-100"
							/>
						</label>

						<label className="block">
							<span className="mb-2 block text-sm font-medium text-slate-700">Mật khẩu</span>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								autoComplete="current-password"
								required
								className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#3F51B5] focus:bg-white focus:ring-4 focus:ring-indigo-100"
							/>
						</label>

						<div className="flex items-center justify-between gap-4">
							<label className="inline-flex items-center gap-3 text-sm text-slate-600">
								<input
									type="checkbox"
									name="rememberMe"
									checked={formData.rememberMe}
									onChange={handleChange}
									className="h-4 w-4 rounded border-slate-300 text-[#3F51B5] focus:ring-[#3F51B5]"
								/>
								Ghi nhớ đăng nhập
							</label>
							<span className="text-xs text-slate-400">Demo: student01 / 123456, teacher01 / 123456, admin / admin123</span>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full rounded-xl bg-[#3F51B5] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
						>
							{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
						</button>
					</form>
				</section>
			</div>
		</div>
	);
};

export default LoginPage;