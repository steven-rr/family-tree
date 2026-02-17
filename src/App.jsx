import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import FamilyTree from "./components/FamilyTree.jsx";
import PersonProfile from "./components/PersonProfile.jsx";
import RelationshipFinder from "./components/RelationshipFinder.jsx";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isRelationship = location.pathname === "/related";
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
          {!isHome && (
            <button className="nav-btn" onClick={() => navigate("/")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="nav-btn-text">Tree</span>
            </button>
          )}
          {!isRelationship && (
            <button className="nav-btn nav-btn-accent" onClick={() => navigate("/related")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="nav-btn-text">Related?</span>
            </button>
          )}
          {isProfile && (
            <button className="nav-btn" onClick={() => navigate(-1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="nav-btn-text">Back</span>
            </button>
          )}
        </div>
      </header>
      <main className="app-content">
        <Routes>
          <Route path="/" element={<FamilyTree />} />
          <Route path="/person/:personId" element={<PersonProfile />} />
          <Route path="/related" element={<RelationshipFinder />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
