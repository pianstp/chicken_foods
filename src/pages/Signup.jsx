import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) return toast.error("Please fill all fields");
    if (form.password !== form.confirm) return toast.error("Passwords do not match");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    setTimeout(() => {
      login({ name: form.name, email: form.email, phone: form.phone });
      toast.success("Account created! Welcome to ChickenHub 🍗");
      navigate("/");
      setLoading(false);
    }, 1000);
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div>
      <label className="block text-sm font-semibold text-[#370617] mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🍗</span>
            <span className="font-bold text-2xl text-[#E85D04]">ChickenHub</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#370617]">Create Account</h1>
          <p className="text-gray-500 mt-1">Join us and enjoy exclusive deals</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {field("name", "Full Name", "text", "John Doe")}
            {field("email", "Email Address", "email", "you@example.com")}
            {field("phone", "Phone Number", "tel", "+234 800 000 0000")}

            <div>
              <label className="block text-sm font-semibold text-[#370617] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E85D04]">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#370617] mb-1.5">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all"
              />
            </div>

            <p className="text-xs text-gray-400">
              By signing up, you agree to our{" "}
              <a href="#" className="text-[#E85D04] hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-[#E85D04] hover:underline">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#E85D04] hover:bg-[#DC2F02] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-60 mt-1"
            >
              {loading ? "Creating account..." : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#E85D04] font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
