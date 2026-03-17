import { Link } from "react-router-dom";
import { Heart, Award, Users, Leaf } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#370617] to-[#6A1E04] text-white py-10 px-4 text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-3">Our Story 🍗</h1>
        <p className="text-white/70 text-sm sm:text-lg max-w-xl mx-auto">
          From a small backyard grill to your favourite chicken spot — here's how ChickenHub was born.
        </p>
      </div>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16 grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80"
          alt="Our kitchen"
          className="rounded-3xl shadow-xl w-full h-56 sm:h-72 object-cover"
        />
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#370617] mb-3">Made with Passion</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            ChickenHub started in 2019 with one mission: serve the most flavourful, freshest chicken in Lagos. Our founder, Mama Titi, perfected her secret spice blend over 20 years of cooking for family and friends.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we serve hundreds of happy customers daily — from crispy fried chicken to smoky suya — all prepared fresh every single day with no shortcuts.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#370617] text-center mb-8">What We Stand For</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: <Heart size={22} />, title: "Made with Love", desc: "Every dish is prepared with care" },
              { icon: <Leaf size={22} />, title: "Fresh Ingredients", desc: "Freshest chicken sourced daily" },
              { icon: <Award size={22} />, title: "Quality First", desc: "No compromise on taste" },
              { icon: <Users size={22} />, title: "Community", desc: "Proud to serve our community" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-3 sm:p-5 rounded-2xl bg-[#FFF8F0]">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#E85D04]/10 rounded-full flex items-center justify-center mx-auto mb-2 text-[#E85D04]">
                  {icon}
                </div>
                <h3 className="font-bold text-[#370617] mb-1 text-xs sm:text-base">{title}</h3>
                <p className="text-gray-500 text-xs hidden sm:block">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#370617] mb-4">Ready to taste the difference?</h2>
        <Link to="/menu" className="bg-[#E85D04] hover:bg-[#DC2F02] text-white px-8 py-3.5 rounded-full font-bold text-base sm:text-lg transition-all inline-block shadow-lg">
          Order Now 🍗
        </Link>
      </section>
    </div>
  );
}
