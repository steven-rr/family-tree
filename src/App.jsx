import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import FamilyTree from "./components/FamilyTree.jsx";
import PersonProfile from "./components/PersonProfile.jsx";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfile = location.pathname.startsWith("/person/");

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <svg className="app-logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="canopy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5cbf8a"/>
                  <stop offset="100%" stopColor="#3a9066"/>
                </linearGradient>
              </defs>
              <rect x="27" y="38" width="10" height="18" rx="2" fill="#d4a853"/>
              <ellipse cx="32" cy="28" rx="20" ry="16" fill="url(#canopy)" opacity="0.85"/>
              <ellipse cx="24" cy="24" rx="12" ry="10" fill="#5cbf8a" opacity="0.7"/>
              <ellipse cx="40" cy="24" rx="12" ry="10" fill="#5cbf8a" opacity="0.7"/>
              <ellipse cx="32" cy="20" rx="14" ry="11" fill="#6dd89e" opacity="0.6"/>
              <circle cx="26" cy="18" r="2" fill="#a3f0c0" opacity="0.5"/>
              <circle cx="36" cy="22" r="1.5" fill="#a3f0c0" opacity="0.4"/>
            </svg>
          <div>
            <div className="app-title">Rivadeneira Family</div>
            <div className="app-subtitle">Family History & Connections</div>
          </div>
        </div>
        <div className="app-header-right">
          {isProfile && (
            <button className="back-btn" onClick={() => navigate("/")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Family Tree
            </button>
          )}
        </div>
      </header>
      <main className="app-content">
        <Routes>
          <Route path="/" element={<FamilyTree />} />
          <Route path="/person/:personId" element={<PersonProfile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
