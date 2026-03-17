import { X, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function MenuModal({ item, onClose }) {
  const { addToCart, cart, updateQty } = useCart();
  const [qty, setQty] = useState(1);
  const cartItem = cart.find((i) => i.id === item.id);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(item);
    toast.success(`${qty}x ${item.name} added to cart!`, {
      style: { background: "#370617", color: "#fff", border: "1px solid #E85D04" },
      iconTheme: { primary: "#E85D04", secondary: "#fff" },
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {item.popular && (
            <span className="absolute top-4 left-4 bg-[#E85D04] text-white text-xs px-3 py-1 rounded-full font-semibold">
              🔥 Popular
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
          >
            <X size={18} className="text-[#370617]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="font-extrabold text-[#370617] text-xl leading-tight">{item.name}</h2>
            <div className="flex items-center gap-1 text-[#F48C06] text-sm font-semibold flex-shrink-0">
              <Star size={14} fill="#F48C06" /> {item.rating}
            </div>
          </div>

          <span className="inline-block text-xs bg-[#E85D04]/10 text-[#E85D04] px-2 py-0.5 rounded-full mb-3 font-medium">
            {item.category}
          </span>

          <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.description}</p>

          {/* Qty + Add */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-[#FFF8F0] rounded-xl px-3 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#E85D04] hover:text-white transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="font-bold text-[#370617] w-5 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#E85D04] hover:text-white transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#DC2F02] text-white py-3 rounded-xl font-bold transition-all"
            >
              <ShoppingCart size={17} />
              Add to Cart — ₦{(item.price * qty).toLocaleString()}
            </button>
          </div>

          {cartItem && (
            <p className="text-center text-xs text-gray-400 mt-3">
              Already {cartItem.qty} in cart
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
