// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import SendPackage from './pages/SendPackage';
import HowItWorks from './pages/HowItWorks';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';
import ListTrip from './pages/ListTrip';
import AddTrip from './pages/AddTrip';
import MyTrips from './pages/MyTrips';
import Requests from './pages/Requests';
import Messages from './pages/Messages';
import FindTraveler from './pages/FindTraveler';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── NO global navbar (have their own) ── */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-trip" element={<ProtectedRoute><AddTrip /></ProtectedRoute>} />
          <Route path="/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/find-traveler" element={<ProtectedRoute><FindTraveler /></ProtectedRoute>} />

          {/* ── WITH global navbar ── */}
          <Route path="/*" element={
            <div className="min-h-screen bg-white text-slate-900">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/send-package" element={<SendPackage />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/list-trip" element={<ProtectedRoute><ListTrip /></ProtectedRoute>} />
              </Routes>
            </div>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;