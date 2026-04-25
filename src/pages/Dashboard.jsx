// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import TravelerDashboard from '../components/TravelerDashboard';
import SenderDashboard from '../components/SenderDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  // show different dashboard based on role
  return user.role === 'traveler'
    ? <TravelerDashboard user={user} />
    : <SenderDashboard user={user} />;
}