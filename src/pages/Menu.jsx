import { useState } from "react";
import { Search } from "lucide-react";
import MenuCard from "../components/MenuCard";
import { menuItems, categories } from "../data/menuData";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#370617] to-[#6A1E04] text-white py-10 px-4 text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-2">Our Menu 🍗</h1>
        <p className="text-white/70 text-sm sm:text-lg">Fresh, hot, and made to order</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === cat
                  ? "bg-[#E85D04] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#E85D04] hover:text-[#E85D04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">No items found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}
