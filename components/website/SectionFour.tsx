const featureCards = [
  {
    num: "01",
    title: "Track nutriment from food",
    description: "Set your protein, carbs and fat objective and tracks each nutriments.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14c0-3 2-5 5-5s4 2 6 2 3-1 5-1v3c-2 0-4 2-7 2s-3 2-3 4H4c0-2 0-3-1-3v-2z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "See the food you consumed for the day",
    description: "We save each food you eat in the day, so you can track your routine better.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Easily add your consumed food",
    description: "Add your custom meal with the amount of calories, protein, carbs and fat.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
];

const SectionFour = () => {
  return (
    <section className="relative bg-ink-950">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pb-20 lg:pb-24 grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
        {featureCards.map((card) => (
          <article
            key={card.num}
            className="group flex flex-col rounded-3xl bg-ink-850 ring-soft p-6 sm:p-7 hover:bg-ink-800 transition"
          >
            <div className="h-12 w-12 rounded-xl bg-lime/10 ring-1 ring-lime/30 grid place-items-center text-lime">
              {card.icon}
            </div>
            <h3 className="mt-6 font-extrabold text-lg sm:text-xl tracking-tight leading-tight text-bone">
              {card.title}
            </h3>
            <p className="mt-3 text-white/55 text-sm leading-relaxed flex-1">
              {card.description}
            </p>
            {/* Number line is always at the bottom because of flex-col + flex-1 on description */}
            <div className="mt-6 flex items-center gap-2 text-[12px] font-mono text-white/30">
              <span>{card.num}</span>
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-lime">●</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SectionFour;
