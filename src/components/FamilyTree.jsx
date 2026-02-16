import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { computeLayout, NODE_WIDTH, NODE_HEIGHT } from "../data/treeLayout";
import {
  getFullName,
  getDisplayName,
  getChildren,
  getParents,
  getAllPeople,
  computeBranches,
  getDescendantCount,
} from "../data/familyData";
import "./FamilyTree.css";

function FamilyTree() {
  const navigate = useNavigate();
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Pan & zoom state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);

  // Collapse state
  const [collapsedIds, setCollapsedIds] = useState(new Set());

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Compute layout with collapsed IDs
  const layout = useMemo(
    () => computeLayout("victor-rivadeneira", collapsedIds),
    [collapsedIds]
  );

  // Compute branch membership (static, doesn't change)
  const branches = useMemo(() => computeBranches(), []);

  // Pre-compute which nodes have children
  const hasChildrenMap = useMemo(() => {
    const map = {};
    layout.nodes.forEach((n) => {
      map[n.id] = getChildren(n.id).length > 0;
    });
    return map;
  }, [layout]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return getAllPeople()
      .filter((p) =>
        `${p.firstName} ${p.lastName} ${p.nickname || ""} ${p.middleName || ""}`.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [searchQuery]);

  // Center the tree on mount
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scale = Math.min(
        rect.width / layout.width,
        rect.height / layout.height,
        1
      );
      setTransform({
        x: (rect.width - layout.width * scale) / 2,
        y: 20,
        scale: Math.max(scale, 0.3),
      });
    }
  }, [layout]);

  // Pan handlers
  const handleMouseDown = useCallback(
    (e) => {
      if (e.target.closest(".tree-node") || e.target.closest(".collapse-toggle")) return;
      setIsPanning(true);
      panStart.current = {
        x: e.clientX - transform.x,
        y: e.clientY - transform.y,
      };
    },
    [transform]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isPanning) return;
      setTransform((t) => ({
        ...t,
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      }));
    },
    [isPanning]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Zoom handler
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setTransform((t) => {
      const newScale = Math.min(Math.max(t.scale * delta, 0.15), 3);
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      return {
        scale: newScale,
        x: mx - (mx - t.x) * (newScale / t.scale),
        y: my - (my - t.y) * (newScale / t.scale),
      };
    });
  }, []);

  // Touch handlers for mobile pan and pinch-zoom
  const touchStart = useRef({ x: 0, y: 0, dist: 0, scale: 1 });

  const handleTouchStart = useCallback(
    (e) => {
      if (e.target.closest(".tree-node") || e.target.closest(".collapse-toggle")) return;
      if (e.touches.length === 1) {
        setIsPanning(true);
        panStart.current = {
          x: e.touches[0].clientX - transform.x,
          y: e.touches[0].clientY - transform.y,
        };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStart.current = {
          dist: Math.sqrt(dx * dx + dy * dy),
          scale: transform.scale,
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        };
      }
    },
    [transform]
  );

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      if (e.touches.length === 1 && isPanning) {
        setTransform((t) => ({
          ...t,
          x: e.touches[0].clientX - panStart.current.x,
          y: e.touches[0].clientY - panStart.current.y,
        }));
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = dist / touchStart.current.dist;
        const newScale = Math.min(Math.max(touchStart.current.scale * ratio, 0.15), 3);
        setTransform((t) => ({
          ...t,
          scale: newScale,
        }));
      }
    },
    [isPanning]
  );

  const handleTouchEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Attach wheel and touch listeners with passive: false
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchMove]);

  const handleNodeClick = (personId) => {
    navigate(`/person/${personId}`);
  };

  // Zoom controls
  const zoomIn = () =>
    setTransform((t) => ({ ...t, scale: Math.min(t.scale * 1.25, 3) }));
  const zoomOut = () =>
    setTransform((t) => ({ ...t, scale: Math.max(t.scale * 0.8, 0.15) }));
  const resetView = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scale = Math.min(
        rect.width / layout.width,
        rect.height / layout.height,
        1
      );
      setTransform({
        x: (rect.width - layout.width * scale) / 2,
        y: 20,
        scale: Math.max(scale, 0.3),
      });
    }
  };

  // Collapse toggle
  const toggleCollapse = (personId, e) => {
    e.stopPropagation();
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(personId)) next.delete(personId);
      else next.add(personId);
      return next;
    });
  };

  // Expand all ancestors so a person is visible
  const expandToReveal = (personId) => {
    const ancestors = new Set();
    const findAncestors = (id) => {
      const parents = getParents(id);
      parents.forEach((parentId) => {
        ancestors.add(parentId);
        findAncestors(parentId);
      });
    };
    findAncestors(personId);

    setCollapsedIds((prev) => {
      const next = new Set(prev);
      ancestors.forEach((id) => next.delete(id));
      return next;
    });

    return ancestors;
  };

  // Center on a person from search
  const centerOnPerson = (personId) => {
    // First expand to reveal this person
    expandToReveal(personId);

    // Use requestAnimationFrame to wait for the layout to recompute
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // We need the updated layout, but since we're in a closure, we'll
        // set highlighted and let the effect handle centering
        setHighlightedId(personId);
        setSearchQuery("");
        setSearchOpen(false);
      });
    });
  };

  // When highlighted person changes, center on them
  useEffect(() => {
    if (!highlightedId || !containerRef.current) return;
    const node = layout.nodes.find((n) => n.id === highlightedId);
    if (!node) return;

    const rect = containerRef.current.getBoundingClientRect();
    setTransform({
      scale: 1,
      x: rect.width / 2 - node.x - NODE_WIDTH / 2,
      y: rect.height / 2 - node.y - NODE_HEIGHT / 2,
    });

    const timer = setTimeout(() => setHighlightedId(null), 3000);
    return () => clearTimeout(timer);
  }, [highlightedId, layout]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Expand / collapse all
  const collapseAll = () => {
    const ids = new Set();
    layout.nodes.forEach((n) => {
      if (getChildren(n.id).length > 0) ids.add(n.id);
    });
    setCollapsedIds(ids);
  };
  const expandAll = () => setCollapsedIds(new Set());

  return (
    <div
      className="family-tree-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Search Bar */}
      <div className={`search-bar ${searchOpen ? "open" : ""}`}>
        {searchOpen ? (
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search for a person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchResults.length > 0) {
                  centerOnPerson(searchResults[0].id);
                }
                if (e.key === "Escape") {
                  setSearchOpen(false);
                  setSearchQuery("");
                }
              }}
            />
            <button
              className="search-close"
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
            >
              &times;
            </button>
            {searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((p) => (
                  <button
                    key={p.id}
                    className="search-result"
                    onClick={() => centerOnPerson(p.id)}
                  >
                    <span className={`result-dot ${p.gender}`}></span>
                    <span className="result-name">
                      {p.firstName}{p.nickname ? ` "${p.nickname}"` : ""} {p.lastName}
                    </span>
                    <span className={`result-branch branch-${branches[p.id] || "unknown"}`}>
                      {branches[p.id] === "teotista" ? "Teotista" :
                       branches[p.id] === "osorio" ? "Osorio" :
                       branches[p.id] === "both" ? "Both" :
                       branches[p.id] === "root" ? "Root" : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {searchQuery.trim() && searchResults.length === 0 && (
              <div className="search-dropdown">
                <div className="search-no-results">No results found</div>
              </div>
            )}
          </div>
        ) : (
          <button className="search-toggle" onClick={() => {
            setSearchOpen(true);
            setTimeout(() => searchInputRef.current?.focus(), 50);
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Search
          </button>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button onClick={zoomIn} title="Zoom In">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </button>
        <button onClick={zoomOut} title="Zoom Out">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M8 11h6" />
          </svg>
        </button>
        <button onClick={resetView} title="Reset View">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
        <div className="zoom-divider"></div>
        <button onClick={expandAll} title="Expand All">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 10l5 5 5-5" />
            <path d="M7 5l5 5 5-5" />
          </svg>
        </button>
        <button onClick={collapseAll} title="Collapse All">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 14l5-5 5 5" />
            <path d="M7 19l5-5 5 5" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="tree-legend">
        <div className="legend-section">
          <div className="legend-title">Gender</div>
          <div className="legend-item">
            <span className="legend-dot legend-male"></span> Male
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-female"></span> Female
          </div>
        </div>
        <div className="legend-section">
          <div className="legend-title">Branch</div>
          <div className="legend-item">
            <span className="legend-bar bar-teotista"></span> Teotista
          </div>
          <div className="legend-item">
            <span className="legend-bar bar-osorio"></span> Osorio
          </div>
          <div className="legend-item">
            <span className="legend-bar bar-both"></span> Both
          </div>
        </div>
        <div className="legend-section">
          <div className="legend-title">Lines</div>
          <div className="legend-item">
            <span className="legend-line"></span> Marriage
          </div>
          <div className="legend-item">
            <span className="legend-line legend-child-line"></span> Parent-Child
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="tree-hint">
        Scroll to zoom &middot; Drag to pan &middot; Click a person to view
        profile &middot; Ctrl+F to search
      </div>

      <svg
        ref={svgRef}
        className="family-tree-svg"
        width="100%"
        height="100%"
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
      >
        <g
          transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
        >
          {/* Connector lines */}
          {layout.connectors.map((c, i) => {
            if (c.type === "partner") {
              return (
                <line
                  key={`conn-${i}`}
                  x1={c.x1}
                  y1={c.y1}
                  x2={c.x2}
                  y2={c.y2}
                  className="connector-partner"
                />
              );
            }
            return (
              <line
                key={`conn-${i}`}
                x1={c.x1}
                y1={c.y1}
                x2={c.x2}
                y2={c.y2}
                className="connector-child"
              />
            );
          })}

          {/* Union dots */}
          {layout.unions.map((u) => (
            <g key={u.id} className="union-dot-group">
              <circle cx={u.x} cy={u.y} r={6} className="union-dot" />
            </g>
          ))}

          {/* Person nodes */}
          {layout.nodes.map((node) => {
            const isMale = node.person?.gender === "male";
            const isHovered = hoveredNode === node.id;
            const isHighlighted = highlightedId === node.id;
            const fullName = getDisplayName(node.id);
            const nameParts = fullName.split(" ");
            const branch = branches[node.id] || "unknown";
            const isCollapsed = collapsedIds.has(node.id);
            const nodeHasChildren = hasChildrenMap[node.id];

            return (
              <g
                key={node.id}
                className={`tree-node ${isMale ? "male" : "female"} branch-${branch} ${isHovered ? "hovered" : ""} ${isHighlighted ? "highlighted" : ""}`}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node background */}
                <rect
                  x={0}
                  y={0}
                  width={NODE_WIDTH}
                  height={NODE_HEIGHT}
                  rx={isMale ? 8 : 30}
                  ry={isMale ? 8 : 30}
                  className="node-bg"
                />

                {/* Branch indicator bar at top */}
                <rect
                  x={isMale ? 8 : 20}
                  y={1}
                  width={isMale ? NODE_WIDTH - 16 : NODE_WIDTH - 40}
                  height={3}
                  rx={1.5}
                  className={`branch-indicator branch-bar-${branch}`}
                />

                {/* Icon */}
                <text
                  x={NODE_WIDTH / 2}
                  y={20}
                  textAnchor="middle"
                  className="node-icon"
                >
                  {isMale ? "👤" : "👩"}
                </text>
                {/* Name */}
                {nameParts.length > 1 ? (
                  <>
                    <text
                      x={NODE_WIDTH / 2}
                      y={38}
                      textAnchor="middle"
                      className="node-name"
                    >
                      {nameParts[0]}
                    </text>
                    <text
                      x={NODE_WIDTH / 2}
                      y={52}
                      textAnchor="middle"
                      className="node-name node-name-last"
                    >
                      {nameParts.slice(1).join(" ")}
                    </text>
                  </>
                ) : (
                  <text
                    x={NODE_WIDTH / 2}
                    y={45}
                    textAnchor="middle"
                    className="node-name"
                  >
                    {fullName}
                  </text>
                )}

                {/* Collapse/Expand toggle */}
                {nodeHasChildren && (
                  <g
                    className="collapse-toggle"
                    onClick={(e) => toggleCollapse(node.id, e)}
                  >
                    <circle
                      cx={NODE_WIDTH / 2}
                      cy={NODE_HEIGHT + 12}
                      r={9}
                      className="collapse-circle"
                    />
                    <text
                      x={NODE_WIDTH / 2}
                      y={NODE_HEIGHT + 16}
                      textAnchor="middle"
                      className="collapse-text"
                    >
                      {isCollapsed ? "+" : "−"}
                    </text>
                  </g>
                )}

                {/* Collapsed badge showing descendant count */}
                {isCollapsed && (
                  <g className="collapsed-badge">
                    <rect
                      x={NODE_WIDTH - 8}
                      y={-4}
                      width={28}
                      height={18}
                      rx={9}
                      className="badge-bg"
                    />
                    <text
                      x={NODE_WIDTH + 6}
                      y={8}
                      textAnchor="middle"
                      className="badge-text"
                    >
                      {getDescendantCount(node.id)}
                    </text>
                  </g>
                )}

                {/* Highlight pulse ring */}
                {isHighlighted && (
                  <rect
                    x={-4}
                    y={-4}
                    width={NODE_WIDTH + 8}
                    height={NODE_HEIGHT + 8}
                    rx={isMale ? 10 : 32}
                    ry={isMale ? 10 : 32}
                    className="highlight-ring"
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default FamilyTree;
