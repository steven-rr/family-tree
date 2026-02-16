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
  // ============================================================
  // GENERATION 0 — GREAT-GRANDPARENTS
  // ============================================================
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

  // ============================================================
  // GENERATION 1 — VICTOR + TEOTISTA'S CHILDREN (7)
  // ============================================================
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
    bio: "Son of Victor Rivadeneira and Teotista Caceres. Married once; his wife passed away young due to an aneurysm. Had three children: Marianella, Eliana, and Ricardo.",
    photo: null,
  },
  "ovidio-rivadeneira": {
    id: "ovidio-rivadeneira",
    firstName: "Ovidio",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres. Paternal grandfather. Had two marriages — first wife (name unknown) bore Arturo and Myriam; second wife Felicia Rojas bore Jorge and Beto.",
    photo: null,
  },
  "nino-rivadeneira": {
    id: "nino-rivadeneira",
    firstName: "Nino",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres. Married Dora Monge. Had children: Mary, Jorge, and Victor.",
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
    bio: "Daughter of Victor Rivadeneira and Teotista Caceres. Had two children: Rosa and Emelina.",
    photo: null,
  },

  // ============================================================
  // GENERATION 1 — VICTOR + OSORIO'S CHILDREN (4)
  // ============================================================
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

  // ============================================================
  // GENERATION 1 — SPOUSES OF VICTOR'S CHILDREN
  // ============================================================
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
  "wife-mayo": {
    id: "wife-mayo",
    firstName: "Unknown",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Wife of Mayo Rivadeneira. Passed away young due to an aneurysm.",
    photo: null,
  },
  "first-wife-ovidio": {
    id: "first-wife-ovidio",
    firstName: "Unknown",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Ovidio Rivadeneira. Mother of Arturo and Myriam.",
    photo: null,
  },
  "felicia-rojas": {
    id: "felicia-rojas",
    firstName: "Felicia",
    lastName: "Rojas",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Second wife of Ovidio Rivadeneira. Paternal grandmother. Mother of Jorge Rivadeneira Sr. and Beto Rivadeneira.",
    photo: null,
  },
  "dora-monge": {
    id: "dora-monge",
    firstName: "Dora",
    lastName: "Monge",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Wife of Nino Rivadeneira. Mother of Mary, Jorge, and Victor.",
    photo: null,
  },
  "unknown-andrea-spouse": {
    id: "unknown-andrea-spouse",
    firstName: "Unknown",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Partner of Andrea Rivadeneira. Name unknown.",
    photo: null,
  },
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

  // ============================================================
  // GENERATION 2 — CECILIA'S CHILDREN
  // ============================================================
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

  // ============================================================
  // GENERATION 2 — MAYO'S CHILDREN
  // ============================================================
  "marianella": {
    id: "marianella",
    firstName: "Marianella",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Mayo Rivadeneira.",
    photo: null,
  },
  "eliana": {
    id: "eliana",
    firstName: "Eliana",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Mayo Rivadeneira.",
    photo: null,
  },
  "ricardo": {
    id: "ricardo",
    firstName: "Ricardo",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Mayo Rivadeneira.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — OVIDIO'S CHILDREN
  // ============================================================
  // From Ovidio + 1st wife
  "arturo-rivadeneira": {
    id: "arturo-rivadeneira",
    firstName: "Arturo",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Ovidio Rivadeneira and his first wife. Half-sibling to Jorge Sr. and Beto. Father of Cesar, Miguel, and Franklin.",
    photo: null,
  },
  "myriam-rivadeneira": {
    id: "myriam-rivadeneira",
    firstName: "Myriam",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Ovidio Rivadeneira and his first wife. Half-sibling to Jorge Sr. and Beto. Mother of Veronica and Vanessa.",
    photo: null,
  },
  // From Ovidio + Felicia Rojas
  "beto-rivadeneira": {
    id: "beto-rivadeneira",
    firstName: "Beto",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Ovidio Rivadeneira and Felicia Rojas. Brother of Jorge Rivadeneira Sr. Half-sibling to Arturo and Myriam. Had no children.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — NINO'S CHILDREN
  // ============================================================
  "mary-nino": {
    id: "mary-nino",
    firstName: "Mary",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Nino Rivadeneira and Dora Monge.",
    photo: null,
  },
  "jorge-nino": {
    id: "jorge-nino",
    firstName: "Jorge",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Nino Rivadeneira and Dora Monge.",
    photo: null,
  },
  "victor-nino": {
    id: "victor-nino",
    firstName: "Victor",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Nino Rivadeneira and Dora Monge.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — ANDREA'S CHILDREN
  // ============================================================
  "rosa-andrea": {
    id: "rosa-andrea",
    firstName: "Rosa",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Andrea Rivadeneira.",
    photo: null,
  },
  "emelina": {
    id: "emelina",
    firstName: "Emelina",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Andrea Rivadeneira.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — CASAMIRA'S CHILDREN
  // ============================================================
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

  // ============================================================
  // GENERATION 2 — PEDRO OSORIO + ROSA LIZARRAGA'S CHILDREN (5)
  // ============================================================
  "pedro-rivadeneira": {
    id: "pedro-rivadeneira",
    firstName: "Pedro",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Osorio and Rosa Lizarraga. Had two marriages — first to Lydia (children: Patricia, Pedro, Roberto), then a second wife (child: Rosa Rivadeneira).",
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
    bio: "Daughter of Pedro Osorio and Rosa Lizarraga. Married a man named Cespedes. Had three children: Milagros, John, and Jose.",
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

  // ============================================================
  // GENERATION 2 — SPOUSES (OVIDIO'S KIDS, PEDRO R., CHELA, MYRIAM)
  // ============================================================
  "unknown-arturo-spouse": {
    id: "unknown-arturo-spouse",
    firstName: "Unknown",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Wife of Arturo Rivadeneira. Mother of Cesar, Miguel, and Franklin.",
    photo: null,
  },
  "unknown-myriam-spouse": {
    id: "unknown-myriam-spouse",
    firstName: "Unknown",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Partner of Myriam Rivadeneira. Father of Veronica and Vanessa.",
    photo: null,
  },
  "lydia": {
    id: "lydia",
    firstName: "Lydia",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Pedro Rivadeneira. Mother of Patricia, Pedro, and Roberto.",
    photo: null,
  },
  "second-wife-pedro-r": {
    id: "second-wife-pedro-r",
    firstName: "Unknown",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Second wife of Pedro Rivadeneira. Mother of Rosa Rivadeneira.",
    photo: null,
  },
  "mr-cespedes": {
    id: "mr-cespedes",
    firstName: "Unknown",
    lastName: "Cespedes",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Husband of Chela. Father of Milagros, John, and Jose.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — PARENTS (JORGE SR. LINE)
  // ============================================================
  "jorge-rivadeneira-sr": {
    id: "jorge-rivadeneira-sr",
    firstName: "Jorge",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Father. Son of Ovidio Rivadeneira and Felicia Rojas. Had two marriages. Half-sibling to Arturo and Myriam. Full sibling to Beto.",
    photo: null,
  },
  "aracely-diaz": {
    id: "aracely-diaz",
    firstName: "Aracely",
    lastName: "Diaz",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Jorge Rivadeneira Sr. Mother of Jorge Jr. and Ivette.",
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

  // ============================================================
  // GENERATION 3 — ARTURO'S CHILDREN
  // ============================================================
  "cesar": {
    id: "cesar",
    firstName: "Cesar",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Arturo Rivadeneira.",
    photo: null,
  },
  "miguel": {
    id: "miguel",
    firstName: "Miguel",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Arturo Rivadeneira.",
    photo: null,
  },
  "franklin": {
    id: "franklin",
    firstName: "Franklin",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Arturo Rivadeneira.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — MYRIAM'S CHILDREN
  // ============================================================
  "veronica": {
    id: "veronica",
    firstName: "Veronica",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Myriam Rivadeneira.",
    photo: null,
  },
  "vanessa": {
    id: "vanessa",
    firstName: "Vanessa",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Myriam Rivadeneira.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — PEDRO RIVADENEIRA'S CHILDREN
  // ============================================================
  // From Pedro R. + Lydia
  "patricia": {
    id: "patricia",
    firstName: "Patricia",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Rivadeneira and Lydia.",
    photo: null,
  },
  "pedro-rivadeneira-jr": {
    id: "pedro-rivadeneira-jr",
    firstName: "Pedro",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Rivadeneira and Lydia.",
    photo: null,
  },
  "roberto": {
    id: "roberto",
    firstName: "Roberto",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Rivadeneira and Lydia.",
    photo: null,
  },
  // From Pedro R. + 2nd wife
  "rosa-rivadeneira": {
    id: "rosa-rivadeneira",
    firstName: "Rosa",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Rivadeneira and his second wife.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — CHELA'S CHILDREN
  // ============================================================
  "milagros-cespedes": {
    id: "milagros-cespedes",
    firstName: "Milagros",
    lastName: "Cespedes",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Chela and Mr. Cespedes.",
    photo: null,
  },
  "john-cespedes": {
    id: "john-cespedes",
    firstName: "John",
    lastName: "Cespedes",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Chela and Mr. Cespedes.",
    photo: null,
  },
  "jose-cespedes": {
    id: "jose-cespedes",
    firstName: "Jose",
    lastName: "Cespedes",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Chela and Mr. Cespedes.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — JORGE SR.'S CHILDREN
  // ============================================================
  // From Jorge Sr. + First Wife
  "jorge-rivadeneira-jr": {
    id: "jorge-rivadeneira-jr",
    firstName: "Jorge",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Jorge Rivadeneira Sr. and Aracely Diaz. Half-sibling to Steven and Karina.",
    photo: null,
  },
  "ivette-rivadeneira": {
    id: "ivette-rivadeneira",
    firstName: "Ivette",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Jorge Rivadeneira Sr. and Aracely Diaz. Half-sibling to Steven and Karina.",
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

  // === Mayo's family ===
  "union-mayo": {
    id: "union-mayo",
    partner1: "mayo-rivadeneira",
    partner2: "wife-mayo",
    children: ["marianella", "eliana", "ricardo"],
  },

  // === Ovidio's families ===
  "union-ovidio-first-wife": {
    id: "union-ovidio-first-wife",
    partner1: "ovidio-rivadeneira",
    partner2: "first-wife-ovidio",
    children: ["arturo-rivadeneira", "myriam-rivadeneira"],
  },
  "union-ovidio-felicia": {
    id: "union-ovidio-felicia",
    partner1: "ovidio-rivadeneira",
    partner2: "felicia-rojas",
    children: ["jorge-rivadeneira-sr", "beto-rivadeneira"],
  },

  // === Nino's family ===
  "union-nino-dora": {
    id: "union-nino-dora",
    partner1: "nino-rivadeneira",
    partner2: "dora-monge",
    children: ["mary-nino", "jorge-nino", "victor-nino"],
  },

  // === Andrea's family ===
  "union-andrea": {
    id: "union-andrea",
    partner1: "andrea-rivadeneira",
    partner2: "unknown-andrea-spouse",
    children: ["rosa-andrea", "emelina"],
  },

  // === Casamira's family ===
  "union-casamira": {
    id: "union-casamira",
    partner1: "casamira-osorio",
    partner2: "unknown-casamira-spouse",
    children: ["violeta"],
  },

  // === Pedro Osorio + Rosa Lizarraga ===
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

  // === Arturo's family ===
  "union-arturo": {
    id: "union-arturo",
    partner1: "arturo-rivadeneira",
    partner2: "unknown-arturo-spouse",
    children: ["cesar", "miguel", "franklin"],
  },

  // === Myriam's family ===
  "union-myriam": {
    id: "union-myriam",
    partner1: "myriam-rivadeneira",
    partner2: "unknown-myriam-spouse",
    children: ["veronica", "vanessa"],
  },

  // === Pedro Rivadeneira's families ===
  "union-pedro-r-lydia": {
    id: "union-pedro-r-lydia",
    partner1: "pedro-rivadeneira",
    partner2: "lydia",
    children: ["patricia", "pedro-rivadeneira-jr", "roberto"],
  },
  "union-pedro-r-second": {
    id: "union-pedro-r-second",
    partner1: "pedro-rivadeneira",
    partner2: "second-wife-pedro-r",
    children: ["rosa-rivadeneira"],
  },

  // === Chela's family ===
  "union-chela-cespedes": {
    id: "union-chela-cespedes",
    partner1: "chela-osorio",
    partner2: "mr-cespedes",
    children: ["milagros-cespedes", "john-cespedes", "jose-cespedes"],
  },

  // === Jorge Sr.'s families ===
  "union-jorge-first-wife": {
    id: "union-jorge-first-wife",
    partner1: "jorge-rivadeneira-sr",
    partner2: "aracely-diaz",
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

/** Compute branch membership for color-coding (teotista vs osorio side) */
export function computeBranches() {
  const branches = {};
  const visited = new Set();
  const queue = ["victor-rivadeneira"];

  branches["victor-rivadeneira"] = "root";
  branches["teotista-caceres"] = "teotista";
  branches["xxx-osorio"] = "osorio";

  while (queue.length > 0) {
    const id = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);

    const personUnions = getUnionsForPerson(id);
    personUnions.forEach((u) => {
      const partnerId = u.partner1 === id ? u.partner2 : u.partner1;

      let childBranch;
      if (u.id === "union-victor-teotista") {
        childBranch = "teotista";
      } else if (u.id === "union-victor-osorio") {
        childBranch = "osorio";
      } else {
        const b1 = branches[u.partner1];
        const b2 = branches[u.partner2];
        if (
          b1 && b2 &&
          b1 !== b2 &&
          b1 !== "root" && b2 !== "root" &&
          b1 !== "both" && b2 !== "both"
        ) {
          childBranch = "both";
        } else if (b1 === "both" || b2 === "both") {
          childBranch = "both";
        } else {
          childBranch =
            (b1 && b1 !== "root" ? b1 : null) ||
            (b2 && b2 !== "root" ? b2 : null) ||
            "unknown";
        }
      }

      if (!branches[partnerId]) branches[partnerId] = childBranch;
      u.children.forEach((childId) => {
        if (!branches[childId]) branches[childId] = childBranch;
      });

      if (!visited.has(partnerId)) queue.push(partnerId);
      u.children.forEach((childId) => {
        if (!visited.has(childId)) queue.push(childId);
      });
    });
  }

  return branches;
}

/** Count all descendants of a person */
export function getDescendantCount(personId, visited = new Set()) {
  if (visited.has(personId)) return 0;
  visited.add(personId);
  const children = getChildren(personId);
  let count = children.length;
  children.forEach((childId) => {
    count += getDescendantCount(childId, visited);
  });
  return count;
}
