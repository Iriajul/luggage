export default function CTA() {
  return (
    <section className="py-20 bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Need to send something soon?</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-10">
          Start by searching for a traveler going to Bangladesh or leaving Bangladesh. Review the profile, send a message, and move forward when it feels right.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => alert('Find a traveler search page will open here')}
            className="bg-emerald-600 text-white px-10 py-5 rounded-3xl font-semibold text-lg hover:bg-emerald-700 transition"
          >
            Find a traveler
          </button>
          <button 
            onClick={() => alert('List your trip form coming soon')}
            className="border-2 border-emerald-600 text-emerald-600 px-10 py-5 rounded-3xl font-semibold text-lg hover:bg-emerald-50 transition"
          >
            List your trip
          </button>
        </div>
      </div>
    </section>
  );
}