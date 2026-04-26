// src/components/SenderDashboard.jsx
import { useAuth } from '../context/AuthContext';
import { Shield, Search, MessageSquare, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function SenderDashboard({ user }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

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

        {/* Center — Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a onClick={() => navigate('/dashboard')} className="cursor-pointer text-emerald-600 font-semibold">Dashboard</a>
          <a onClick={() => navigate('/my-requests')} className="cursor-pointer hover:text-emerald-600">My Requests</a>
          <a onClick={() => navigate('/find-traveler')} className="cursor-pointer hover:text-emerald-600">Find travelers</a>
          <a onClick={() => navigate('/messages')} className="cursor-pointer hover:text-emerald-600">Messages</a>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/find-traveler')}
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
            Send new request
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={signOut}>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
              {user.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <span className="text-sm font-medium text-slate-700">{user.name} · Sender</span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Welcome banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium mb-3">
            <Shield className="w-4 h-4" /> Sender dashboard
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, {user.name} 👋</h1>
              <p className="text-sm text-slate-500 mb-3">
                Track delivery requests, continue conversations with travelers, and quickly start a new package request from here.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  ✓ Profile verified
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Primary route: Dubai to Bangladesh
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => navigate('/find-traveler')}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                Find trusted travelers
              </button>
              <button
                onClick={() => navigate('/messages')}
                className="px-4 py-2 border border-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-50 transition">
                Go to messages
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left — main content */}
          <div className="md:col-span-2 space-y-6">

            {/* Delivery overview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="font-semibold text-slate-800 mb-1">Your delivery overview</h2>
              <p className="text-xs text-slate-400 mb-4">A simple summary of your sender activity for current package requests.</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Active requests', value: '2 requests' },
                  { label: 'Waiting for reply', value: '1 traveler' },
                  { label: 'Accepted delivery', value: '1 confirmed' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                    <p className="text-lg font-bold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Current requests */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="font-semibold text-slate-800 mb-1">Current requests</h2>
              <p className="text-xs text-slate-400 mb-4">These are the requests a sender would usually manage right after logging in.</p>
              <div className="space-y-4">
                {[
                  {
                    name: 'Farhana Rahman',
                    route: 'Dubai, UAE → Dhaka, Bangladesh',
                    date: 'May 14',
                    package: 'Documents and clothes',
                    weight: '2.5 kg',
                    dropoff: 'Dhanmondi, Dhaka',
                    note: 'Traveler accepted your request and asked you to confirm airport handoff timing in Dubai one day before departure.',
                    status: 'accepted',
                  },
                  {
                    name: 'Tanvir Hossain',
                    route: 'London, UK → Sylhet, Bangladesh',
                    date: 'May 19',
                    package: 'Prescription medicine',
                    weight: '1.0 kg',
                    dropoff: '',
                    note: 'You already shared the prescription note and item photo. The traveler has not replied yet.',
                    status: 'waiting',
                  },
                ].map((req) => (
                  <div key={req.name} className="border border-slate-200 rounded-xl p-4">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">
                          {req.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{req.name}</p>
                          <p className="text-xs text-slate-400">{req.route} · {req.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                        req.status === 'accepted'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-600 border-amber-200'
                      }`}>
                        {req.status === 'accepted' ? 'Accepted' : 'Waiting'}
                      </span>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Package</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">{req.package}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Weight</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">{req.weight}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-400">{req.status === 'accepted' ? 'Drop-off' : 'Status'}</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">
                          {req.status === 'accepted' ? req.dropoff : 'Sent 1 hour ago'}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mb-3">{req.note}</p>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {req.status === 'accepted' ? (
                        <>
                          <button
                            onClick={() => navigate('/messages')}
                            className="px-3 py-1.5 border border-slate-200 text-xs font-medium rounded-lg hover:bg-slate-50 text-emerald-600 transition">
                            Message traveler
                          </button>
                          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition">
                            View request
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => navigate('/messages')}
                            className="px-3 py-1.5 border border-slate-200 text-xs font-medium rounded-lg hover:bg-slate-50 text-emerald-600 transition">
                            Open chat
                          </button>
                          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition">
                            Edit request
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What you can do */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="font-semibold text-slate-800 mb-1">What you can do now</h2>
              <p className="text-xs text-slate-400 mb-4">Useful next actions for a sender after signing in.</p>
              <div className="space-y-3">
                {[
                  { icon: <Search className="w-4 h-4" />, text: 'Search for travelers coming from any country to Bangladesh or from Bangladesh to another country.' },
                  { icon: <MessageSquare className="w-4 h-4" />, text: 'Continue package conversations without retyping delivery details every time.' },
                  { icon: <FileText className="w-4 h-4" />, text: 'Keep item description, weight, and pickup or drop-off notes ready before sending a new request.' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="text-slate-400 mt-0.5">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">

            {/* Sender profile */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Sender profile</h3>
              <div className="space-y-2">
                {[
                  { label: 'Account email', value: user.email },
                  { label: 'Primary city', value: 'Dhaka, Bangladesh' },
                  { label: 'Verification', value: 'Verified' },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-slate-100 rounded-lg p-3">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-medium text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest message */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Latest message</h3>
              <div className="bg-slate-50 rounded-xl p-3 mb-3">
                <p className="text-xs font-semibold text-slate-700 mb-1">Farhana Rahman</p>
                <p className="text-xs text-slate-500">
                  I can carry the package. Please send the pickup time in Dubai and the receiver name in Dhaka.
                </p>
              </div>
              <button
                onClick={() => navigate('/messages')}
                className="w-full py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                Continue chat
              </button>
            </div>

            {/* Before sending */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Before sending a new request</h3>
              <div className="space-y-2 mb-4">
                {[
                  { icon: '📦', text: 'Keep the package weight accurate.' },
                  { icon: '📷', text: 'Upload a clear item photo when needed.' },
                  { icon: '⚠️', text: 'Do not request restricted items.' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{icon}</span><p>{text}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/find-traveler')}
                className="w-full py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                Send new request
              </button>
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Quick actions</h3>
              <div className="space-y-2">
                {[
                  { icon: <Search className="w-4 h-4" />, label: 'Find travelers', path: '/find-traveler' },
                  { icon: <FileText className="w-4 h-4" />, label: 'My requests', path: '/my-requests' },
                  { icon: <MessageSquare className="w-4 h-4" />, label: 'Messages', path: '/messages' },
                ].map(({ icon, label, path }) => (
                  <button
                    key={label}
                    onClick={() => navigate(path)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 transition text-sm text-slate-700"
                  >
                    <span className="text-slate-400">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}