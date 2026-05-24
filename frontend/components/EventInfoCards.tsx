export type EventInfoCard = {
  title: string;
  description: string;
};

type EventInfoCardsProps = {
  title?: string;
  subtitle?: string;
  cards: EventInfoCard[];
  className?: string;
};

export default function EventInfoCards({ title, subtitle, cards, className = "" }: EventInfoCardsProps) {
  return (
    <div className={className}>
      {title ? (
        <h3 className="font-display text-2xl md:text-3xl text-neutral-900 mb-2">{title}</h3>
      ) : null}
      {subtitle ? <p className="text-gray-600 text-sm md:text-base mb-6 max-w-2xl">{subtitle}</p> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-[#e8dfd2] bg-gradient-to-br from-[#fdfaf6] to-white p-5 md:p-6 shadow-sm transition hover:border-[#c9a55b]/50 hover:shadow-md"
          >
            <h4 className="text-sm font-bold uppercase tracking-wide text-[#7a5a1d] mb-2">{card.title}</h4>
            <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed">{card.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
