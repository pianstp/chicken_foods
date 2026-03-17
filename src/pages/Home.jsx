import { Link } from "react-router-dom";
import { Star, Clock, Truck, Shield, ChevronRight, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";
import { menuItems, testimonials } from "../data/menuData";
import useScrollAnimation from "../hooks/useScrollAnimation";
import usePageTitle from "../hooks/usePageTitle";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1400&q=80",
    tag: "🔥 Crispy & Golden",
  },
  {
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=1400&q=80",
    tag: "🌶️ Spicy Hot Wings",
  },
  {
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80",
    tag: "🍢 Authentic Suya",
  },
];

export default function Home() {
  usePageTitle("Home");
  const popular = menuItems.filter((i) => i.popular).slice(0, 4);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const featuresAnim = useScrollAnimation();
  const popularAnim = useScrollAnimation();
  const testimonialAnim = useScrollAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroSlides.length);
        setAnimating(false);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="text-white min-h-[90vh] flex items-center relative overflow-hidden w-full">
        {/* Background Slides */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-all duration-[3000ms] ease-in-out"
            style={{
              backgroundImage: `url('${slide.image}')`,
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1.05)" : "scale(1)",
              transition: "opacity 3s ease-in-out, transform 3s ease-in-out",
            }}
          />
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#370617]/90 via-[#6A1E04]/80 to-[#E85D04]/60 z-10" />

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current ? "w-6 h-2.5 bg-[#FFBA08]" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Slide tag */}
        <div
          className="absolute top-6 right-4 sm:right-8 z-30 bg-black/30 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all duration-500"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(-8px)" : "translateY(0)" }}
        >
          {heroSlides[current].tag}
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center relative z-20">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-full text-xs sm:text-sm mb-5 border border-white/20">
              <Flame size={14} className="text-[#FFBA08] flex-shrink-0" /> Fresh & Hot — Order Now!
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Taste the <span className="text-[#FFBA08]">Crunch</span> of Perfection
            </h1>
            <p className="text-sm sm:text-base text-white/80 mb-6 leading-relaxed">
              Freshly prepared chicken, seasoned with authentic Nigerian spices. From crispy fried to smoky suya — we've got your cravings covered.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/menu" className="bg-[#FFBA08] text-[#370617] px-6 py-3 rounded-full font-bold text-base hover:bg-[#F48C06] transition-all shadow-lg">
                Order Now 🍗
              </Link>
              <Link to="/menu" className="border-2 border-white/50 px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all text-base">
                View Menu
              </Link>
            </div>
            <div className="flex gap-4 mt-8">
              {[["500+", "Happy Customers"], ["50+", "Menu Items"], ["4.9★", "Rating"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-xl sm:text-2xl font-bold text-[#FFBA08]">{val}</div>
                  <div className="text-xs sm:text-sm text-white/70">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full bg-[#FFBA08]/20 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&q=80"
                  alt="Crispy Chicken"
                  className="w-64 h-64 lg:w-72 lg:h-72 object-cover rounded-full border-4 border-[#FFBA08] shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-3 left-0 bg-white text-[#370617] px-3 py-1.5 rounded-2xl shadow-xl text-xs font-bold">
                🔥 #1 Best Seller
              </div>
              <div className="absolute -top-3 right-0 bg-[#E85D04] text-white px-3 py-1.5 rounded-2xl shadow-xl text-xs font-bold">
                ⚡ 30 min delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section 
        ref={featuresAnim.ref}
        className="py-12 bg-white transition-all duration-700 ${featuresAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
        style={{
          opacity: featuresAnim.visible ? 1 : 0,
          transform: featuresAnim.visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 700ms ease-out, transform 700ms ease-out'
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: <Truck size={22} />, title: "Fast Delivery", desc: "Hot in 30 mins" },
              { icon: <Shield size={22} />, title: "Fresh Daily", desc: "Made every morning" },
              { icon: <Star size={22} />, title: "Top Rated", desc: "4.9 stars, 500+ reviews" },
              { icon: <Clock size={22} />, title: "Open Late", desc: "Until 11pm daily" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-3 sm:p-6 rounded-2xl bg-[#FFF8F0] hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#E85D04]/10 rounded-full flex items-center justify-center mx-auto mb-2 text-[#E85D04]">
                  {icon}
                </div>
                <h3 className="font-bold text-[#370617] mb-1 text-xs sm:text-base">{title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section 
        ref={popularAnim.ref}
        className="py-16 bg-[#FFF8F0] transition-all duration-700"
        style={{
          opacity: popularAnim.visible ? 1 : 0,
          transform: popularAnim.visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 700ms ease-out, transform 700ms ease-out'
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#370617]">🔥 Most Popular</h2>
              <p className="text-gray-500 mt-1 text-sm hidden sm:block">Customer favourites you'll love</p>
            </div>
            <Link to="/menu" className="flex items-center gap-1 text-[#E85D04] font-semibold hover:gap-2 transition-all">
              See All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popular.map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12 bg-gradient-to-r from-[#E85D04] to-[#DC2F02] text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold mb-2">🎉 First Order? Get 10% Off!</h2>
            <p className="text-white/80 text-sm sm:text-base">Sign up and use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">WELCOME10</span> at checkout</p>
          </div>
          <Link to="/signup" className="bg-white text-[#E85D04] px-8 py-3 rounded-full font-bold hover:bg-[#FFF8F0] transition-all whitespace-nowrap shadow-lg">
            Claim Offer →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        ref={testimonialAnim.ref}
        className="py-16 bg-white transition-all duration-700"
        style={{
          opacity: testimonialAnim.visible ? 1 : 0,
          transform: testimonialAnim.visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 700ms ease-out, transform 700ms ease-out'
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#370617] text-center mb-2">What Our Customers Say</h2>
          <p className="text-gray-500 text-center mb-10">Real reviews from real chicken lovers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-[#FFF8F0] p-6 rounded-2xl border border-orange-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-3">
                  {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={16} fill="#F48C06" className="text-[#F48C06]" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E85D04] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <span className="font-semibold text-[#370617]">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#370617] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Order? 🍗</h2>
          <p className="text-white/70 mb-8 text-base sm:text-lg">Join hundreds of happy customers enjoying the best chicken in town.</p>
          <Link to="/menu" className="bg-[#E85D04] hover:bg-[#DC2F02] text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl inline-block">
            Browse Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
