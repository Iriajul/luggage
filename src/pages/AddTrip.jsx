// src/pages/AddTrip.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane,Calendar, MapPin, Package, Lightbulb } from 'lucide-react';

export default function AddTrip() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    origin: 'Dubai, UAE',
    destination: 'Dhaka, Bangladesh',
    date: '14 May 2025',
    luggage: '4.5 kg',
    note: '',
    accepting: 'yes', // 'yes' | 'paused'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // hook up real submit logic here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Plane className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-xl text-slate-900">LuggageLinker</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="/dashboard" className="hover:text-emerald-600">Dashboard</a>
          <a href="#" className="text-emerald-600 font-semibold">My trips</a>
          <a onClick={() => navigate('/requests')} className="cursor-pointer hover:text-emerald-600">Requests</a>
          <a onClick={() => navigate('/messages')} className="cursor-pointer hover:text-emerald-600">Messages</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/add-trip')}
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition"
          >
            Add new trip
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={signOut}>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
              {user?.name?.[0]?.toUpperCase() || 'T'}
            </div>
            <span className="text-sm font-medium text-slate-700">{user?.name}</span>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium">
              <span>✈</span> Add a new traveler trip
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-slate-500 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-slate-50 transition"
            >
              Back to dashboard
            </button>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">List a trip in a few simple steps</h1>
          <p className="text-sm text-slate-500">
            This is the minimal form a traveler sees to publish a trip. Add where you are traveling from, where you are going, the travel date, and how much luggage space you can carry. Once submitted, senders can start sending requests that match your route.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left — Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
              <div>
                <h2 className="font-semibold text-slate-800 mb-1">Trip details</h2>
                <p className="text-xs text-slate-400">Keep this form minimal so travelers can list a route quickly without confusion.</p>
              </div>

              {/* Origin + Destination */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Origin country or city</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.origin}
                      onChange={e => setForm({ ...form, origin: e.target.value })}
                      placeholder="e.g. London, UK"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                      required
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Example: London, UK or Chattogram, Bangladesh</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Destination country or city</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.destination}
                      onChange={e => setForm({ ...form, destination: e.target.value })}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                      required
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Trips can be from any country to Bangladesh or from Bangladesh to any country.</p>
                </div>
              </div>

              {/* Date + Luggage */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Travel date</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      placeholder="e.g. 14 May 2025"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                      required
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Available luggage space</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.luggage}
                      onChange={e => setForm({ ...form, luggage: e.target.value })}
                      placeholder="e.g. 4.5 kg"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                      required
                    />
                    <Package className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Handoff note */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pickup and handoff note</label>
                <textarea
                  value={form.note}
                  onChange={e => setForm({ ...form, note: e.target.value })}
                  placeholder="Airport drop-off in Dubai before departure. Receiver can collect from Dhaka city after landing."
                  rows={4}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
                <p className="text-xs text-slate-400 mt-1">A short note helps senders understand how the handoff will work.</p>
              </div>

              {/* Accepting requests */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Accepting requests</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, accepting: 'yes' })}
                    className={`px-4 py-2 text-sm rounded-lg border transition font-medium ${
                      form.accepting === 'yes'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Yes, start receiving requests
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, accepting: 'paused' })}
                    className={`px-4 py-2 text-sm rounded-lg border transition font-medium ${
                      form.accepting === 'paused'
                        ? 'bg-slate-100 border-slate-400 text-slate-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    No, publish but keep paused
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">After publishing, your trip becomes visible to matching senders.</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2.5 text-sm font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                >
                  Save as draft
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition"
                >
                  Submit trip
                </button>
              </div>
            </form>
          </div>

          {/* Right — Trip preview + Tips */}
          <div className="space-y-4">

            {/* Trip preview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Trip preview</h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    {form.origin.split(',')[0].trim().substring(0, 3).toUpperCase() || 'DXB'}
                  </p>
                  <p className="text-xs text-slate-400">{form.origin || 'Dubai, UAE'}</p>
                </div>
                <span className="text-slate-300 text-lg">→</span>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">
                    {form.destination.split(',')[0].trim().substring(0, 3).toUpperCase() || 'DAC'}
                  </p>
                  <p className="text-xs text-slate-400">{form.destination || 'Dhaka, Bangladesh'}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4">{form.date} · {form.luggage} space</p>
              <div className="space-y-2">
                {[
                  { label: 'Status after submit', value: form.accepting === 'yes' ? 'Accepting requests' : 'Paused' },
                  { label: 'Visible to', value: 'Senders searching this route' },
                  { label: 'Delivery focus', value: 'Any country to Bangladesh or Bangladesh to any country' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-xs font-medium text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h3 className="font-semibold text-slate-800">Good trip listing tips</h3>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                <p className="text-xs font-semibold text-amber-800">Keep the route exact</p>
                <p className="text-xs text-amber-600">Specific city names help senders find the right traveler faster.</p>
              </div>
              <div className="space-y-2">
                {[
                  'Write the real travel date so request timing stays clear.',
                  'Only add the luggage space you can actually carry.',
                  'Add one short handoff note so senders know the delivery plan.',
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
``