import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard.tsx";
import EditDocumentView from "./components/EditDocumentView.tsx";
import PublicDocumentView from "./components/PublicDocumentView.tsx";
import UserDashboard from "./components/UserDashboard.tsx";
import UserDetails from "./components/UserDetails.tsx";
import AuthPlugin from "./components/AuthPlugin/AuthPlugin.tsx";

function App() {
  
  return (
    
    <Router>
      <AuthPlugin top={35} right ={35}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/edit" element={<EditDocumentView />} />
          <Route path="/public" element={<PublicDocumentView />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/details" element={<UserDetails />} />
          {/* Fallback to Home for unmatched routes */}
          <Route path="*" element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;