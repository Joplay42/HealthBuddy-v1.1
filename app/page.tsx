import {
  Footer,
  HeaderPage,
  HeroSection,
  SectionFive,
  SectionFour,
  SectionSix,
  SectionThree,
  SectionTwo,
} from "@/components";

const page = () => {
  return (
    <div className="min-h-screen bg-ink-950 text-bone font-sans overflow-x-hidden">
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

export default page;
