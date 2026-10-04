import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Layout               from './components/Layout';
import Login                from './pages/Login';
import Dashboard            from './pages/Dashboard';
import WasteDetection       from './pages/WasteDetection';
import WasteHistory         from './pages/WasteHistory';
import SanitizationRequest  from './pages/SanitizationRequest';
import MyRequests           from './pages/MyRequests';
import DisposalGuidance     from './pages/DisposalGuidance';
import AdminDashboard       from './pages/AdminDashboard';
import Analytics            from './pages/Analytics';
import Notifications        from './pages/Notifications';
import Profile              from './pages/Profile';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard"             element={<Dashboard />} />
            <Route path="/waste-detection"       element={<WasteDetection />} />
            <Route path="/waste-history"         element={<WasteHistory />} />
            <Route path="/disposal-guidance"     element={<DisposalGuidance />} />
            <Route path="/sanitization-request"  element={<SanitizationRequest />} />
            <Route path="/my-requests"           element={<MyRequests />} />
            <Route path="/analytics"             element={<Analytics />} />
            <Route path="/notifications"         element={<Notifications />} />
            <Route path="/profile"               element={<Profile />} />
            <Route path="/admin"                 element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
