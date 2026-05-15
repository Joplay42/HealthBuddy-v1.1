"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PromoModal = () => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setTimeout(() => setIsVisible(true), 10);
	}, []);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => {
			router.replace(window.location.pathname, { scroll: false });
		}, 200);
	};

	return (
		<>
			{/* Dark backdrop */}
			<div
				className={`fixed inset-0 z-[100] bg-black/75 transition-opacity duration-200 ${
					isVisible ? "opacity-100" : "opacity-0"
				}`}
				onClick={handleClose}
			/>

			{/* Modal container */}
			<div className='fixed inset-0 z-[101] flex items-center justify-center px-4'>
				<div
					className={`relative w-fit bg-ink-950 rounded-xl shadow-2xl border border-white/10 transition duration-200 ease-out transform ${
						isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
					}`}
				>
					{/* Close button */}
					<button
						onClick={handleClose}
						className='absolute top-3 right-3 z-10 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg w-8 h-8 flex items-center justify-center transition-colors'
					>
						<svg
							className='w-3 h-3'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 14 14'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
							/>
						</svg>
					</button>

					{/* 9:16 responsive video */}
					<div className='relative mx-auto aspect-[9/16] h-[80vh] rounded-xl overflow-hidden'>
						<video
							autoPlay
							loop
							controls
							className='w-full h-full object-cover'
						>
							<source src='/promoVideo.mp4' type='video/mp4' />
						</video>
					</div>
				</div>
			</div>
		</>
	);
};

export default PromoModal;
