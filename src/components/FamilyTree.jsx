import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { computeLayout, NODE_WIDTH, NODE_HEIGHT } from "../data/treeLayout";
import { getFullName } from "../data/familyData";
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

  // Compute layout once
  const layout = useMemo(() => computeLayout("victor-rivadeneira"), []);

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
        scale: Math.max(scale, 0.4),
      });
    }
  }, [layout]);

  // Pan handlers
  const handleMouseDown = useCallback(
    (e) => {
      if (e.target.closest(".tree-node")) return;
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
      const newScale = Math.min(Math.max(t.scale * delta, 0.2), 3);
      // Zoom towards mouse position
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

  // Attach wheel listener with passive: false
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handleNodeClick = (personId) => {
    navigate(`/person/${personId}`);
  };

  // Zoom controls
  const zoomIn = () =>
    setTransform((t) => ({ ...t, scale: Math.min(t.scale * 1.25, 3) }));
  const zoomOut = () =>
    setTransform((t) => ({ ...t, scale: Math.max(t.scale * 0.8, 0.2) }));
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
        scale: Math.max(scale, 0.4),
      });
    }
  };

  return (
    <div
      className="family-tree-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
      </div>

      {/* Legend */}
      <div className="tree-legend">
        <div className="legend-item">
          <span className="legend-dot legend-male"></span> Male
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-female"></span> Female
        </div>
        <div className="legend-item">
          <span className="legend-line"></span> Marriage
        </div>
        <div className="legend-item">
          <span className="legend-line legend-child-line"></span> Parent-Child
        </div>
      </div>

      {/* Hint */}
      <div className="tree-hint">
        Scroll to zoom &middot; Drag to pan &middot; Click a person to view profile
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
              <circle
                cx={u.x}
                cy={u.y}
                r={6}
                className="union-dot"
              />
            </g>
          ))}

          {/* Person nodes */}
          {layout.nodes.map((node) => {
            const isMale = node.person?.gender === "male";
            const isHovered = hoveredNode === node.id;
            const fullName = getFullName(node.id);
            const nameParts = fullName.split(" ");

            return (
              <g
                key={node.id}
                className={`tree-node ${isMale ? "male" : "female"} ${isHovered ? "hovered" : ""}`}
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
                {/* Icon */}
                <text
                  x={NODE_WIDTH / 2}
                  y={20}
                  textAnchor="middle"
                  className="node-icon"
                >
                  {isMale ? "👤" : "👩"}
                </text>
                {/* Name - split into lines if needed */}
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
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default FamilyTree;
