// src/components/TravelerDashboard.jsx
import { useAuth } from '../context/AuthContext';
import { Link,useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function TravelerDashboard({ user }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Dashboard Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">

        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Plane className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-xl text-slate-900">LuggageLinker</span>
        </Link>

        {/* Center — Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="text-emerald-600 font-semibold">Dashboard</a>
          <a onClick={() => navigate('/my-trips')} className="cursor-pointer hover:text-emerald-600">My trips</a>
          <a onClick={() => navigate('/requests')} className="cursor-pointer hover:text-emerald-600">Requests</a>
          <a onClick={() => navigate('/messages')} className="cursor-pointer hover:text-emerald-600">Messages</a>
        </div>

        {/* Right — Button + Avatar */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/add-trip')} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
            Add new trip
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={signOut}>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
              {user.name?.[0]?.toUpperCase() || 'T'}
            </div>
            <span className="text-sm font-medium text-slate-700">{user.name}</span>
          </div>
        </div>

      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Welcome banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          
          <div className="flex items-center justify-between">
            
            {/* Left: Welcome text */}
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {user.name} 👋
            </h1>

            {/* Right: Buttons */}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                List your trip
              </button>
              <button className="px-4 py-2 border border-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-50 transition">
                Open messages
              </button>
            </div>  
          </div>
          <div className="flex gap-3 text-xs text-slate-500">
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active trips', value: '2', sub: 'One to Dhaka, one from Chattogram' },
            { label: 'Pending requests', value: '5', sub: 'Needs review before departure' },
            { label: 'Unread messages', value: '3', sub: 'Senders are waiting for reply' },
            { label: 'Free luggage space', value: '4.5 kg', sub: 'Available on the next Dhaka trip' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Active trip + Requests */}
          <div className="md:col-span-2 space-y-6">

            {/* Active trip */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="font-semibold text-slate-800 mb-1">Your active trip</h2>
              <p className="text-xs text-slate-400 mb-4">A traveler dashboard should highlight the current route first, so incoming package requests are easy to evaluate.</p>
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="font-bold text-slate-900">DXB</p>
                      <p className="text-xs text-slate-400">Dubai, UAE</p>
                    </div>
                    <span className="text-slate-300 text-lg">→</span>
                    <div className="text-center">
                      <p className="font-bold text-slate-900">DAC</p>
                      <p className="text-xs text-slate-400">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                    Accepting requests
                  </span>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500">May 14 · Emirates</span>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: 'Pickup side', value: 'Airport drop-off in Dubai' },
                    { label: 'Delivery side', value: 'Dhaka city handoff after arrival' },
                    { label: 'Available space', value: '4.5 kg remaining' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-sm font-medium text-slate-700 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-1.5 border border-slate-200 text-sm rounded-lg hover:bg-slate-50 transition">Edit trip</button>
                  <button className="px-4 py-1.5 border border-slate-200 text-sm rounded-lg hover:bg-slate-50 transition">Pause requests</button>
                </div>
              </div>
            </div>

            {/* Incoming requests */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="font-semibold text-slate-800 mb-1">Incoming delivery requests</h2>
              <p className="text-xs text-slate-400 mb-4">This section shows how travelers review sender requests from Bangladesh users and overseas senders.</p>
              <div className="space-y-4">
                {[
                  {
                    name: 'Shafiq Ahmed', weight: '2.5 kg', items: 'Documents + clothes',
                    route: 'Dubai to Dhaka', handoff: 'Airport drop-off before departure',
                    need: 'Within this trip', time: 'Requested 40 minutes ago', accepted: false,
                  },
                  {
                    name: 'Nusrat Jahan', weight: '1.0 kg', items: 'Small personal items',
                    route: 'Bangladesh arrival handoff only', handoff: 'Receiver can collect from Dhaka',
                    need: 'Needs clarification', time: 'Asked for a Bangladesh domestic handoff plan', accepted: true,
                  },
                ].map((req) => (
                  <div key={req.name} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">
                          {req.name[0]}
                        </div>
                        <p className="text-sm font-semibold text-slate-800">{req.name}</p>
                      </div>
                      <span className="text-xs text-slate-500">{req.weight} · {req.items}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{req.time}</p>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { label: 'Route match', value: req.route },
                        { label: 'Requested handoff', value: req.handoff },
                        { label: 'Need by', value: req.need },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-slate-50 rounded-lg p-2">
                          <p className="text-xs text-slate-400">{label}</p>
                          <p className="text-xs font-medium text-slate-700 mt-0.5">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {req.accepted ? (
                        <button className="px-3 py-1.5 border border-slate-200 text-xs rounded-lg hover:bg-slate-50">Review details</button>
                      ) : (
                        <>
                          <button className="px-3 py-1.5 border border-slate-200 text-xs rounded-lg hover:bg-slate-50">View request</button>
                          <button className="px-3 py-1.5 border border-slate-200 text-xs rounded-lg hover:bg-slate-50">Message sender</button>
                          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700">Accept request</button>
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
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Traveler profile</h3>
              <div className="space-y-3">
                {[
                  { label: 'Verification', value: 'Verified' },
                  { label: 'Main route', value: 'Dubai ↔ Bangladesh' },
                  { label: 'Rating', value: '4.9 from recent senders' },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-slate-100 rounded-lg p-3">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-medium text-slate-700">{value}</p>
                  </div>
                ))}
                <button className="w-full py-2 border border-slate-200 text-sm font-medium rounded-lg hover:bg-slate-50 transition">
                  View public profile
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">This month</h3>
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Completed deliveries</p>
                  <p className="text-2xl font-bold text-slate-900">6</p>
                  <p className="text-xs text-slate-400 mt-1">Travelers can track delivery activity here after login.</p>
                </div>
                {[
                  { label: 'Pending handoffs', value: '2 requests accepted' },
                  { label: 'Reply speed', value: 'Usually within 2 hours' },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-slate-100 rounded-lg p-3">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-medium text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Before your trip</h3>
              <div className="space-y-2">
                {[
                  'Keep your trip date and luggage space updated.',
                  'Review sender item details before accepting any request.',
                  'Use messages to confirm pickup and Bangladesh delivery area.',
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