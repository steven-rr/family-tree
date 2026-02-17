/**
 * Tree Layout Engine — Parent-Aligned with Duplicate Nodes
 *
 * Positions children directly beneath their parent couple so lineage
 * is visually obvious. Victor's two branches (Teotista left, Osorio right)
 * are separated with a gap.
 *
 * People with multiple marriages appear as duplicate nodes — one copy
 * next to each spouse — so every family unit looks natural and complete.
 * Duplicates carry a visual flag for the renderer.
 *
 * Algorithm:
 *   1. Build a tree of "family units" (union + children subtrees)
 *      — Allow duplicate stubs for people already placed elsewhere
 *   2. Recursively compute subtree widths bottom-up
 *   3. Position each family unit so children are centered beneath parents
 *      — Duplicates get unique position keys (personId__dup_N)
 *   4. Build connector lines from union dots down to children
 */

import { people, unions, getUnionsForPerson } from "./familyData";

const NODE_WIDTH = 120;
const NODE_HEIGHT = 60;
const H_GAP = 40;
const V_GAP = 100;
const COUPLE_GAP = 30;
const BRANCH_GAP = 80;

/**
 * Build the full layout starting from root.
 * Returns { nodes, unions, connectors, width, height }
 */
export function computeLayout(rootId = "victor-rivadeneira", collapsedIds = new Set()) {
  // Step 1: Build the family tree structure (with duplicate stubs)
  const tree = buildFamilyTree(rootId, collapsedIds);

  // Step 2: Compute subtree widths bottom-up
  computeSubtreeWidths(tree);

  // Step 3: Position everything
  const positions = {};
  const unionPositions = {};
  const dupCounts = {};
  positionTree(tree, 40, 40, positions, unionPositions, dupCounts);

  // Compute total dimensions
  let maxX = 0;
  let maxY = 0;
  Object.values(positions).forEach((p) => {
    if (p.x + p.width > maxX) maxX = p.x + p.width;
    if (p.y + p.height > maxY) maxY = p.y + p.height;
  });

  // Step 4: Build connectors
  const connectors = buildConnectors(tree, positions, unionPositions);

  // Build output nodes from ALL positions (including duplicates)
  const nodes = Object.entries(positions).map(([posId, pos]) => {
    const originalId = pos.originalId || posId;
    return {
      id: posId,
      originalId,
      ...pos,
      person: people[originalId],
      isDuplicate: pos.isDuplicate || false,
    };
  });

  return {
    nodes,
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
 * When a person has already been visited (processed in another branch),
 * a "duplicate stub" is created so they still appear as a child of
 * their other parent. The stub doesn't expand further.
 */
function buildFamilyTree(rootId, collapsedIds) {
  const visited = new Set();

  function buildPersonNode(personId, gen) {
    if (visited.has(personId)) {
      // Already processed elsewhere — create a duplicate stub
      return {
        personId,
        gen,
        unions: [],
        isDuplicate: true,
      };
    }
    visited.add(personId);

    const personUnions = getUnionsForPerson(personId);
    const familyUnions = [];

    personUnions.forEach((u) => {
      const partnerId = u.partner1 === personId ? u.partner2 : u.partner1;
      const partnerAlreadyVisited = visited.has(partnerId);
      if (!partnerAlreadyVisited) {
        visited.add(partnerId);
      }

      // Build children subtrees (unless collapsed)
      const childNodes = [];
      if (!collapsedIds.has(u.partner1) && !collapsedIds.has(u.partner2)) {
        u.children.forEach((childId) => {
          // Always try to build — buildPersonNode returns duplicate stubs for visited people
          const childNode = buildPersonNode(childId, gen + 1);
          if (childNode) childNodes.push(childNode);
        });
      }

      familyUnions.push({
        unionId: u.id,
        partnerId,
        partnerIsDuplicate: partnerAlreadyVisited,
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

  const teotistaUnion = rootUnions.find((u) => u.id === "union-victor-teotista");
  const osorioUnion = rootUnions.find((u) => u.id === "union-victor-osorio");

  const orderedUnions = [];
  if (teotistaUnion) orderedUnions.push(teotistaUnion);
  if (osorioUnion) orderedUnions.push(osorioUnion);
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
        const childNode = buildPersonNode(childId, 1);
        if (childNode) childNodes.push(childNode);
      });
    }

    familyUnions.push({
      unionId: u.id,
      partnerId,
      partnerIsDuplicate: false,
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
 * Duplicate stubs are just NODE_WIDTH (no further expansion).
 */
function computeSubtreeWidths(node) {
  if (!node) return 0;

  if (node.isDuplicate || node.unions.length === 0) {
    node.subtreeWidth = NODE_WIDTH;
    return node.subtreeWidth;
  }

  let totalWidth = 0;

  node.unions.forEach((u, uIdx) => {
    const coupleWidth = NODE_WIDTH + COUPLE_GAP + NODE_WIDTH;

    let childrenWidth = 0;
    u.children.forEach((child, cIdx) => {
      computeSubtreeWidths(child);
      childrenWidth += child.subtreeWidth;
      if (cIdx < u.children.length - 1) childrenWidth += H_GAP;
    });

    u.coupleWidth = coupleWidth;
    u.childrenWidth = childrenWidth;
    u.unitWidth = Math.max(coupleWidth, childrenWidth);

    const branchGap = (u.isBranchRoot && uIdx > 0) ? BRANCH_GAP : 0;
    if (uIdx > 0) totalWidth += H_GAP + branchGap;
    totalWidth += u.unitWidth;
  });

  node.subtreeWidth = totalWidth;
  return node.subtreeWidth;
}

/**
 * Get a unique position key for a person.
 * First occurrence uses the person ID directly.
 * Subsequent occurrences get __dup_N suffixed keys.
 */
function getPosKey(personId, positions, dupCounts) {
  if (!positions[personId]) return personId;
  if (!dupCounts[personId]) dupCounts[personId] = 0;
  dupCounts[personId]++;
  return `${personId}__dup_${dupCounts[personId]}`;
}

/**
 * Position the tree nodes recursively.
 * Each person in each union gets their own position.
 * Duplicates get unique position keys.
 */
function positionTree(node, x, y, positions, unionPositions, dupCounts) {
  if (!node) return;

  const nodeY = y;

  // Duplicate stubs or leaf nodes — just place
  if (node.isDuplicate || node.unions.length === 0) {
    const posKey = getPosKey(node.personId, positions, dupCounts);
    positions[posKey] = {
      x,
      y: nodeY,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      isDuplicate: node.isDuplicate || false,
      originalId: node.personId,
    };
    // Store the posKey on the node so parent connectors know where this child is
    node._posKey = posKey;
    return;
  }

  // Place this person and all their union families
  let currentX = x;
  let personPosKey = null;

  node.unions.forEach((u, uIdx) => {
    if (uIdx > 0) {
      const branchGap = u.isBranchRoot ? BRANCH_GAP : 0;
      currentX += H_GAP + branchGap;
    }

    const unitLeft = currentX;
    const unitWidth = u.unitWidth;
    const unitCenter = unitLeft + unitWidth / 2;
    const coupleLeft = unitCenter - u.coupleWidth / 2;

    // Position the person in this union
    let thisPosKey;
    if (uIdx === 0) {
      // First union: use the person's real ID
      thisPosKey = getPosKey(node.personId, positions, dupCounts);
      personPosKey = thisPosKey;
    } else {
      // Additional union: create a duplicate of the person
      thisPosKey = getPosKey(node.personId, positions, dupCounts);
    }

    positions[thisPosKey] = {
      x: coupleLeft,
      y: nodeY,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      isDuplicate: uIdx > 0,
      originalId: node.personId,
    };

    // Position the partner
    const partnerPosKey = getPosKey(u.partnerId, positions, dupCounts);
    const partnerX = coupleLeft + NODE_WIDTH + COUPLE_GAP;

    positions[partnerPosKey] = {
      x: partnerX,
      y: nodeY,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      isDuplicate: u.partnerIsDuplicate || false,
      originalId: u.partnerId,
    };

    // Store position keys on the union for connector building
    u._personPosKey = thisPosKey;
    u._partnerPosKey = partnerPosKey;

    // Union dot between the couple
    const p1X = positions[thisPosKey].x;
    const p2X = positions[partnerPosKey].x;
    const dotX = (Math.min(p1X, p2X) + NODE_WIDTH + Math.max(p1X, p2X)) / 2;

    unionPositions[u.unionId] = {
      x: dotX,
      y: nodeY + NODE_HEIGHT / 2,
    };

    // Position children centered beneath this family unit
    if (u.children.length > 0) {
      const childY = nodeY + NODE_HEIGHT + V_GAP;
      const childrenTotalWidth = u.childrenWidth;

      let childX = dotX - childrenTotalWidth / 2;
      childX = Math.max(childX, unitLeft);

      u.children.forEach((child, cIdx) => {
        if (cIdx > 0) childX += H_GAP;
        positionTree(child, childX, childY, positions, unionPositions, dupCounts);
        childX += child.subtreeWidth;
      });
    }

    currentX = unitLeft + unitWidth;
  });

  // Store the primary posKey on the node
  node._posKey = personPosKey;
}

/**
 * Build all connector lines.
 * Uses the position keys stored on each union during positioning.
 */
function buildConnectors(tree, positions, unionPositions) {
  const connectors = [];
  const visited = new Set();
  let walkId = 0;

  function walk(node, branch) {
    if (!node) return;
    // Use a unique walk ID to avoid re-visiting the same tree node
    const wid = `${node.personId}_${walkId++}`;
    if (visited.has(node.personId) && !node.isDuplicate && node.unions.length > 0) {
      // Skip re-walking nodes we've already fully processed
      // (but duplicates and leaf nodes are fine to "walk" since they have no unions)
      return;
    }
    if (node.unions.length > 0) visited.add(node.personId);

    node.unions.forEach((u) => {
      const uPos = unionPositions[u.unionId];
      if (!uPos) return;

      const currentBranch = u.branchName || branch;
      const personPos = positions[u._personPosKey];
      const partnerPos = positions[u._partnerPosKey];

      // Partner connector line
      if (personPos && partnerPos) {
        const leftPos = personPos.x < partnerPos.x ? personPos : partnerPos;
        const rightPos = personPos.x < partnerPos.x ? partnerPos : personPos;
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
          .map((c) => {
            const key = c._posKey;
            return key ? positions[key] : null;
          })
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
