import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

export default function ContactPage() {
  useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', car: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: '', email: '', phone: '', car: '', message: '' });
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#080808]">
      <div className="dark-panel relative py-20 bg-[#080808] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="font-body text-brand-red text-xs tracking-[0.3em] uppercase mb-3">/ Get in Touch</div>
          <h1 className="font-display text-6xl lg:text-8xl font-black text-white">CONTACT <span className="text-gradient">US</span></h1>
          <p className="font-body text-white/55 mt-4 max-w-xl mx-auto">Need help finding the right part? Our expert team is here to assist you.</p>
        </div>
      </div>

      <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="reveal space-y-6">
          <div>
            <div className="font-body text-brand-red text-xs tracking-[0.3em] uppercase mb-3">/ Reach Us</div>
            <h2 className="font-display text-4xl font-black text-brand-ink mb-6">WE'RE HERE<br />TO HELP</h2>
            <p className="font-body text-brand-ink/60 leading-relaxed">Whether you need fitment advice, have questions about an order, or want to discuss bulk pricing, our team is ready.</p>
          </div>

          {[
            { Icon: Phone, title: 'Call / WhatsApp', info: '91838 35445', sub: 'Mon–Sat, 9AM–7PM' },
            { Icon: Mail, title: 'Email Us', info: 'Support@driveranger.com', sub: 'Response within 2 hours' },
            { Icon: MapPin, title: 'Visit Our Store', info: 'Plot 42, Auto Hub Complex', sub: 'Pune-Nashik Highway, Pune 411019' },
            { Icon: Clock, title: 'Working Hours', info: 'Monday – Saturday', sub: '9:00 AM – 7:00 PM' },
          ].map(({ Icon, title, info, sub }) => (
            <div key={title} className="bg-white border border-brand-ink/10 rounded-2xl p-6 flex items-start gap-4 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-red/10 transition-all">
              <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={20} className="text-brand-red" />
              </div>
              <div>
                <div className="font-body text-xs text-gray-500 mb-1">{title}</div>
                <div className="font-display font-bold text-brand-ink">{info}</div>
                <div className="font-body text-xs text-gray-500 mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="reveal bg-white border border-brand-ink/10 rounded-3xl p-8 shadow-xl shadow-brand-ink/5">
          <h3 className="font-display text-2xl font-black text-brand-ink mb-2">SEND US A MESSAGE</h3>
          <p className="font-body text-gray-500 text-sm mb-8">Fill out the form and we'll get back to you within 2 hours.</p>

          {sent && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
              <CheckCircle size={18} className="text-green-400" />
              <span className="font-body text-green-400 text-sm">Message sent! We'll reply within 2 hours.</span>
            </div>
          )}

          <div className="space-y-4">
            {[
              { key: 'name', label: 'Your Name *', placeholder: 'Rahul Sharma', type: 'text' },
              { key: 'email', label: 'Email Address *', placeholder: 'rahul@example.com', type: 'email' },
              { key: 'phone', label: 'Phone / WhatsApp', placeholder: '+91 98765 43210', type: 'tel' },
              { key: 'car', label: 'Your Car (Model & Year)', placeholder: 'e.g. Honda City 2021', type: 'text' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="font-body text-xs text-gray-400 tracking-wide block mb-2">{label}</label>
                <input type={type} placeholder={placeholder} value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-white border border-brand-ink/15 rounded-xl px-4 py-3.5 text-brand-ink font-body text-sm shadow-sm shadow-brand-ink/5 focus:outline-none focus:border-brand-red/60 focus:ring-4 focus:ring-brand-red/10 placeholder-gray-400"
                />
              </div>
            ))}
            <div>
              <label className="font-body text-xs text-gray-400 tracking-wide block mb-2">Your Message</label>
              <textarea placeholder="Tell us what parts you need..." value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })} rows={4}
                className="w-full bg-white border border-brand-ink/15 rounded-xl px-4 py-3.5 text-brand-ink font-body text-sm shadow-sm shadow-brand-ink/5 focus:outline-none focus:border-brand-red/60 focus:ring-4 focus:ring-brand-red/10 placeholder-gray-400 resize-none" />
            </div>
            <button onClick={handleSubmit}
              className="w-full btn-primary bg-brand-red text-white font-body font-bold py-4 rounded-xl hover:bg-red-700 transition-all text-base flex items-center justify-center gap-3">
              Send Message <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
