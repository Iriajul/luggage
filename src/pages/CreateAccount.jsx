// src/pages/CreateAccount.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Eye, EyeOff, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [role, setRole] = useState('sender'); // 'traveler' | 'sender'
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [sendUpdates, setSendUpdates] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '', nidNumber: '',
  });
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const { signIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(form.email, form.fullName, role); // role = 'traveler' or 'sender'
    navigate('/dashboard');
    };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Plane className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-xl text-slate-900">LuggageLinker</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
          <Link to="/find-traveler" className="hover:text-emerald-600 transition">Find a Traveler</Link>
          <Link to="/send-package" className="hover:text-emerald-600 transition">Send a Package</Link>
          <Link to="/how-it-works" className="hover:text-emerald-600 transition">How it works</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/sign-in" className="px-5 py-2 text-sm font-semibold border border-slate-300 rounded-3xl hover:bg-slate-100 transition">
            Already have an account
          </Link>
          <Link to="/list-trip" className="px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-3xl hover:bg-emerald-700 transition">
            List your trip
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* ── LEFT PANEL ── */}
          <div className="p-8 bg-slate-50 border-r border-slate-200 flex flex-col gap-5">

            {/* Badge */}
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs font-medium w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              Secure onboarding for Bangladeshi senders and travelers
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-2">
                Create one account to send packages or carry deliveries on your trip
              </h1>
              <p className="text-sm text-slate-500">
                Choose your role, complete your profile, verify your identity with NID, and start using routes between Bangladesh and the rest of the world.
              </p>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'traveler', title: 'I am a traveler', desc: 'List your upcoming trip, show available luggage space, and receive package requests from senders.' },
                { key: 'sender', title: 'I am a sender', desc: 'Find trusted travelers, request delivery, and manage package conversations in one place.' },
              ].map(({ key, title, desc }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRole(key)}
                  className={`text-left p-4 rounded-xl border-2 transition ${
                    role === key
                      ? 'border-emerald-500 bg-white'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-slate-800">{title}</p>
                    {role === key && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <p className="text-xs text-slate-500">{desc}</p>
                </button>
              ))}
            </div>

            {/* Info steps */}
            {[
              { icon: '✓', title: 'Single account, flexible role', desc: 'Users can start as a traveler or sender and switch use cases later from the same account.' },
              { icon: '🪪', title: 'NID identity verification', desc: 'Every user must submit National ID details before account review is marked complete.' },
              { icon: '📄', title: 'Terms acceptance required', desc: 'Clear platform rules help protect both senders and travelers before the first request is created.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="text-base mt-0.5">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}

            {/* Why we ask */}
            {/* <div className="mt-auto border border-slate-200 rounded-xl p-4 bg-white">
              <p className="text-sm font-semibold text-slate-700 mb-3">Why we ask for verification</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'NID', sub: 'Required for profile approval' },
                  { label: 'Email', sub: 'Used for sign-in and notifications' },
                  { label: 'Role', sub: 'Traveler or sender at signup' },
                ].map(({ label, sub }) => (
                  <div key={label}>
                    <p className="text-sm font-semibold text-slate-800">{label}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
            <p className="text-sm text-slate-500 mb-6">
              Sign up with your full name, email, password, and identity details to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Role dropdown
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Selected role</label>
                <select
                  value={role === 'sender' ? 'Sender account' : 'Traveler account'}
                  onChange={e => setRole(e.target.value === 'Sender account' ? 'sender' : 'traveler')}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option>Sender account</option>
                  <option>Traveler account</option>
                </select>
              </div> */}

              {/* Full name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
                <input
                  type="text"
                  placeholder="Enter your full name as on NID"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone number</label>
                  <input
                    type="tel"
                    placeholder="+880 1XXXXXXXXX"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Create password"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                      required
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-slate-400">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                      required
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-2.5 text-slate-400">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Identity verification */}
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800">Identity verification</p>
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Required
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Upload your Bangladeshi NID details so the platform can review and approve your account before you start messaging or creating delivery requests.
                </p>

                {/* NID uploads */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {[
                    { label: 'NID front side', sub: 'Upload clear image or scan', key: 'front', state: nidFront, setter: setNidFront },
                    { label: 'NID back side', sub: 'Upload reverse side for review', key: 'back', state: nidBack, setter: setNidBack },
                  ].map(({ label, sub, key, state, setter }) => (
                    <label key={key} className="cursor-pointer border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:border-emerald-400 transition text-center">
                      <Upload className="w-5 h-5 text-slate-400" />
                      <p className="text-xs font-semibold text-slate-700">{label}</p>
                      <p className="text-xs text-slate-400">{state ? state.name : sub}</p>
                      <input type="file" accept="image/*" className="hidden" onChange={e => setter(e.target.files[0])} />
                    </label>
                  ))}
                </div>

                {/* NID number */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">NID number</label>
                  <input
                    type="text"
                    placeholder="Enter your National ID number"
                    value={form.nidNumber}
                    onChange={e => setForm({ ...form, nidNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} className="mt-0.5 accent-emerald-600" required />
                  <label htmlFor="terms" className="text-xs text-slate-600">
                    I accept the <span className="text-emerald-600 font-medium cursor-pointer hover:underline">terms and conditions</span>
                    <br />
                    <span className="text-slate-400">By continuing, I agree to the platform rules, prohibited items policy, and identity review requirements. Click <span className="text-emerald-600 font-medium cursor-pointer">terms and conditions</span> to view the full list of terms, conditions, and rules.</span>
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="updates" checked={sendUpdates} onChange={e => setSendUpdates(e.target.checked)} className="mt-0.5 accent-emerald-600" />
                  <label htmlFor="updates" className="text-xs text-slate-600">
                    Send me trip updates and request notifications
                    <br />
                    <span className="text-slate-400">Optional email updates about route matches, request activity, and account review status.</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                Create account
              </button>

              <p className="text-center text-sm text-slate-500">
                Already registered?{' '}
                <Link to="/sign-in" className="text-emerald-600 font-medium hover:underline">Sign in instead</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}