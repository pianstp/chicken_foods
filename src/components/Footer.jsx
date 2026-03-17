import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#370617] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🍗</span>
            <span className="font-bold text-xl text-[#F48C06]">ChickenHub</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Fresh, crispy, and delicious chicken delivered to your doorstep. Made with love and the finest spices.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-[#6A1E04] rounded-full hover:bg-[#E85D04] transition-colors"><Facebook size={16} /></a>
            <a href="#" className="p-2 bg-[#6A1E04] rounded-full hover:bg-[#E85D04] transition-colors"><Instagram size={16} /></a>
            <a href="#" className="p-2 bg-[#6A1E04] rounded-full hover:bg-[#E85D04] transition-colors"><Twitter size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-[#F48C06] mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            {[["Home", "/"], ["Menu", "/menu"], ["About", "/about"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} to={to} className="hover:text-[#F48C06] transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-[#F48C06] mb-3">Opening Hours</h4>
          <div className="text-sm text-gray-400 flex flex-col gap-1">
            <p>Mon – Fri: 8am – 10pm</p>
            <p>Saturday: 9am – 11pm</p>
            <p>Sunday: 10am – 9pm</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-[#F48C06] mb-3">Contact Us</h4>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <div className="flex items-center gap-2"><Phone size={14} /> +234 801 234 5678</div>
            <div className="flex items-center gap-2"><Mail size={14} /> hello@chickenhub.ng</div>
            <div className="flex items-center gap-2"><MapPin size={14} /> 12 Market Road, Lagos</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-[#6A1E04] text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ChickenHub. All rights reserved.
      </div>
    </footer>
  );
}
