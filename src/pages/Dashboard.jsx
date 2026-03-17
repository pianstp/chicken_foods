import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { ShoppingBag, User, MapPin, Star, LogOut } from "lucide-react";

const mockOrders = [
  { id: "CH1042", date: "Mar 15, 2025", items: "Crispy Fried Chicken, Suya", total: 7000, status: "Delivered" },
  { id: "CH1031", date: "Mar 10, 2025", items: "Chicken & Jollof Rice Combo", total: 4200, status: "Delivered" },
  { id: "CH1019", date: "Mar 3, 2025", items: "Spicy Wings x2", total: 5600, status: "Delivered" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#370617] mb-6 sm:mb-8">My Account</h1>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col items-center text-center gap-3">
            <div className="w-20 h-20 bg-[#E85D04] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-[#370617] text-lg">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              {user.phone && <p className="text-gray-500 text-sm">{user.phone}</p>}
            </div>
            <div className="w-full border-t pt-3 flex flex-col gap-2 text-sm">
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#E85D04] transition-colors">
                <User size={15} /> Edit Profile
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#E85D04] transition-colors">
                <MapPin size={15} /> Saved Addresses
              </button>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-2 grid grid-cols-3 gap-3 h-fit">
            {[
              { icon: <ShoppingBag size={18} />, label: "Total Orders", value: mockOrders.length },
              { icon: <Star size={18} />, label: "Loyalty Points", value: "350 pts" },
              { icon: <MapPin size={18} />, label: "Addresses", value: 1 },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E85D04]/10 rounded-full flex items-center justify-center mx-auto mb-2 text-[#E85D04]">
                  {icon}
                </div>
                <div className="font-bold text-[#370617] text-lg sm:text-xl">{value}</div>
                <div className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-tight">{label}</div>
              </div>
            ))}
          </div>

          {/* Order History */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b flex items-center justify-between">
              <h2 className="font-bold text-[#370617] text-base sm:text-lg">Order History</h2>
              <Link to="/menu" className="text-sm text-[#E85D04] hover:underline">Order Again</Link>
            </div>
            <div className="divide-y">
              {mockOrders.map((order) => (
                <div key={order.id} className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 hover:bg-[#FFF8F0] transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#370617] text-sm">#{order.id}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{order.status}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 truncate max-w-[200px] sm:max-w-none">{order.items}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#E85D04]">₦{order.total.toLocaleString()}</p>
                    <button className="text-xs text-gray-400 hover:text-[#E85D04] mt-1 transition-colors">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
