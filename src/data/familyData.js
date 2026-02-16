/**
 * Family Data Model
 *
 * Each person has an id, name, gender, and optional fields.
 * Relationships are stored separately from people to properly handle
 * complex connections (multiple marriages, half-siblings, etc.)
 *
 * Unions represent marriages/partnerships and link to children born from them.
 */

export const people = {
  // === GREAT-GRANDPARENTS ===
  "victor-rivadeneira": {
    id: "victor-rivadeneira",
    firstName: "Victor",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Patriarch of the Rivadeneira family. Had two marriages — first to Teotista Caceres (7 children), then to an Osorio woman (4 children).",
    photo: null,
  },
  "teotista-caceres": {
    id: "teotista-caceres",
    firstName: "Teotista",
    lastName: "Caceres",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Victor Rivadeneira. Together they had seven children: Cecilia, Mayo, Ovidio, Nino, Sulpi, Gonzalo, and Andrea.",
    photo: null,
  },
  "xxx-osorio": {
    id: "xxx-osorio",
    firstName: "Unknown",
    lastName: "Osorio",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Second wife of Victor Rivadeneira. Together they had four children: Ernestina, Casamira, Pedro, and Dolores.",
    photo: null,
  },

  // === VICTOR + TEOTISTA'S CHILDREN ===
  "cecilia-rivadeneira": {
    id: "cecilia-rivadeneira",
    firstName: "Cecilia",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Victor Rivadeneira and Teotista Caceres. Had two children, Dante and Isolina, with an unknown partner.",
    photo: null,
  },
  "mayo-rivadeneira": {
    id: "mayo-rivadeneira",
    firstName: "Mayo",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },
  "ovidio-rivadeneira": {
    id: "ovidio-rivadeneira",
    firstName: "Ovidio",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },
  "nino-rivadeneira": {
    id: "nino-rivadeneira",
    firstName: "Nino",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },
  "sulpi-rivadeneira": {
    id: "sulpi-rivadeneira",
    firstName: "Sulpi",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },
  "gonzalo-rivadeneira": {
    id: "gonzalo-rivadeneira",
    firstName: "Gonzalo",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },
  "andrea-rivadeneira": {
    id: "andrea-rivadeneira",
    firstName: "Andrea",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },

  // === VICTOR + OSORIO'S CHILDREN ===
  "ernestina-osorio": {
    id: "ernestina-osorio",
    firstName: "Ernestina",
    lastName: "Osorio",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Victor Rivadeneira and Unknown Osorio. Had at least two children, but their names and her spouse are unknown.",
    photo: null,
  },
  "casamira-osorio": {
    id: "casamira-osorio",
    firstName: "Casamira",
    lastName: "Osorio",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Victor Rivadeneira and Unknown Osorio. Had children including Violeta and at least one other whose name is not remembered.",
    photo: null,
  },
  "pedro-osorio": {
    id: "pedro-osorio",
    firstName: "Pedro",
    lastName: "Osorio",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Unknown Osorio. Maternal grandfather. One of his spouses was Rosa Lizarraga, with whom he had five children: Pedro Rivadeneira, Enma Flores, Chela, Victor, and Nestor.",
    photo: null,
  },
  "dolores-osorio": {
    id: "dolores-osorio",
    firstName: "Dolores",
    lastName: "Osorio",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Victor Rivadeneira and Unknown Osorio. Had no biological children of her own, but raised Felicia.",
    photo: null,
  },

  // === CECILIA'S FAMILY ===
  "unknown-cecilia-spouse": {
    id: "unknown-cecilia-spouse",
    firstName: "Unknown",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Partner of Cecilia Rivadeneira. Name unknown.",
    photo: null,
  },
  "dante": {
    id: "dante",
    firstName: "Dante",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Cecilia Rivadeneira. Grandson of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },
  "isolina": {
    id: "isolina",
    firstName: "Isolina",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Cecilia Rivadeneira. Granddaughter of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },

  // === CASAMIRA'S FAMILY ===
  "unknown-casamira-spouse": {
    id: "unknown-casamira-spouse",
    firstName: "Unknown",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Partner of Casamira Osorio. Name unknown.",
    photo: null,
  },
  "violeta": {
    id: "violeta",
    firstName: "Violeta",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Casamira Osorio. Granddaughter of Victor Rivadeneira and Unknown Osorio.",
    photo: null,
  },

  // === MATERNAL GRANDPARENTS ===
  "rosa-lizarraga": {
    id: "rosa-lizarraga",
    firstName: "Rosa",
    lastName: "Lizarraga",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Maternal grandmother. Wife of Pedro Osorio. Mother of Pedro Rivadeneira, Enma Flores, Chela, Victor, and Nestor.",
    photo: null,
  },

  // === PEDRO OSORIO + ROSA LIZARRAGA'S CHILDREN ===
  "pedro-rivadeneira": {
    id: "pedro-rivadeneira",
    firstName: "Pedro",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Osorio and Rosa Lizarraga. Sibling of Enma, Chela, Victor, and Nestor.",
    photo: null,
  },
  "enma-flores": {
    id: "enma-flores",
    firstName: "Enma",
    lastName: "Flores",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Mother. Daughter of Pedro Osorio and Rosa Lizarraga. Had two marriages. Sibling of Pedro Rivadeneira, Chela, Victor, and Nestor.",
    photo: null,
  },
  "chela-osorio": {
    id: "chela-osorio",
    firstName: "Chela",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Osorio and Rosa Lizarraga. Sibling of Pedro Rivadeneira, Enma, Victor, and Nestor.",
    photo: null,
  },
  "victor-osorio": {
    id: "victor-osorio",
    firstName: "Victor",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Osorio and Rosa Lizarraga. Sibling of Pedro Rivadeneira, Enma, Chela, and Nestor.",
    photo: null,
  },
  "nestor-osorio": {
    id: "nestor-osorio",
    firstName: "Nestor",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Osorio and Rosa Lizarraga. Sibling of Pedro Rivadeneira, Enma, Chela, and Victor.",
    photo: null,
  },

  // === PATERNAL GRANDPARENTS (placeholder — exact identity among Victor+Teotista's children TBD) ===
  "grandfather-rivadeneira": {
    id: "grandfather-rivadeneira",
    firstName: "Grandfather",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Paternal grandfather. Son of Victor Rivadeneira and Teotista Caceres (may be one of the seven named siblings — exact identity to be confirmed).",
    photo: null,
  },
  "grandmother-rivadeneira": {
    id: "grandmother-rivadeneira",
    firstName: "Grandmother",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Paternal grandmother. Wife of Grandfather Rivadeneira.",
    photo: null,
  },

  // === PARENTS ===
  "jorge-rivadeneira-sr": {
    id: "jorge-rivadeneira-sr",
    firstName: "Jorge",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Father. Had two marriages. Son of Grandfather Rivadeneira.",
    photo: null,
  },
  "first-wife-jorge": {
    id: "first-wife-jorge",
    firstName: "First Wife",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Jorge Rivadeneira Sr.",
    photo: null,
  },
  "luis-flores": {
    id: "luis-flores",
    firstName: "Luis",
    lastName: "Flores",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Second husband of Enma Flores. No children from this marriage.",
    photo: null,
  },

  // === CHILDREN ===
  // From Jorge Sr. + First Wife
  "jorge-rivadeneira-jr": {
    id: "jorge-rivadeneira-jr",
    firstName: "Jorge",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Jorge Rivadeneira Sr. and his first wife. Half-sibling to Steven and Karina.",
    photo: null,
  },
  "ivette-rivadeneira": {
    id: "ivette-rivadeneira",
    firstName: "Ivette",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Jorge Rivadeneira Sr. and his first wife. Half-sibling to Steven and Karina.",
    photo: null,
  },
  // From Jorge Sr. + Enma
  "steven-rivadeneira": {
    id: "steven-rivadeneira",
    firstName: "Steven",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Jorge Rivadeneira Sr. and Enma Flores. Full sibling to Karina. Half-sibling to Jorge Jr. and Ivette.",
    photo: null,
  },
  "karina-rivadeneira": {
    id: "karina-rivadeneira",
    firstName: "Karina",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Jorge Rivadeneira Sr. and Enma Flores. Full sibling to Steven. Half-sibling to Jorge Jr. and Ivette.",
    photo: null,
  },
};

/**
 * Unions represent marriages or partnerships.
 * Each union links two partners and their children.
 */
export const unions = {
  // === Great-grandparent unions ===
  "union-victor-teotista": {
    id: "union-victor-teotista",
    partner1: "victor-rivadeneira",
    partner2: "teotista-caceres",
    children: [
      "cecilia-rivadeneira",
      "mayo-rivadeneira",
      "ovidio-rivadeneira",
      "nino-rivadeneira",
      "sulpi-rivadeneira",
      "gonzalo-rivadeneira",
      "andrea-rivadeneira",
      "grandfather-rivadeneira",
    ],
  },
  "union-victor-osorio": {
    id: "union-victor-osorio",
    partner1: "victor-rivadeneira",
    partner2: "xxx-osorio",
    children: [
      "ernestina-osorio",
      "casamira-osorio",
      "pedro-osorio",
      "dolores-osorio",
    ],
  },

  // === Cecilia's family ===
  "union-cecilia": {
    id: "union-cecilia",
    partner1: "cecilia-rivadeneira",
    partner2: "unknown-cecilia-spouse",
    children: ["dante", "isolina"],
  },

  // === Casamira's family ===
  "union-casamira": {
    id: "union-casamira",
    partner1: "casamira-osorio",
    partner2: "unknown-casamira-spouse",
    children: ["violeta"],
  },

  // === Maternal grandparent union ===
  "union-pedro-rosa": {
    id: "union-pedro-rosa",
    partner1: "pedro-osorio",
    partner2: "rosa-lizarraga",
    children: [
      "pedro-rivadeneira",
      "enma-flores",
      "chela-osorio",
      "victor-osorio",
      "nestor-osorio",
    ],
  },

  // === Paternal grandparent union ===
  "union-grandfather-rivadeneira": {
    id: "union-grandfather-rivadeneira",
    partner1: "grandfather-rivadeneira",
    partner2: "grandmother-rivadeneira",
    children: ["jorge-rivadeneira-sr"],
  },

  // === Parent unions ===
  "union-jorge-first-wife": {
    id: "union-jorge-first-wife",
    partner1: "jorge-rivadeneira-sr",
    partner2: "first-wife-jorge",
    children: ["jorge-rivadeneira-jr", "ivette-rivadeneira"],
  },
  "union-jorge-enma": {
    id: "union-jorge-enma",
    partner1: "jorge-rivadeneira-sr",
    partner2: "enma-flores",
    children: ["steven-rivadeneira", "karina-rivadeneira"],
  },
  "union-enma-luis": {
    id: "union-enma-luis",
    partner1: "enma-flores",
    partner2: "luis-flores",
    children: [],
  },
};

// === HELPER FUNCTIONS ===

/** Get a person by ID */
export function getPerson(id) {
  return people[id] || null;
}

/** Get full name */
export function getFullName(personId) {
  const p = people[personId];
  if (!p) return "Unknown";
  return `${p.firstName} ${p.lastName}`.trim();
}

/** Get all unions a person is part of */
export function getUnionsForPerson(personId) {
  return Object.values(unions).filter(
    (u) => u.partner1 === personId || u.partner2 === personId
  );
}

/** Get partner(s) for a person */
export function getPartners(personId) {
  const personUnions = getUnionsForPerson(personId);
  return personUnions.map((u) => ({
    partnerId: u.partner1 === personId ? u.partner2 : u.partner1,
    unionId: u.id,
    children: u.children,
  }));
}

/** Get children of a person */
export function getChildren(personId) {
  const personUnions = getUnionsForPerson(personId);
  const childIds = new Set();
  personUnions.forEach((u) => u.children.forEach((c) => childIds.add(c)));
  return [...childIds];
}

/** Get parents of a person */
export function getParents(personId) {
  const parentUnions = Object.values(unions).filter((u) =>
    u.children.includes(personId)
  );
  const parentIds = [];
  parentUnions.forEach((u) => {
    parentIds.push(u.partner1);
    parentIds.push(u.partner2);
  });
  return [...new Set(parentIds)];
}

/** Get siblings (full and half) */
export function getSiblings(personId) {
  const parentUnionsList = Object.values(unions).filter((u) =>
    u.children.includes(personId)
  );
  const siblings = { full: [], half: [] };

  // Get all children from all parent unions
  const allParentIds = new Set();
  parentUnionsList.forEach((u) => {
    allParentIds.add(u.partner1);
    allParentIds.add(u.partner2);
  });

  // Find all unions involving any of these parents
  const relatedUnions = Object.values(unions).filter(
    (u) => allParentIds.has(u.partner1) || allParentIds.has(u.partner2)
  );

  relatedUnions.forEach((u) => {
    u.children.forEach((childId) => {
      if (childId === personId) return;
      // Check if this child shares both parents (full) or one parent (half)
      const childParentUnions = Object.values(unions).filter((cu) =>
        cu.children.includes(childId)
      );
      const childParentSet = new Set();
      childParentUnions.forEach((cu) => {
        childParentSet.add(cu.partner1);
        childParentSet.add(cu.partner2);
      });

      const myParents = new Set();
      parentUnionsList.forEach((pu) => {
        myParents.add(pu.partner1);
        myParents.add(pu.partner2);
      });

      const sharedParents = [...myParents].filter((p) =>
        childParentSet.has(p)
      );

      if (sharedParents.length >= 2) {
        if (!siblings.full.includes(childId)) siblings.full.push(childId);
      } else if (sharedParents.length === 1) {
        if (!siblings.half.includes(childId)) siblings.half.push(childId);
      }
    });
  });

  return siblings;
}

/** Get all people as an array */
export function getAllPeople() {
  return Object.values(people);
}

/** Get all unions as an array */
export function getAllUnions() {
  return Object.values(unions);
}
