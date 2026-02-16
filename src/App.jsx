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
          <span className="app-logo">🌳</span>
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
