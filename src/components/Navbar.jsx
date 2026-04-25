// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { Icon } from './Icon';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
            <Icon as={Plane} className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-3xl tracking-tighter text-slate-900">LuggageLinker</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
          <Link to="/find-traveler" className="hover:text-emerald-600 transition">Find a Traveler</Link>
          <Link to="/send-package" className="hover:text-emerald-600 transition">Send a Package</Link>
          <Link to="/how-it-works" className="hover:text-emerald-600 transition">How it works</Link>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/sign-in')} className="px-6 py-2.5 text-sm font-semibold border border-slate-300 rounded-3xl hover:bg-slate-100 transition">
            Already have an account
          </button>
          <button onClick={() => navigate('/list-trip')} className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-3xl hover:bg-emerald-700 transition">
            List your trip
          </button>
        </div>

        <button className="md:hidden text-3xl text-slate-700" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
      </div>
    </nav>
  );
}