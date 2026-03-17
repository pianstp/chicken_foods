import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page Not Found");
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-4">🍗</div>
      <h1 className="text-6xl font-extrabold text-[#E85D04] mb-2">404</h1>
      <h2 className="text-2xl font-bold text-[#370617] mb-3">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        Looks like this page flew the coop! Let's get you back to the good stuff.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link to="/" className="bg-[#E85D04] hover:bg-[#DC2F02] text-white px-8 py-3 rounded-full font-bold transition-all">
          Go Home
        </Link>
        <Link to="/menu" className="border-2 border-[#E85D04] text-[#E85D04] px-8 py-3 rounded-full font-bold hover:bg-[#E85D04] hover:text-white transition-all">
          View Menu
        </Link>
      </div>
    </div>
  );
}
