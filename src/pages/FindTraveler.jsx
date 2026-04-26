// src/pages/FindTraveler.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Calendar, Package, Search, SlidersHorizontal } from 'lucide-react';

const mockTravelers = [
  {
    id: 1,
    name: 'Farhana Rahman',
    verified: true,
    rating: 4.9,
    deliveries: 16,
    replyTime: '~2 hours',
    bio: 'Comfortable with documents, clothing, and small electronics accessories',
    from: 'DXB', fromCity: 'Dubai',
    to: 'DAC', toCity: 'Dhaka',
    date: 'May 14 · Emirates',
    space: '4.5 kg free space',
    direct: true,
  },
  {
    id: 2,
    name: 'Sajid Hasan',
    verified: true,
    rating: 4.8,
    deliveries: 10,
    replyTime: '~4 hours',
    bio: 'Ideal for gifts, medicine pickup, and urgent family parcels',
    from: 'DAC', fromCity: 'Dhaka',
    to: 'LHR', toCity: 'London',
    date: 'May 17 · Biman Bangladesh',
    space: '3 kg free space',
    direct: true,
  },
  {
    id: 3,
    name: 'Nusrat Jahan',
    verified: true,
    rating: 5.0,
    deliveries: 22,
    replyTime: '~1 hour',
    bio: 'Frequent route between Malaysia and Bangladesh for family and student deliveries',
    from: 'KUL', fromCity: 'Kuala Lumpur',
    to: 'DAC', toCity: 'Dhaka',
    date: 'May 20 · Malaysia Airlines',
    space: '6 kg free space',
    direct: true,
  },
  {
    id: 4,
    name: 'Karim Uddin',
    verified: false,
    rating: 4.5,
    deliveries: 5,
    replyTime: '~6 hours',
    bio: 'Available for document and small item deliveries on the Dubai–Dhaka route',
    from: 'DXB', fromCity: 'Dubai',
    to: 'DAC', toCity: 'Dhaka',
    date: 'May 22 · Flydubai',
    space: '2 kg free space',
    direct: true,
  },
];

const originOptions = ['Bangladesh', 'United Arab Emirates', 'United Kingdom', 'Malaysia'];
const destOptions = ['Bangladesh', 'Saudi Arabia', 'Italy'];

export default function FindTravelerPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState({ origin: 'Dubai, UAE', destination: 'Dhaka, Bangladesh', date: 'May 12 - May 22', luggage: '3kg+ available' });
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [bothWays, setBothWays] = useState(true);
  const [originFilter, setOriginFilter] = useState(['Bangladesh', 'United Arab Emirates']);
  const [destFilter, setDestFilter] = useState(['Bangladesh']);
  const [dateFilter, setDateFilter] = useState(['Within 7 days', 'Within 14 days']);
  const [luggageMin, setLuggageMin] = useState(3);
  const [sortBy, setSortBy] = useState('Best match');
  const [viewMode, setViewMode] = useState('list');

  const filtered = mockTravelers.filter(t => !verifiedOnly || t.verified);

  const toggleArr = (arr, setArr, val) =>
    arr.includes(val) ? setArr(arr.filter(v => v !== val)) : setArr([...arr, val]);

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
          <a onClick={() => navigate('/dashboard')} className="cursor-pointer hover:text-emerald-600">Home</a>
          <span className="text-emerald-600 font-semibold">Find a Traveler</span>
          <a onClick={() => navigate('/my-requests')} className="cursor-pointer hover:text-emerald-600">My Requests</a>
          <a onClick={() => navigate('/messages')} className="cursor-pointer hover:text-emerald-600">Messages</a>
        </div>
        <div className="flex items-center gap-2 cursor-pointer" onClick={signOut}>
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
            {user?.name?.[0]?.toUpperCase() || 'S'}
          </div>
          <span className="text-sm font-medium text-slate-700">{user?.name} · Sender</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header + Search */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium mb-3">
            <span>✈</span> AI matched routes for Bangladeshi travelers worldwide
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Find trusted travelers flying to Bangladesh or leaving Bangladesh
          </h1>
          <p className="text-sm text-slate-500 mb-5">
            Search routes in both directions — from any country to Bangladesh, or from Bangladesh to any country — based on date and available luggage space.
          </p>

          {/* Search bar */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Origin', icon: <MapPin className="w-4 h-4 text-slate-400" />, key: 'origin', placeholder: 'Dubai, UAE' },
              { label: 'Destination', icon: <MapPin className="w-4 h-4 text-slate-400" />, key: 'destination', placeholder: 'Dhaka, Bangladesh' },
              { label: 'Date', icon: <Calendar className="w-4 h-4 text-slate-400" />, key: 'date', placeholder: 'May 12 - May 22' },
              { label: 'Luggage space', icon: <Package className="w-4 h-4 text-slate-400" />, key: 'luggage', placeholder: '3kg+ available' },
            ].map(({ label, icon, key, placeholder }) => (
              <div key={key} className="border border-slate-200 rounded-lg px-3 py-2.5">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <div className="flex items-center gap-2">
                  {icon}
                  <input
                    type="text"
                    value={search[key]}
                    onChange={e => setSearch({ ...search, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="text-sm text-slate-700 bg-transparent outline-none w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  verifiedOnly ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-slate-200 text-slate-600'
                }`}
              >
                <span>✓</span> Verified only
              </button>
              <button
                onClick={() => setBothWays(!bothWays)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  bothWays ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-slate-200 text-slate-600'
                }`}
              >
                <span>⇄</span> Bangladesh both ways
              </button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
              <Search className="w-4 h-4" /> Search travelers
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">

          {/* Left — Filters */}
          <div className="col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-1">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Filters</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">Routes to and from Bangladesh</p>

              {/* Verification */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-700 mb-2">Verification</p>
                {[
                  { label: 'Verified travelers only', count: 86, key: 'verified' },
                  { label: 'Show all travelers', count: 37, key: 'all' },
                ].map(({ label, count, key }) => (
                  <label key={key} className="flex items-center justify-between py-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={key === 'verified' ? verifiedOnly : !verifiedOnly}
                        onChange={() => setVerifiedOnly(key === 'verified')}
                        className="accent-emerald-600"
                      />
                      <span className="text-xs text-slate-600">{label}</span>
                    </div>
                    <span className="text-xs text-slate-400">{count}</span>
                  </label>
                ))}
              </div>

              {/* Origin */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-700 mb-2">Origin</p>
                {originOptions.map((opt, i) => (
                  <label key={opt} className="flex items-center justify-between py-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={originFilter.includes(opt)}
                        onChange={() => toggleArr(originFilter, setOriginFilter, opt)}
                        className="accent-emerald-600"
                      />
                      <span className="text-xs text-slate-600">{opt}</span>
                    </div>
                    <span className="text-xs text-slate-400">{[41, 18, 12, 9][i]}</span>
                  </label>
                ))}
              </div>

              {/* Destination */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-700 mb-2">Destination</p>
                {destOptions.map((opt, i) => (
                  <label key={opt} className="flex items-center justify-between py-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={destFilter.includes(opt)}
                        onChange={() => toggleArr(destFilter, setDestFilter, opt)}
                        className="accent-emerald-600"
                      />
                      <span className="text-xs text-slate-600">{opt}</span>
                    </div>
                    <span className="text-xs text-slate-400">{[52, 14, 8][i]}</span>
                  </label>
                ))}
              </div>

              {/* Date */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-700 mb-2">Date</p>
                {['Within 7 days', 'Within 14 days', 'Flexible dates'].map((opt, i) => (
                  <label key={opt} className="flex items-center justify-between py-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={dateFilter.includes(opt)}
                        onChange={() => toggleArr(dateFilter, setDateFilter, opt)}
                        className="accent-emerald-600"
                      />
                      <span className="text-xs text-slate-600">{opt}</span>
                    </div>
                    <span className="text-xs text-slate-400">{[29, 57, 21][i]}</span>
                  </label>
                ))}
              </div>

              {/* Luggage space slider */}
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">Luggage space</p>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={luggageMin}
                  onChange={e => setLuggageMin(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1 kg</span>
                  <span className="text-emerald-600 font-medium">{luggageMin} kg minimum</span>
                  <span>10 kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Results */}
          <div className="col-span-3">

            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-slate-800">{filtered.length} matching travelers</h2>
                <p className="text-xs text-slate-400">Showing routes from any country to Bangladesh and from Bangladesh to destinations worldwide.</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white outline-none"
                >
                  <option>Best match</option>
                  <option>Highest rated</option>
                  <option>Most deliveries</option>
                  <option>Earliest date</option>
                </select>
                <button
                  onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                >
                  <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Traveler cards */}
            <div className="space-y-4">
              {filtered.map((t) => (
                <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex gap-4">

                    {/* Avatar + info */}
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-lg font-semibold text-slate-600 flex-shrink-0">
                      {t.name[0]}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-semibold text-slate-800">{t.name}</p>
                            {t.verified && (
                              <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span>⭐ {t.rating} rating</span>
                            <span>{t.deliveries} successful deliveries</span>
                            <span>Replies in {t.replyTime}</span>
                          </div>
                        </div>

                        {/* Route */}
                        <div className="flex items-center gap-3 text-center">
                          <div>
                            <p className="text-xl font-bold text-slate-900">{t.from}</p>
                            <p className="text-xs text-slate-400">{t.fromCity}</p>
                          </div>
                          <span className="text-slate-300 text-lg">→</span>
                          <div>
                            <p className="text-xl font-bold text-slate-900">{t.to}</p>
                            <p className="text-xs text-slate-400">{t.toCity}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 mb-3">{t.bio}</p>

                      {/* Tags + date */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{t.date}</span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{t.space}</span>
                          {t.direct && (
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Direct flight</span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                            View profile
                          </button>
                          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition">
                            Request delivery
                          </button>
                          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                            Message traveler
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}