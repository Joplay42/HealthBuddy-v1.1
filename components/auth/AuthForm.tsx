"use client";
import { authFormProps, handleFormSubmitProps } from "@/types";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createUser, loginUser } from "@/utils";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

// ─── Shared brand panel ───────────────────────────────────────────────────────

type BadgeLabel = "Welcome back" | "Join free";

const MiniDashboard = ({ showChart }: { showChart: boolean }) => (
	<div className='rounded-2xl bg-ink-850 ring-soft p-4 max-w-md'>
		<div className='flex items-center justify-between'>
			<div>
				<p className='text-[10px] text-white/40'>Home</p>
				<p className='text-sm font-semibold'>
					Welcome back <span className='text-lime'>Alex M.</span> 👋
				</p>
			</div>
			<span className='h-2 w-2 rounded-full bg-lime' />
		</div>

		<p className='mt-3 text-[10px] uppercase tracking-widest text-white/40'>
			Calories
		</p>
		<div className='mt-2 flex items-center gap-4'>
			<div className='relative h-16 w-16 shrink-0'>
				<svg viewBox='0 0 36 36' className='h-16 w-16 -rotate-90'>
					<circle
						cx='18'
						cy='18'
						r='15.9'
						stroke='#2c2c30'
						strokeWidth='3.5'
						fill='none'
					/>
					<circle
						cx='18'
						cy='18'
						r='15.9'
						stroke='#C7F94C'
						strokeWidth='3.5'
						fill='none'
						strokeDasharray='100'
						strokeDashoffset='16'
						strokeLinecap='round'
					/>
				</svg>
				<div className='absolute inset-0 grid place-items-center'>
					<div className='text-center leading-none'>
						<p className='num-tabular font-extrabold text-[15px]'>242</p>
						<p className='text-[8px] text-white/40 mt-0.5'>remaining</p>
					</div>
				</div>
			</div>
			<div className='flex-1 grid grid-cols-3 gap-2 text-[10px]'>
				{[
					{ label: "Protein", value: "65", pct: "72%" },
					{ label: "Carbs", value: "98", pct: "55%" },
					{ label: "Fat", value: "22", pct: "38%" },
				].map((m) => (
					<div key={m.label}>
						<p className='text-white/40'>{m.label}</p>
						<p className='num-tabular font-bold text-white/85'>
							{m.value}
							<span className='text-white/40'>g</span>
						</p>
						<div className='mt-1 h-1 rounded-full bg-ink-700 overflow-hidden'>
							<div className='h-full bg-lime' style={{ width: m.pct }} />
						</div>
					</div>
				))}
			</div>
		</div>

		{showChart && (
			<>
				<p className='mt-4 text-[10px] uppercase tracking-widest text-white/40'>
					Body weight
				</p>
				<svg viewBox='0 0 320 60' className='mt-1 w-full h-14'>
					<defs>
						<linearGradient id='bwg' x1='0' x2='0' y1='0' y2='1'>
							<stop offset='0' stopColor='#C7F94C' stopOpacity='0.45' />
							<stop offset='1' stopColor='#C7F94C' stopOpacity='0' />
						</linearGradient>
					</defs>
					<polyline
						points='0,40 30,30 60,38 90,22 120,30 150,18 180,26 210,12 240,20 270,8 300,18 320,10'
						fill='none'
						stroke='#C7F94C'
						strokeWidth='2'
						strokeLinejoin='round'
					/>
					<polyline
						points='0,40 30,30 60,38 90,22 120,30 150,18 180,26 210,12 240,20 270,8 300,18 320,10 320,60 0,60'
						fill='url(#bwg)'
						stroke='none'
					/>
				</svg>
			</>
		)}
	</div>
);

const BrandPanel = ({
	badge,
	valueProps,
}: {
	badge: BadgeLabel;
	valueProps?: string[];
}) => (
	<aside className='relative bg-ink-900 p-8 lg:p-12 flex flex-col overflow-hidden'>
		<div
			aria-hidden='true'
			className='pointer-events-none absolute -top-40 -left-20 w-[600px] h-[400px] rounded-full'
			style={{
				background:
					"radial-gradient(closest-side, rgba(199,249,76,.10), transparent 70%)",
			}}
		/>

		<Link href='/' className='relative flex items-center w-fit'>
			<Image
				src='/Logo-mobile.png'
				width={80}
				height={80}
				alt='HealthBuddy logo'
			/>
		</Link>

		<div className='relative mt-12 lg:mt-20 max-w-md'>
			<span className='inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/55 bg-white/5 ring-soft rounded-full px-3 py-1.5'>
				<svg
					className='h-3 w-3 text-lime'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth={3}
				>
					<path d='M7 17L17 7M9 7h8v8' />
				</svg>
				{badge}
			</span>
			<h1 className='mt-5 font-black tracking-tightest leading-[0.98] text-4xl lg:text-5xl text-bone'>
				The simplest way
				<br />
				to track your
				<br />
				<span className='text-lime'>progress</span>
			</h1>
			<p className='mt-5 text-white/55 max-w-sm text-sm leading-relaxed'>
				HealthBuddy is the best training applications to track your progress.
			</p>

			{valueProps && (
				<ul className='mt-7 space-y-2.5 text-sm'>
					{valueProps.map((item) => (
						<li key={item} className='flex items-center gap-3 text-white/75'>
							<span className='h-5 w-5 rounded-md bg-lime/15 grid place-items-center text-lime shrink-0'>
								<svg
									className='h-3 w-3'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth={3}
									strokeLinecap='round'
								>
									<path d='M5 12l4 4 10-10' />
								</svg>
							</span>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>

		<div className='relative mt-auto pt-10'>
			<MiniDashboard showChart={badge === "Welcome back"} />
		</div>
	</aside>
);

// ─── Auth Form ────────────────────────────────────────────────────────────────

const AuthForm = ({ type }: authFormProps) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const passwordStrength = (() => {
		if (password.length === 0) return 0;
		let score = 0;
		if (password.length >= 8) score++;
		if (/[A-Z]/.test(password)) score++;
		if (/[0-9]/.test(password)) score++;
		if (/[^A-Za-z0-9]/.test(password)) score++;
		return score;
	})();

	const strengthLabel = ["", "weak", "fair", "good", "strong"][
		passwordStrength
	];
	const strengthColor = [
		"",
		"bg-red-500",
		"bg-yellow-500",
		"bg-lime-600",
		"bg-lime",
	][passwordStrength];

	const handleSubmit = async ({ type, event }: handleFormSubmitProps) => {
		setLoading(true);
		event?.preventDefault();
		setError("");

		if (type === "signin") {
			try {
				const res = await fetch("/api/users", {
					method: "POST",
					body: JSON.stringify({ firstName, lastName, email, password }),
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.error);
				setFirstName("");
				setLastName("");
				setEmail("");
				setPassword("");
				setLoading(false);
				await signInWithEmailAndPassword(auth, email, password);
				router.push("/dashboard");
			} catch (error: any) {
				setError(error.message);
				setLoading(false);
			}
		} else if (type === "login") {
			try {
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
					setError("Please enter a valid email address");
					setLoading(false);
					return;
				}
				await loginUser({ email, password });
				setEmail("");
				setPassword("");
				setLoading(false);
				router.push("/dashboard");
			} catch (error: any) {
				setError(error.message);
				setLoading(false);
			}
		}
	};

	const isLogin = type === "login";

	return (
		<div className='h-full grid lg:grid-cols-2'>
			{/* Left brand panel — hidden on mobile */}
			<div className='hidden lg:block'>
				<BrandPanel
					badge={isLogin ? "Welcome back" : "Join free"}
					valueProps={
						!isLogin
							? [
									"100% free — no premium tier",
									"Calorie + macro + workout tracking",
									"Setup in under 30 seconds",
								]
							: undefined
					}
				/>
			</div>

			{/* Right: form */}
			<main className='relative bg-ink-950 p-6 sm:p-8 lg:p-12 flex flex-col h-full'>
				{/* Mobile logo */}
				<div className='flex items-center justify-between lg:hidden mb-6'>
					<Link href='/'>
						<Image
							src='/Logo-mobile.png'
							width={70}
							height={70}
							alt='HealthBuddy logo'
						/>
					</Link>
					<Link
						href={isLogin ? "/signin" : "/login"}
						className='text-[13px] text-lime font-semibold'
					>
						{isLogin ? "Sign up" : "Sign in"}
					</Link>
				</div>

				{/* Desktop top bar */}
				<div className='hidden lg:flex justify-end'>
					<span className='text-[12px] text-white/40'>
						{isLogin ? "Don't have an account? " : "Already have an account? "}
						<Link
							href={isLogin ? "/signin" : "/login"}
							className='text-lime hover:text-lime-400 font-semibold'
						>
							{isLogin ? "Sign up" : "Sign in"}
						</Link>
					</span>
				</div>

				<div className='flex-1 flex items-center justify-center py-8'>
					<form
						onSubmit={(e) => handleSubmit({ type, event: e })}
						className='w-full max-w-md'
					>
						<h2 className='font-black tracking-tightest text-4xl lg:text-5xl leading-[1.0] text-bone'>
							{isLogin ? (
								"Sign in"
							) : (
								<>
									Create a new
									<br />
									account
								</>
							)}
						</h2>
						<p className='mt-3 text-white/55 text-sm leading-relaxed'>
							{isLogin
								? "Welcome to your Healthbuddy Dashboard, please put your signin credentials below to begin using the app"
								: "Create your free HealthBuddy account now, please enter your new account credential to have access to the app."}
						</p>

						<div
							className={`mt-10 ${!isLogin ? "grid grid-cols-2 gap-x-6 gap-y-7" : "space-y-7"}`}
						>
							{!isLogin && (
								<>
									<div>
										<label className='block text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold'>
											First name
										</label>
										<input
											className='auth-input mt-2'
											type='text'
											placeholder='Enter your first name'
											onChange={(e) => setFirstName(e.target.value)}
											value={firstName}
											required
										/>
									</div>
									<div>
										<label className='block text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold'>
											Last name
										</label>
										<input
											className='auth-input mt-2'
											type='text'
											placeholder='Enter your last name'
											onChange={(e) => setLastName(e.target.value)}
											value={lastName}
											required
										/>
									</div>
									<div className='col-span-2'>
										<label className='block text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold'>
											Email
										</label>
										<input
											className='auth-input mt-2'
											type='email'
											placeholder='Enter your email'
											onChange={(e) => setEmail(e.target.value)}
											value={email}
											required
										/>
									</div>
									<div className='col-span-2'>
										<div className='flex items-end justify-between'>
											<label className='block text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold'>
												Password
											</label>
											{password.length > 0 && (
												<span className='text-[10px] font-mono text-lime'>
													{strengthLabel}
												</span>
											)}
										</div>
										<div className='relative'>
											<input
												className='auth-input mt-2 pr-8'
												type={showPassword ? "text" : "password"}
												placeholder='Enter your password'
												onChange={(e) => setPassword(e.target.value)}
												value={password}
												required
											/>
											<button
												type='button'
												onClick={() => setShowPassword(!showPassword)}
												className='absolute right-0 top-1/2 translate-y-0.5 text-white/30 hover:text-white'
												aria-label='Toggle password visibility'
											>
												<svg
													className='h-4 w-4'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth={2}
												>
													<path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z' />
													<circle cx='12' cy='12' r='3' />
												</svg>
											</button>
										</div>
										{password.length > 0 && (
											<div className='mt-2 flex gap-1'>
												{[1, 2, 3, 4].map((i) => (
													<span
														key={i}
														className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColor : "bg-ink-700"}`}
													/>
												))}
											</div>
										)}
									</div>
								</>
							)}

							{isLogin && (
								<>
									<div>
										<label className='block text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold'>
											Email
										</label>
										<input
											className='auth-input mt-2'
											type='email'
											placeholder='Enter your email'
											onChange={(e) => setEmail(e.target.value)}
											value={email}
											required
										/>
									</div>
									<div>
										<div className='flex items-end justify-between'>
											<label className='block text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold'>
												Password
											</label>
											<button
												type='button'
												onClick={() => setShowPassword(!showPassword)}
												className='text-white/30 hover:text-white'
												aria-label='Toggle password visibility'
											>
												<svg
													className='h-4 w-4'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth={2}
												>
													<path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z' />
													<circle cx='12' cy='12' r='3' />
												</svg>
											</button>
										</div>
										<input
											className='auth-input mt-2'
											type={showPassword ? "text" : "password"}
											placeholder='Enter your password'
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											required
										/>
									</div>
								</>
							)}
						</div>

						{isLogin && (
							<div className='mt-6 flex items-center justify-between'>
								<label className='inline-flex items-center gap-2 text-[12px] text-white/55 cursor-pointer'>
									<input
										type='checkbox'
										className='h-4 w-4 rounded border-white/20 bg-ink-800 text-lime focus:ring-lime focus:ring-offset-0 no-focus-styles'
									/>
									Remember me
								</label>
								<Link
									href='/reset-password'
									className='text-lime hover:text-lime-400 text-[13px] font-semibold'
								>
									Forgot password?
								</Link>
							</div>
						)}

						{error && (
							<p
								aria-label='error-message'
								className='mt-4 text-red-400 text-sm'
							>
								{error}
							</p>
						)}

						<button
							aria-label='submit'
							type='submit'
							disabled={loading}
							className='mt-8 w-full inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-400 text-ink-950 font-semibold py-3.5 rounded-xl glow-lime transition disabled:opacity-60'
						>
							{loading ? (
								<span className='h-5 w-5 border-2 border-ink-950/30 border-t-ink-950 rounded-full animate-spin' />
							) : (
								<>
									{isLogin ? "Sign in" : "Create new account"}
									<svg
										className='h-4 w-4'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth={2.5}
										strokeLinecap='round'
									>
										<path d='M5 12h14M13 6l6 6-6 6' />
									</svg>
								</>
							)}
						</button>

						{!isLogin && (
							<p className='mt-5 text-[11px] text-white/40 leading-relaxed'>
								By creating an account you agree to our{" "}
								<Link
									href='/Conditions'
									className='text-white/70 underline underline-offset-2'
								>
									Terms of service
								</Link>{" "}
								and{" "}
								<Link
									href='/Policy'
									className='text-white/70 underline underline-offset-2'
								>
									Privacy policy
								</Link>
								.
							</p>
						)}
					</form>
				</div>
			</main>
		</div>
	);
};

export default AuthForm;
