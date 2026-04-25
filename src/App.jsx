// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AddTrip from './pages/AddTrip';
import Home from './pages/Home';
import FindTraveler from './pages/FindTraveler';
import SendPackage from './pages/SendPackage';
import HowItWorks from './pages/HowItWorks';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';
import ListTrip from './pages/ListTrip';
import MyTrips from './pages/MyTrips';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── NO global navbar ── */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          {/* ── WITH global navbar ── */}
          <Route path="/*" element={
            <div className="min-h-screen bg-white text-slate-900">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/find-traveler" element={<FindTraveler />} />
                <Route path="/send-package" element={<SendPackage />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/list-trip" element={
                  <ProtectedRoute><ListTrip /></ProtectedRoute>
                } />
              </Routes>
            </div>
          } />

          <Route path="/add-trip" element={
            <ProtectedRoute><AddTrip /></ProtectedRoute>
          } />

          <Route path="/my-trips" element={
            <ProtectedRoute><MyTrips /></ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;