import { Shield, Users, Zap } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

export default function AboutPage() {
  useReveal();
  return (
    <div className="pt-24 min-h-screen bg-[#080808]">
      {/* Hero */}
      <div className="dark-panel relative py-20 bg-[#080808] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="font-body text-brand-red text-xs tracking-[0.3em] uppercase mb-3">/ Our Story</div>
          <h1 className="font-display text-6xl lg:text-8xl font-black text-white">ABOUT <span className="text-gradient">DRIVE RANGER</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 bg-white">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="reveal">
            <div className="font-body text-brand-red text-xs tracking-[0.3em] uppercase mb-3">/ Who We Are</div>
            <h2 className="font-display text-5xl font-black text-brand-ink mb-8">POWERING INDIA'S<br /><span className="text-gradient">CAR CULTURE</span><br />SINCE 2009</h2>
            <p className="font-body text-brand-ink/60 leading-relaxed mb-6">Drive Ranger was born from a simple frustration: finding genuine car parts in India was a nightmare. Counterfeit products, sky-high prices, and zero technical support. We decided to change that.</p>
            <p className="font-body text-brand-ink/60 leading-relaxed mb-6">Starting with a small warehouse in Pune, we've grown into India's most trusted auto parts platform, stocking over 20,000 SKUs from 100+ global brands, serving customers from Kashmir to Kanyakumari.</p>
            <p className="font-body text-brand-ink/60 leading-relaxed">Our team of 150+ automotive enthusiasts and certified engineers work tirelessly to ensure every part we sell is 100% genuine, competitively priced, and backed by expert support.</p>
          </div>
          <div className="reveal">
            <div className="grid grid-cols-2 gap-4">
              {[
                { year: '2009', event: 'Founded in Bhopal' },
                { year: '2012', event: '10,000 SKUs milestone' },
                { year: '2016', event: 'ISO 9001 Certification' },
                { year: '2019', event: 'Pan-India expansion' },
                { year: '2021', event: '12K+ customers served' },
                { year: '2024', event: '40K+ parts, 20+ brands' },
              ].map(({ year, event }) => (
                <div key={year} className="bg-white border border-brand-ink/10 rounded-xl p-5 hover:border-brand-red/30 transition-all">
                  <div className="font-display text-2xl font-black text-brand-red mb-1">{year}</div>
                  <div className="font-body text-sm text-brand-ink/60">{event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="dark-panel mb-24 -mx-4 px-4 py-20 bg-[#080808]">
          <div className="text-center mb-16 reveal">
            <div className="font-body text-brand-red text-xs tracking-[0.3em] uppercase mb-3">/ Our Values</div>
            <h2 className="font-display text-5xl font-black text-white">WHAT DRIVES <span className="text-gradient">US</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Authenticity First', desc: 'We maintain a zero-tolerance policy for counterfeit parts. Every product is verified with the manufacturer before it hits our shelves.' },
              { icon: Users, title: 'Customer Obsessed', desc: 'Our team of certified engineers is available 6 days a week to help you find the right part and ensure perfect fitment.' },
              { icon: Zap, title: 'Speed & Reliability', desc: 'From order to delivery, we move fast. 95% of our orders are dispatched within 24 hours, reaching you in 2-5 days.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="reveal relative overflow-hidden bg-brand-red border border-brand-red rounded-2xl p-8 text-center text-white shadow-2xl shadow-brand-red/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-brand-red/35">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_35%)]" />
                <div className="relative w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="relative font-display text-xl font-bold text-white mb-4">{title}</h3>
                <p className="relative font-body text-white/78 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="reveal rounded-3xl p-12 bg-white border border-brand-ink/10 shadow-xl shadow-brand-ink/5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[['40K+', 'Parts in Stock'], ['20+', 'Brand Partners'], ['17 Yrs', 'In Business'], ['12K+', 'Happy Customers']].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-4xl font-black text-gradient mb-2">{v}</div>
                <div className="font-body text-brand-ink/55 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
