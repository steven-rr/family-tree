/**
 * Tree Layout Engine — Parent-Aligned
 *
 * Positions children directly beneath their parent couple so lineage
 * is visually obvious. Victor's two branches (Teotista left, Osorio right)
 * are separated with a gap.
 *
 * Algorithm:
 *   1. Build a tree of "family units" (union + children subtrees)
 *   2. Recursively compute subtree widths bottom-up
 *   3. Position each family unit so children are centered beneath parents
 *   4. Build connector lines from union dots down to children
 */

import { people, unions, getUnionsForPerson } from "./familyData";

const NODE_WIDTH = 120;
const NODE_HEIGHT = 60;
const H_GAP = 40;
const V_GAP = 100;
const COUPLE_GAP = 30;
const BRANCH_GAP = 80; // extra gap between Teotista and Osorio branches

/**
 * Build the full layout starting from root.
 * Returns { nodes, unions, connectors, width, height }
 */
export function computeLayout(rootId = "victor-rivadeneira", collapsedIds = new Set()) {
  // Step 1: Build the family tree structure
  const tree = buildFamilyTree(rootId, collapsedIds);

  // Step 2: Compute subtree widths bottom-up
  computeSubtreeWidths(tree);

  // Step 3: Position everything
  const positions = {};
  const unionPositions = {};
  positionTree(tree, 40, 40, positions, unionPositions);

  // Compute total dimensions
  let maxX = 0;
  let maxY = 0;
  Object.values(positions).forEach((p) => {
    if (p.x + p.width > maxX) maxX = p.x + p.width;
    if (p.y + p.height > maxY) maxY = p.y + p.height;
  });

  // Step 4: Build connectors
  const connectors = buildConnectors(tree, positions, unionPositions);

  return {
    nodes: Object.entries(positions).map(([id, pos]) => ({
      id,
      ...pos,
      person: people[id],
    })),
    unions: Object.entries(unionPositions).map(([id, pos]) => ({
      id,
      ...pos,
      union: unions[id],
    })),
    connectors,
    width: maxX + 80,
    height: maxY + 80,
  };
}

/**
 * Build a hierarchical tree structure from the family data.
 *
 * Each node represents a "family unit": a person (or couple) and their
 * children subtrees grouped by union.
 *
 * For the root (Victor), we split into two branches:
 *   - Teotista branch (left)
 *   - Osorio branch (right)
 */
function buildFamilyTree(rootId, collapsedIds) {
  const visited = new Set();

  function buildPersonNode(personId, gen) {
    if (visited.has(personId)) return null;
    visited.add(personId);

    const personUnions = getUnionsForPerson(personId);
    const familyUnions = [];

    personUnions.forEach((u) => {
      const partnerId = u.partner1 === personId ? u.partner2 : u.partner1;
      if (!visited.has(partnerId)) {
        visited.add(partnerId);
      }

      // Build children subtrees (unless collapsed)
      const childNodes = [];
      if (!collapsedIds.has(u.partner1) && !collapsedIds.has(u.partner2)) {
        u.children.forEach((childId) => {
          if (!visited.has(childId)) {
            const childNode = buildPersonNode(childId, gen + 1);
            if (childNode) childNodes.push(childNode);
          }
        });
      }

      familyUnions.push({
        unionId: u.id,
        partnerId,
        children: childNodes,
      });
    });

    return {
      personId,
      gen,
      unions: familyUnions,
    };
  }

  // For Victor, we want to control the order: Teotista branch first, Osorio second
  visited.add(rootId);
  const rootUnions = getUnionsForPerson(rootId);

  // Find the two main unions
  const teotistaUnion = rootUnions.find((u) => u.id === "union-victor-teotista");
  const osorioUnion = rootUnions.find((u) => u.id === "union-victor-osorio");

  // Order: Teotista first (left), Osorio second (right)
  const orderedUnions = [];
  if (teotistaUnion) orderedUnions.push(teotistaUnion);
  if (osorioUnion) orderedUnions.push(osorioUnion);
  // Any other unions
  rootUnions.forEach((u) => {
    if (u !== teotistaUnion && u !== osorioUnion) orderedUnions.push(u);
  });

  const familyUnions = [];
  orderedUnions.forEach((u) => {
    const partnerId = u.partner1 === rootId ? u.partner2 : u.partner1;
    visited.add(partnerId);

    const childNodes = [];
    if (!collapsedIds.has(u.partner1) && !collapsedIds.has(u.partner2)) {
      u.children.forEach((childId) => {
        if (!visited.has(childId)) {
          const childNode = buildPersonNode(childId, 1);
          if (childNode) childNodes.push(childNode);
        }
      });
    }

    familyUnions.push({
      unionId: u.id,
      partnerId,
      children: childNodes,
      isBranchRoot: u === teotistaUnion || u === osorioUnion,
      branchName: u === teotistaUnion ? "teotista" : u === osorioUnion ? "osorio" : null,
    });
  });

  return {
    personId: rootId,
    gen: 0,
    unions: familyUnions,
  };
}

/**
 * Compute the width each subtree needs (bottom-up).
 *
 * A person with no unions: just NODE_WIDTH.
 * A person with unions: sum of all their family unit widths.
 *
 * A family unit width = max(couple width, children row width).
 * Children row width = sum of children subtree widths + gaps.
 */
function computeSubtreeWidths(node) {
  if (!node) return 0;

  if (node.unions.length === 0) {
    // Leaf person (no marriages/children in tree)
    node.subtreeWidth = NODE_WIDTH;
    return node.subtreeWidth;
  }

  // Calculate the width needed for each union's children
  let totalWidth = 0;

  node.unions.forEach((u, uIdx) => {
    // Partner takes NODE_WIDTH, with COUPLE_GAP between person and partner
    const coupleWidth = NODE_WIDTH + COUPLE_GAP + NODE_WIDTH;

    // Children row width
    let childrenWidth = 0;
    u.children.forEach((child, cIdx) => {
      computeSubtreeWidths(child);
      childrenWidth += child.subtreeWidth;
      if (cIdx < u.children.length - 1) childrenWidth += H_GAP;
    });

    u.coupleWidth = coupleWidth;
    u.childrenWidth = childrenWidth;
    u.unitWidth = Math.max(coupleWidth, childrenWidth);

    // Check if this is a branch boundary for extra gap
    const branchGap = (u.isBranchRoot && uIdx > 0) ? BRANCH_GAP : 0;

    if (uIdx > 0) totalWidth += H_GAP + branchGap;
    totalWidth += u.unitWidth;
  });

  node.subtreeWidth = totalWidth;
  return node.subtreeWidth;
}

/**
 * Position the tree nodes recursively.
 *
 * Each person is positioned, then for each of their unions:
 *   - The partner is placed next to them
 *   - Children are centered beneath the couple
 */
function positionTree(node, x, y, positions, unionPositions) {
  if (!node) return;

  const gen = node.gen;
  const nodeY = y;

  if (node.unions.length === 0) {
    // Simple leaf node — just place the person
    positions[node.personId] = {
      x,
      y: nodeY,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    };
    return;
  }

  // Place this person and all their union families
  let currentX = x;

  node.unions.forEach((u, uIdx) => {
    if (uIdx > 0) {
      const branchGap = u.isBranchRoot ? BRANCH_GAP : 0;
      currentX += H_GAP + branchGap;
    }

    const unitLeft = currentX;
    const unitWidth = u.unitWidth;
    const unitCenter = unitLeft + unitWidth / 2;

    // Position the couple centered in their unit
    const coupleLeft = unitCenter - u.coupleWidth / 2;

    // Person position (only set if not already positioned from a previous union)
    if (!positions[node.personId]) {
      positions[node.personId] = {
        x: coupleLeft,
        y: nodeY,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
      };
    }

    // For additional marriages, the person is already placed.
    // We need to position the partner relative to the unit center.
    // The person might be on the left or right; we put the main person left, partner right.
    const personX = positions[node.personId].x;

    // Partner position
    let partnerX;
    if (uIdx === 0) {
      // First union: person left, partner right
      partnerX = coupleLeft + NODE_WIDTH + COUPLE_GAP;
    } else {
      // Additional union: partner placed next to person
      // Person is already placed, so position partner in this unit
      partnerX = unitCenter - u.coupleWidth / 2 + NODE_WIDTH + COUPLE_GAP;
      // If person is far away, just center the couple here
      if (Math.abs(personX - (unitCenter - u.coupleWidth / 2)) > unitWidth) {
        partnerX = unitCenter + COUPLE_GAP / 2;
      }
    }

    if (!positions[u.partnerId]) {
      positions[u.partnerId] = {
        x: partnerX,
        y: nodeY,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
      };
    }

    // Union dot between the couple
    const p1X = positions[node.personId].x;
    const p2X = positions[u.partnerId].x;
    const dotX = (Math.min(p1X, p2X) + NODE_WIDTH + Math.max(p1X, p2X)) / 2;

    unionPositions[u.unionId] = {
      x: dotX,
      y: nodeY + NODE_HEIGHT / 2,
    };

    // Position children centered beneath this family unit
    if (u.children.length > 0) {
      const childY = nodeY + NODE_HEIGHT + V_GAP;
      const childrenTotalWidth = u.childrenWidth;

      // Center children under the union dot
      let childX = dotX - childrenTotalWidth / 2;

      // But make sure we don't go left of unitLeft
      childX = Math.max(childX, unitLeft);

      u.children.forEach((child, cIdx) => {
        if (cIdx > 0) childX += H_GAP;
        positionTree(child, childX, childY, positions, unionPositions);
        childX += child.subtreeWidth;
      });
    }

    currentX = unitLeft + unitWidth;
  });
}

/**
 * Build all connector lines (partner lines + parent-child lines).
 * Each connector now carries a `branch` property for color-coding.
 */
function buildConnectors(tree, positions, unionPositions) {
  const connectors = [];
  const visited = new Set();

  function walk(node, branch) {
    if (!node || visited.has(node.personId)) return;
    visited.add(node.personId);

    node.unions.forEach((u) => {
      const uPos = unionPositions[u.unionId];
      if (!uPos) return;

      const currentBranch = u.branchName || branch;

      // Partner connector line
      const p1Pos = positions[node.personId];
      const p2Pos = positions[u.partnerId];
      if (p1Pos && p2Pos) {
        const leftPos = p1Pos.x < p2Pos.x ? p1Pos : p2Pos;
        const rightPos = p1Pos.x < p2Pos.x ? p2Pos : p1Pos;
        const lineY = leftPos.y + NODE_HEIGHT / 2;

        connectors.push({
          type: "partner",
          x1: leftPos.x + NODE_WIDTH,
          y1: lineY,
          x2: rightPos.x,
          y2: lineY,
          unionId: u.unionId,
          branch: currentBranch,
        });
      }

      // Child connectors
      if (u.children.length > 0) {
        const childPositions = u.children
          .map((c) => positions[c.personId])
          .filter(Boolean);
        if (childPositions.length === 0) return;

        const dropY = uPos.y + V_GAP / 2 + 10;

        // Vertical line from union dot down
        connectors.push({
          type: "child-line",
          x1: uPos.x,
          y1: uPos.y,
          x2: uPos.x,
          y2: dropY,
          branch: currentBranch,
          unionId: u.unionId,
        });

        // Horizontal bar
        const childXs = childPositions.map((p) => p.x + NODE_WIDTH / 2);
        const allXs = [uPos.x, ...childXs];
        const minX = Math.min(...allXs);
        const maxX = Math.max(...allXs);

        if (minX !== maxX) {
          connectors.push({
            type: "child-line",
            x1: minX,
            y1: dropY,
            x2: maxX,
            y2: dropY,
            branch: currentBranch,
            unionId: u.unionId,
          });
        }

        // Vertical drops to each child
        childPositions.forEach((cp) => {
          connectors.push({
            type: "child-line",
            x1: cp.x + NODE_WIDTH / 2,
            y1: dropY,
            x2: cp.x + NODE_WIDTH / 2,
            y2: cp.y,
            branch: currentBranch,
            unionId: u.unionId,
          });
        });
      }

      // Recurse into children
      u.children.forEach((child) => walk(child, currentBranch));
    });
  }

  walk(tree, "root");

  return connectors;
}

export { NODE_WIDTH, NODE_HEIGHT, V_GAP, H_GAP };
