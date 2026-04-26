// src/pages/Messages.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Paperclip, Smile, Send, Image } from 'lucide-react';

const mockChats = [
  {
    id: 1,
    name: 'Mahmud Rahman',
    route: 'Dhaka → Kuala Lumpur',
    preview: 'I can meet near the airport af...',
    time: '2m',
    unread: 1,
    verified: true,
    parcel: '1 kg parcel',
    pickup: 'Uttara, Dhaka',
    dropoff: 'Bukit Bintang, Kuala Lumpur',
    nextStep: 'Confirm handover time',
    messages: [
      { id: 1, from: 'sender', text: 'Assalamu alaikum. I sent the medicine request for your Kuala Lumpur trip.', time: 'Today · 11:12 am' },
      { id: 2, from: 'me', text: 'Wa alaikum assalam. Yes, I accepted it. Please share your preferred pickup area in Dhaka.', time: 'Today · 11:18 am' },
      { id: 3, from: 'sender', text: 'Uttara sector 7 would be easiest for me. I can meet one day before your flight.', time: 'Today · 11:26 am' },
      { id: 4, from: 'me', text: 'That works. I can meet near the airport after 6 pm.', time: 'Today · 11:28 am' },
      { id: 5, from: 'sender', text: null, image: true, caption: 'Parcel photo', time: 'Today · 11:26 am' },
      { id: 6, from: 'me', text: '👍 😊', time: 'Today · 11:27 am' },
    ],
  },
  {
    id: 2,
    name: 'Rafiq Hasan',
    route: 'Dubai → Dhaka',
    preview: 'Please confirm terminal 3 pickup p...',
    time: '18m',
    unread: 0,
    verified: true,
    parcel: '0.8 kg parcel',
    pickup: 'Dubai airport terminal 3',
    dropoff: 'Dhanmondi, Dhaka',
    nextStep: 'Confirm pickup point',
    messages: [
      { id: 1, from: 'sender', text: 'Please confirm terminal 3 pickup point for the documents.', time: 'Today · 10:40 am' },
      { id: 2, from: 'me', text: 'Yes terminal 3 works. I will be there by 9am.', time: 'Today · 10:55 am' },
    ],
  },
  {
    id: 3,
    name: 'Nusrat Jahan',
    route: 'Dubai → Dhaka',
    preview: 'Flexible handover time works for ...',
    time: 'Yesterday',
    unread: 0,
    verified: true,
    parcel: '1.5 kg parcel',
    pickup: 'Sharjah city',
    dropoff: 'Mirpur, Dhaka',
    nextStep: 'Agree on handover time',
    messages: [
      { id: 1, from: 'sender', text: 'Flexible handover time works for me. Just let me know when you land.', time: 'Yesterday · 6:30 pm' },
    ],
  },
];

export default function Messages() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [input, setInput] = useState('');
  const [chats, setChats] = useState(mockChats);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: 'me', text: input, time: 'Now' };
    const updated = chats.map(c =>
      c.id === activeChat.id
        ? { ...c, messages: [...c.messages, newMsg], preview: input }
        : c
    );
    setChats(updated);
    setActiveChat(updated.find(c => c.id === activeChat.id));
    setInput('');
  };

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
          <a onClick={() => navigate('/requests')} className="cursor-pointer hover:text-emerald-600">Requests</a>
          <span className="text-emerald-600 font-semibold">Messages</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/add-trip')} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
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
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium mb-2">
            <span>💬</span> Traveler messages
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Messages with senders</h1>
          <p className="text-sm text-slate-500">Keep delivery conversations in one place and coordinate pickup or drop-off details.</p>
        </div>

        {/* Chat layout */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex" style={{ height: '600px' }}>

          {/* Left — Chat list */}
          <div className="w-72 border-r border-slate-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Chats</h2>
              <p className="text-xs text-slate-400">Recent sender conversations</p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 cursor-pointer border-b border-slate-100 hover:bg-slate-50 transition ${
                    activeChat.id === chat.id ? 'bg-slate-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-sm font-semibold text-slate-600 flex-shrink-0">
                      {chat.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-slate-800 truncate">{chat.name}</p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs text-slate-400">{chat.time}</span>
                          {chat.unread > 0 && (
                            <span className="w-4 h-4 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{chat.route}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{chat.preview}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty state hint */}
              <div className="p-4 m-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-medium mb-1">Open chat</p>
                <p className="text-xs text-slate-400">Select a sender conversation to continue delivery coordination.</p>
              </div>
            </div>
          </div>

          {/* Right — Active chat */}
          <div className="flex-1 flex flex-col">

            {/* Chat header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-sm font-semibold text-slate-600">
                    {activeChat.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{activeChat.name}</p>
                    <p className="text-xs text-slate-400">
                      Accepted request · {activeChat.route.replace('→', '→')}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-emerald-600 flex items-center gap-0.5">✓ Verified</span>
                      <span className="text-xs text-slate-400">{activeChat.parcel}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                    View trip
                  </button>
                  <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                    View request
                  </button>
                </div>
              </div>

              {/* Trip details strip */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[
                  { label: 'Pickup', value: activeChat.pickup },
                  { label: 'Drop-off', value: activeChat.dropoff },
                  { label: 'Next step', value: activeChat.nextStep },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-xs font-medium text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeChat.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {msg.image ? (
                    <div className="max-w-xs">
                      <div className="w-48 h-32 bg-slate-200 rounded-xl overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                          <Image className="w-8 h-8 text-slate-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Image className="w-3 h-3 text-slate-400" />
                        <p className="text-xs text-slate-400">{msg.caption}</p>
                      </div>
                      <p className="text-xs text-slate-400">{msg.time}</p>
                    </div>
                  ) : (
                    <div className={`max-w-sm ${msg.from === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                        msg.from === 'me'
                          ? 'bg-emerald-600 text-white rounded-br-sm'
                          : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{msg.time}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 relative">

            {/* Emoji picker popup */}
            {showEmoji && (
                <div className="absolute bottom-20 left-4 bg-white border border-slate-200 rounded-2xl shadow-lg p-3 z-10">
                <p className="text-xs text-slate-400 mb-2 font-medium">Quick reactions</p>
                <div className="grid grid-cols-6 gap-1">
                    {['😊','👍','🙏','✅','📦','🚀','😄','❤️','👋','🤝','⏰','📍','✈️','🇧🇩','💬','🔔','😅','👌'].map(emoji => (
                    <button
                        key={emoji}
                        onClick={() => {
                        setInput(prev => prev + emoji);
                        setShowEmoji(false);
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-lg transition"
                    >
                        {emoji}
                    </button>
                    ))}
                </div>
                </div>
            )}

            {/* Attachment options popup */}
            {showAttach && (
                <div className="absolute bottom-20 left-4 bg-white border border-slate-200 rounded-2xl shadow-lg p-3 z-10 w-48">
                <p className="text-xs text-slate-400 mb-2 font-medium">Attach</p>
                <div className="space-y-1">
                    {[
                    { icon: '🖼️', label: 'Photo or image' },
                    { icon: '📄', label: 'Document or PDF' },
                    ].map(({ icon, label }) => (
                    <label
                        key={label}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition"
                    >
                        <span>{icon}</span>
                        <span className="text-sm text-slate-700">{label}</span>
                        <input type="file" className="hidden" />
                    </label>
                    ))}
                </div>
                </div>
            )}

            {/* Close popups when clicking outside */}
            {(showEmoji || showAttach) && (
                <div
                className="fixed inset-0 z-0"
                onClick={() => { setShowEmoji(false); setShowAttach(false); }}
                />
            )}

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 relative z-10">
                <button
                onClick={() => { setShowAttach(!showAttach); setShowEmoji(false); }}
                className={`transition ${showAttach ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                <Paperclip className="w-4 h-4" />
                </button>
                <button
                onClick={() => { setShowEmoji(!showEmoji); setShowAttach(false); }}
                className={`transition ${showEmoji ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                <Smile className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 text-xs text-slate-400 border-l border-slate-200 pl-2">
                <Image className="w-3.5 h-3.5" />
                <span>Photo attached</span>
                </div>
                <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Write a message"
                className="flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder-slate-400"
                />
                <button
                onClick={sendMessage}
                className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition"
                >
                Send
                </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}