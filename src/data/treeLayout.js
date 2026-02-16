/**
 * Tree Layout Engine
 *
 * Computes x/y positions for every person and union in the family tree.
 * This is a multi-pass algorithm:
 *   1. Build a generation map starting from the root ancestor
 *   2. Layout each generation horizontally
 *   3. Position unions (marriages) between partners
 *   4. Draw connector lines
 */

import { people, unions, getUnionsForPerson } from "./familyData";

const NODE_WIDTH = 120;
const NODE_HEIGHT = 60;
const H_GAP = 40; // horizontal gap between nodes
const V_GAP = 100; // vertical gap between generations
const UNION_WIDTH = 20; // small diamond/dot for union connector
const COUPLE_GAP = 20; // gap between partners in a couple

/**
 * Build the full layout starting from root.
 * Returns { nodes: [...], unions: [...], connectors: [...], width, height }
 */
export function computeLayout(rootId = "victor-rivadeneira") {
  // Step 1: Assign generations via BFS from root
  const generations = assignGenerations(rootId);
  const maxGen = Math.max(...Object.values(generations));

  // Step 2: Build union groups per generation
  // A "unit" is either a union (couple + children) or a solo person
  const genUnits = buildGenerationUnits(generations);

  // Step 3: Position everything
  const positions = {};
  const unionPositions = {};
  const connectors = [];

  // Layout each generation
  let totalWidth = 0;

  // First pass: compute widths of each unit in each generation
  const genLayouts = [];
  for (let g = 0; g <= maxGen; g++) {
    const units = genUnits[g] || [];
    const layout = layoutGeneration(units, g);
    genLayouts.push(layout);
    if (layout.totalWidth > totalWidth) totalWidth = layout.totalWidth;
  }

  // Second pass: center each generation and assign absolute positions
  for (let g = 0; g <= maxGen; g++) {
    const layout = genLayouts[g];
    const offsetX = (totalWidth - layout.totalWidth) / 2;
    const y = g * (NODE_HEIGHT + V_GAP) + 40;

    layout.items.forEach((item) => {
      if (item.type === "person") {
        positions[item.personId] = {
          x: item.x + offsetX,
          y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        };
      } else if (item.type === "union") {
        // Position both partners
        positions[item.partner1] = {
          x: item.x1 + offsetX,
          y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        };
        positions[item.partner2] = {
          x: item.x2 + offsetX,
          y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        };
        unionPositions[item.unionId] = {
          x: item.ux + offsetX,
          y: y + NODE_HEIGHT / 2,
          partner1Pos: { x: item.x1 + offsetX + NODE_WIDTH, y: y + NODE_HEIGHT / 2 },
          partner2Pos: { x: item.x2 + offsetX, y: y + NODE_HEIGHT / 2 },
        };
      }
    });
  }

  // Step 4: Build connectors
  // For each union, draw lines from union point down to children
  Object.values(unions).forEach((union) => {
    const uPos = unionPositions[union.id];
    if (!uPos) return;

    if (union.children.length > 0) {
      const childPositions = union.children
        .map((cid) => positions[cid])
        .filter(Boolean);
      if (childPositions.length === 0) return;

      // Vertical line from union down
      const dropY = uPos.y + V_GAP / 2 + 10;
      connectors.push({
        type: "line",
        x1: uPos.x,
        y1: uPos.y,
        x2: uPos.x,
        y2: dropY,
        unionId: union.id,
      });

      // Horizontal bar across children
      const childXs = childPositions.map((p) => p.x + NODE_WIDTH / 2);
      const minX = Math.min(...childXs);
      const maxX = Math.max(...childXs);

      if (childPositions.length > 1) {
        connectors.push({
          type: "line",
          x1: minX,
          y1: dropY,
          x2: maxX,
          y2: dropY,
          unionId: union.id,
        });
      }

      // Vertical drops to each child
      childPositions.forEach((cp) => {
        connectors.push({
          type: "line",
          x1: cp.x + NODE_WIDTH / 2,
          y1: dropY,
          x2: cp.x + NODE_WIDTH / 2,
          y2: cp.y,
          unionId: union.id,
        });
      });
    }

    // Partner connector line
    connectors.push({
      type: "partner",
      x1: uPos.partner1Pos.x,
      y1: uPos.partner1Pos.y,
      x2: uPos.partner2Pos.x,
      y2: uPos.partner2Pos.y,
      unionId: union.id,
    });
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
    width: totalWidth + 80,
    height,
  };
}

/**
 * Assign generation numbers using BFS.
 * The root gets generation 0, their children get generation 1, etc.
 * Partners are placed in the same generation.
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

    // Partners go in the same generation
    const personUnions = getUnionsForPerson(id);
    personUnions.forEach((u) => {
      const partnerId = u.partner1 === id ? u.partner2 : u.partner1;
      if (!visited.has(partnerId)) {
        gens[partnerId] = gen;
        visited.add(partnerId);
      }
      // Children go in next generation
      u.children.forEach((childId) => {
        if (!visited.has(childId)) {
          queue.push({ id: childId, gen: gen + 1 });
        }
      });
    });
  }

  // Add anyone not yet placed (disconnected people)
  Object.keys(people).forEach((pid) => {
    if (!(pid in gens)) {
      gens[pid] = 0;
    }
  });

  return gens;
}

/**
 * Build layout units for each generation.
 * Groups couples together and tracks who's already placed.
 */
function buildGenerationUnits(generations) {
  const genGroups = {};
  const placed = new Set();

  // Group people by generation
  const byGen = {};
  Object.entries(generations).forEach(([pid, gen]) => {
    if (!byGen[gen]) byGen[gen] = [];
    byGen[gen].push(pid);
  });

  Object.keys(byGen)
    .sort((a, b) => a - b)
    .forEach((gen) => {
      const genNum = parseInt(gen);
      const units = [];
      const genPeople = byGen[gen];

      // First, find all unions in this generation
      const genUnions = [];
      Object.values(unions).forEach((u) => {
        if (
          genPeople.includes(u.partner1) &&
          genPeople.includes(u.partner2) &&
          !placed.has(u.id)
        ) {
          genUnions.push(u);
        }
      });

      // Group unions by shared partner (person with multiple marriages)
      const personUnionMap = {};
      genUnions.forEach((u) => {
        if (!personUnionMap[u.partner1]) personUnionMap[u.partner1] = [];
        personUnionMap[u.partner1].push(u);
        if (!personUnionMap[u.partner2]) personUnionMap[u.partner2] = [];
        personUnionMap[u.partner2].push(u);
      });

      // Place unions, keeping multi-marriage people together
      const placedPeople = new Set();
      genUnions.forEach((u) => {
        if (placed.has(u.id)) return;
        placed.add(u.id);

        // Check if either partner has other unions
        units.push({
          type: "union",
          unionId: u.id,
          partner1: u.partner1,
          partner2: u.partner2,
          children: u.children,
        });
        placedPeople.add(u.partner1);
        placedPeople.add(u.partner2);
      });

      // Place remaining solo people
      genPeople.forEach((pid) => {
        if (!placedPeople.has(pid)) {
          units.push({ type: "person", personId: pid });
          placedPeople.add(pid);
        }
      });

      genGroups[genNum] = units;
    });

  return genGroups;
}

/**
 * Layout a single generation horizontally.
 * Returns items with x positions and total width.
 */
function layoutGeneration(units, genIndex) {
  const items = [];
  let x = 40;

  units.forEach((unit, i) => {
    if (i > 0) x += H_GAP;

    if (unit.type === "person") {
      items.push({
        type: "person",
        personId: unit.personId,
        x,
      });
      x += NODE_WIDTH;
    } else if (unit.type === "union") {
      const x1 = x;
      const x2 = x + NODE_WIDTH + COUPLE_GAP;
      const ux = x1 + NODE_WIDTH + COUPLE_GAP / 2;

      items.push({
        type: "union",
        unionId: unit.unionId,
        partner1: unit.partner1,
        partner2: unit.partner2,
        x1,
        x2,
        ux,
      });
      x = x2 + NODE_WIDTH;
    }
  });

  return { items, totalWidth: x + 40 };
}

export { NODE_WIDTH, NODE_HEIGHT, V_GAP, H_GAP };
