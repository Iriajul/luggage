export default function WhyUse() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-3">Why people use LuggageLinker</h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Designed for the everyday cross-border needs of Bangladeshi users who want a simpler, more human way to move small items internationally.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🔎</div>
            <h3 className="font-semibold text-xl mb-3">Search by route and date</h3>
            <p className="text-slate-600">Quickly see travelers flying from any country to Bangladesh or leaving Bangladesh for another destination.</p>
            <p className="text-sm text-slate-500 mt-6">Origin, destination, and travel date</p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🛡️</div>
            <h3 className="font-semibold text-xl mb-3">Simple trust signals</h3>
            <p className="text-slate-600">Keep the MVP focused with a clear verified or not verified status so senders can make faster decisions.</p>
            <p className="text-sm text-slate-500 mt-6">Verified traveler badges only • Ratings and completed deliveries</p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-6">💬</div>
            <h3 className="font-semibold text-xl mb-3">Talk before you book</h3>
            <p className="text-slate-600">Ask questions, confirm the item type, and agree on handoff details directly with the traveler.</p>
            <p className="text-sm text-slate-500 mt-6">Message traveler first • Request delivery when ready</p>
          </div>
        </div>
      </div>
    </section>
  );
}