import { ChevronRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { CATEGORIES } from "../data/data";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.3l.7-4h-4V7a1 1 0 0 1 1-1h3V2z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2zm6-1.1a1.1 1.1 0 1 0-1.1 1.1A1.1 1.1 0 0 0 18 7.1z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.5 12 4.5 12 4.5s-5.7 0-7.5.6a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.6 7.5.6 7.5.6s5.7 0 7.5-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z",
  },
  {
    label: "X",
    href: "https://x.com/",
    path: "M18.9 2h3.1l-6.8 7.8L23 22h-6.1l-4.8-6.2L6.6 22H3.5l7.3-8.4L1.5 2h6.3l4.3 5.7L18.9 2zm-1.1 17.8h1.7L6.9 4.1H5.1l12.7 15.7z",
  },
];

const contactItems = [
  {
    Icon: MapPin,
    text: "Plot 42, Auto Hub Complex, Pune-Nashik Highway, Pune - 411019",
    href: "https://www.google.com/maps/search/?api=1&query=Plot%2042%20Auto%20Hub%20Complex%20Pune%20Nashik%20Highway%20Pune%20411019",
  },
  { Icon: Phone, text: "+91 91838 35445", href: "tel:+9191838 35445" },
  { Icon: Mail, text: "Support@driveranger.com", href: "mailto:Support@driveranger.com" },
  { Icon: Clock, text: "Mon-Sat: 9AM - 7PM" },
];

export default function Footer({ setPage }) {
  return (
    // <footer className="bg-[#ece7db] border-t border-white/5 pt-20 pb-8">
    <footer className="bg-white border-t border-white/2 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className=" font-display text-3xl tracking-[0.08em] text-black mb-1">
              DRIVE <span className="text-brand-red">RANGER</span>
            </div>
            <div className="font-label text-[9px] tracking-[0.3em] uppercase text-black mb-5">
              Car Parts & Accessories
            </div>
            <p className="font-body text-sm text-black leading-relaxed mb-6 max-w-xs">
              India's most trusted online platform for genuine OEM and performance
              car parts. Quality you can count on, delivery you can trust.
            </p>
            <div className="flex gap-2">
              {socials.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-black hover:bg-brand-red hover:border-brand-red hover:text-white transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-label font-bold text-[11px] tracking-[0.3em] uppercase text-black mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Products", "Brands", "About Us", "Contact", "Track Order"].map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    onClick={() => {
                      const pages = { Home: "home", Products: "products", Brands: "brands", "About Us": "about", Contact: "contact" };
                      if (pages[l]) setPage(pages[l]);
                    }}
                    className="font-body text-sm text-black hover:text-brand-red transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={12} className="text-brand-red" />
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-label font-bold text-[11px] tracking-[0.3em] uppercase text-black mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {CATEGORIES.map((c) => (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => setPage("products")}
                    className="font-body text-sm text-black hover:text-brand-red transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={12} className="text-brand-red" />
                    {c.name}
                    <span className="text-[11px] text-white/20">({c.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-label font-bold text-[11px] tracking-[0.3em] uppercase text-black mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactItems.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={15} className="text-brand-red mt-0.5 shrink-0" />
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="font-body text-sm text-black hover:text-brand-red leading-relaxed transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="font-body text-sm text-black leading-relaxed">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[13px] text-black">
            © 2025 Drive Ranger Car Parts. All rights reserved. | Made in India
          </p>
          <p className="font-body text-[13px] text-black">
            Developed by{" "}
            <a
              href="https://skyinfogroup.com/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-black hover:text-brand-red transition-colors"
            >
              SkyInfo Group
            </a>
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Return Policy"].map((l) => (
              <a key={l} href="#" className="font-body text-[12px] text-black hover:text-red-500 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
