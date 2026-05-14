import Image from "next/image";

const tickerItems = [
	"Track calories",
	"Log workouts",
	"Macro targets",
	"Body weight trends",
	"Progress photos",
	"100% free",
];

const CalorieDashboardCard = () => (
	<div className='absolute -left-2 sm:-left-10 lg:-left-24 top-16 lg:top-20 w-[260px] sm:w-[300px] lg:w-[340px] rounded-2xl bg-ink-850 ring-soft p-4 shadow-2xl shadow-black/60 z-10'>
		<div className='flex items-center justify-between'>
			<div>
				<p className='text-[11px] text-white/40'>Welcome back</p>
				<p className='text-sm font-semibold'>Alex M.</p>
			</div>
			<Image
				src='/Logo-mobile.png'
				width={50}
				height={50}
				alt='HealthBuddy logo'
			/>
		</div>

		<p className='mt-3 text-[11px] uppercase tracking-widest text-white/40'>
			Calories
		</p>

		<div className='mt-3 flex items-center gap-4'>
			<div className='relative h-20 w-20 shrink-0'>
				<svg viewBox='0 0 36 36' className='h-20 w-20 -rotate-90'>
					<circle
						cx='18'
						cy='18'
						r='15.9'
						stroke='#2c2c30'
						strokeWidth='3.2'
						fill='none'
					/>
					<circle
						cx='18'
						cy='18'
						r='15.9'
						stroke='#C7F94C'
						strokeWidth='3.2'
						fill='none'
						strokeDasharray='100'
						strokeDashoffset='16'
						strokeLinecap='round'
					/>
				</svg>
				<div className='absolute inset-0 grid place-items-center'>
					<div className='text-center leading-none'>
						<p className='num-tabular font-extrabold text-xl'>242</p>
						<p className='text-[9px] text-white/40 mt-0.5'>remaining</p>
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-2 text-[11px]'>
				<div>
					<div className='flex justify-between text-white/60'>
						<span>Goal</span>
						<span className='num-tabular text-white/80'>1500</span>
					</div>
					<div className='mt-1 h-1.5 rounded-full bg-ink-700 overflow-hidden'>
						<div className='h-full bg-white/30' style={{ width: "100%" }} />
					</div>
				</div>
				<div>
					<div className='flex justify-between text-white/60'>
						<span>Eaten</span>
						<span className='num-tabular text-white/80'>1258</span>
					</div>
					<div className='mt-1 h-1.5 rounded-full bg-ink-700 overflow-hidden'>
						<div className='h-full bg-lime' style={{ width: "84%" }} />
					</div>
				</div>
			</div>
		</div>

		<div className='mt-4 grid grid-cols-3 gap-2'>
			{[
				{ label: "Protein", value: "65", unit: "g", pct: "72%" },
				{ label: "Carbs", value: "98", unit: "g", pct: "55%" },
				{ label: "Fat", value: "22", unit: "g", pct: "38%" },
			].map((m) => (
				<div key={m.label} className='rounded-xl bg-ink-800 ring-soft p-2.5'>
					<p className='text-[9px] uppercase tracking-widest text-white/40'>
						{m.label}
					</p>
					<p className='num-tabular font-bold text-sm mt-0.5'>
						{m.value}
						<span className='text-white/40 text-[10px]'>{m.unit}</span>
					</p>
					<div className='mt-1 h-1 bg-ink-700 rounded-full overflow-hidden'>
						<div className='h-full bg-lime' style={{ width: m.pct }} />
					</div>
				</div>
			))}
		</div>
	</div>
);

const WorkoutCard = () => (
	<div className='absolute -right-2 sm:-right-4 lg:-right-8 bottom-6 w-[200px] sm:w-[230px] rounded-2xl bg-ink-850 ring-soft p-4 shadow-2xl shadow-black/60 z-10'>
		<div className='flex items-center justify-between'>
			<p className='text-[11px] uppercase tracking-widest text-white/40'>
				Today
			</p>
			<span className='text-[10px] font-mono text-lime'>● LIVE</span>
		</div>
		<p className='mt-2 font-semibold text-[15px] leading-tight'>
			Push day — chest + tri
		</p>
		<p className='text-[11px] text-white/50 mt-0.5'>42 min · 6 exercises</p>
		<svg viewBox='0 0 200 50' className='mt-3 w-full h-12'>
			<defs>
				<linearGradient id='g1' x1='0' x2='0' y1='0' y2='1'>
					<stop offset='0' stopColor='#C7F94C' stopOpacity='0.5' />
					<stop offset='1' stopColor='#C7F94C' stopOpacity='0' />
				</linearGradient>
			</defs>
			<polyline
				points='0,40 20,32 40,36 60,22 80,28 100,18 120,24 140,10 160,16 180,8 200,12'
				fill='none'
				stroke='#C7F94C'
				strokeWidth='2.2'
				strokeLinejoin='round'
			/>
			<polyline
				points='0,40 20,32 40,36 60,22 80,28 100,18 120,24 140,10 160,16 180,8 200,12 200,50 0,50'
				fill='url(#g1)'
				stroke='none'
				opacity='0.4'
			/>
		</svg>
	</div>
);

const HeroSection = () => {
	return (
		<section className='relative z-10'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] lg:w-[1200px] h-[600px] rounded-full'
				style={{
					background:
						"radial-gradient(closest-side, rgba(199,249,76,.10), transparent 70%)",
				}}
			/>

			<div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 lg:pt-20 pb-16 lg:pb-28 grid lg:grid-cols-12 gap-10 items-center'>
				{/* Copy */}
				<div className='lg:col-span-7 relative'>
					<span className='inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/60 bg-white/5 ring-soft rounded-full px-3 py-1.5'>
						<svg
							className='h-3 w-3 text-lime'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth={3}
						>
							<path d='M7 17L17 7M9 7h8v8' />
						</svg>
						Optimize your progress
					</span>

					<h1 className='mt-6 font-black tracking-tightest leading-[0.92] text-[52px] sm:text-[72px] lg:text-[96px] xl:text-[104px]'>
						Tracking your
						<br />
						<span className='text-white'>progress</span>
						<span className='text-white/70'> has</span>
						<br />
						<span className='text-white/70'>never been this </span>
						<span className='text-lime'>easy</span>
						<span className='text-white'>!</span>
					</h1>

					<p className='mt-6 max-w-md text-white/55 text-[15px] leading-relaxed'>
						Seamlessly monitor your nutrition and fitness routines, set
						personalized goals.
					</p>

					<div className='mt-8 flex flex-wrap items-center gap-3'>
						<a
							href='/signin'
							className='inline-flex items-center gap-2 bg-lime hover:bg-lime-400 text-ink-950 font-semibold px-6 py-3.5 rounded-xl glow-lime transition'
						>
							Get started
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
						</a>
						<a
							href='#about'
							className='inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium px-4 py-3.5 rounded-xl ring-soft bg-white/5 transition'
						>
							<svg className='h-4 w-4' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M8 5v14l11-7z' />
							</svg>
							Watch the 60-sec demo
						</a>
					</div>

					<dl className='mt-10 sm:mt-12 grid grid-cols-3 max-w-sm sm:max-w-md gap-4 sm:gap-6'>
						<div>
							<dt className='text-[11px] uppercase tracking-widest text-white/40'>
								Active athletes
							</dt>
							<dd className='mt-1 num-tabular font-extrabold text-xl sm:text-2xl text-white'>
								48,200<span className='text-lime'>+</span>
							</dd>
						</div>
						<div>
							<dt className='text-[11px] uppercase tracking-widest text-white/40'>
								Meals logged
							</dt>
							<dd className='mt-1 num-tabular font-extrabold text-xl sm:text-2xl text-white'>
								12.4<span className='text-lime'>M</span>
							</dd>
						</div>
						<div>
							<dt className='text-[11px] uppercase tracking-widest text-white/40'>
								App rating
							</dt>
							<dd className='mt-1 num-tabular font-extrabold text-xl sm:text-2xl text-white'>
								4.9<span className='text-lime'>★</span>
							</dd>
						</div>
					</dl>
				</div>

				{/* Right: hero image + floating cards */}
				<div className='lg:col-span-5 relative h-[480px] sm:h-[520px] lg:h-[600px] hidden sm:block'>
					<div className='absolute inset-0 rounded-3xl overflow-hidden ring-soft bg-ink-800'>
						<Image
							src='/Hero-image.png  '
							alt='Athlete tracking progress'
							fill
							className='object-cover object-middle'
							priority
						/>
						<div
							className='absolute inset-0'
							style={{
								background:
									"linear-gradient(180deg, transparent 40%, rgba(7,7,7,.6))",
							}}
						/>
					</div>
					<CalorieDashboardCard />
					<WorkoutCard />
				</div>
			</div>

			{/* Ticker */}
			<div className='border-y border-white/5 bg-ink-900/60'>
				<div className='marquee overflow-hidden'>
					<div className='scroll-x flex gap-12 py-4 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.2em] text-white/40'>
						{[...tickerItems, ...tickerItems].map((item, i) => (
							<span key={i} className='flex items-center gap-3'>
								{item}
								<span className='text-lime'>●</span>
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
