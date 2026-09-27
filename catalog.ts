export type HazardId =
  | "fire"
  | "heat"
  | "arc"
  | "shock"
  | "water"
  | "humidity"
  | "impact"
  | "cut"
  | "chemical"
  | "dust"
  | "ballistic"
  | "cold"
  | "uv"
  | "bio";

export type LayerRole = "outer" | "mid" | "inner" | "insert" | "accessory";

export type GarmentCategory =
  | "torso"
  | "legs"
  | "hands"
  | "head"
  | "feet"
  | "face"
  | "full"
  | "carry";

export interface Hazard {
  id: HazardId;
  name: string;
  short: string;
  group: "thermique" | "electrique" | "fluide" | "mecanique" | "environnement";
  summary: string;
  whatItIs: string;
  whatItIsNot: string;
  standards: string[];
}

export interface Material {
  id: string;
  name: string;
  family: string;
  origin: "nievlar" | "arachnid" | "industriel";
  summary: string;
  composition: string;
  protections: Partial<Record<HazardId, number>>;
  melts: boolean;
  conductive: boolean;
  hydrophilic: boolean;
  notes: string;
  pairing: string;
}

export interface StackLayer {
  role: LayerRole;
  materialId: string;
  roleLabel: string;
  function: string;
}

export interface Garment {
  id: string;
  sku: string;
  name: string;
  category: GarmentCategory;
  image: string;
  summary: string;
  materials: string[];
  hazards: HazardId[];
  layers: StackLayer[];
}

export interface Ensemble {
  id: string;
  name: string;
  code: string;
  tagline: string;
  use: string;
  hazards: HazardId[];
  garments: string[];
  stack: StackLayer[];
  standards: string[];
  notes: string;
}

export const HAZARDS: Hazard[] = [
  {
    id: "fire",
    name: "Feu / flammes",
    short: "Feu",
    group: "thermique",
    summary: "Inflammation, flash fire, projection de flammes.",
    whatItIs: "Fibres qui carbonisent sans fondre (aramide, PBI, basalte).",
    whatItIsNot: "Un TPU ou un polyester fond et colle à la peau.",
    standards: ["EN ISO 11612", "NFPA 2112", "NFPA 1971"],
  },
  {
    id: "heat",
    name: "Chaleur de contact",
    short: "Chaleur",
    group: "thermique",
    summary: "Contact, convection, chaleur radiante, métal en fusion.",
    whatItIs: "Couche réfractaire (basalte, aluminisé, cuir, PBI).",
    whatItIsNot: "Un simple t-shirt FR ne tient pas un contact 500 °C.",
    standards: ["EN ISO 11612", "EN 407", "EN ISO 9185"],
  },
  {
    id: "arc",
    name: "Flash d’arc",
    short: "Arc",
    group: "electrique",
    summary: "Explosion thermique d’un arc (cal/cm²), pas le choc.",
    whatItIs: "Vêtement ATPV / ELIM, cagoule et visière d’arc.",
    whatItIsNot: "L’anti-arc n’isole pas du courant. C’est thermique.",
    standards: ["IEC 61482-2", "NFPA 70E", "ASTM F1506"],
  },
  {
    id: "shock",
    name: "Choc électrique",
    short: "Choc",
    group: "electrique",
    summary: "Isolation diélectrique : gants classe, bottes, tapis.",
    whatItIs: "Caoutchouc diélectrique sec, sans carbone ni métal.",
    whatItIsNot: "Un coverall FR ne remplace jamais des gants classe 2.",
    standards: ["IEC 60903", "ASTM D120", "ASTM F1116"],
  },
  {
    id: "water",
    name: "Eau / pluie",
    short: "Eau",
    group: "fluide",
    summary: "Pluie, projection, immersion limitée.",
    whatItIs: "Membrane ePTFE ou enduction TPU + coutures scellées.",
    whatItIsNot: "L’aramide nu est hydrophile : il s’imbibe.",
    standards: ["EN 343", "EN 13034"],
  },
  {
    id: "humidity",
    name: "Humidité / vapeur",
    short: "Humidité",
    group: "fluide",
    summary: "Transpiration, buée, vapeur. Respirabilité (MVTR).",
    whatItIs: "Mesh 3D + membrane microporeuse + évacuation.",
    whatItIsNot: "Un plastifié étanche sans MVTR crée un coup de chaleur.",
    standards: ["EN 343 classe rétention", "ISO 11092"],
  },
  {
    id: "impact",
    name: "Impact / choc",
    short: "Impact",
    group: "mecanique",
    summary: "Chute d’objet, collision, dissipation d’énergie.",
    whatItIs: "Coque + mousse + fibre à haute ténacité (Nievlar, carbone).",
    whatItIsNot: "Une plaque rigide sans liner transfert le choc.",
    standards: ["EN 1621", "EN 397", "EN 12492"],
  },
  {
    id: "cut",
    name: "Coupure / perforation",
    short: "Coupe",
    group: "mecanique",
    summary: "Lame, tôle, verre, piqûre.",
    whatItIs: "Para-aramide, UHMWPE, basalte, maille.",
    whatItIsNot: "Le cuir seul n’atteint pas EN 388 niveau D–F.",
    standards: ["EN 388", "ISO 13997", "EN 1082"],
  },
  {
    id: "chemical",
    name: "Chimique",
    short: "Chimique",
    group: "fluide",
    summary: "Acides, bases, hydrocarbures, éclaboussures.",
    whatItIs: "Film barrière (butyl, viton, laminé) selon le produit.",
    whatItIsNot: "Un TPU générique n’est pas une combinaison Type 3.",
    standards: ["EN 13034", "EN 14605", "EN ISO 6529"],
  },
  {
    id: "dust",
    name: "Poussières",
    short: "Poussière",
    group: "environnement",
    summary: "Silice, fibres, basalte broyé, particules.",
    whatItIs: "Type 5 + filtration respiratoire (le textile ne suffit pas).",
    whatItIsNot: "Un hoodie Nievlar n’est pas un P3.",
    standards: ["EN ISO 13982", "EN 149"],
  },
  {
    id: "ballistic",
    name: "Balistique",
    short: "Balistique",
    group: "mecanique",
    summary: "Projectile, fragmentation, stab.",
    whatItIs: "Nievlar / aramide / UHMWPE + plaque si niveau élevé.",
    whatItIsNot: "Un insert genou n’est pas un NIJ IIIA.",
    standards: ["NIJ 0101", "NIJ 0115", "VPAM"],
  },
  {
    id: "cold",
    name: "Froid",
    short: "Froid",
    group: "thermique",
    summary: "Convectif, contact, Québec / chantier hivernal.",
    whatItIs: "Isolation + coupe-vent + FR si zone ATEX.",
    whatItIsNot: "Un duvet fondant en zone flash-fire.",
    standards: ["EN 342", "EN 511"],
  },
  {
    id: "uv",
    name: "UV / intempéries",
    short: "UV",
    group: "environnement",
    summary: "Soleil, haute visibilité, vieillissement.",
    whatItIs: "Pigments stables, haute-vis EN 20471, anti-UV.",
    whatItIsNot: "L’orange décoratif n’est pas de la haute-vis certifiée.",
    standards: ["EN ISO 20471", "EN 13758"],
  },
  {
    id: "bio",
    name: "Biologique",
    short: "Bio",
    group: "fluide",
    summary: "Fluides, pathogènes, spray.",
    whatItIs: "Barrière EN 14126 + joints.",
    whatItIsNot: "Un softshell sport n’est pas un Type 4B.",
    standards: ["EN 14126", "ISO 16604"],
  },
];

export const MATERIALS: Material[] = [
  {
    id: "nievlar",
    name: "Nievlar™ₙᵢ",
    family: "Para-aramide coordiné Ni²⁺",
    origin: "nievlar",
    summary:
      "Fibre propriétaire ArachNiD : analog para-aramide, liaisons hydrogène renforcées, ténacité élevée, ne fond pas.",
    composition: "Aramide ~65 % · TPU NiPura ~20 % · CNT 0,5–1 % · couplage silane",
    protections: {
      fire: 92,
      heat: 78,
      arc: 88,
      shock: 22,
      water: 35,
      humidity: 40,
      impact: 86,
      cut: 94,
      chemical: 48,
      dust: 30,
      ballistic: 90,
      cold: 42,
      uv: 55,
      bio: 28,
    },
    melts: false,
    conductive: false,
    hydrophilic: true,
    notes:
      "Excellente âme Security. Hydrophile : toujours coupler à une membrane si l’eau est un risque. Les CNT restent sous le seuil de percolation pour ne pas former de chemin conducteur.",
    pairing: "Membrane ePTFE à l’extérieur, mesh TPU à l’intérieur.",
  },
  {
    id: "arachnid",
    name: "ArachNiD S³",
    family: "Fibre biomimétique toile d’araignée",
    origin: "arachnid",
    summary:
      "Couche Sports / Style / Security : élasticité, abrasion, soft-touch, hash de lot dans le fil.",
    composition: "TPU/TPC 55 % · micro-fibrilles Nievlar 25 % · silicone 12 % · style/UV 8 %",
    protections: {
      fire: 38,
      heat: 32,
      arc: 28,
      shock: 18,
      water: 72,
      humidity: 80,
      impact: 64,
      cut: 58,
      chemical: 44,
      dust: 50,
      ballistic: 40,
      cold: 55,
      uv: 70,
      bio: 36,
    },
    melts: true,
    conductive: false,
    hydrophilic: false,
    notes:
      "Peut fondre. Jamais en couche externe d’un kit feu/arc. Parfaite en shell sport ou en liner souple hors thermique.",
    pairing: "Nievlar en âme, ArachNiD en face visible hors flash-fire.",
  },
  {
    id: "kevlar",
    name: "Para-aramide",
    family: "Kevlar-type / Twaron-type",
    origin: "industriel",
    summary: "Référence industrielle : coupe, balistique, chaleur. Ne fond pas.",
    composition: "Poly(p-phénylène téréphtalamide)",
    protections: {
      fire: 88,
      heat: 74,
      arc: 82,
      shock: 20,
      water: 22,
      humidity: 28,
      impact: 70,
      cut: 92,
      chemical: 40,
      dust: 24,
      ballistic: 88,
      cold: 38,
      uv: 35,
      bio: 22,
    },
    melts: false,
    conductive: false,
    hydrophilic: true,
    notes: "Se dégrade aux UV et s’imbibe. Toujours gainer.",
    pairing: "ePTFE + anti-UV, ou Nievlar en successeur.",
  },
  {
    id: "nomex",
    name: "Méta-aramide",
    family: "Nomex-type",
    origin: "industriel",
    summary: "Fibre FR de référence pour flash-fire et arc. Confortable, ne fond pas.",
    composition: "Poly(m-phénylène isophtalamide)",
    protections: {
      fire: 94,
      heat: 70,
      arc: 92,
      shock: 24,
      water: 30,
      humidity: 48,
      impact: 42,
      cut: 45,
      chemical: 42,
      dust: 28,
      ballistic: 30,
      cold: 40,
      uv: 50,
      bio: 26,
    },
    melts: false,
    conductive: false,
    hydrophilic: true,
    notes: "Moins tenace que le para-aramide. Idéal chemise/pantalon CAT 2.",
    pairing: "Nievlar aux zones d’abrasion, méta-aramide au corps.",
  },
  {
    id: "basalt",
    name: "Fibre de basalte",
    family: "Volcanique minérale",
    origin: "industriel",
    summary:
      "Filée depuis la roche. Incombustible, isolante électrique, bonne tenue chimique.",
    composition: "SiO₂ · Al₂O₃ · FeO · CaO — fibre continue",
    protections: {
      fire: 96,
      heat: 92,
      arc: 70,
      shock: 74,
      water: 50,
      humidity: 42,
      impact: 58,
      cut: 72,
      chemical: 68,
      dust: 20,
      ballistic: 48,
      cold: 46,
      uv: 80,
      bio: 30,
    },
    melts: false,
    conductive: false,
    hydrophilic: false,
    notes:
      "La poussière de basalte (usinage) est un risque respiratoire — d’où le hazard Poussières. En fibre continue dans le textile, c’est un atout feu + diélectrique.",
    pairing: "Inserts thermiques et sous-couche diélectrique, pas en contact peau.",
  },
  {
    id: "carbon",
    name: "Carbone / CNT",
    family: "Graphite · nanotubes · CFRP",
    origin: "industriel",
    summary: "Raideur, impact, dissipation thermique. Conducteur électrique.",
    composition: "Fibre carbone et/ou nanotubes 0,5–1 %",
    protections: {
      fire: 60,
      heat: 72,
      arc: 25,
      shock: 4,
      water: 40,
      humidity: 38,
      impact: 90,
      cut: 62,
      chemical: 50,
      dust: 22,
      ballistic: 70,
      cold: 44,
      uv: 65,
      bio: 24,
    },
    melts: false,
    conductive: true,
    hydrophilic: false,
    notes:
      "Interdit dans la chaîne d’isolation électrique. Utile en casque, plaque, exosquelette.",
    pairing: "Toujours isolé du corps et des gants classe.",
  },
  {
    id: "tpu",
    name: "Polyélastomère TPU/TPC",
    family: "Thermoplastique élastomère",
    origin: "industriel",
    summary: "Eau, souplesse, abrasion, dépôt pulsé. Fond sous chaleur.",
    composition: "Polyol + diisocyanate + chain extender (PTMEG/MDI)",
    protections: {
      fire: 12,
      heat: 18,
      arc: 8,
      shock: 40,
      water: 88,
      humidity: 70,
      impact: 55,
      cut: 35,
      chemical: 52,
      dust: 48,
      ballistic: 18,
      cold: 50,
      uv: 45,
      bio: 42,
    },
    melts: true,
    conductive: false,
    hydrophilic: false,
    notes: "Jamais en face feu/arc. Excellent liner et membrane souple.",
    pairing: "Sous Nievlar, jamais dessus en thermique.",
  },
  {
    id: "ptfe",
    name: "Membrane ePTFE",
    family: "Barrière microporeuse",
    origin: "industriel",
    summary: "Coupe l’eau liquide, laisse passer la vapeur. Inerte chimiquement.",
    composition: "Polytétrafluoroéthylène expansé",
    protections: {
      fire: 20,
      heat: 28,
      arc: 10,
      shock: 50,
      water: 96,
      humidity: 90,
      impact: 10,
      cut: 8,
      chemical: 78,
      dust: 82,
      ballistic: 6,
      cold: 40,
      uv: 55,
      bio: 80,
    },
    melts: true,
    conductive: false,
    hydrophilic: false,
    notes: "Membrane, pas structure. Seul elle ne protège de rien de mécanique.",
    pairing: "Sandwich Nievlar / ePTFE / mesh.",
  },
  {
    id: "rubber",
    name: "Caoutchouc diélectrique",
    family: "EPDM / latex isolant",
    origin: "industriel",
    summary: "Seule vraie barrière au choc électrique (gants, manchons, bottes).",
    composition: "Élastomère isolant classé 00 à 4",
    protections: {
      fire: 15,
      heat: 22,
      arc: 18,
      shock: 98,
      water: 70,
      humidity: 35,
      impact: 30,
      cut: 12,
      chemical: 40,
      dust: 20,
      ballistic: 8,
      cold: 28,
      uv: 25,
      bio: 30,
    },
    melts: true,
    conductive: false,
    hydrophilic: false,
    notes:
      "Doit rester sec et intact. Toujours un gant cuir/Nievlar par-dessus (protecteur mécanique).",
    pairing: "Classe + protecteur Nievlar. Jamais carbone.",
  },
  {
    id: "uhmwpe",
    name: "UHMWPE",
    family: "Dyneema-type",
    origin: "industriel",
    summary: "Très léger, coupe et balistique. Fond. Mauvais en feu.",
    composition: "Polyéthylène ultra-haut poids moléculaire",
    protections: {
      fire: 8,
      heat: 12,
      arc: 6,
      shock: 30,
      water: 55,
      humidity: 50,
      impact: 68,
      cut: 96,
      chemical: 45,
      dust: 25,
      ballistic: 92,
      cold: 60,
      uv: 40,
      bio: 28,
    },
    melts: true,
    conductive: false,
    hydrophilic: false,
    notes: "Incompatible flash-fire. Excellent gant de coupe hors thermique.",
    pairing: "Hors kits feu. Ou sous Nievlar si on accepte le risque de fusion interne.",
  },
  {
    id: "pbi",
    name: "PBI / haute température",
    family: "Polybenzimidazole",
    origin: "industriel",
    summary: "Extrême feu (intervention, fonderie). Ne fond pas, tient > 600 °C.",
    composition: "Polybenzimidazole + aramide",
    protections: {
      fire: 98,
      heat: 96,
      arc: 90,
      shock: 20,
      water: 40,
      humidity: 45,
      impact: 55,
      cut: 60,
      chemical: 58,
      dust: 30,
      ballistic: 42,
      cold: 35,
      uv: 60,
      bio: 32,
    },
    melts: false,
    conductive: false,
    hydrophilic: true,
    notes: "Coût élevé. Réservé aux kits structure / fonderie.",
    pairing: "Moisture barrier + liner thermique.",
  },
  {
    id: "ceramic",
    name: "Céramique / plaque",
    family: "Oxyde · carbure",
    origin: "industriel",
    summary: "Plaque dure : balistique élevé, impact ponctuel.",
    composition: "Alumine, SiC, ou céramique composite",
    protections: {
      fire: 70,
      heat: 80,
      arc: 40,
      shock: 10,
      water: 20,
      humidity: 15,
      impact: 88,
      cut: 80,
      chemical: 60,
      dust: 10,
      ballistic: 98,
      cold: 30,
      uv: 70,
      bio: 20,
    },
    melts: false,
    conductive: false,
    hydrophilic: false,
    notes: "Lourd. Toujours un backing fibre (Nievlar) pour rattraper les éclats.",
    pairing: "Plaque + Nievlar backing.",
  },
];

const L = (
  role: LayerRole,
  materialId: string,
  roleLabel: string,
  fn: string,
): StackLayer => ({ role, materialId, roleLabel, function: fn });

export const GARMENTS: Garment[] = [
  {
    id: "veste",
    sku: "S3-VST-Ni",
    name: "Veste technique",
    category: "torso",
    image: "/products/veste.jpg",
    summary: "Coquille articulée, âme Nievlar, mesh 3D aux épaules.",
    materials: ["arachnid", "nievlar", "tpu"],
    hazards: ["cut", "impact", "uv", "humidity"],
    layers: [
      L("outer", "arachnid", "Coquille", "Abrasion, style, déperlance"),
      L("mid", "nievlar", "Âme", "Coupe, impact, feu limité"),
      L("inner", "tpu", "Mesh", "Ventilation épaules"),
    ],
  },
  {
    id: "combinaison",
    sku: "S3-CVR-Ni",
    name: "Combinaison intégrale",
    category: "full",
    image: "/products/combinaison.jpg",
    summary: "Une pièce FR pour multi-risque atelier / énergie.",
    materials: ["nomex", "nievlar", "ptfe"],
    hazards: ["fire", "arc", "cut", "uv"],
    layers: [
      L("outer", "nomex", "FR", "Flash-fire et arc"),
      L("mid", "nievlar", "Renfort", "Genoux, coudes, poignets"),
      L("insert", "ptfe", "Barrière", "Option eau / poussière"),
    ],
  },
  {
    id: "pantalon",
    sku: "S3-PNT-Ni",
    name: "Pantalon technique",
    category: "legs",
    image: "/products/pantalon.jpg",
    summary: "Genoux Nievlar, cargo mesh, coupe articulée.",
    materials: ["arachnid", "nievlar"],
    hazards: ["cut", "impact", "uv"],
    layers: [
      L("outer", "arachnid", "Face", "Style et abrasion"),
      L("insert", "nievlar", "Genoux", "Impact et coupe"),
    ],
  },
  {
    id: "gants",
    sku: "S3-GLV-Ni",
    name: "Gant mécanique",
    category: "hands",
    image: "/products/gants.jpg",
    summary: "Paume TPU micro-pointes, dos Nievlar, exosquelette optionnel.",
    materials: ["nievlar", "tpu", "carbon"],
    hazards: ["cut", "impact"],
    layers: [
      L("outer", "tpu", "Paume", "Grip fractal"),
      L("mid", "nievlar", "Dos", "Coupe"),
      L("insert", "carbon", "Phalanges", "Impact — hors kit choc électrique"),
    ],
  },
  {
    id: "casque",
    sku: "S3-HLM-Ni",
    name: "Casque",
    category: "head",
    image: "/products/casque.jpg",
    summary: "Coque carbone/Nievlar, liner à dissipation, visière optionnelle.",
    materials: ["carbon", "nievlar"],
    hazards: ["impact", "uv"],
    layers: [
      L("outer", "carbon", "Coque", "Répartition d’impact"),
      L("mid", "nievlar", "Insert", "Éclats et coupe"),
    ],
  },
  {
    id: "visiere",
    sku: "S3-FSH-Ni",
    name: "Visière / FaceShield",
    category: "face",
    image: "/products/visiere.jpg",
    summary: "Écran facial arc ou impact, monture nickel.",
    materials: ["nievlar"],
    hazards: ["arc", "impact", "chemical"],
    layers: [L("outer", "nievlar", "Monture", "Tenue et étanchéité partielle")],
  },
  {
    id: "cagoule",
    sku: "S3-BLK-Ni",
    name: "Cagoule",
    category: "head",
    image: "/products/cagoule.jpg",
    summary: "Soft-shell, zip Nievlar, version arc en méta-aramide.",
    materials: ["arachnid", "nomex", "nievlar"],
    hazards: ["arc", "fire", "cold"],
    layers: [
      L("outer", "nomex", "FR", "Tête et cou"),
      L("mid", "nievlar", "Zip", "Fermeture haute ténacité"),
    ],
  },
  {
    id: "bottines",
    sku: "S3-BOT-Ni",
    name: "Bottine",
    category: "feet",
    image: "/products/bottines.jpg",
    summary: "Tige Nievlar, semelle TPU, version diélectrique sans carbone.",
    materials: ["nievlar", "tpu", "rubber"],
    hazards: ["impact", "cut", "shock", "water"],
    layers: [
      L("outer", "nievlar", "Tige", "Coupe et abrasion"),
      L("mid", "rubber", "Semelle", "Option classe diélectrique"),
      L("inner", "tpu", "Crampons", "Adhérence"),
    ],
  },
  {
    id: "harnais",
    sku: "S3-HNS-Ni",
    name: "Harnais",
    category: "torso",
    image: "/products/harnais.jpg",
    summary: "Sangles ArachNiD, boucles scellées Nievlar.",
    materials: ["arachnid", "nievlar"],
    hazards: ["impact"],
    layers: [L("outer", "nievlar", "Sangles", "Rupture et abrasion")],
  },
  {
    id: "sac",
    sku: "S3-PCK-Ni",
    name: "Sac tactique",
    category: "carry",
    image: "/products/sac.jpg",
    summary: "Panneaux Nievlar, dos mesh, nœuds de renfort.",
    materials: ["nievlar", "arachnid", "carbon"],
    hazards: ["cut", "water", "impact"],
    layers: [
      L("outer", "nievlar", "Panneau", "Coupe et déchirure"),
      L("inner", "arachnid", "Dos", "Confort"),
    ],
  },
  {
    id: "tablier",
    sku: "S3-APR-Ni",
    name: "Tablier",
    category: "torso",
    image: "/products/veste.jpg",
    summary: "Poche géodésique, Nievlar étanche, sangles élastiques.",
    materials: ["nievlar", "tpu", "ptfe"],
    hazards: ["cut", "heat", "water", "chemical"],
    layers: [
      L("outer", "nievlar", "Corps", "Coupe et chaleur 150 °C"),
      L("insert", "ptfe", "Poche", "Étanchéité"),
    ],
  },
  {
    id: "manches",
    sku: "S3-SLV-Ni",
    name: "Manches diélectriques",
    category: "hands",
    image: "/products/gants.jpg",
    summary: "Manchons classe, à porter sous le protecteur Nievlar.",
    materials: ["rubber", "nievlar"],
    hazards: ["shock"],
    layers: [
      L("inner", "rubber", "Isolant", "Classe 0–4"),
      L("outer", "nievlar", "Protecteur", "Mécanique"),
    ],
  },
];

export const ENSEMBLES: Ensemble[] = [
  {
    id: "s3-total",
    name: "S³ Multi-risque",
    code: "ENS-S3-TOTAL",
    tagline: "La pile ArachNiD : feu, coupe, impact, eau — choc en accessoire.",
    use: "Atelier énergie, maintenance lourde, terrain mixte.",
    hazards: ["fire", "cut", "impact", "water", "humidity", "uv"],
    garments: ["veste", "pantalon", "gants", "casque", "bottines", "cagoule"],
    stack: [
      L("outer", "ptfe", "Membrane", "Eau et poussières, coutures scellées"),
      L("mid", "nievlar", "Âme", "Feu, coupe, impact, ne fond pas"),
      L("inner", "tpu", "Confort", "Mesh 3D, MVTR"),
      L("accessory", "rubber", "Option choc", "Gants classe si tension présente"),
    ],
    standards: ["EN ISO 11612", "EN 388", "EN 343", "EN 1621"],
    notes:
      "Pile canonique Nievlar. Le TPU n’est jamais exposé au flash. Carbone uniquement en casque, isolé.",
  },
  {
    id: "arc-cat2",
    name: "Arc CAT 2",
    code: "ENS-ARC-2",
    tagline: "Thermique d’arc ~8 cal/cm². Ne protège pas du choc.",
    use: "Tableau basse tension, armoires, consignation.",
    hazards: ["arc", "fire"],
    garments: ["combinaison", "cagoule", "visiere", "gants"],
    stack: [
      L("outer", "nomex", "FR", "Chemise/coverall ATPV"),
      L("mid", "nievlar", "Renfort", "Poignets et genoux"),
      L("accessory", "nomex", "Tête", "Cagoule + visière d’arc"),
    ],
    standards: ["IEC 61482-2", "NFPA 70E CAT 2", "ASTM F1506"],
    notes: "Fibres fondantes interdites en face. Ajouter kit choc si travail sous tension.",
  },
  {
    id: "arc-cat4",
    name: "Arc CAT 4",
    code: "ENS-ARC-4",
    tagline: "Switching lourd, ~40 cal. Switching suit + capuche.",
    use: "Cellules MT, manœuvre, sous-station.",
    hazards: ["arc", "fire", "heat"],
    garments: ["combinaison", "cagoule", "visiere", "gants", "bottines"],
    stack: [
      L("outer", "nomex", "Switching", "Multicouche ATPV élevé"),
      L("mid", "nievlar", "Âme", "Intégrité après arc"),
      L("insert", "basalt", "Thermique", "Radiante"),
    ],
    standards: ["IEC 61482-2", "NFPA 70E CAT 4"],
    notes: "Ensemble dédié. Pas un hoodie S³ par-dessus un jean.",
  },
  {
    id: "dielectric",
    name: "Lignard diélectrique",
    code: "ENS-DIEL",
    tagline: "Choc électrique : isolation vraie, carbone interdit.",
    use: "Lignes, postes, interventions sous tension.",
    hazards: ["shock", "arc", "cut"],
    garments: ["manches", "gants", "bottines", "combinaison", "visiere"],
    stack: [
      L("accessory", "rubber", "Gants classe", "00 à 4 selon tension"),
      L("outer", "nievlar", "Protecteur", "Cuir/Nievlar par-dessus le latex"),
      L("mid", "nomex", "Corps FR", "Arc + flash"),
      L("inner", "basalt", "Semelle", "Botte diélectrique, sans acier conducteur"),
    ],
    standards: ["IEC 60903", "ASTM D120", "IEC 61482-2"],
    notes:
      "Le vêtement FR n’est pas l’isolant. Gants inspectés, secs, jamais retournés. Zéro fibre carbone dans la chaîne.",
  },
  {
    id: "structure-fire",
    name: "Feu structure",
    code: "ENS-FIRE-S",
    tagline: "Intervention : PBI + barrière humide + liner.",
    use: "Incendie bâtiment, sauvetage.",
    hazards: ["fire", "heat", "water", "humidity", "impact"],
    garments: ["combinaison", "casque", "cagoule", "gants", "bottines"],
    stack: [
      L("outer", "pbi", "Coquille", "Flammes et radiant"),
      L("mid", "ptfe", "Moisture barrier", "Vapeur et eau"),
      L("inner", "nomex", "Liner", "Isolation thermique"),
      L("insert", "nievlar", "Renfort", "Abrasion épaules / genoux"),
    ],
    standards: ["NFPA 1971", "EN 469"],
    notes: "Le plus lourd. Respiration contrainte — rotation d’équipe obligatoire.",
  },
  {
    id: "wildland",
    name: "Feu de forêt",
    code: "ENS-FIRE-W",
    tagline: "Léger, respirant, FR. Pas un turnout.",
    use: "Ligne de feu, débroussaillage.",
    hazards: ["fire", "heat", "uv", "humidity"],
    garments: ["combinaison", "cagoule", "gants", "bottines"],
    stack: [
      L("outer", "nomex", "Chemise FR", "Flash et braises"),
      L("inner", "arachnid", "Confort", "MVTR, poids"),
    ],
    standards: ["NFPA 1977", "EN ISO 15384"],
    notes: "L’eau (hydration) est un risque opérationnel, pas un hazard textile primaire.",
  },
  {
    id: "foundry",
    name: "Fonderie / métal",
    code: "ENS-HEAT-M",
    tagline: "Projections fondues, radiant, contact.",
    use: "Coulée, soudage lourd, aciérie.",
    hazards: ["heat", "fire", "impact", "cut"],
    garments: ["tablier", "gants", "visiere", "pantalon", "cagoule"],
    stack: [
      L("outer", "pbi", "Aluminisé / PBI", "Radiant"),
      L("mid", "basalt", "Réfractaire", "Contact et splashes"),
      L("inner", "nievlar", "Intégrité", "Ne fond pas si le shell cède"),
    ],
    standards: ["EN ISO 11612", "EN ISO 9185", "EN 407"],
    notes: "Les fibres fondantes (TPU, UHMWPE) sont un danger ici.",
  },
  {
    id: "weld",
    name: "Soudage",
    code: "ENS-WELD",
    tagline: "UV, projections, chaleur locale.",
    use: "Atelier soudure MIG/TIG/arc.",
    hazards: ["heat", "fire", "uv", "cut"],
    garments: ["tablier", "gants", "visiere", "cagoule"],
    stack: [
      L("outer", "nomex", "Veste FR", "Projections"),
      L("mid", "nievlar", "Tablier", "Coupe et chaleur"),
    ],
    standards: ["EN ISO 11611", "EN 407"],
    notes: "Cagoule + verre teinté. Manches longues obligatoires.",
  },
  {
    id: "wet",
    name: "Pluie / marine",
    code: "ENS-WET",
    tagline: "Étanche respirant. Aramide toujours gainé.",
    use: "Quai, chantier pluvieux, lavage.",
    hazards: ["water", "humidity", "cold", "uv"],
    garments: ["veste", "pantalon", "bottines", "sac"],
    stack: [
      L("outer", "ptfe", "Membrane", "Pluie, coutures scellées"),
      L("mid", "arachnid", "Shell", "Abrasion et stretch"),
      L("inner", "tpu", "Liner", "Confort"),
    ],
    standards: ["EN 343", "EN 342"],
    notes: "Si FR exigé (offshore), inverser : Nievlar sous la membrane, pas TPU exposé.",
  },
  {
    id: "dust-kit",
    name: "Poussières / silice",
    code: "ENS-DUST",
    tagline: "Type 5 + voies respiratoires. Le textile n’est pas un masque.",
    use: "Démolition, basalte, ciment, bois dur.",
    hazards: ["dust", "cut"],
    garments: ["combinaison", "cagoule", "gants"],
    stack: [
      L("outer", "ptfe", "Type 5", "Pénétration particulaire"),
      L("mid", "arachnid", "Intégrité", "Déchirure"),
    ],
    standards: ["EN ISO 13982", "EN 149 FFP3 / P3"],
    notes: "Ajouter un APR. Les fibres de basalte usinées = hazard respiratoire.",
  },
  {
    id: "chemical",
    name: "Éclaboussure chimique",
    code: "ENS-CHEM",
    tagline: "Barrière selon le produit — pas un générique.",
    use: "Labo, dépotage, hydrocarbures légers.",
    hazards: ["chemical", "water", "bio"],
    garments: ["combinaison", "gants", "visiere", "bottines"],
    stack: [
      L("outer", "ptfe", "Laminé", "Type 6 / 4 selon perméation"),
      L("mid", "tpu", "Souplesse", "Joints"),
    ],
    standards: ["EN 13034", "EN 14605", "EN ISO 6529"],
    notes: "Vérifier la perméation du chimique réel. Le Nievlar seul n’est pas une barrière acide.",
  },
  {
    id: "cut-shop",
    name: "Atelier coupe",
    code: "ENS-CUT",
    tagline: "Tôle, verre, lame. Maximum ténacité, minimum poids.",
    use: "Tôlerie, verre, agro couteau.",
    hazards: ["cut", "impact"],
    garments: ["gants", "tablier", "manches", "pantalon"],
    stack: [
      L("outer", "uhmwpe", "Gants", "ISO 13997 élevé, hors feu"),
      L("mid", "nievlar", "Tablier / manches", "Coupe + un peu de chaleur"),
    ],
    standards: ["EN 388", "ISO 13997"],
    notes: "Si un poste soudure est à côté, passer Nievlar et retirer l’UHMWPE.",
  },
  {
    id: "tactical-impact",
    name: "Impact tactique",
    code: "ENS-IMP",
    tagline: "Chocs, chutes, mobilité S³.",
    use: "Intervention, moto, sport extrême, chantier.",
    hazards: ["impact", "cut", "uv"],
    garments: ["veste", "pantalon", "gants", "casque", "harnais", "bottines"],
    stack: [
      L("outer", "arachnid", "Shell", "Stretch et abrasion"),
      L("mid", "nievlar", "Âme", "Déchirure et coupe"),
      L("insert", "carbon", "Coques", "Casque, genoux, phalanges"),
    ],
    standards: ["EN 1621", "EN 397", "EN 12492"],
    notes: "Carbone OK ici. Interdit dès qu’un hazard choc électrique est coché.",
  },
  {
    id: "ballistic",
    name: "Balistique souple",
    code: "ENS-BAL",
    tagline: "Nievlar empilé + plaque si le niveau monte.",
    use: "Sécurité, convoyage, sites sensibles.",
    hazards: ["ballistic", "cut", "impact"],
    garments: ["veste", "pantalon", "casque"],
    stack: [
      L("mid", "nievlar", "Soft armor", "Multiplis para-aramide"),
      L("insert", "ceramic", "Plaque", "Niveau élevé, backing Nievlar"),
      L("outer", "arachnid", "Cover", "Discret, UV"),
    ],
    standards: ["NIJ 0101", "NIJ 0115"],
    notes: "Poids et mobilité. Ce n’est pas un kit feu.",
  },
  {
    id: "oilgas-winter",
    name: "Énergie hiver",
    code: "ENS-OG-W",
    tagline: "FR + antistatique + froid québécois + haute-vis.",
    use: "Pétrole, mines, éolien, Hydro-Québec terrain.",
    hazards: ["fire", "arc", "cold", "water", "uv", "impact"],
    garments: ["veste", "pantalon", "cagoule", "gants", "bottines"],
    stack: [
      L("outer", "nomex", "FR HV", "Flash + EN 20471"),
      L("mid", "nievlar", "Renfort", "Abrasion glace / acier"),
      L("insert", "ptfe", "Coupe-vent", "Neige et pluie"),
      L("inner", "arachnid", "Isolation", "Froid, fibres non fondantes côté feu"),
    ],
    standards: ["NFPA 2112", "EN 1149", "EN 342", "EN ISO 20471", "CSA Z462"],
    notes: "Le duvet fondant est interdit. Isolation FR seulement.",
  },
  {
    id: "chainsaw",
    name: "Forestier / tronçonneuse",
    code: "ENS-SAW",
    tagline: "Fibres qui bourrent la chaîne + impact.",
    use: "Abattage, élagage.",
    hazards: ["cut", "impact", "uv"],
    garments: ["pantalon", "gants", "casque", "bottines"],
    stack: [
      L("insert", "uhmwpe", "Bourrage", "Fibres longues en pad"),
      L("mid", "nievlar", "Tenue", "Déchirure"),
      L("outer", "arachnid", "Shell", "Abrasion végétale"),
    ],
    standards: ["EN ISO 11393"],
    notes: "Le pad doit rester libre de s’étirer. Ne pas compresser sous un genou rigide mal placé.",
  },
  {
    id: "bio-kit",
    name: "Barrière biologique",
    code: "ENS-BIO",
    tagline: "Spray et fluides. Joints d’abord.",
    use: "Clinique, équarrissage, déchetterie.",
    hazards: ["bio", "chemical", "water"],
    garments: ["combinaison", "visiere", "gants", "cagoule"],
    stack: [
      L("outer", "ptfe", "Barrière", "EN 14126"),
      L("mid", "tpu", "Joints", "Poignets, chevilles"),
    ],
    standards: ["EN 14126", "ISO 16604"],
    notes: "Procédure d’habillage / déshabillage > le textile.",
  },
];

export const ROLE_ORDER: LayerRole[] = ["outer", "mid", "insert", "inner", "accessory"];

export const ROLE_LABEL: Record<LayerRole, string> = {
  outer: "Externe",
  mid: "Âme",
  insert: "Insert",
  inner: "Interne",
  accessory: "Accessoire",
};

export const GROUP_LABEL: Record<Hazard["group"], string> = {
  thermique: "Thermique",
  electrique: "Électrique",
  fluide: "Fluide / barrière",
  mecanique: "Mécanique",
  environnement: "Environnement",
};

export function materialById(id: string) {
  return MATERIALS.find((m) => m.id === id);
}

export function garmentById(id: string) {
  return GARMENTS.find((g) => g.id === id);
}

export function ensembleById(id: string) {
  return ENSEMBLES.find((e) => e.id === id);
}

export function hazardById(id: HazardId) {
  return HAZARDS.find((h) => h.id === id);
}

export const CATEGORY_LABEL: Record<GarmentCategory, string> = {
  torso: "Torse",
  legs: "Jambes",
  hands: "Mains",
  head: "Tête",
  feet: "Pieds",
  face: "Visage",
  full: "Intégral",
  carry: "Portage",
};
