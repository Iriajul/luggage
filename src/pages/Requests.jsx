// src/pages/Requests.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const mockRequests = [
  {
    id: 1,
    name: 'Rafiq Hasan',
    verified: true,
    status: 'new',
    description: 'Wants delivery on your Dubai, UAE → Dhaka, Bangladesh trip',
    type: 'Documents',
    weight: '0.8 kg',
    time: 'Sent 12 min ago',
    pickup: 'Dubai airport terminal 3',
    dropoff: 'Dhanmondi, Dhaka',
    preferred: '14 May 2025',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    verified: true,
    status: 'pending',
    description: 'Asked to send a small parcel on your Dubai, UAE → Dhaka, Bangladesh trip',
    type: 'Gift item',
    weight: '1.5 kg',
    time: 'Sent yesterday',
    pickup: 'Sharjah city',
    dropoff: 'Mirpur, Dhaka',
    preferred: 'Flexible handover time',
  },
  {
    id: 3,
    name: 'Mahmud Rahman',
    verified: true,
    status: 'accepted',
    description: 'Confirmed on your Dhaka, Bangladesh → Kuala Lumpur, Malaysia trip',
    type: 'Medicine',
    weight: '1 kg',
    time: 'Accepted today',
    pickup: 'Uttara, Dhaka',
    dropoff: 'Bukit Bintang, Kuala Lumpur',
    preferred: 'Waiting for chat coordination',
  },
];

const statusConfig = {
  new: { label: 'New request', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  pending: { label: 'Pending', bg: 'bg-slate-100 text-slate-600 border-slate-200' },
  accepted: { label: 'Accepted', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export default function Requests() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? mockRequests
    : mockRequests.filter(r => r.status === filter);

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
          <a onClick={() => navigate('/dashboard')} className="cursor-pointer hover:text-emerald-600">Dashboard</a>
          <a onClick={() => navigate('/my-trips')} className="cursor-pointer hover:text-emerald-600">My trips</a>
          <span className="text-emerald-600 font-semibold">Requests</span>
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

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium mb-3">
            <span>📦</span> Traveler requests
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Review sender requests for your trips</h1>
          <p className="text-sm text-slate-500">See new delivery requests, check package details, and decide what to accept.</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          {[
            { value: mockRequests.filter(r => r.status === 'new').length, label: 'New requests' },
            { value: mockRequests.filter(r => r.status === 'pending').length, label: 'Pending review' },
            { value: mockRequests.filter(r => r.status === 'accepted').length, label: 'Accepted request' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl px-5 py-4">
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left — Requests list */}
          <div className="md:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-slate-800">Requests</h2>
                <div className="flex gap-2">
                  {['all', 'new', 'pending', 'accepted'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 text-xs rounded-lg border transition font-medium capitalize ${
                        filter === f
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-5">Clean view of sender requests linked to your active trips.</p>

              <div className="space-y-4">
                {filtered.map((req) => (
                  <div key={req.id} className="border border-slate-200 rounded-xl p-4">

                    {/* Request header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-sm font-semibold text-slate-600">
                          {req.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-800">{req.name}</p>
                            {req.verified && (
                              <span className="text-xs text-emerald-600 flex items-center gap-0.5">
                                ✓ Verified
                              </span>
                            )}
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusConfig[req.status].bg}`}>
                              {statusConfig[req.status].label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mb-2">{req.description}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <span>📄 {req.type}</span>
                      <span>⚖ {req.weight}</span>
                      <span>🕐 {req.time}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mb-4">
                      {req.status === 'new' && (
                        <>
                          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition">
                            Accept request
                          </button>
                          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                            Message sender
                          </button>
                        </>
                      )}
                      {req.status === 'pending' && (
                        <>
                          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition">
                            Message sender
                          </button>
                          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                            View details
                          </button>
                        </>
                      )}
                      {req.status === 'accepted' && (
                        <>
                          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition">
                            Open chat
                          </button>
                          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                            View trip
                          </button>
                        </>
                      )}
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Pickup</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">{req.pickup}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Drop-off</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">{req.dropoff}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-400">{req.status === 'accepted' ? 'Status' : req.status === 'pending' ? 'Sender note' : 'Preferred date'}</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">{req.preferred}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">

            {/* Active trip */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Active trip</h3>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-lg font-bold text-slate-900">DXB</p>
                  <p className="text-xs text-slate-400">Dubai, UAE</p>
                </div>
                <span className="text-slate-300">→</span>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">DAC</p>
                  <p className="text-xs text-slate-400">Dhaka, Bangladesh</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4">14 May · 4.5 kg · live</p>
              <div className="space-y-2">
                {[
                  { label: 'Linked requests', value: '2 sender requests' },
                  { label: 'Available space', value: '4.5 kg remaining' },
                  { label: 'Main action', value: 'Accept or message senders' },
                ].map(({ label, value }) => (
                  <div key={label} className="border-t border-slate-100 pt-2">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-xs font-medium text-slate-700 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-4">Quick summary</h3>
              <div className="space-y-2">
                {[
                  { label: 'Requests screen', value: 'Shows sender name, parcel, route, and status' },
                  { label: 'Traveler actions', value: 'Accept request, message sender, open chat' },
                  { label: 'Route focus', value: 'Any country to Bangladesh or Bangladesh to any country' },
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