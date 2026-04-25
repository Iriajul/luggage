// src/pages/SignIn.jsx
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Plane, Eye, EyeOff, Key, UserPlus, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [keepSigned, setKeepSigned] = useState(true);
  const [role, setRole] = useState('traveler');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, email, role); // using email as name placeholder
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar brand */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <Link to="/" className="flex items-center gap-3 w-fit">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Plane className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-xl text-slate-900">LuggageLinker</span>
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Left panel */}
          <div className="p-8 bg-slate-50 border-r border-slate-200">
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-sm mb-6">
              <Shield className="w-4 h-4" />
              Secure sign in for Bangladeshi senders and travelers
            </div>
            <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-3">
              Sign in to manage delivery requests, trips, and conversations in one account
            </h1>
            <p className="text-slate-500 text-sm mb-8">
              Use your email address to access your traveler or sender account and continue routes between Bangladesh and worldwide destinations.
            </p>

            {/* Steps */}
            {[
              { n: 1, title: 'Continue as traveler or sender', desc: 'The same account can be used to list trips, receive requests, send packages, and reply to messages.' },
              { n: 2, title: 'Use your email address', desc: 'Sign in with the email connected to your reviewed profile and Bangladesh-focused delivery activity.' },
              { n: 3, title: 'Pick up where you left off', desc: 'Open your messages, delivery requests, and trip updates from one secure account.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{n}</div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}

            {/* Access cards */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { title: 'Traveler access', desc: 'Open your trip listings, luggage space details, incoming delivery requests, and accepted package handoffs.' },
                { title: 'Sender access', desc: 'Track your conversations, delivery requests, traveler replies, and package coordination from one dashboard.' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white border border-slate-200 rounded-xl p-4">
                  <p className="font-semibold text-slate-800 text-sm mb-1">{title}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              ))}
            </div>

            {/* Protected info */}
            {/* <div className="mt-4 border border-slate-200 rounded-xl p-4 bg-white">
              <p className="text-sm font-semibold text-slate-700 mb-3">What stays protected</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Email', sub: 'For sign in and notifications' },
                  { label: 'Password', sub: 'Private account access' },
                  { label: 'Messages', sub: 'Your delivery conversations' },
                ].map(({ label, sub }) => (
                  <div key={label}>
                    <p className="text-sm font-semibold text-slate-800">{label}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Right panel — form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
            <p className="text-sm text-slate-500 mb-6">Sign in with your email address and password to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Role selector — moved here from outside the grid */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sign in as</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="traveler">Traveler</option>
                  <option value="sender">Sender</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-slate-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Keep signed in */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="keep"
                  checked={keepSigned}
                  onChange={e => setKeepSigned(e.target.checked)}
                  className="mt-0.5 accent-emerald-600"
                />
                <div>
                  <label htmlFor="keep" className="text-sm font-medium text-slate-800">Keep me signed in on this device</label>
                  <p className="text-xs text-slate-400">Useful for quickly checking traveler messages, delivery requests, and trip updates on your personal device.</p>
                </div>
              </div>

              {/* Forgot password box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-700 mb-1">Need help signing in?</p>
                <p className="text-xs text-slate-500 mb-3">If you cannot remember your password, use the recovery option below to reset it through your email address.</p>
                <button type="button" className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition w-full">
                  <Key className="w-4 h-4 text-slate-500" />
                  <div className="text-left">
                    <p className="font-semibold text-slate-800 text-sm">Forgot password</p>
                    <p className="text-xs text-slate-400">Request a password reset link for your registered email address.</p>
                  </div>
                </button>
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                <ArrowRight className="w-4 h-4" /> Sign in
              </button>

              <button onClick={() => navigate('/create-account')} className="w-full border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition">
                <UserPlus className="w-4 h-4" /> Create a new account
              </button>

              <div className="flex justify-between text-sm text-slate-500 mt-2">
                <span>New to LuggageLinker?</span>
                <button onClick={() => navigate('/create-account')} className="text-emerald-600 font-medium hover:underline">Create account instead</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}