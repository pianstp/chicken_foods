import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import MenuModal from "./MenuModal";
import toast from "react-hot-toast";

export default function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      style: { background: "#370617", color: "#fff", border: "1px solid #E85D04" },
      iconTheme: { primary: "#E85D04", secondary: "#fff" },
    });
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
      >
        <div className="relative overflow-hidden h-48">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={item.image}
            alt={item.name}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
          {item.popular && (
            <span className="absolute top-3 left-3 bg-[#E85D04] text-white text-xs px-2 py-1 rounded-full font-semibold">
              🔥 Popular
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-[#370617] text-base">{item.name}</h3>
            <div className="flex items-center gap-1 text-[#F48C06] text-sm">
              <Star size={13} fill="#F48C06" /> {item.rating}
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[#E85D04] font-bold text-lg">₦{item.price.toLocaleString()}</span>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 bg-[#E85D04] hover:bg-[#DC2F02] text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              <ShoppingCart size={15} /> Add
            </button>
          </div>
        </div>
      </div>

      {showModal && <MenuModal item={item} onClose={() => setShowModal(false)} />}
    </>
  );
}
