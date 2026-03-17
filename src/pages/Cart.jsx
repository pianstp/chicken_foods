import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to place an order");
      return navigate("/login");
    }
    clearCart();
    toast.success("Order placed successfully! 🎉");
    navigate("/track");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-7xl">🛒</div>
        <h2 className="text-2xl font-bold text-[#370617]">Your cart is empty</h2>
        <p className="text-gray-500">Add some delicious chicken to get started!</p>
        <Link to="/menu" className="bg-[#E85D04] text-white px-8 py-3 rounded-full font-bold hover:bg-[#DC2F02] transition-all">
          Browse Menu
        </Link>
      </div>
    );
  }

  const delivery = 500;
  const discount = total >= 5000 ? 500 : 0;

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-[#370617] mb-6 sm:mb-8">Your Cart 🛒</h1>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {/* Items */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
                <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#370617] text-sm sm:text-base truncate">{item.name}</h3>
                  <p className="text-[#E85D04] font-semibold mt-1 text-sm">₦{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#E85D04] hover:text-white flex items-center justify-center transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="font-bold w-6 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#E85D04] hover:text-white flex items-center justify-center transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <span className="font-bold text-[#370617]">₦{(item.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm h-fit md:sticky md:top-24">
            <h2 className="font-bold text-[#370617] text-lg mb-4">Order Summary</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span><span>₦{delivery.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span><span>-₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-[#370617] text-base">
                <span>Total</span><span>₦{(total + delivery - discount).toLocaleString()}</span>
              </div>
            </div>
            {total >= 5000 && (
              <div className="mt-3 bg-green-50 text-green-700 text-xs p-2 rounded-lg text-center">
                🎉 You saved ₦500 on this order!
              </div>
            )}
            <button
              onClick={handleCheckout}
              className="w-full mt-5 bg-[#E85D04] hover:bg-[#DC2F02] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag size={18} /> Place Order
            </button>
            <Link to="/menu" className="block text-center text-sm text-[#E85D04] mt-3 hover:underline">
              + Add more items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
