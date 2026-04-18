export default function CommonRoutes() {
  const routes = [
    { title: "Dubai ↔ Dhaka", desc: "Popular for family items, electronics, accessories, and urgent documents." },
    { title: "London ↔ Dhaka", desc: "Strong demand from students, expats, and families sending essentials." },
    { title: "Kuala Lumpur ↔ Dhaka", desc: "Frequent travel makes this a useful route for time-sensitive small parcels." },
    { title: "Jeddah ↔ Dhaka", desc: "Useful for worker communities and religious travel seasons." },
  ];

  return (
    <section className="py-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-3">Common Bangladesh routes</h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Start with corridors where Bangladeshi communities already travel often, then expand over time.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {routes.map((route, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer"
                 onClick={() => alert(`Route selected: ${route.title} (API ready for future filtering)`)}>
              <div className="font-semibold text-xl mb-2">{route.title}</div>
              <p className="text-slate-600 text-sm leading-relaxed">{route.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}