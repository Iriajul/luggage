import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* New Logo - exact match to your screenshot */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-inner">
            ✈️
          </div>
          <span className="font-bold text-3xl tracking-tighter text-slate-900">LuggageLinker</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <a href="#" className="hover:text-emerald-600 transition">Home</a>
          <a href="#" className="hover:text-emerald-600 transition">Find a Traveler</a>
          <a href="#" className="hover:text-emerald-600 transition">Records</a>
          <a href="#" className="hover:text-emerald-600 transition">How it works</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 text-sm font-semibold border border-slate-300 rounded-3xl hover:bg-slate-100 transition">
            Sign in
          </button>
          <button className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-3xl hover:bg-emerald-700 transition">
            List your trip
          </button>
        </div>

        <button 
          className="md:hidden text-3xl text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}