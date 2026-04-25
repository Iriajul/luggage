import PopularRoutes from './PopularRoutes';
import { ShieldCheck, Luggage, MessagesSquare, Sparkles } from "lucide-react";
import { Icon } from "../components/Icon";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-20 grid md:grid-cols-2 gap-12 items-start">

      {/* Left side - Text */}
      <div>

        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm px-5 py-2 rounded-3xl mb-6">
          <Icon as={Sparkles} className="text-emerald-600" />

          <span className="font-medium">
            Built for Bangladeshi families, students, and expats
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-none tracking-tighter text-slate-900 mb-6">
          Send items with trusted<br />
          travelers between<br />
          <span className="text-emerald-600">
            Bangladesh and the world.
          </span>
        </h1>

        <p className="text-lg text-slate-600 mb-8 max-w-md">
          Find available luggage space from any country to Bangladesh or from Bangladesh to destinations worldwide. Share documents, gifts, medicine, and essentials through verified travelers already making the trip.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-3xl font-semibold text-lg hover:scale-105 transition">
            Find a traveler
          </button>
          <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-3xl font-semibold text-lg hover:bg-emerald-50 transition">
            Send a package
          </button>
        </div>

        {/* Features */}
        <div className="flex gap-6 mt-10 text-sm text-slate-600">

          <div className="flex items-center gap-2">
            <Icon as={ShieldCheck} className="text-emerald-600" />
            Verified traveler profiles
          </div>

          <div className="flex items-center gap-2">
            <Icon as={Luggage} className="text-emerald-600" />
            Clear luggage space availability
          </div>

          <div className="flex items-center gap-2">
            <Icon as={MessagesSquare} className="text-emerald-600" />
            Direct messaging before booking
          </div>

        </div>
      </div>

      {/* Right side */}
      <PopularRoutes />
    </div>
  );
}