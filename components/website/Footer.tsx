import Image from "next/image";
import Link from "next/link";
import Copyrights from "./Copyrights";

const navLinks = [
	{ name: "About", href: "#about" },
	{ name: "Calorie Tracker", href: "#calories" },
	{ name: "Workout", href: "#workout" },
	{ name: "Contact", href: "#contact" },
];

const actualYear = new Date().getFullYear();

const Footer = () => {
	return (
		<footer className='relative border-t border-white/5 bg-ink-900'>
			<div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 grid md:grid-cols-12 gap-8 items-center '>
				{/* Brand with logo */}
				<div className='md:col-span-4 flex items-center gap-3'>
					<Link href='/' className='shrink-0'>
						<Image
							src='/Logo-mobile.png'
							width={80}
							height={80}
							alt='HealthBuddy logo'
						/>
					</Link>
					<p className='text-[12px] text-white/40 mt-1 max-w-xs'>
						Calorie &amp; workout tracking for athletes who trains harder than
						ever.
					</p>
				</div>

				{/* Nav links */}
				<div className='md:col-span-5 flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 md:justify-end'>
					{navLinks.map((link) => (
						<a
							key={link.name}
							href={link.href}
							className='text-lime hover:text-lime-400 text-sm font-semibold transition'
						>
							{link.name}
						</a>
					))}
				</div>

				{/* Legal */}
				<div className='md:col-span-3 flex gap-6 md:justify-end text-[12px] text-white/40'>
					<Link href='/Policy' className='hover:text-white transition'>
						Privacy policy
					</Link>
					<Link href='/Conditions' className='hover:text-white transition'>
						Terms and service
					</Link>
				</div>
			</div>
			<Copyrights width={1280} />
		</footer>
	);
};

export default Footer;
