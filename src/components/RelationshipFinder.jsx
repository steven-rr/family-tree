import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getAllPeople,
  getPerson,
  getDisplayName,
  getFullName,
  findRelationshipPath,
  getFamilyStats,
  computeBranches,
} from "../data/familyData";
import "./RelationshipFinder.css";

function RelationshipFinder() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [personA, setPersonA] = useState(null);
  const [personB, setPersonB] = useState(null);
  const [path, setPath] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const stats = useMemo(() => getFamilyStats(), []);
  const branches = useMemo(() => computeBranches(), []);

  // Pre-fill person A from ?person= query param (e.g. from profile page)
  useEffect(() => {
    const prefill = searchParams.get("person");
    if (prefill && getPerson(prefill)) {
      setPersonA(prefill);
      setSearchParams({}, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFind = () => {
    if (!personA || !personB) return;
    const result = findRelationshipPath(personA, personB);
    setPath(result);
    setHasSearched(true);
  };

  const handleSwap = () => {
    const a = personA;
    setPersonA(personB);
    setPersonB(a);
    setPath(null);
    setHasSearched(false);
  };

  const getEdgeLabel = (edge) => {
    const fromPerson = getPerson(edge.from);
    if (edge.type === "child-of") {
      return fromPerson?.gender === "male" ? "son of" : "daughter of";
    }
    if (edge.type === "parent-of") {
      return fromPerson?.gender === "male" ? "father of" : "mother of";
    }
    return "married to";
  };

  const getEdgeIcon = (edge) => {
    if (edge.type === "child-of") return "↑";
    if (edge.type === "parent-of") return "↓";
    return "♥";
  };

  return (
    <div className="relationship-page">
      <div className="relationship-container">
        <div className="relationship-header">
          <h1 className="relationship-title">How Are We Related?</h1>
          <p className="relationship-subtitle">
            Select two family members to discover their connection
          </p>
        </div>

        <div className="picker-row">
          <PersonPicker
            value={personA}
            onChange={(id) => {
              setPersonA(id);
              setPath(null);
              setHasSearched(false);
            }}
            label="First person"
            branches={branches}
          />

          <button
            className="swap-btn"
            onClick={handleSwap}
            title="Swap people"
            disabled={!personA && !personB}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>

          <PersonPicker
            value={personB}
            onChange={(id) => {
              setPersonB(id);
              setPath(null);
              setHasSearched(false);
            }}
            label="Second person"
            branches={branches}
          />
        </div>

        <button
          className="find-btn"
          onClick={handleFind}
          disabled={!personA || !personB || personA === personB}
        >
          Find Connection
        </button>

        {personA && personB && personA === personB && (
          <div className="same-person-msg">
            Please select two different people
          </div>
        )}

        {hasSearched && path && path.length > 0 && (
          <div className="path-result">
            <div className="path-header">
              Connection found &middot; {path.length}{" "}
              {path.length === 1 ? "step" : "steps"}
            </div>
            <div className="path-steps">
              <PathPerson
                personId={path[0].from}
                navigate={navigate}
                branches={branches}
                isStart
              />
              {path.map((edge, i) => (
                <div key={i} className="path-step">
                  <div className={`path-edge ${edge.type}`}>
                    <span className="edge-line"></span>
                    <span className="edge-icon">{getEdgeIcon(edge)}</span>
                    <span className="edge-label">{getEdgeLabel(edge)}</span>
                    <span className="edge-line"></span>
                  </div>
                  <PathPerson
                    personId={edge.to}
                    navigate={navigate}
                    branches={branches}
                    isEnd={i === path.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {hasSearched && path === null && (
          <div className="no-path-result">
            No connection found between these two people.
          </div>
        )}

        {/* Family Stats */}
        <div className="family-stats">
          <h2 className="stats-title">Family Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <span className="stat-number">{stats.totalMembers}</span>
              <span className="stat-label">Family Members</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🌳</span>
              <span className="stat-number">{stats.generations}</span>
              <span className="stat-label">Generations</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">💒</span>
              <span className="stat-number">{stats.totalUnions}</span>
              <span className="stat-label">Marriages</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">👶</span>
              <span className="stat-number">{stats.maxChildrenCount}</span>
              <span className="stat-label">Most Children (one family)</span>
            </div>
          </div>
          <div className="stats-breakdown">
            <span className="stat-detail">
              <span className="stat-detail-dot male"></span>
              {stats.maleCount} male
            </span>
            <span className="stat-detail">
              <span className="stat-detail-dot female"></span>
              {stats.femaleCount} female
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonPicker({ value, onChange, label, branches }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const allPeople = useMemo(() => {
    return getAllPeople()
      .filter((p) => p.firstName !== "Unknown")
      .sort((a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        )
      );
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allPeople.slice(0, 20);
    const q = query.toLowerCase();
    return allPeople
      .filter((p) =>
        `${p.firstName} ${p.lastName} ${p.nickname || ""} ${p.middleName || ""}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 20);
  }, [query, allPeople]);

  const selected = value ? getPerson(value) : null;

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="person-picker" ref={containerRef}>
      <label className="picker-label">{label}</label>
      <button
        className={`picker-button ${selected ? "has-value" : ""}`}
        onClick={() => {
          setOpen(!open);
          setQuery("");
        }}
      >
        {selected ? (
          <>
            <span className={`picker-dot ${selected.gender}`}></span>
            <span className="picker-name">{getDisplayName(value)}</span>
          </>
        ) : (
          <span className="picker-placeholder">Select a person...</span>
        )}
        <span className="picker-chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="picker-dropdown">
          <input
            ref={inputRef}
            type="text"
            className="picker-search"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="picker-list">
            {filtered.map((p) => (
              <button
                key={p.id}
                className={`picker-option ${value === p.id ? "selected" : ""}`}
                onClick={() => {
                  onChange(p.id);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <span className={`picker-dot ${p.gender}`}></span>
                <span className="picker-option-name">
                  {getDisplayName(p.id)}
                </span>
                {branches[p.id] &&
                  branches[p.id] !== "root" &&
                  branches[p.id] !== "unknown" && (
                    <span
                      className={`picker-branch branch-${branches[p.id]}`}
                    >
                      {branches[p.id] === "teotista"
                        ? "T"
                        : branches[p.id] === "osorio"
                          ? "O"
                          : "B"}
                    </span>
                  )}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="picker-empty">No matches found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PathPerson({ personId, navigate, branches, isStart, isEnd }) {
  const person = getPerson(personId);
  if (!person) return null;
  const branch = branches[personId] || "unknown";

  return (
    <button
      className={`path-person-card ${person.gender} ${isStart ? "start" : ""} ${isEnd ? "end" : ""}`}
      onClick={() => navigate(`/person/${personId}`)}
      title={`View ${getFullName(personId)}'s profile`}
    >
      <span className="path-avatar">
        {person.gender === "male" ? "👤" : "👩"}
      </span>
      <div className="path-person-info">
        <span className="path-name">{getDisplayName(personId)}</span>
        {person.bio && (
          <span className="path-bio">
            {person.bio.length > 60
              ? person.bio.slice(0, 60) + "..."
              : person.bio}
          </span>
        )}
      </div>
      <span className={`path-branch-dot branch-dot-${branch}`}></span>
    </button>
  );
}

export default RelationshipFinder;
