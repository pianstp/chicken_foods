import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, LogOut, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-[#370617] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍗</span>
          <span className="font-bold text-lg sm:text-xl text-[#F48C06]">ChickenHub</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-[#F48C06] transition-colors font-medium">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 hover:text-[#F48C06] transition-colors">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E85D04] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/dashboard" className="flex items-center gap-1 text-sm hover:text-[#F48C06]">
                <User size={16} /> {user.name.split(" ")[0]}
              </Link>
              <button onClick={handleLogout} className="p-1 hover:text-red-400 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link to="/login" className="px-4 py-1.5 border border-[#F48C06] text-[#F48C06] rounded-full text-sm hover:bg-[#F48C06] hover:text-white transition-all">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-1.5 bg-[#E85D04] rounded-full text-sm hover:bg-[#DC2F02] transition-all font-medium">
                Sign Up
              </Link>
            </div>
          )}

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#370617] border-t border-[#6A1E04] px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 hover:text-[#F48C06] transition-colors font-medium">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="py-2 hover:text-[#F48C06]">My Orders</Link>
              <button onClick={handleLogout} className="text-left py-2 text-red-400">Logout</button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center py-2 border border-[#F48C06] text-[#F48C06] rounded-full text-sm">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center py-2 bg-[#E85D04] rounded-full text-sm font-medium">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
