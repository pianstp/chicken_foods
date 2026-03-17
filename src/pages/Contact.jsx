import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import usePageTitle from "../hooks/usePageTitle";

export default function Contact() {
  usePageTitle("Contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill required fields");
    toast.success("Message sent! We'll reply within 24 hours 🍗");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <div className="bg-gradient-to-r from-[#370617] to-[#6A1E04] text-white py-10 px-4 text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-3">Get in Touch 📞</h1>
        <p className="text-white/70 text-sm sm:text-lg">We'd love to hear from you</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-16 grid md:grid-cols-2 gap-8 sm:gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#370617] mb-6">Contact Information</h2>
          <div className="flex flex-col gap-5">
            {[
              { icon: <Phone size={20} />, label: "Phone", value: "+234 801 234 5678" },
              { icon: <Mail size={20} />, label: "Email", value: "hello@chickenhub.ng" },
              { icon: <MapPin size={20} />, label: "Address", value: "12 Market Road, Ikeja, Lagos" },
              { icon: <Clock size={20} />, label: "Hours", value: "Mon–Fri: 8am–10pm | Sat: 9am–11pm | Sun: 10am–9pm" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#E85D04]/10 rounded-full flex items-center justify-center text-[#E85D04] flex-shrink-0">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#370617] text-sm">{label}</p>
                  <p className="text-gray-500 text-sm break-words">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#E85D04]/10 rounded-2xl p-5 border border-[#E85D04]/20">
            <p className="font-bold text-[#370617] mb-1">📦 Bulk Orders?</p>
            <p className="text-sm text-gray-600">Planning an event or party? Call us for special bulk pricing and catering packages.</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8">
          <h2 className="text-xl font-bold text-[#370617] mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { key: "name", label: "Your Name *", placeholder: "John Doe" },
              { key: "email", label: "Email Address *", placeholder: "you@example.com", type: "email" },
              { key: "subject", label: "Subject", placeholder: "How can we help?" },
            ].map(({ key, label, placeholder, type = "text" }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-[#370617] mb-1.5">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-[#370617] mb-1.5">Message *</label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all resize-none"
              />
            </div>
            <button type="submit" className="bg-[#E85D04] hover:bg-[#DC2F02] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
