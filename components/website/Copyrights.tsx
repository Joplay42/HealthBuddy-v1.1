import Link from "next/link";

const Copyrights = ({ width }: { width: Number | String }) => {
	const actualYear = new Date().getFullYear();

	return (
		<div className='border-t border-white/5'>
			<div
				className={`max-w-[${width}px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 text-[12px] text-white/40 sm:flex justify-between`}
			>
				<p>© {actualYear} HealthBuddy All rights reserved</p>
				<Link href='/updates' className='hover:text-white transition'>
					<p>HealthBuddy v1.2</p>
				</Link>
			</div>
		</div>
	);
};

export default Copyrights;
