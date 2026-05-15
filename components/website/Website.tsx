"use client";
import {
	Footer,
	HeaderPage,
	HeroSection,
	PromoModal,
	SectionFive,
	SectionFour,
	SectionSix,
	SectionThree,
	SectionTwo,
} from "@/components";
import { useSearchParams } from "next/navigation";

const Website = () => {
	// SearchParams hooks from next/navigation
	const searchParams = useSearchParams();
	// Get the params
	const isPromoVideoModalOpen = searchParams.get("modal") === "promo";

	return (
		<div className='min-h-screen bg-ink-950 text-bone font-sans overflow-x-hidden'>
			{/** Handle the foodMoal opening with url params */}
			{isPromoVideoModalOpen && <PromoModal />}
			<HeaderPage />
			<HeroSection />
			<SectionTwo />
			<SectionThree />
			<SectionFour />
			<SectionFive />
			<SectionSix />
			<Footer />
		</div>
	);
};

export default Website;
