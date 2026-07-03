// import { useState } from "react";
// import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
// import { useReveal } from "../hooks/useReveal";

// export default function ContactPage() {
//   useReveal();
//   const [form, setForm] = useState({ name: '', email: '', phone: '', car: '', message: '' });
//   const [sent, setSent] = useState(false);

//   const handleSubmit = () => {
//     if (form.name && form.email) {
//       setSent(true);
//       setTimeout(() => setSent(false), 4000);
//       setForm({ name: '', email: '', phone: '', car: '', message: '' });
//     }
//   };

//   return (
//     <div className="pt-24 min-h-screen bg-gray-50 text-gray-800">
//       {/* Hero – light variant */}
//       <div className="relative py-20 bg-gradient-to-br from-gray-100 to-white border-b border-gray-200 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 text-center relative">
//           <div className="font-body text-red-600 text-xs tracking-[0.3em] uppercase mb-3">/ Get in Touch</div>
//           <h1 className="font-display text-6xl lg:text-8xl font-black text-gray-900">
//             CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">US</span>
//           </h1>
//           <p className="font-body text-gray-600 mt-4 max-w-xl mx-auto">
//             Need help finding the right part? Our expert team is here to assist you.
//           </p>
//         </div>
//       </div>

//       <section className="bg-white">
//         <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-16">
//           {/* Contact Info – light styled */}
//           <div className="reveal space-y-6">
//             <div>
//               <div className="font-body text-red-600 text-xs tracking-[0.3em] uppercase mb-3">/ Reach Us</div>
//               <h2 className="font-display text-4xl font-black text-gray-900 mb-6">
//                 WE'RE HERE<br />TO HELP
//               </h2>
//               <p className="font-body text-gray-600 leading-relaxed">
//                 Whether you need fitment advice, have questions about an order, or want to discuss bulk pricing, our team is ready.
//               </p>
//             </div>

//             {[
//               { Icon: Phone, title: 'Call / WhatsApp', info: '91838 35445', sub: 'Mon–Sat, 9AM–7PM' },
//               { Icon: Mail, title: 'Email Us', info: 'Support@driveranger.com', sub: 'Response within 2 hours' },
//               { Icon: MapPin, title: 'Visit Our Store', info: 'Plot 42, Auto Hub Complex', sub: 'Pune-Nashik Highway, Pune 411019' },
//               { Icon: Clock, title: 'Working Hours', info: 'Monday – Saturday', sub: '9:00 AM – 7:00 PM' },
//             ].map(({ Icon, title, info, sub }) => (
//               <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:border-red-300 hover:shadow-lg hover:shadow-red-100/50 transition-all">
//                 <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
//                   <Icon size={20} className="text-red-600" />
//                 </div>
//                 <div>
//                   <div className="font-body text-xs text-gray-500 mb-1">{title}</div>
//                   <div className="font-display font-bold text-gray-900">{info}</div>
//                   <div className="font-body text-xs text-gray-500 mt-0.5">{sub}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Form – light card */}
//           <div className="reveal bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-gray-100">
//             <h3 className="font-display text-2xl font-black text-gray-900 mb-2">SEND US A MESSAGE</h3>
//             <p className="font-body text-gray-500 text-sm mb-8">Fill out the form and we'll get back to you within 2 hours.</p>

//             {sent && (
//               <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
//                 <CheckCircle size={18} className="text-green-600" />
//                 <span className="font-body text-green-700 text-sm">Message sent! We'll reply within 2 hours.</span>
//               </div>
//             )}

//             <div className="space-y-4">
//               {[
//                 { key: 'name', label: 'Your Name *', placeholder: 'Rahul Sharma', type: 'text' },
//                 { key: 'email', label: 'Email Address *', placeholder: 'rahul@example.com', type: 'email' },
//                 { key: 'phone', label: 'Phone / WhatsApp', placeholder: '+91 98765 43210', type: 'tel' },
//                 { key: 'car', label: 'Your Car (Model & Year)', placeholder: 'e.g. Honda City 2021', type: 'text' },
//               ].map(({ key, label, placeholder, type }) => (
//                 <div key={key}>
//                   <label className="font-body text-xs text-gray-500 tracking-wide block mb-2">{label}</label>
//                   <input
//                     type={type}
//                     placeholder={placeholder}
//                     value={form[key]}
//                     onChange={e => setForm({ ...form, [key]: e.target.value })}
//                     className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 font-body text-sm shadow-sm focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 placeholder-gray-400"
//                   />
//                 </div>
//               ))}
//               <div>
//                 <label className="font-body text-xs text-gray-500 tracking-wide block mb-2">Your Message</label>
//                 <textarea
//                   placeholder="Tell us what parts you need..."
//                   value={form.message}
//                   onChange={e => setForm({ ...form, message: e.target.value })}
//                   rows={4}
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 font-body text-sm shadow-sm focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 placeholder-gray-400 resize-none"
//                 />
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-body font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-3 shadow-md shadow-red-100"
//               >
//                 Send Message <ArrowRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
















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
      {/* Hero – light variant */}
      <div className="relative py-20 bg-[#080808] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="font-body text-red-600 text-xs tracking-[0.3em] uppercase mb-3">/ Get in Touch</div>
          <h1 className="font-display text-6xl lg:text-8xl font-black text-white">
            CONTACT <span className="text-gradient">US</span>
          </h1>
          <p className="font-body text-white mt-4 max-w-xl mx-auto">
            Need help finding the right part? Our expert team is here to assist you.
          </p>
        </div>
      </div>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-16">
          {/* Contact Info – light styled */}
          <div className="reveal space-y-6">
            <div>
              <div className="font-body text-red-600 text-xs tracking-[0.3em] uppercase mb-3">/ Reach Us</div>
              <h2 className="font-display text-4xl font-black text-gray-900 mb-6">
                WE'RE HERE<br />TO HELP
              </h2>
              <p className="font-body text-gray-600 leading-relaxed">
                Whether you need fitment advice, have questions about an order, or want to discuss bulk pricing, our team is ready.
              </p>
            </div>

            {[
              { Icon: Phone, title: 'Call / WhatsApp', info: '91838 35445', sub: 'Mon–Sat, 9AM–7PM' },
              { Icon: Mail, title: 'Email Us', info: 'Support@driveranger.com', sub: 'Response within 2 hours' },
              { Icon: MapPin, title: 'Visit Our Store', info: 'Plot 42, Auto Hub Complex', sub: 'Pune-Nashik Highway, Pune 411019' },
              { Icon: Clock, title: 'Working Hours', info: 'Monday – Saturday', sub: '9:00 AM – 7:00 PM' },
            ].map(({ Icon, title, info, sub }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:border-red-300 hover:shadow-lg hover:shadow-red-100/50 transition-all">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-red-600" />
                </div>
                <div>
                  <div className="font-body text-xs text-gray-500 mb-1">{title}</div>
                  <div className="font-display font-bold text-gray-900">{info}</div>
                  <div className="font-body text-xs text-gray-500 mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form – light card */}
          <div className="reveal bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-gray-100">
            <h3 className="font-display text-2xl font-black text-gray-900 mb-2">SEND US A MESSAGE</h3>
            <p className="font-body text-gray-500 text-sm mb-8">Fill out the form and we'll get back to you within 2 hours.</p>

            {sent && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle size={18} className="text-green-600" />
                <span className="font-body text-green-700 text-sm">Message sent! We'll reply within 2 hours.</span>
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
                  <label className="font-body text-xs text-gray-500 tracking-wide block mb-2">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 font-body text-sm shadow-sm focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 placeholder-gray-400"
                  />
                </div>
              ))}
              <div>
                <label className="font-body text-xs text-gray-500 tracking-wide block mb-2">Your Message</label>
                <textarea
                  placeholder="Tell us what parts you need..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 font-body text-sm shadow-sm focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 placeholder-gray-400 resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-body font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-3 shadow-md shadow-red-100"
              >
                Send Message <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}