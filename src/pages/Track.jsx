import { Link } from "react-router-dom";
import { CheckCircle, Clock, ChefHat, Bike, Home } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  { icon: <CheckCircle size={24} />, label: "Order Confirmed", desc: "We received your order" },
  { icon: <ChefHat size={24} />, label: "Preparing", desc: "Chef is cooking your chicken" },
  { icon: <Bike size={24} />, label: "On the Way", desc: "Rider is heading to you" },
  { icon: <Home size={24} />, label: "Delivered", desc: "Enjoy your meal!" },
];

export default function Track() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 3000),
      setTimeout(() => setCurrentStep(3), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-extrabold text-[#370617]">Order Placed!</h1>
          <p className="text-gray-500 mt-2">Your order #CH{Math.floor(Math.random() * 9000 + 1000)} is being processed</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Estimated delivery</span>
            <div className="flex items-center gap-1 text-[#E85D04] font-semibold text-sm">
              <Clock size={14} /> 25–35 minutes
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-0">
            {steps.map((step, i) => {
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      done ? "bg-[#E85D04] text-white" : active ? "bg-[#FFF8F0] border-2 border-[#E85D04] text-[#E85D04] animate-pulse" : "bg-gray-100 text-gray-300"
                    }`}>
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 h-10 transition-all duration-500 ${done ? "bg-[#E85D04]" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className={`font-semibold ${done || active ? "text-[#370617]" : "text-gray-400"}`}>{step.label}</p>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 p-4 bg-[#FFF8F0] rounded-2xl">
            <p className="text-sm text-gray-500 mb-1">Delivering to</p>
            <p className="font-semibold text-[#370617]">Your saved address</p>
          </div>

          <Link to="/menu" className="block w-full text-center mt-6 bg-[#E85D04] hover:bg-[#DC2F02] text-white py-3.5 rounded-xl font-bold transition-all">
            Order Again 🍗
          </Link>
        </div>
      </div>
    </div>
  );
}
