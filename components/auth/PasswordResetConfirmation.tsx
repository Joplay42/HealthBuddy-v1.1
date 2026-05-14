"use client";
import Image from "next/image";
import Link from "next/link";

const PasswordResetConfirmation = () => {
	return (
		<div className='h-full grid lg:grid-cols-2'>
			{/* Left brand panel */}
			<aside className='hidden lg:flex relative bg-ink-900 p-8 lg:p-12 flex-col overflow-hidden'>
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
						Account recovery
					</span>
					<h1 className='mt-5 font-black tracking-tightest leading-[0.98] text-4xl lg:text-5xl text-bone'>
						The simplest way
						<br />
						to track your
						<br />
						<span className='text-lime'>progress</span>
					</h1>
					<p className='mt-5 text-white/55 max-w-sm text-sm leading-relaxed'>
						HealthBuddy is the best training applications to track your
						progress.
					</p>
				</div>

				<div className='relative pt-10'>
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
							Body weight
						</p>
						<svg viewBox='0 0 320 60' className='mt-1 w-full h-14'>
							<defs>
								<linearGradient id='bwg2' x1='0' x2='0' y1='0' y2='1'>
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
								fill='url(#bwg2)'
								stroke='none'
							/>
						</svg>
					</div>
				</div>
			</aside>

			{/* Right: form */}
			<main className='relative bg-ink-950 p-6 sm:p-8 lg:p-12 flex flex-col h-full'>
				{/* Mobile logo */}
				<div className='lg:hidden mb-6'>
					<Link href='/'>
						<Image
							src='/Logo-mobile.png'
							width={70}
							height={70}
							alt='HealthBuddy logo'
						/>
					</Link>
				</div>

				{/* Back link */}
				<Link
					href='/login'
					className='inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium w-fit transition'
				>
					<svg
						className='h-5 w-5'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth={2}
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M15 18l-6-6 6-6' />
					</svg>
					Back to sign in
				</Link>

				<div className='m-auto text-center max-w-96'>
					<h1 className='text-6xl mb-5'>🎉</h1>
					<h1 className='text-3xl font-bold pb-4'>Email has been sent!</h1>
					<p>
						Check your inbox for the password reset email and follow the
						instruction to change your password.
					</p>
					<Link href='/login'>
						<button className='mt-10 w-full inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-400 text-ink-950 font-semibold py-3.5 rounded-xl glow-lime transition disabled:opacity-60'>
							Go back to sign in
						</button>
					</Link>
					<div className='mt-8 rounded-xl bg-ink-850 ring-soft p-4 flex items-start gap-3'>
						<span className='mt-0.5 h-6 w-6 rounded-md bg-white/5 grid place-items-center text-white/60 shrink-0'>
							<svg
								className='h-3.5 w-3.5'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth={2}
							>
								<circle cx='12' cy='12' r='9' />
								<path d='M12 8v5M12 16v.01' />
							</svg>
						</span>
						<p className='text-[12px] text-white/55 leading-relaxed'>
							We&apos;ll send a secure reset link to your inbox. If you
							don&apos;t see it within a few minutes, check your spam folder.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default PasswordResetConfirmation;
