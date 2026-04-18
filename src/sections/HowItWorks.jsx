export default function HowItWorks() {
  return (
    <section className="py-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-3">How it works</h2>
        <p className="text-slate-600 text-center max-w-xl mx-auto mb-12">
          A simple three-step flow for senders and travelers without complicated matching screens or extra setup.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-emerald-100">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">1</div>
            <h3 className="font-semibold text-xl mb-3">Search a route</h3>
            <p className="text-slate-600">Pick an origin, destination, travel date, and minimum luggage space to find a relevant traveler.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-emerald-100">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">2</div>
            <h3 className="font-semibold text-xl mb-3">Review and message</h3>
            <p className="text-slate-600">Check the profile, verify route details, and message the traveler to confirm what you want to send.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-emerald-100">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">3</div>
            <h3 className="font-semibold text-xl mb-3">Request delivery</h3>
            <p className="text-slate-600">Once both sides agree, send the delivery request and continue the conversation around pickup and drop-off.</p>
          </div>
        </div>
      </div>
    </section>
  );
}