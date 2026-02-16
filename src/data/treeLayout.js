/**
 * Tree Layout Engine
 *
 * Computes x/y positions for every person and union in the family tree.
 *
 * Key concept: "Marriage Chains"
 * People connected by marriage in the same generation form a chain.
 * e.g. [First Wife] --- [Jorge Sr.] --- [Enma] --- [Luis]
 * Each person appears exactly ONCE, with union dots between married pairs.
 *
 * Algorithm:
 *   1. BFS from root to assign generation numbers
 *   2. Build marriage chains per generation (connected components of marriages)
 *   3. Layout chains horizontally, center each generation
 *   4. Draw connector lines from union dots down to children
 */

import { people, unions, getUnionsForPerson } from "./familyData";

const NODE_WIDTH = 120;
const NODE_HEIGHT = 60;
const H_GAP = 60;
const V_GAP = 100;
const COUPLE_GAP = 30;

/**
 * Build the full layout starting from root.
 * Returns { nodes, unions, connectors, width, height }
 */
export function computeLayout(rootId = "victor-rivadeneira") {
  // Step 1: Assign generations via BFS
  const generations = assignGenerations(rootId);
  const maxGen = Math.max(...Object.values(generations));

  // Group people by generation
  const byGen = {};
  Object.entries(generations).forEach(([pid, gen]) => {
    if (!byGen[gen]) byGen[gen] = [];
    byGen[gen].push(pid);
  });

  // Step 2: Build marriage chains per generation
  const genChains = {};
  for (let g = 0; g <= maxGen; g++) {
    genChains[g] = buildMarriageChains(byGen[g] || []);
  }

  // Step 3: Layout each generation
  const genLayouts = {};
  let maxWidth = 0;
  for (let g = 0; g <= maxGen; g++) {
    genLayouts[g] = layoutGeneration(genChains[g]);
    if (genLayouts[g].totalWidth > maxWidth) maxWidth = genLayouts[g].totalWidth;
  }

  // Step 4: Build final positions, centering each generation
  const positions = {};
  const unionPositions = {};

  for (let g = 0; g <= maxGen; g++) {
    const layout = genLayouts[g];
    const offsetX = (maxWidth - layout.totalWidth) / 2;
    const y = g * (NODE_HEIGHT + V_GAP) + 40;

    layout.items.forEach((item) => {
      if (item.type === "person") {
        positions[item.personId] = {
          x: item.x + offsetX,
          y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        };
      } else if (item.type === "union-dot") {
        unionPositions[item.unionId] = {
          x: item.x + offsetX,
          y: y + NODE_HEIGHT / 2,
        };
      }
    });
  }

  // Step 5: Build connectors
  const connectors = [];

  Object.values(unions).forEach((union) => {
    const uPos = unionPositions[union.id];
    if (!uPos) return;

    // Partner connector line (dashed line through union dot)
    const p1Pos = positions[union.partner1];
    const p2Pos = positions[union.partner2];
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
        unionId: union.id,
      });
    }

    // Child connectors
    if (union.children.length > 0) {
      const childPositions = union.children
        .map((cid) => positions[cid])
        .filter(Boolean);
      if (childPositions.length === 0) return;

      const dropY = uPos.y + V_GAP / 2 + 10;

      // Vertical line from union dot down to the drop point
      connectors.push({
        type: "line",
        x1: uPos.x,
        y1: uPos.y,
        x2: uPos.x,
        y2: dropY,
      });

      // Horizontal bar connecting the union dot's x to all children's centers
      const childXs = childPositions.map((p) => p.x + NODE_WIDTH / 2);
      const allXs = [uPos.x, ...childXs];
      const minX = Math.min(...allXs);
      const maxX = Math.max(...allXs);

      if (minX !== maxX) {
        connectors.push({
          type: "line",
          x1: minX,
          y1: dropY,
          x2: maxX,
          y2: dropY,
        });
      }

      // Vertical drops from the horizontal bar to each child
      childPositions.forEach((cp) => {
        connectors.push({
          type: "line",
          x1: cp.x + NODE_WIDTH / 2,
          y1: dropY,
          x2: cp.x + NODE_WIDTH / 2,
          y2: cp.y,
        });
      });
    }
  });

  const height = (maxGen + 1) * (NODE_HEIGHT + V_GAP) + 80;

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
    width: maxWidth + 80,
    height,
  };
}

/**
 * Assign generation numbers using BFS.
 * Root = gen 0, children = gen+1, partners = same gen.
 *
 * IMPORTANT: Partners are queued (not just marked visited) so their
 * own unions get explored. This ensures people like Luis Flores
 * (Enma's 2nd husband) get discovered even when Enma is first
 * encountered as Jorge's partner.
 */
function assignGenerations(rootId) {
  const gens = {};
  const visited = new Set();
  const queue = [{ id: rootId, gen: 0 }];

  while (queue.length > 0) {
    const { id, gen } = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    gens[id] = gen;

    const personUnions = getUnionsForPerson(id);
    personUnions.forEach((u) => {
      const partnerId = u.partner1 === id ? u.partner2 : u.partner1;
      if (!visited.has(partnerId)) {
        // Queue partner so their unions get explored too
        queue.push({ id: partnerId, gen });
      }
      u.children.forEach((childId) => {
        if (!visited.has(childId)) {
          queue.push({ id: childId, gen: gen + 1 });
        }
      });
    });
  }

  // Catch-all for disconnected people
  Object.keys(people).forEach((pid) => {
    if (!(pid in gens)) {
      gens[pid] = 0;
    }
  });

  return gens;
}

/**
 * Build marriage chains for a generation.
 *
 * A chain is a connected component of people linked by marriage.
 * e.g. [First Wife] - [Jorge] - [Enma] - [Luis] forms one chain.
 * Solo people (no marriage in this gen) are single-person chains.
 *
 * Each chain is ordered from a leaf node (someone with only 1 marriage)
 * to ensure a clean left-to-right layout.
 */
function buildMarriageChains(genPeople) {
  if (genPeople.length === 0) return [];

  // Build adjacency list of marriages within this generation
  const adj = {};
  const unionBetween = {};
  genPeople.forEach((pid) => {
    adj[pid] = [];
  });

  Object.values(unions).forEach((u) => {
    if (genPeople.includes(u.partner1) && genPeople.includes(u.partner2)) {
      adj[u.partner1].push(u.partner2);
      adj[u.partner2].push(u.partner1);
      unionBetween[`${u.partner1}|${u.partner2}`] = u.id;
      unionBetween[`${u.partner2}|${u.partner1}`] = u.id;
    }
  });

  // Find connected components via DFS
  const visited = new Set();
  const chains = [];

  genPeople.forEach((pid) => {
    if (visited.has(pid)) return;

    // DFS to find full component
    const component = [];
    const stack = [pid];
    while (stack.length > 0) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      visited.add(current);
      component.push(current);
      (adj[current] || []).forEach((n) => {
        if (!visited.has(n)) stack.push(n);
      });
    }

    if (component.length === 1) {
      // Solo person, no marriages in this generation
      chains.push({ people: component, unions: [] });
    } else {
      // Order the chain: start from a leaf (degree 1), traverse to the end
      const leaf =
        component.find((p) => adj[p].length === 1) || component[0];

      const ordered = [];
      const chainUnions = [];
      const chainVisited = new Set();
      let current = leaf;

      while (current) {
        ordered.push(current);
        chainVisited.add(current);
        const next = (adj[current] || []).find((n) => !chainVisited.has(n));
        if (next) {
          chainUnions.push(unionBetween[`${current}|${next}`]);
          current = next;
        } else {
          current = null;
        }
      }

      chains.push({ people: ordered, unions: chainUnions });
    }
  });

  return chains;
}

/**
 * Layout chains for a single generation horizontally.
 *
 * Each chain becomes: [Person] [gap+dot] [Person] [gap+dot] [Person] ...
 * Chains are separated by H_GAP.
 *
 * Returns { items: [...], totalWidth }
 */
function layoutGeneration(chains) {
  const items = [];
  let x = 40;

  chains.forEach((chain, chainIdx) => {
    if (chainIdx > 0) x += H_GAP;

    chain.people.forEach((personId, pIdx) => {
      items.push({ type: "person", personId, x });

      if (pIdx < chain.unions.length) {
        // Place union dot between this person and the next
        const dotX = x + NODE_WIDTH + COUPLE_GAP / 2;
        items.push({ type: "union-dot", unionId: chain.unions[pIdx], x: dotX });
        x += NODE_WIDTH + COUPLE_GAP;
      } else {
        x += NODE_WIDTH;
      }
    });
  });

  return { items, totalWidth: x + 40 };
}

export { NODE_WIDTH, NODE_HEIGHT, V_GAP, H_GAP };
