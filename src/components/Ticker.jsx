import { TICKER_ITEMS } from "../data/data";

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="bg-brand-red overflow-hidden py-2.5 relative z-[60]">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-label font-semibold text-[12px] tracking-[0.15em] uppercase
              text-white px-12 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}