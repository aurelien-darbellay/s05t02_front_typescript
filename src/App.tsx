import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard.tsx';
import EditDocumentView from './components/EditDocumentView.tsx';
import PublicDocumentView from './components/PublicDocumentView.tsx';
import UserDashboard from './components/UserDashboard.tsx';
import UserDetails from './components/UserDetails.tsx';
import AuthPlugin from './components/authPlugin/AuthPlugin.tsx';
import BackgroundOverlay from './components/BackgroundOverlay.tsx';

function App() {
  const location = useLocation();
  return (
    <>
      <AuthPlugin top={35} right={35} />
      <BackgroundOverlay route={location.pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/edit" element={<EditDocumentView />} />
        <Route path="/public/:id" element={<PublicDocumentView />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/details" element={<UserDetails />} />
        {/* Fallback to Home for unmatched routes */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
