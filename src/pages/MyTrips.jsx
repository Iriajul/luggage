// src/pages/MyTrips.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Package } from 'lucide-react';

const mockTrips = [
  {
    id: 1,
    origin: 'Dubai, UAE',
    destination: 'Dhaka, Bangladesh',
    date: '14 May 2025',
    luggage: '4.5 kg',
    status: 'accepting',
    requests: 2,
    pickup: 'Dubai airport',
    dropoff: 'Dhaka city',
    visibility: 'Live to senders',
  },
  {
    id: 2,
    origin: 'Dhaka, Bangladesh',
    destination: 'Kuala Lumpur, Malaysia',
    date: '26 May 2025',
    luggage: '3 kg',
    status: 'paused',
    requests: 0,
    pickup: 'Bangladesh to Malaysia',
    dropoff: 'Hidden from new requests',
    visibility: 'Resume when ready',
  },
];

export default function MyTrips() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'accepting' | 'paused'
  const [trips, setTrips] = useState(mockTrips);

  const toggleStatus = (id) => {
    setTrips(trips.map(t =>
      t.id === id
        ? { ...t, status: t.status === 'accepting' ? 'paused' : 'accepting' }
        : t
    ));
  };

  const filtered = filter === 'all' ? trips : trips.filter(t => t.status === filter);
  const latest = trips[0];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">LL</span>
          </div>
          <span className="font-bold text-xl text-slate-900">LuggageLinker</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="/dashboard" className="hover:text-emerald-600">Dashboard</a>
          <span className="text-emerald-600 font-semibold">My trips</span>
          <a href="#" className="hover:text-emerald-600">Requests</a>
          <a href="#" className="hover:text-emerald-600">Messages</a>
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

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium">
              <span>⇄</span> Your published trips
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/add-trip')}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition"
              >
                Add new trip
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-50 transition"
              >
                Back to dashboard
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">See every trip you added in one place</h1>
          <p className="text-sm text-slate-500">
            Your trips appear here after you add them. Check status, open requests, and manage each route quickly.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          {[
            { value: trips.length, label: 'Trips saved in My trips' },
            { value: trips.filter(t => t.status === 'accepting').length, label: 'Trip currently accepting requests' },
            { value: trips.filter(t => t.status === 'paused').length, label: 'Trip kept paused for later' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl px-5 py-4">
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left — Trip list */}
          <div className="md:col-span-2 space-y-4">

            {/* Filter tabs */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h2 className="font-semibold text-slate-800 mb-1">My trips list</h2>
              <p className="text-xs text-slate-400 mb-4">The newest submitted trip appears first so travelers can immediately confirm it was added successfully.</p>

              <div className="flex gap-2 mb-5">
                {['all', 'accepting', 'paused'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 text-sm rounded-lg border transition font-medium capitalize ${
                      filter === f
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {f === 'all' ? 'All trips' : f === 'accepting' ? 'Accepting requests' : 'Paused'}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filtered.map((trip) => (
                  <div key={trip.id} className="border border-slate-200 rounded-xl p-5">

                    {/* Trip header */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900">
                        {trip.origin} → {trip.destination}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                          Published
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          trip.status === 'accepting'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                          {trip.status === 'accepting' ? 'Accepting requests' : 'Published but paused'}
                        </span>
                      </div>
                    </div>

                    {/* Trip meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {trip.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-3.5 h-3.5" /> {trip.luggage} space
                      </span>
                      {trip.requests > 0 && (
                        <span className="text-emerald-600 font-medium">
                          {trip.requests} new requests
                        </span>
                      )}
                      {trip.status === 'paused' && (
                        <span className="flex items-center gap-1">
                          ⏸ Requests paused
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mb-4">
                      {trip.status === 'accepting' ? (
                        <>
                          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition">
                            View requests
                          </button>
                          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                            Open messages
                          </button>
                          <button
                            onClick={() => toggleStatus(trip.id)}
                            className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition"
                          >
                            Pause requests
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleStatus(trip.id)}
                            className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition"
                          >
                            Resume requests
                          </button>
                          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                            Edit trip
                          </button>
                        </>
                      )}
                    </div>

                    {/* Trip details grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {trip.status === 'accepting' ? (
                        <>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-400">Pickup</p>
                            <p className="text-xs font-medium text-slate-700 mt-0.5">{trip.pickup}</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-400">Drop-off</p>
                            <p className="text-xs font-medium text-slate-700 mt-0.5">{trip.dropoff}</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-400">Visibility</p>
                            <p className="text-xs font-medium text-emerald-600 mt-0.5">{trip.visibility}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-400">Route</p>
                            <p className="text-xs font-medium text-slate-700 mt-0.5">{trip.pickup}</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-400">Status</p>
                            <p className="text-xs font-medium text-amber-600 mt-0.5">{trip.dropoff}</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-400">Next step</p>
                            <p className="text-xs font-medium text-slate-700 mt-0.5">{trip.visibility}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">

            {/* Latest added trip */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Latest added trip</h3>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {latest.origin.split(',')[0].substring(0, 3).toUpperCase()}
                  </p>
                  <p className="text-xs text-slate-400">{latest.origin}</p>
                </div>
                <span className="text-slate-300">→</span>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">
                    {latest.destination.split(',')[0].substring(0, 3).toUpperCase()}
                  </p>
                  <p className="text-xs text-slate-400">{latest.destination}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4">{latest.date} · {latest.luggage} · live</p>
              <div className="space-y-2">
                {[
                  { label: 'Status', value: 'Published in My trips', color: 'text-emerald-600' },
                  { label: 'Requests', value: `${latest.requests} new sender requests`, color: 'text-slate-700' },
                  { label: 'Next action', value: 'Open requests or messages', color: 'text-emerald-600' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="border-t border-slate-100 pt-2">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className={`text-xs font-medium mt-0.5 ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Quick summary</h3>
              <div className="space-y-3">
                {[
                  { label: 'Supported routes', value: 'Any country to Bangladesh or Bangladesh to any country' },
                  { label: 'Main actions', value: 'View requests, message, pause, resume' },
                  { label: 'Trip info shown', value: 'Route, date, luggage space, and status' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-xs font-medium text-slate-700 mt-0.5">{value}</p>
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