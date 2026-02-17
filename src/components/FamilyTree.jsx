import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { computeLayout, NODE_WIDTH, NODE_HEIGHT } from "../data/treeLayout";
import {
  getFullName,
  getDisplayName,
  getChildren,
  getParents,
  getAllPeople,
  computeBranches,
  getDescendantCount,
  unions as allUnions,
} from "../data/familyData";
import "./FamilyTree.css";

/**
 * Compute the full ancestry path from a person up to the root.
 * Returns a Set of person IDs on the path.
 */
function getAncestryPath(personId) {
  const path = new Set();
  const queue = [personId];
  while (queue.length > 0) {
    const id = queue.shift();
    if (path.has(id)) continue;
    path.add(id);
    const parents = getParents(id);
    parents.forEach((pid) => {
      if (!path.has(pid)) queue.push(pid);
    });
  }
  return path;
}

/**
 * Get all union IDs that connect people on the ancestry path.
 */
function getPathUnionIds(pathIds, allUnions) {
  const ids = new Set();
  allUnions.forEach((u) => {
    const union = u.union;
    if (pathIds.has(union.partner1) && pathIds.has(union.partner2)) {
      ids.add(union.id);
    }
  });
  return ids;
}

function FamilyTree() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Pan & zoom state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);

  // Collapse state — start fully expanded so users can find themselves
  const [collapsedIds, setCollapsedIds] = useState(() => new Set());

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Ancestry path highlight state
  const [ancestryTarget, setAncestryTarget] = useState(null);
  const [tappedNode, setTappedNode] = useState(null);

  // Container dimensions for mini-map viewport calculation
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Detect touch device
  const isTouchDevice = useRef(false);
  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  // Track container size for mini-map
  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: r.width, height: r.height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Compute layout with collapsed IDs
  const layout = useMemo(
    () => computeLayout("victor-rivadeneira", collapsedIds),
    [collapsedIds]
  );
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  // Compute branch membership (static, doesn't change)
  const branches = useMemo(() => computeBranches(), []);

  // Pre-compute which nodes have children (keyed by originalId)
  const hasChildrenMap = useMemo(() => {
    const map = {};
    layout.nodes.forEach((n) => {
      const rid = n.originalId || n.id;
      map[rid] = getChildren(rid).length > 0;
    });
    return map;
  }, [layout]);

  // Compute generation levels for side labels
  const generationLevels = useMemo(() => {
    const labels = [
      "Patriarch & Wives",
      "Children",
      "Grandchildren",
      "Great-Grandchildren",
      "Great-Great-Grandchildren",
    ];
    const ySet = new Set();
    layout.nodes.forEach((n) => ySet.add(n.y));
    return [...ySet]
      .sort((a, b) => a - b)
      .map((y, idx) => ({ y, label: labels[idx] || `Generation ${idx}` }));
  }, [layout]);

  const treeBounds = useMemo(() => {
    let minX = Infinity;
    layout.nodes.forEach((n) => {
      if (n.x < minX) minX = n.x;
    });
    return { minX };
  }, [layout]);

  // Compute ancestry path for the active target
  const ancestryPath = useMemo(() => {
    if (!ancestryTarget) return null;
    return getAncestryPath(ancestryTarget);
  }, [ancestryTarget]);

  const pathUnionIds = useMemo(() => {
    if (!ancestryPath) return null;
    return getPathUnionIds(ancestryPath, layout.unions);
  }, [ancestryPath, layout.unions]);

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

  // Center the tree on mount — fit the whole tree in view
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scale = Math.min(
        rect.width / layout.width,
        rect.height / layout.height,
        1
      );
      const s = Math.max(scale, 0.15);
      setTransform({
        x: (rect.width - layout.width * s) / 2,
        y: (rect.height - layout.height * s) / 2,
        scale: s,
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

  // Scroll = zoom (standard for canvas apps), shift+scroll = horizontal pan,
  // trackpad horizontal swipe (deltaX) = horizontal pan
  const handleWheel = useCallback((e) => {
    e.preventDefault();

    // Trackpad horizontal scroll or shift+scroll → horizontal pan
    if (e.shiftKey) {
      setTransform((t) => ({ ...t, x: t.x - e.deltaY }));
      return;
    }
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      setTransform((t) => ({ ...t, x: t.x - e.deltaX }));
      return;
    }

    // Scroll = zoom (centered on cursor)
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
  const touchStart = useRef({ dist: 0, scale: 1, mx: 0, my: 0, tx: 0, ty: 0 });

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
        setIsPanning(false);
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStart.current = {
          dist: Math.sqrt(dx * dx + dy * dy),
          scale: transform.scale,
          mx: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          my: (e.touches[0].clientY + e.touches[1].clientY) / 2,
          tx: transform.x,
          ty: transform.y,
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
        const rect = containerRef.current.getBoundingClientRect();
        // Current pinch midpoint
        const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        // World point that was under the initial pinch midpoint
        const wx = (touchStart.current.mx - rect.left - touchStart.current.tx) / touchStart.current.scale;
        const wy = (touchStart.current.my - rect.top - touchStart.current.ty) / touchStart.current.scale;
        // Place that world point under the current midpoint
        setTransform({
          scale: newScale,
          x: (mx - rect.left) - wx * newScale,
          y: (my - rect.top) - wy * newScale,
        });
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

  // Node click/tap handler
  const handleNodeClick = (personId) => {
    if (isTouchDevice.current) {
      // Mobile: first tap highlights ancestry, second tap navigates
      if (tappedNode === personId) {
        // Second tap — navigate
        setTappedNode(null);
        setAncestryTarget(null);
        navigate(`/person/${personId}`);
      } else {
        // First tap — show ancestry path
        setTappedNode(personId);
        setAncestryTarget(personId);
      }
    } else {
      // Desktop: click navigates
      navigate(`/person/${personId}`);
    }
  };

  // Desktop hover: show ancestry path
  const handleNodeEnter = (personId) => {
    setHoveredNode(personId);
    if (!isTouchDevice.current) {
      setAncestryTarget(personId);
    }
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
    if (!isTouchDevice.current) {
      setAncestryTarget(null);
    }
  };

  // Clear mobile tap when tapping empty space
  const handleBackgroundClick = useCallback((e) => {
    if (!e.target.closest(".tree-node") && !e.target.closest(".collapse-toggle")) {
      if (tappedNode) {
        setTappedNode(null);
        setAncestryTarget(null);
      }
    }
  }, [tappedNode]);

  // Animated transform for programmatic navigation (buttons, search, branch jump)
  const animateTransform = useCallback((newTransformOrFn) => {
    setIsAnimating(true);
    setTransform(newTransformOrFn);
    setTimeout(() => setIsAnimating(false), 400);
  }, []);

  // Zoom controls
  const zoomIn = () =>
    animateTransform((t) => ({ ...t, scale: Math.min(t.scale * 1.25, 3) }));
  const zoomOut = () =>
    animateTransform((t) => ({ ...t, scale: Math.max(t.scale * 0.8, 0.15) }));
  const resetView = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scale = Math.min(
        rect.width / layout.width,
        rect.height / layout.height,
        1
      );
      const s = Math.max(scale, 0.15);
      animateTransform({
        x: (rect.width - layout.width * s) / 2,
        y: (rect.height - layout.height * s) / 2,
        scale: s,
      });
    }
  };

  // Jump to a specific branch — expands it and pans/zooms to fit
  const jumpToBranch = useCallback((branchName) => {
    if (!containerRef.current) return;

    const branchUnionId = branchName === "teotista"
      ? "union-victor-teotista"
      : "union-victor-osorio";
    const branchRootChildren = allUnions[branchUnionId].children;

    // Un-collapse gen-1 children of this branch
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      branchRootChildren.forEach((id) => next.delete(id));
      return next;
    });

    // Wait for layout to recompute after state update
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const currentLayout = layoutRef.current;
        const rect = containerRef.current.getBoundingClientRect();

        // Collect all nodes in this branch + root + partner
        const branchNodes = currentLayout.nodes.filter(
          (n) => {
            const rid = n.originalId || n.id;
            return branches[rid] === branchName || branches[rid] === "both" || rid === "victor-rivadeneira";
          }
        );

        if (branchNodes.length === 0) return;

        // Compute bounding box
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        branchNodes.forEach((n) => {
          minX = Math.min(minX, n.x);
          minY = Math.min(minY, n.y);
          maxX = Math.max(maxX, n.x + NODE_WIDTH);
          maxY = Math.max(maxY, n.y + NODE_HEIGHT);
        });

        const padding = 60;
        minX -= padding;
        minY -= padding;
        maxX += padding;
        maxY += padding;

        const bbWidth = maxX - minX;
        const bbHeight = maxY - minY;

        const scale = Math.min(rect.width / bbWidth, rect.height / bbHeight, 1.2);
        const clampedScale = Math.max(scale, 0.2);
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        animateTransform({
          scale: clampedScale,
          x: rect.width / 2 - centerX * clampedScale,
          y: rect.height / 2 - centerY * clampedScale,
        });
      });
    });
  }, [branches]);

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
        setHighlightedId(personId);
        setSearchQuery("");
        setSearchOpen(false);
      });
    });
  };

  // When highlighted person changes, center on them
  useEffect(() => {
    if (!highlightedId || !containerRef.current) return;
    // Find the primary (non-duplicate) node, falling back to any match
    const node = layout.nodes.find((n) => (n.originalId || n.id) === highlightedId && !n.isDuplicate)
      || layout.nodes.find((n) => (n.originalId || n.id) === highlightedId);
    if (!node) return;

    const rect = containerRef.current.getBoundingClientRect();
    animateTransform({
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

  // Handle ?focus= parameter from "View on Tree" navigation
  useEffect(() => {
    const focusId = searchParams.get("focus");
    if (focusId) {
      expandToReveal(focusId);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHighlightedId(focusId);
        });
      });
      setSearchParams({}, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Expand / collapse all
  const collapseAll = () => {
    const ids = new Set();
    layout.nodes.forEach((n) => {
      const rid = n.originalId || n.id;
      if (getChildren(rid).length > 0) ids.add(rid);
    });
    setCollapsedIds(ids);
  };
  const expandAll = () => setCollapsedIds(new Set());

  // Mini-map
  const miniMapWidth = 200;
  const miniMapHeight = 130;
  const miniMapScale = Math.min(
    miniMapWidth / (layout.width || 1),
    miniMapHeight / (layout.height || 1)
  );

  const handleMiniMapClick = useCallback(
    (e) => {
      if (!containerRef.current) return;
      const svgRect = e.currentTarget.getBoundingClientRect();
      const treeX = (e.clientX - svgRect.left) / miniMapScale;
      const treeY = (e.clientY - svgRect.top) / miniMapScale;
      const cr = containerRef.current.getBoundingClientRect();
      animateTransform((t) => ({
        ...t,
        x: cr.width / 2 - treeX * t.scale,
        y: cr.height / 2 - treeY * t.scale,
      }));
    },
    [miniMapScale, animateTransform]
  );

  const isPathActive = ancestryPath !== null;

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
      onClick={handleBackgroundClick}
    >
      {/* Mobile ancestry hint */}
      {tappedNode && (
        <div className="ancestry-hint">
          Tap again to view profile &middot; Tap elsewhere to dismiss
        </div>
      )}

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

      {/* Branch Quick-Jump Buttons */}
      <div className="branch-jump-buttons">
        <button
          className="branch-jump-pill branch-jump-osorio"
          onClick={() => jumpToBranch("osorio")}
        >
          <span className="branch-jump-dot osorio-dot"></span>
          Osorio
        </button>
        <button
          className="branch-jump-pill branch-jump-teotista"
          onClick={() => jumpToBranch("teotista")}
        >
          <span className="branch-jump-dot teotista-dot"></span>
          Teotista
        </button>
      </div>

      {/* Mini-map */}
      <div className="mini-map">
        <div className="mini-map-header">
          <span className="mini-map-title">Overview</span>
          <div className="mini-map-legend">
            <span className="mini-legend-dot" style={{ background: "#d4a853" }} title="Osorio branch"></span>
            <span className="mini-legend-text">Osorio</span>
            <span className="mini-legend-dot" style={{ background: "#4a9eff" }} title="Teotista branch"></span>
            <span className="mini-legend-text">Teotista</span>
            <span className="mini-legend-dot" style={{ background: "#b388ff" }} title="Both branches"></span>
            <span className="mini-legend-text">Both</span>
          </div>
        </div>
        <svg
          width={miniMapWidth}
          height={miniMapHeight}
          onClick={handleMiniMapClick}
          className="mini-map-svg"
        >
          {layout.connectors.map((c, i) => (
            <line
              key={`mc-${i}`}
              x1={c.x1 * miniMapScale}
              y1={c.y1 * miniMapScale}
              x2={c.x2 * miniMapScale}
              y2={c.y2 * miniMapScale}
              stroke={
                c.branch === "teotista"
                  ? "#4a9eff"
                  : c.branch === "osorio"
                    ? "#d4a853"
                    : c.branch === "both"
                      ? "#b388ff"
                      : "#333"
              }
              strokeWidth={0.5}
              opacity={0.25}
            />
          ))}
          {layout.nodes.map((n) => {
            const realId = n.originalId || n.id;
            const branch = branches[realId] || "unknown";
            const color =
              branch === "teotista"
                ? "#4a9eff"
                : branch === "osorio"
                  ? "#d4a853"
                  : branch === "both"
                    ? "#b388ff"
                    : branch === "root"
                      ? "#8899aa"
                      : "#444";
            return (
              <circle
                key={`mn-${n.id}`}
                cx={(n.x + NODE_WIDTH / 2) * miniMapScale}
                cy={(n.y + NODE_HEIGHT / 2) * miniMapScale}
                r={2.5}
                fill={color}
                opacity={0.8}
              />
            );
          })}
          {containerSize.width > 0 && (
            <rect
              x={(-transform.x / transform.scale) * miniMapScale}
              y={(-transform.y / transform.scale) * miniMapScale}
              width={(containerSize.width / transform.scale) * miniMapScale}
              height={(containerSize.height / transform.scale) * miniMapScale}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth={1.5}
              rx={2}
            />
          )}
        </svg>
      </div>

      {/* Hint */}
      <div className="tree-hint">
        Scroll to zoom &middot; Shift+Scroll to pan sideways &middot; Drag to pan &middot; Hover to trace ancestry &middot; Click to view profile &middot; Ctrl+F to search
      </div>

      <svg
        ref={svgRef}
        className="family-tree-svg"
        width="100%"
        height="100%"
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
      >
        <g
          className={`tree-transform-group${isAnimating ? " animating" : ""}`}
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          {/* Generation labels */}
          {generationLevels.map((gen) => (
            <g key={`gen-${gen.y}`}>
              <text
                x={treeBounds.minX - 16}
                y={gen.y + NODE_HEIGHT / 2 + 1}
                textAnchor="end"
                dominantBaseline="middle"
                className="generation-label"
              >
                {gen.label}
              </text>
              <line
                x1={treeBounds.minX - 8}
                y1={gen.y + NODE_HEIGHT / 2}
                x2={treeBounds.minX - 2}
                y2={gen.y + NODE_HEIGHT / 2}
                className="generation-tick"
              />
            </g>
          ))}

          {/* Connector lines */}
          {layout.connectors.map((c, i) => {
            const isOnPath = isPathActive && pathUnionIds && c.unionId && pathUnionIds.has(c.unionId);
            const isChildOnPath = isPathActive && c.type === "child-line" && pathUnionIds && c.unionId && pathUnionIds.has(c.unionId);
            const dimmed = isPathActive && !isOnPath && !isChildOnPath;

            if (c.type === "partner") {
              return (
                <line
                  key={`conn-${i}`}
                  x1={c.x1}
                  y1={c.y1}
                  x2={c.x2}
                  y2={c.y2}
                  className={`connector-partner branch-line-${c.branch || "root"} ${dimmed ? "dimmed" : ""} ${isOnPath ? "on-path" : ""}`}
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
                className={`connector-child branch-line-${c.branch || "root"} ${dimmed ? "dimmed" : ""}`}
              />
            );
          })}

          {/* Ancestry path glow lines (drawn on top of regular lines) */}
          {isPathActive && layout.connectors.map((c, i) => {
            // Determine if this connector is on the ancestry path
            // For child-line connectors, check if any endpoint is on the path
            let isOnAncestryPath = false;
            if (c.type === "partner" && pathUnionIds && pathUnionIds.has(c.unionId)) {
              isOnAncestryPath = true;
            }
            if (c.type === "child-line") {
              // Check if the union that spawned this connector has both partners on path
              if (pathUnionIds && c.unionId) {
                // We need to check if this specific child line connects path members
                // The child-line connectors include the vertical drop from union + horizontal bar + drops to children
                // We want to highlight the ones that connect path members
                const union = layout.unions.find((u) => u.id === c.unionId);
                if (union && pathUnionIds.has(c.unionId)) {
                  // Check if any child endpoint is on the path
                  const connectedNodes = layout.nodes.filter((n) => {
                    const cx = n.x + NODE_WIDTH / 2;
                    const nRealId = n.originalId || n.id;
                    return (Math.abs(cx - c.x1) < 1 || Math.abs(cx - c.x2) < 1) && ancestryPath.has(nRealId);
                  });
                  if (connectedNodes.length > 0 || c.x1 === c.x2) {
                    // Vertical lines from union or to a path member
                    isOnAncestryPath = true;
                  }
                }
              }
            }

            if (!isOnAncestryPath) return null;
            return (
              <line
                key={`glow-${i}`}
                x1={c.x1}
                y1={c.y1}
                x2={c.x2}
                y2={c.y2}
                className={`connector-glow branch-glow-${c.branch || "root"}`}
              />
            );
          })}

          {/* Union dots */}
          {layout.unions.map((u) => {
            const isOnPath = isPathActive && pathUnionIds && pathUnionIds.has(u.id);
            const dimmed = isPathActive && !isOnPath;
            return (
              <g key={u.id} className="union-dot-group">
                <circle
                  cx={u.x}
                  cy={u.y}
                  r={6}
                  className={`union-dot ${dimmed ? "dimmed" : ""} ${isOnPath ? "on-path" : ""}`}
                />
                {isOnPath && (
                  <circle
                    cx={u.x}
                    cy={u.y}
                    r={8}
                    className="union-dot-glow"
                  />
                )}
              </g>
            );
          })}

          {/* Person nodes */}
          {layout.nodes.map((node) => {
            // Use originalId for all data lookups (branches, ancestry, names, etc.)
            const realId = node.originalId || node.id;
            const isMale = node.person?.gender === "male";
            const isHovered = hoveredNode === realId;
            const isHighlighted = highlightedId === realId;
            const isOnPath = isPathActive && ancestryPath.has(realId);
            const isTarget = ancestryTarget === realId;
            const dimmed = isPathActive && !isOnPath;
            const fullName = getDisplayName(realId);
            const nameParts = fullName.split(" ");
            const branch = branches[realId] || "unknown";
            const isCollapsed = collapsedIds.has(realId);
            const nodeHasChildren = hasChildrenMap[realId];
            const isDup = node.isDuplicate;

            return (
              <g
                key={node.id}
                className={`tree-node ${isMale ? "male" : "female"} branch-${branch} ${isHovered ? "hovered" : ""} ${isHighlighted ? "highlighted" : ""} ${isOnPath ? "on-ancestry-path" : ""} ${isTarget ? "ancestry-target" : ""} ${dimmed ? "dimmed" : ""} ${isDup ? "duplicate" : ""}`}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => handleNodeClick(realId)}
                onMouseEnter={() => handleNodeEnter(realId)}
                onMouseLeave={handleNodeLeave}
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

                {/* Duplicate indicator — subtle dashed border */}
                {isDup && (
                  <rect
                    x={-2}
                    y={-2}
                    width={NODE_WIDTH + 4}
                    height={NODE_HEIGHT + 4}
                    rx={isMale ? 9 : 31}
                    ry={isMale ? 9 : 31}
                    className="duplicate-border"
                  />
                )}

                {/* Ancestry path glow ring */}
                {isOnPath && (
                  <rect
                    x={-3}
                    y={-3}
                    width={NODE_WIDTH + 6}
                    height={NODE_HEIGHT + 6}
                    rx={isMale ? 10 : 32}
                    ry={isMale ? 10 : 32}
                    className={`ancestry-glow branch-glow-ring-${branch}`}
                  />
                )}

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

                {/* Duplicate link badge */}
                {isDup && (
                  <g className="duplicate-badge">
                    <circle
                      cx={NODE_WIDTH - 2}
                      cy={4}
                      r={8}
                      className="dup-badge-bg"
                    />
                    <text
                      x={NODE_WIDTH - 2}
                      y={7.5}
                      textAnchor="middle"
                      className="dup-badge-icon"
                    >
                      ↗
                    </text>
                  </g>
                )}

                {/* Collapse/Expand toggle (only on primary nodes) */}
                {nodeHasChildren && !isDup && (
                  <g
                    className={`collapse-toggle ${isCollapsed ? "is-collapsed" : "is-expanded"}`}
                    onClick={(e) => toggleCollapse(realId, e)}
                  >
                    <circle
                      cx={NODE_WIDTH / 2}
                      cy={NODE_HEIGHT + 16}
                      r={16}
                      className="collapse-circle"
                    />
                    <text
                      x={NODE_WIDTH / 2}
                      y={NODE_HEIGHT + 22}
                      textAnchor="middle"
                      className="collapse-text"
                    >
                      {isCollapsed ? "+" : "−"}
                    </text>
                    {isCollapsed && (
                      <text
                        x={NODE_WIDTH / 2}
                        y={NODE_HEIGHT + 38}
                        textAnchor="middle"
                        className="collapse-label"
                      >
                        {getDescendantCount(realId)}
                      </text>
                    )}
                  </g>
                )}

                {/* Highlight pulse ring (search) */}
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
