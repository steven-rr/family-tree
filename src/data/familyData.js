/**
 * Family Data Model
 *
 * Each person has an id, name, gender, and optional fields:
 *   - middleName: middle name
 *   - nickname: common nickname shown in parentheses
 *   - birthYear / deathYear
 *   - bio: short biography
 *   - photo: URL or null
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
    bio: "Patriarch of the Rivadeneira family. Had two marriages — first to Teotista Caceres (7 children), then to Mercedes Osorio (4 children).",
    photo: null,
  },
  "teotista-caceres": {
    id: "teotista-caceres",
    firstName: "Teotista",
    lastName: "Caceres",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Victor Rivadeneira. Together they had seven children: Cecilia, Amaro (Mayo), Ovidio, Nino, Sulpi, Gonzalo, and Andrea.",
    photo: null,
  },
  "xxx-osorio": {
    id: "xxx-osorio",
    firstName: "Mercedes",
    lastName: "Osorio",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Second wife of Victor Rivadeneira. Together they had four children: Ernestina, Casimira, Pedro, and Dolores.",
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
    firstName: "Amaro",
    nickname: "Mayo",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres. Known as Mayo. Married a woman (surname Samaniego) who passed away young due to an aneurysm. Had three children: Marianella, Eliana, and Ricardo.",
    photo: null,
  },
  "ovidio-rivadeneira": {
    id: "ovidio-rivadeneira",
    firstName: "Ovidio",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres. Paternal grandfather. Had two marriages — first wife (name unknown) bore Arturo and Myriam; second wife Felicia Rojas bore Jorge, Carlos Alberto (Beto), and Guillermo.",
    photo: null,
  },
  "nino-rivadeneira": {
    id: "nino-rivadeneira",
    firstName: "Nino",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Teotista Caceres. Married Dora Monge. Had children: Mary (Cape), Jorge, Victor, and Ita.",
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
    bio: "Daughter of Victor Rivadeneira and Teotista Caceres. Had three children: Rosa, Emelina, and Pepe.",
    photo: null,
  },

  // ============================================================
  // GENERATION 1 — VICTOR + MERCEDES OSORIO'S CHILDREN (4)
  // ============================================================
  "ernestina-osorio": {
    id: "ernestina-osorio",
    firstName: "Ernestina",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Victor Rivadeneira and Mercedes Osorio. Had three children: Aurelio, Manuel, and Esperanza.",
    photo: null,
  },
  "casamira-osorio": {
    id: "casamira-osorio",
    firstName: "Casimira",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Victor Rivadeneira and Mercedes Osorio. Had children: Violeta, Santos, and Fidel. Spouse name unknown.",
    photo: null,
  },
  "pedro-osorio": {
    id: "pedro-osorio",
    firstName: "Pedro",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Victor Rivadeneira and Mercedes Osorio. Maternal grandfather. Had two marriages — first to Maria (children: Luisa, Balvina, Rosario, Ines, Walter, Raul), then to Rosa Lizarraga Nuñez (children: Pedro Antonio, Enma, Elizabeth (Chela), Victor, and Nestor).",
    photo: null,
  },
  "dolores-osorio": {
    id: "dolores-osorio",
    firstName: "Dolores",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Victor Rivadeneira and Mercedes Osorio. Had no biological children of her own, but raised Felicia.",
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
    lastName: "Samaniego",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Wife of Amaro (Mayo) Rivadeneira. Surname Samaniego; first name unknown. Passed away young due to an aneurysm.",
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
    bio: "Second wife of Ovidio Rivadeneira. Paternal grandmother. Mother of Jorge Sr., Carlos Alberto (Beto), and Guillermo.",
    photo: null,
  },
  "dora-monge": {
    id: "dora-monge",
    firstName: "Dora",
    lastName: "Monge",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Wife of Nino Rivadeneira. Mother of Mary (Cape), Jorge, Victor, and Ita.",
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
    bio: "Partner of Casimira Rivadeneira. Name unknown.",
    photo: null,
  },
  "maria-pedro-wife1": {
    id: "maria-pedro-wife1",
    firstName: "Maria",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Pedro Rivadeneira (maternal grandfather). Mother of Luisa, Balvina, Rosario, Ines, Walter, and Raul.",
    photo: null,
  },
  "rosa-lizarraga": {
    id: "rosa-lizarraga",
    firstName: "Rosa",
    lastName: "Lizarraga Nuñez",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Maternal grandmother. Had a first marriage in the jungle, then married Pedro Rivadeneira. Mother of Emnida (from first marriage), and Pedro Antonio, Enma, Elizabeth (Chela), Victor, and Nestor (with Pedro).",
    photo: null,
  },
  "unknown-rosa-first-husband": {
    id: "unknown-rosa-first-husband",
    firstName: "Unknown",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Rosa Lizarraga's first husband. Lived in the jungle, far from Lima.",
    photo: null,
  },
  "emnida-rivadeneira": {
    id: "emnida-rivadeneira",
    firstName: "Emnida",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Rosa Lizarraga Nuñez from her first marriage.",
    photo: null,
  },
  "unknown-ernestina-spouse": {
    id: "unknown-ernestina-spouse",
    firstName: "Unknown",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Partner of Ernestina Rivadeneira. Name unknown.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — CECILIA'S CHILDREN
  // ============================================================
  "dante": {
    id: "dante",
    firstName: "Dante",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Cecilia Rivadeneira. Grandson of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },
  "isolina": {
    id: "isolina",
    firstName: "Isolina",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Cecilia Rivadeneira. Granddaughter of Victor Rivadeneira and Teotista Caceres.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — AMARO (MAYO)'S CHILDREN
  // ============================================================
  "marianella": {
    id: "marianella",
    firstName: "Marianella",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Amaro (Mayo) Rivadeneira.",
    photo: null,
  },
  "eliana": {
    id: "eliana",
    firstName: "Eliana",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Amaro (Mayo) Rivadeneira.",
    photo: null,
  },
  "ricardo": {
    id: "ricardo",
    firstName: "Ricardo",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Amaro (Mayo) Rivadeneira.",
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
    bio: "Son of Ovidio Rivadeneira and his first wife. Half-sibling to Jorge Sr., Carlos Alberto (Beto), and Guillermo. Married Flor. Father of Cesar, Miguel, and Franklin.",
    photo: null,
  },
  "myriam-rivadeneira": {
    id: "myriam-rivadeneira",
    firstName: "Myriam",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Ovidio Rivadeneira and his first wife. Half-sibling to Jorge Sr., Carlos Alberto (Beto), and Guillermo. Married Jose Cayao. Mother of Veronica and Vanessa.",
    photo: null,
  },
  // From Ovidio + Felicia Rojas
  "beto-rivadeneira": {
    id: "beto-rivadeneira",
    firstName: "Carlos",
    middleName: "Alberto",
    nickname: "Beto",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Ovidio Rivadeneira and Felicia Rojas. Known as Beto. Full brother of Jorge Sr. and Guillermo. Half-sibling to Arturo and Myriam. Had no children.",
    photo: null,
  },
  "guillermo-rivadeneira": {
    id: "guillermo-rivadeneira",
    firstName: "Guillermo",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Ovidio Rivadeneira and Felicia Rojas. Full brother of Jorge Sr. and Carlos Alberto (Beto). Died young around age 10, in his brother Jorge's arms.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — NINO'S CHILDREN
  // ============================================================
  "mary-nino": {
    id: "mary-nino",
    firstName: "Mary",
    nickname: "Cape",
    lastName: "Rivadeneira Monge",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Nino Rivadeneira and Dora Monge. Known as Cape. Married Juan Flores. Mother of GianCarlo (Gianni) and Danny.",
    photo: null,
  },
  "jorge-nino": {
    id: "jorge-nino",
    firstName: "Jorge",
    lastName: "Rivadeneira Monge",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Nino Rivadeneira and Dora Monge.",
    photo: null,
  },
  "victor-nino": {
    id: "victor-nino",
    firstName: "Victor",
    lastName: "Rivadeneira Monge",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Nino Rivadeneira and Dora Monge.",
    photo: null,
  },
  "ita-rivadeneira": {
    id: "ita-rivadeneira",
    firstName: "Ita",
    lastName: "Rivadeneira Monge",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Nino Rivadeneira and Dora Monge. Sister of Mary (Cape), Jorge, and Victor.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — ANDREA'S CHILDREN
  // ============================================================
  "rosa-andrea": {
    id: "rosa-andrea",
    firstName: "Rosa",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Andrea Rivadeneira. Married Sebastian. Mother of Carmen and Alex.",
    photo: null,
  },
  "emelina": {
    id: "emelina",
    firstName: "Emelina",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Andrea Rivadeneira.",
    photo: null,
  },
  "pepe": {
    id: "pepe",
    firstName: "Pepe",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Andrea Rivadeneira. Brother of Rosa and Emelina.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — ERNESTINA'S CHILDREN
  // ============================================================
  "aurelio": {
    id: "aurelio",
    firstName: "Aurelio",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Ernestina Rivadeneira.",
    photo: null,
  },
  "manuel-ernestina": {
    id: "manuel-ernestina",
    firstName: "Manuel",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Ernestina Rivadeneira.",
    photo: null,
  },
  "esperanza": {
    id: "esperanza",
    firstName: "Esperanza",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Ernestina Rivadeneira.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — CASIMIRA'S CHILDREN
  // ============================================================
  "violeta": {
    id: "violeta",
    firstName: "Violeta",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Casimira Rivadeneira.",
    photo: null,
  },
  "santos": {
    id: "santos",
    firstName: "Santos",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Casimira Rivadeneira.",
    photo: null,
  },
  "fidel": {
    id: "fidel",
    firstName: "Fidel",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Casimira Rivadeneira.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — PEDRO (GRANDFATHER) + MARIA'S CHILDREN (6)
  // ============================================================
  "luisa-rivadeneira": {
    id: "luisa-rivadeneira",
    firstName: "Luisa",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Rivadeneira (grandfather) and his first wife Maria. Half-sibling to Pedro Antonio, Enma, Elizabeth (Chela), Victor, and Nestor.",
    photo: null,
  },
  "balvina-rivadeneira": {
    id: "balvina-rivadeneira",
    firstName: "Balvina",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Rivadeneira (grandfather) and his first wife Maria.",
    photo: null,
  },
  "rosario-rivadeneira": {
    id: "rosario-rivadeneira",
    firstName: "Rosario",
    nickname: "Shayo",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Rivadeneira (grandfather) and his first wife Maria. Known as Shayo.",
    photo: null,
  },
  "ines-rivadeneira": {
    id: "ines-rivadeneira",
    firstName: "Ines",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Rivadeneira (grandfather) and his first wife Maria.",
    photo: null,
  },
  "walter-rivadeneira": {
    id: "walter-rivadeneira",
    firstName: "Walter",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Rivadeneira (grandfather) and his first wife Maria.",
    photo: null,
  },
  "raul-rivadeneira": {
    id: "raul-rivadeneira",
    firstName: "Raul",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Rivadeneira (grandfather) and his first wife Maria.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — PEDRO (GRANDFATHER) + ROSA LIZARRAGA'S CHILDREN (5)
  // ============================================================
  "pedro-rivadeneira": {
    id: "pedro-rivadeneira",
    firstName: "Pedro",
    middleName: "Antonio",
    nickname: "Pedroncho",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Rivadeneira (grandfather) and Rosa Lizarraga Nuñez. Known as Pedroncho. Had two marriages — first to Lydia Cardenas (children: Patricia, Pedro Carlomagno, Roberto Carlos), then to Vilma Benitez (child: Rosa).",
    photo: null,
  },
  "enma-flores": {
    id: "enma-flores",
    firstName: "Enma",
    lastName: "Flores",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Mother. Daughter of Pedro Rivadeneira (grandfather) and Rosa Lizarraga Nuñez. Had two marriages. Sibling of Pedro Antonio (Pedroncho), Elizabeth (Chela), Victor, and Nestor.",
    photo: null,
  },
  "chela-osorio": {
    id: "chela-osorio",
    firstName: "Elizabeth",
    nickname: "Chela",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Rivadeneira (grandfather) and Rosa Lizarraga Nuñez. Known as Chela. Married a man named Cespedes. Had three children: Milagros, John, and Jose (Joselo).",
    photo: null,
  },
  "victor-osorio": {
    id: "victor-osorio",
    firstName: "Victor",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Rivadeneira (grandfather) and Rosa Lizarraga Nuñez. Sibling of Pedro Antonio, Enma, Elizabeth (Chela), and Nestor.",
    photo: null,
  },
  "nestor-osorio": {
    id: "nestor-osorio",
    firstName: "Nestor",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Rivadeneira (grandfather) and Rosa Lizarraga Nuñez. Sibling of Pedro Antonio, Enma, Elizabeth (Chela), and Victor.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — SPOUSES
  // ============================================================
  "unknown-arturo-spouse": {
    id: "unknown-arturo-spouse",
    firstName: "Flor",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Wife of Arturo Rivadeneira. Mother of Cesar, Miguel, and Franklin.",
    photo: null,
  },
  "unknown-myriam-spouse": {
    id: "unknown-myriam-spouse",
    firstName: "Jose",
    lastName: "Cayao",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Husband of Myriam Rivadeneira. Father of Veronica and Vanessa.",
    photo: null,
  },
  "lydia": {
    id: "lydia",
    firstName: "Lydia",
    lastName: "Cardenas",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Pedro Antonio (Pedroncho) Rivadeneira. Mother of Patricia, Pedro Carlomagno, and Roberto Carlos.",
    photo: null,
  },
  "second-wife-pedro-r": {
    id: "second-wife-pedro-r",
    firstName: "Vilma",
    lastName: "Benitez",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Second wife of Pedro Antonio (Pedroncho) Rivadeneira. Mother of Rosa Rivadeneira.",
    photo: null,
  },
  "mr-cespedes": {
    id: "mr-cespedes",
    firstName: "Unknown",
    lastName: "Cespedes",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Husband of Elizabeth (Chela). Father of Milagros, John, and Jose (Joselo).",
    photo: null,
  },
  "sebastian": {
    id: "sebastian",
    firstName: "Sebastian",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Husband of Rosa (daughter of Andrea Rivadeneira). Father of Carmen and Alex.",
    photo: null,
  },
  "juan-flores": {
    id: "juan-flores",
    firstName: "Juan",
    lastName: "Flores",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Husband of Mary (Cape) Rivadeneira Monge. Father of GianCarlo (Gianni) and Danny.",
    photo: null,
  },

  // ============================================================
  // GENERATION 2 — PARENTS (JORGE SR. LINE)
  // ============================================================
  "jorge-rivadeneira-sr": {
    id: "jorge-rivadeneira-sr",
    firstName: "Jorge",
    nickname: "Lucho",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Father. Known as Lucho. Son of Ovidio Rivadeneira and Felicia Rojas. Had two marriages. Full sibling to Carlos Alberto (Beto) and Guillermo. Half-sibling to Arturo and Myriam. Guillermo died young in his arms around age 10.",
    photo: null,
  },
  "aracely-diaz": {
    id: "aracely-diaz",
    firstName: "Aracely",
    lastName: "Diaz",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "First wife of Jorge (Lucho) Rivadeneira Sr. Mother of Jorge Jr. and Ivette.",
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
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Arturo Rivadeneira and Flor. Father of Jeremiah.",
    photo: null,
  },
  "miguel": {
    id: "miguel",
    firstName: "Miguel",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Arturo Rivadeneira and Flor. Father of Mia.",
    photo: null,
  },
  "franklin": {
    id: "franklin",
    firstName: "Franklin",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Arturo Rivadeneira and Flor. Has two children (names unknown).",
    photo: null,
  },
  "unknown-cesar-spouse": {
    id: "unknown-cesar-spouse",
    firstName: "Unknown",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Partner of Cesar Rivadeneira. Mother of Jeremiah.",
    photo: null,
  },
  "unknown-miguel-spouse": {
    id: "unknown-miguel-spouse",
    firstName: "Unknown",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Partner of Miguel Rivadeneira. Mother of Mia.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — MYRIAM'S CHILDREN
  // ============================================================
  "veronica": {
    id: "veronica",
    firstName: "Veronica",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Myriam Rivadeneira and Jose Cayao. Has one child (name unknown).",
    photo: null,
  },
  "vanessa": {
    id: "vanessa",
    firstName: "Vanessa",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Myriam Rivadeneira and Jose Cayao.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — PEDRO ANTONIO (PEDRONCHO) RIVADENEIRA'S CHILDREN
  // ============================================================
  // From Pedro Antonio + Lydia Cardenas
  "patricia": {
    id: "patricia",
    firstName: "Patricia",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Antonio (Pedroncho) Rivadeneira and Lydia Cardenas.",
    photo: null,
  },
  "pedro-rivadeneira-jr": {
    id: "pedro-rivadeneira-jr",
    firstName: "Pedro",
    middleName: "Carlomagno",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Antonio (Pedroncho) Rivadeneira and Lydia Cardenas.",
    photo: null,
  },
  "roberto": {
    id: "roberto",
    firstName: "Roberto",
    middleName: "Carlos",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Pedro Antonio (Pedroncho) Rivadeneira and Lydia Cardenas.",
    photo: null,
  },
  // From Pedro Antonio + Vilma Benitez
  "rosa-rivadeneira": {
    id: "rosa-rivadeneira",
    firstName: "Rosa",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Pedro Antonio (Pedroncho) Rivadeneira and Vilma Benitez.",
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
    bio: "Daughter of Elizabeth (Chela) and Mr. Cespedes.",
    photo: null,
  },
  "john-cespedes": {
    id: "john-cespedes",
    firstName: "John",
    lastName: "Cespedes",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Elizabeth (Chela) and Mr. Cespedes.",
    photo: null,
  },
  "jose-cespedes": {
    id: "jose-cespedes",
    firstName: "Jose",
    nickname: "Joselo",
    lastName: "Cespedes Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Elizabeth (Chela) and Mr. Cespedes. Known as Joselo.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — JORGE SR.'S CHILDREN
  // ============================================================
  // From Jorge Sr. + Aracely Diaz
  "jorge-rivadeneira-jr": {
    id: "jorge-rivadeneira-jr",
    firstName: "Jorge",
    middleName: "Kennet",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Jorge (Lucho) Rivadeneira Sr. and Aracely Diaz. Half-sibling to Steven and Karina.",
    photo: null,
  },
  "ivette-rivadeneira": {
    id: "ivette-rivadeneira",
    firstName: "Ivette",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Jorge (Lucho) Rivadeneira Sr. and Aracely Diaz. Half-sibling to Steven and Karina. Married Randy Uetz. Mother of Gabriel and Grace.",
    photo: null,
  },
  "randy-uetz": {
    id: "randy-uetz",
    firstName: "Randy",
    lastName: "Uetz",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Husband of Ivette Rivadeneira. Father of Gabriel and Grace.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — NINO'S GRANDCHILDREN (MARY + JUAN FLORES)
  // ============================================================
  "giancarlo-flores": {
    id: "giancarlo-flores",
    firstName: "GianCarlo",
    nickname: "Gianni",
    lastName: "Flores Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Mary (Cape) Rivadeneira Monge and Juan Flores. Known as Gianni.",
    photo: null,
  },
  "danny-flores": {
    id: "danny-flores",
    firstName: "Danny",
    lastName: "Flores",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Mary (Cape) Rivadeneira Monge and Juan Flores.",
    photo: null,
  },

  // ============================================================
  // GENERATION 3 — ANDREA'S GRANDCHILDREN (ROSA + SEBASTIAN)
  // ============================================================
  "carmen": {
    id: "carmen",
    firstName: "Carmen",
    lastName: "",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Rosa (Andrea's daughter) and Sebastian.",
    photo: null,
  },
  "alex": {
    id: "alex",
    firstName: "Alex",
    lastName: "",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Rosa (Andrea's daughter) and Sebastian.",
    photo: null,
  },

  // ============================================================
  // GENERATION 4 — IVETTE + RANDY'S CHILDREN
  // ============================================================
  "gabriel-uetz": {
    id: "gabriel-uetz",
    firstName: "Gabriel",
    lastName: "Uetz",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Ivette Rivadeneira and Randy Uetz.",
    photo: null,
  },
  "grace-uetz": {
    id: "grace-uetz",
    firstName: "Grace",
    lastName: "Uetz",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Ivette Rivadeneira and Randy Uetz.",
    photo: null,
  },

  // ============================================================
  // GENERATION 4 — CESAR'S & MIGUEL'S CHILDREN
  // ============================================================
  "jeremiah": {
    id: "jeremiah",
    firstName: "Jeremiah",
    lastName: "Rivadeneira",
    gender: "male",
    birthYear: null,
    deathYear: null,
    bio: "Son of Cesar Rivadeneira.",
    photo: null,
  },
  "mia": {
    id: "mia",
    firstName: "Mia",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Miguel Rivadeneira.",
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
    bio: "Son of Jorge (Lucho) Rivadeneira Sr. and Enma Flores. Full sibling to Karina. Half-sibling to Jorge Jr. and Ivette.",
    photo: null,
  },
  "karina-rivadeneira": {
    id: "karina-rivadeneira",
    firstName: "Karina",
    middleName: "Victoria",
    lastName: "Rivadeneira",
    gender: "female",
    birthYear: null,
    deathYear: null,
    bio: "Daughter of Jorge (Lucho) Rivadeneira Sr. and Enma Flores. Full sibling to Steven. Half-sibling to Jorge Jr. and Ivette.",
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

  // === Amaro (Mayo)'s family ===
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
    children: ["jorge-rivadeneira-sr", "beto-rivadeneira", "guillermo-rivadeneira"],
  },

  // === Nino's family ===
  "union-nino-dora": {
    id: "union-nino-dora",
    partner1: "nino-rivadeneira",
    partner2: "dora-monge",
    children: ["mary-nino", "jorge-nino", "victor-nino", "ita-rivadeneira"],
  },

  // === Andrea's family ===
  "union-andrea": {
    id: "union-andrea",
    partner1: "andrea-rivadeneira",
    partner2: "unknown-andrea-spouse",
    children: ["rosa-andrea", "emelina", "pepe"],
  },

  // === Ernestina's family ===
  "union-ernestina": {
    id: "union-ernestina",
    partner1: "ernestina-osorio",
    partner2: "unknown-ernestina-spouse",
    children: ["aurelio", "manuel-ernestina", "esperanza"],
  },

  // === Casimira's family ===
  "union-casamira": {
    id: "union-casamira",
    partner1: "casamira-osorio",
    partner2: "unknown-casamira-spouse",
    children: ["violeta", "santos", "fidel"],
  },

  // === Pedro (grandfather) + Maria (first wife) ===
  "union-pedro-maria": {
    id: "union-pedro-maria",
    partner1: "pedro-osorio",
    partner2: "maria-pedro-wife1",
    children: [
      "luisa-rivadeneira",
      "balvina-rivadeneira",
      "rosario-rivadeneira",
      "ines-rivadeneira",
      "walter-rivadeneira",
      "raul-rivadeneira",
    ],
  },

  // === Rosa Lizarraga's first marriage (in the jungle) ===
  "union-rosa-first": {
    id: "union-rosa-first",
    partner1: "unknown-rosa-first-husband",
    partner2: "rosa-lizarraga",
    children: ["emnida-rivadeneira"],
  },

  // === Pedro (grandfather) + Rosa Lizarraga ===
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

  // === Pedro Antonio (Pedroncho) Rivadeneira's families ===
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

  // === Elizabeth (Chela)'s family ===
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

  // === Ivette + Randy ===
  "union-ivette-randy": {
    id: "union-ivette-randy",
    partner1: "ivette-rivadeneira",
    partner2: "randy-uetz",
    children: ["gabriel-uetz", "grace-uetz"],
  },

  // === Enma + Luis (no children) ===
  "union-enma-luis": {
    id: "union-enma-luis",
    partner1: "enma-flores",
    partner2: "luis-flores",
    children: [],
  },

  // === Mary (Cape) + Juan Flores ===
  "union-mary-juan": {
    id: "union-mary-juan",
    partner1: "mary-nino",
    partner2: "juan-flores",
    children: ["giancarlo-flores", "danny-flores"],
  },

  // === Rosa (Andrea's daughter) + Sebastian ===
  "union-rosa-andrea-sebastian": {
    id: "union-rosa-andrea-sebastian",
    partner1: "rosa-andrea",
    partner2: "sebastian",
    children: ["carmen", "alex"],
  },

  // === Cesar's family ===
  "union-cesar": {
    id: "union-cesar",
    partner1: "cesar",
    partner2: "unknown-cesar-spouse",
    children: ["jeremiah"],
  },

  // === Miguel's family ===
  "union-miguel": {
    id: "union-miguel",
    partner1: "miguel",
    partner2: "unknown-miguel-spouse",
    children: ["mia"],
  },
};

// === HELPER FUNCTIONS ===

/** Get a person by ID */
export function getPerson(id) {
  return people[id] || null;
}

/** Get full name (includes middle name if present) */
export function getFullName(personId) {
  const p = people[personId];
  if (!p) return "Unknown";
  let name = p.firstName;
  if (p.middleName) name += ` ${p.middleName}`;
  if (p.lastName) name += ` ${p.lastName}`;
  return name.trim();
}

/** Get display name (first name with nickname in parentheses + last name) */
export function getDisplayName(personId) {
  const p = people[personId];
  if (!p) return "Unknown";
  let name = p.firstName;
  if (p.nickname) name += ` "${p.nickname}"`;
  if (p.lastName) name += ` ${p.lastName}`;
  return name.trim();
}

/** Get short name (nickname or first name + last name) */
export function getShortName(personId) {
  const p = people[personId];
  if (!p) return "Unknown";
  const first = p.nickname || p.firstName;
  if (p.lastName) return `${first} ${p.lastName}`;
  return first;
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

  const allParentIds = new Set();
  parentUnionsList.forEach((u) => {
    allParentIds.add(u.partner1);
    allParentIds.add(u.partner2);
  });

  const relatedUnions = Object.values(unions).filter(
    (u) => allParentIds.has(u.partner1) || allParentIds.has(u.partner2)
  );

  relatedUnions.forEach((u) => {
    u.children.forEach((childId) => {
      if (childId === personId) return;
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
