import { ArrowRightLeft } from "lucide-react";
import { Icon } from "../components/Icon";

export default function PopularRoutes() {
  const routes = [
    {
      fromCountry: "United Arab Emirates",
      toCountry: "Bangladesh",
      fromCode: "DXB",
      fromCity: "Dubai",
      toCode: "DAC",
      toCity: "Dhaka",
      middle: "Direct",
      tag: "Fast moving"
    },
    {
      fromCountry: "Bangladesh",
      toCountry: "United Kingdom",
      fromCode: "DAC",
      fromCity: "Dhaka",
      toCode: "LHR",
      toCity: "London",
      middle: "Weekly",
      tag: "Students"
    },
    {
      fromCountry: "Malaysia",
      toCountry: "Bangladesh",
      fromCode: "KUL",
      fromCity: "Kuala Lumpur",
      toCode: "DAC",
      toCity: "Dhaka",
      middle: "Direct",
      tag: "Family items"
    },
    {
      fromCountry: "Bangladesh",
      toCountry: "Saudi Arabia",
      fromCode: "DAC",
      fromCity: "Dhaka",
      toCode: "JED",
      toCity: "Jeddah",
      middle: "Workers",
      tag: "Frequent"
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-3xl w-fit">
        <Icon as={ArrowRightLeft} className="text-emerald-600" />

        {/* <ArrowRightLeft className="text-emerald-600"></ArrowRightLeft> */}
        Bangladesh both ways
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        Popular routes people search every week
      </h2>

      <p className="text-slate-500 text-sm mb-6">
        Focused on common Bangladeshi diaspora routes and family delivery needs.
      </p>

      {/* Routes */}
      <div className="space-y-4">
        {routes.map((route, i) => (
          <div
            key={i}
            onClick={() => alert(`Route clicked: ${route.fromCode} → ${route.toCode}`)}
            className="group bg-white border border-slate-100 hover:border-emerald-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all"
          >

            {/* Left section */}
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">
                {route.fromCountry} → {route.toCountry}
              </div>

              <div className="flex items-baseline gap-3">

                <div>
                  <div className="font-mono text-3xl font-bold text-slate-900">
                    {route.fromCode}
                  </div>
                  <div className="text-xs text-slate-500 w-[54px] h-[34px]">
                    {route.fromCity}
                  </div>
                </div>

                <div className="text-emerald-500 text-xl mt-1">
                →
                </div>

                  <div>
                    <div className="font-mono text-3xl font-bold text-slate-900">
                      {route.toCode}
                    </div>
                    <div className="text-xs text-slate-500">
                      {route.toCity}
                    </div>
                  </div>

              </div>
            </div>

            {/* Middle tag */}
            <div className="text-center">
              <div className="text-xs bg-slate-100 text-slate-600 px-4 py-1 rounded-3xl">
                {route.middle}
              </div>
            </div>

            {/* Right tag */}
            <div className="text-right">
              <div className="text-xs bg-emerald-100 text-emerald-700 px-4 py-1 rounded-3xl font-medium">
                {route.tag}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}