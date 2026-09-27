import {
  ENSEMBLES,
  MATERIALS,
  materialById,
  type Ensemble,
  type HazardId,
  type StackLayer,
} from "@/lib/catalog";

export type Confidence = "mesure" | "plausible" | "a-verifier";

export interface Warning {
  level: "info" | "warn" | "danger";
  title: string;
  body: string;
}

export interface HazardCoverage {
  hazard: HazardId;
  score: number;
  bestMaterial: string;
}

export interface NiddleFiReport {
  nf: number;
  confidence: Confidence;
  summary: string;
  coverage: HazardCoverage[];
  warnings: Warning[];
  stack: StackLayer[];
  ranked: { ensemble: Ensemble; score: number }[];
}

const PHI = (1 + Math.sqrt(5)) / 2;

const ROLE_WEIGHT: Record<StackLayer["role"], number> = {
  outer: PHI,
  mid: 1,
  insert: 1 / PHI,
  inner: 1 / (PHI * PHI),
  accessory: 1,
};

function materialScore(materialId: string, hazard: HazardId): number {
  return materialById(materialId)?.protections[hazard] ?? 0;
}

function stackCoverage(stack: StackLayer[], hazards: HazardId[]): HazardCoverage[] {
  return hazards.map((hazard) => {
    let best = 0;
    let bestMaterial = "";
    let weighted = 0;
    let wsum = 0;
    for (const layer of stack) {
      const s = materialScore(layer.materialId, hazard);
      const w = ROLE_WEIGHT[layer.role];
      weighted += s * w;
      wsum += w;
      if (s > best) {
        best = s;
        bestMaterial = layer.materialId;
      }
    }
    const avg = wsum ? weighted / wsum : 0;
    const score = Math.round(0.65 * best + 0.35 * avg);
    return { hazard, score, bestMaterial };
  });
}

function mean(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function recommendStack(hazards: HazardId[]): StackLayer[] {
  if (!hazards.length) return [];
  const h = new Set(hazards);
  const stack: StackLayer[] = [];
  const fireLike = h.has("fire") || h.has("arc") || h.has("heat");
  const wet = h.has("water") || h.has("humidity") || h.has("bio") || h.has("chemical") || h.has("dust");
  const mech = h.has("cut") || h.has("impact") || h.has("ballistic");

  if (h.has("heat") && (h.has("fire") || h.has("arc"))) {
    stack.push({
      role: "outer",
      materialId: "pbi",
      roleLabel: "Coquille HT",
      function: "Flammes, radiant, ne fond pas",
    });
  } else if (h.has("arc") || h.has("fire")) {
    stack.push({
      role: "outer",
      materialId: "nomex",
      roleLabel: "FR",
      function: "Flash-fire / ATPV, fibre non fondante",
    });
  } else if (wet) {
    stack.push({
      role: "outer",
      materialId: "ptfe",
      roleLabel: "Membrane",
      function: "Eau, vapeur, poussières, chimique léger",
    });
  } else {
    stack.push({
      role: "outer",
      materialId: "arachnid",
      roleLabel: "Coquille S³",
      function: "Abrasion, stretch, style",
    });
  }

  if (mech || fireLike || h.has("ballistic")) {
    stack.push({
      role: "mid",
      materialId: "nievlar",
      roleLabel: "Âme Nievlar™ₙᵢ",
      function: "Ténacité, coupe, impact, intégrité thermique",
    });
  } else if (h.has("shock")) {
    stack.push({
      role: "mid",
      materialId: "basalt",
      roleLabel: "Isolant minéral",
      function: "Diélectrique et incombustible",
    });
  }

  if (h.has("ballistic")) {
    stack.push({
      role: "insert",
      materialId: "ceramic",
      roleLabel: "Plaque",
      function: "Niveau élevé + backing Nievlar",
    });
  } else if (h.has("heat") && !h.has("ballistic")) {
    stack.push({
      role: "insert",
      materialId: "basalt",
      roleLabel: "Réfractaire",
      function: "Contact et radiant",
    });
  } else if (h.has("impact") && !h.has("shock")) {
    stack.push({
      role: "insert",
      materialId: "carbon",
      roleLabel: "Coques",
      function: "Casque / genoux / phalanges — hors électrique",
    });
  }

  if (wet && !stack.some((l) => l.materialId === "ptfe")) {
    stack.push({
      role: "inner",
      materialId: "ptfe",
      roleLabel: "Barrière",
      function: "Coupe l’eau sans bloquer toute la vapeur",
    });
  } else if (!fireLike) {
    stack.push({
      role: "inner",
      materialId: "tpu",
      roleLabel: "Confort",
      function: "Mesh, MVTR, élasticité",
    });
  } else {
    stack.push({
      role: "inner",
      materialId: "arachnid",
      roleLabel: "Liner",
      function: "Confort hors face feu",
    });
  }

  if (h.has("shock")) {
    stack.push({
      role: "accessory",
      materialId: "rubber",
      roleLabel: "Diélectrique",
      function: "Gants classe + bottes, inspectés, secs",
    });
  }

  return stack;
}

export function evaluateRules(hazards: HazardId[], stack: StackLayer[]): Warning[] {
  const h = new Set(hazards);
  const ids = new Set(stack.map((l) => l.materialId));
  const mats = stack.map((l) => materialById(l.materialId)).filter(Boolean);
  const warnings: Warning[] = [];

  if (h.has("arc") && h.has("shock")) {
    warnings.push({
      level: "warn",
      title: "Arc ≠ choc",
      body: "Le vêtement anti-arc absorbe la chaleur de l’éclair. Il n’isole pas du courant. Les deux kits se portent ensemble, ils ne se remplacent pas.",
    });
  }

  if (h.has("arc") && !h.has("shock")) {
    warnings.push({
      level: "info",
      title: "Anti-arc seulement",
      body: "Couverture thermique d’arc. Si une pièce sous tension peut être touchée, ajoutez le hazard Choc.",
    });
  }

  if (h.has("shock") && mats.some((m) => m?.conductive)) {
    warnings.push({
      level: "danger",
      title: "Carbone conducteur",
      body: "Une couche carbone/CNT est dans la pile. Retirez-la de la chaîne d’isolation (gants, bottes, manches). Le casque peut rester s’il n’est pas le chemin de terre.",
    });
  }

  if (h.has("shock") && !ids.has("rubber")) {
    warnings.push({
      level: "danger",
      title: "Pas d’isolant classe",
      body: "Sans caoutchouc diélectrique, le score choc est cosmétique. Ajoutez gants IEC 60903 et chaussures isolantes.",
    });
  }

  if ((h.has("fire") || h.has("arc") || h.has("heat")) && mats.some((m) => m?.melts && stack.find((l) => l.materialId === m.id && l.role === "outer"))) {
    warnings.push({
      level: "danger",
      title: "Fibre fondante exposée",
      body: "TPU, UHMWPE ou membrane en face feu/arc : ça fond et colle. L’externe doit être aramide, PBI ou basalte.",
    });
  }

  if ((h.has("water") || h.has("humidity")) && mats.some((m) => m?.hydrophilic) && !ids.has("ptfe") && !ids.has("tpu")) {
    warnings.push({
      level: "warn",
      title: "Aramide nu",
      body: "Nievlar et Kevlar s’imbibent. Gainez d’une membrane ePTFE ou d’une face déperlante.",
    });
  }

  if (h.has("dust")) {
    warnings.push({
      level: "info",
      title: "Respiratoire à part",
      body: "Type 5 n’est pas un FFP3. Poussière de basalte, silice, fibres : appareil de protection respiratoire obligatoire.",
    });
  }

  if (h.has("ballistic") && (h.has("fire") || h.has("arc"))) {
    warnings.push({
      level: "warn",
      title: "Deux missions",
      body: "Le gilet balistique n’est pas un turnout. Empiler les deux sans étude thermique crée un coup de chaleur.",
    });
  }

  if (h.has("chemical")) {
    warnings.push({
      level: "info",
      title: "Perméation spécifique",
      body: "Le chimique se choisit molécule par molécule. Cette pile est une éclaboussure générique, pas un Type 3 acide concentré.",
    });
  }

  return warnings;
}

function confidenceFor(nf: number, warnings: Warning[], n: number): Confidence {
  if (!n) return "plausible";
  if (warnings.some((w) => w.level === "danger") || nf < 55) return "a-verifier";
  if (nf >= 80 && !warnings.some((w) => w.level === "warn")) return "mesure";
  return "plausible";
}

function summaryFor(nf: number, n: number): string {
  if (!n) return "Choisissez un ou plusieurs risques. La pile se construit par couches, jamais par un seul tissu.";
  if (nf >= 88) return "Correspondance de pile élevée — les couches se complètent sur les risques cochés.";
  if (nf >= 72) return "Bonne couverture. Relisez les alertes : un accessoire (gants classe, APR) manque souvent.";
  if (nf >= 50) return "Couverture partielle. Un risque coché n’est pas porté par la bonne famille de fibre.";
  return "Pile insuffisante. Décochez un risque ou changez d’ensemble.";
}

export function analyze(hazards: HazardId[]): NiddleFiReport {
  const stack = recommendStack(hazards);
  const coverage = stackCoverage(stack, hazards);
  const warnings = hazards.length ? evaluateRules(hazards, stack) : [];
  const nf = hazards.length ? Math.round(mean(coverage.map((c) => c.score))) : 0;

  const ranked = ENSEMBLES.map((ensemble) => {
    const cov = stackCoverage(ensemble.stack, hazards.length ? hazards : ensemble.hazards);
    const overlap =
      hazards.length === 0
        ? 0
        : ensemble.hazards.filter((x) => hazards.includes(x)).length / hazards.length;
    const score = Math.round(0.7 * mean(cov.map((c) => c.score)) + 0.3 * overlap * 100);
    return { ensemble, score };
  }).sort((a, b) => b.score - a.score);

  return {
    nf: hazards.length ? nf : 0,
    confidence: confidenceFor(nf, warnings, hazards.length),
    summary: summaryFor(nf, hazards.length),
    coverage,
    warnings,
    stack,
    ranked,
  };
}

export function scoreEnsemble(ensemble: Ensemble, hazards: HazardId[]) {
  const use = hazards.length ? hazards : ensemble.hazards;
  return Math.round(mean(stackCoverage(ensemble.stack, use).map((c) => c.score)));
}

export function heatmapValue(materialId: string, hazard: HazardId) {
  return materialById(materialId)?.protections[hazard] ?? 0;
}

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  mesure: "Mesurable",
  plausible: "Plausible",
  "a-verifier": "À vérifier",
};

export { MATERIALS };
