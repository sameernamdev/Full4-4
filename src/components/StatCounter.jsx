import { useCountUp } from "../hooks/useCountUp";

export default function StatCounter({ value, suffix, label, start }) {
  const count = useCountUp(value, 2200, start);
  return (
    <div className="stat-item relative min-w-0 text-center p-4 sm:p-8 lg:p-12 bg-brand-light overflow-hidden">
      <div className="stat-num font-display text-[clamp(2rem,9.5vw,3.25rem)] sm:text-6xl lg:text-7xl leading-none whitespace-nowrap text-white transition-colors duration-300">
        {count.toLocaleString("en-IN")}
        <span className="stat-suf text-brand-red">{suffix}</span>
      </div>
      <div className="stat-label font-label font-semibold text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.3em]
        uppercase text-white/40 mt-2 break-words">
        {label}
      </div>
    </div>
  );
}
