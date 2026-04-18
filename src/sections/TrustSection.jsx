export default function TrustSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-3">Built for trust from day one</h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          The first version keeps things clear and practical for MVP launch while still giving senders confidence.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-3xl">
            <h3 className="font-semibold text-xl mb-6">What senders can check</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3"><span className="text-emerald-600">✓</span> Traveler verification status</li>
              <li className="flex gap-3"><span className="text-emerald-600">✓</span> Ratings and successful deliveries</li>
              <li className="flex gap-3"><span className="text-emerald-600">✓</span> Upcoming route and travel date</li>
              <li className="flex gap-3"><span className="text-emerald-600">✓</span> Available luggage space</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl">
            <h3 className="font-semibold text-xl mb-6">What stays simple in MVP</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3"><span className="text-emerald-600">✓</span> No map views or route visualization</li>
              <li className="flex gap-3"><span className="text-emerald-600">✓</span> No complex verification layers</li>
              <li className="flex gap-3"><span className="text-emerald-600">✓</span> No pricing or commission tags</li>
              <li className="flex gap-3"><span className="text-emerald-600">✓</span> Focused actions only</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}