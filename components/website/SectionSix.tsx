import Link from "next/link";

const SectionSix = () => {
  return (
    <section id="contact" className="relative bg-ink-950">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="rounded-3xl bg-gradient-to-br from-ink-850 to-ink-900 ring-soft p-6 sm:p-8 lg:p-12 grid md:grid-cols-12 gap-6 items-center stripe-bg">
          <div className="md:col-span-8">
            <h3 className="font-black tracking-tightest leading-[1.0] text-3xl sm:text-4xl lg:text-5xl text-bone">
              Start logging today.<br /><span className="text-lime">It&apos;s still free.</span>
            </h3>
            <p className="mt-3 text-white/55 max-w-xl text-sm">
              No credit card, no trial, no premium tier. Make progress that compounds.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 bg-lime hover:bg-lime-400 text-ink-950 font-semibold px-5 py-3.5 rounded-xl glow-lime transition"
            >
              Get started
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSix;
