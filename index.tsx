import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { HazardPicker } from "@/components/hazard-picker";
import { LayerStack } from "@/components/layer-stack";
import { NiddleFiMeter } from "@/components/niddlefi-meter";
import { ProductCard } from "@/components/product-card";
import { WarningsList } from "@/components/warnings-list";
import { Button } from "@/components/ui/button";
import { ENSEMBLES, GARMENTS, HAZARDS, type HazardId } from "@/lib/catalog";
import { analyze } from "@/lib/niddlefi";
import { useCombinator } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

const PRESETS: { label: string; ids: HazardId[] }[] = [
  { label: "Feu et eau", ids: ["fire", "water", "humidity"] },
  { label: "Arc et choc", ids: ["arc", "shock"] },
  { label: "Impact et coupe", ids: ["impact", "cut"] },
  { label: "Énergie hiver", ids: ["fire", "arc", "cold", "water", "uv"] },
  { label: "Tous les risques", ids: HAZARDS.map((h) => h.id) },
];

function Home() {
  const selected = useCombinator((s) => s.selected);
  const toggle = useCombinator((s) => s.toggle);
  const clear = useCombinator((s) => s.clear);
  const applyPreset = useCombinator((s) => s.applyPreset);
  const saveCurrent = useCombinator((s) => s.saveCurrent);
  const saved = useCombinator((s) => s.saved);

  const report = useMemo(() => analyze(selected), [selected]);
  const top = report.ranked[0];
  const matching = useMemo(() => {
    if (!selected.length) return GARMENTS.slice(0, 4);
    return GARMENTS.filter((g) => g.hazards.some((h) => selected.includes(h))).slice(0, 6);
  }, [selected]);

  return (
    <main className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-subtle">
            ArachNiD S³ · Sports / Style / Security
          </p>
          <h1 className="mt-3 max-w-full font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Combinateur de protection
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Un tissu ne fait pas un kit. Cochez les risques — feu, arc, choc, eau, impact —
            la pile se construit par couches : coquille, âme Nievlar™ₙᵢ, membrane, accessoire
            diélectrique.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
          <img
            src="/products/combinaison.jpg"
            alt="Combinaison ArachNiD S³"
            className="aspect-[4/3] w-full object-cover object-top sm:aspect-[16/10]"
          />
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Risques</h2>
            <Button variant="ghost" size="sm" onClick={clear} disabled={!selected.length}>
              Tout retirer
            </Button>
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <Button key={p.label} variant="outline" size="sm" onClick={() => applyPreset(p.ids)}>
                {p.label}
              </Button>
            ))}
          </div>
          <HazardPicker selected={selected} onToggle={toggle} />
          {selected.length ? (
            <div className="mt-6">
              <Button variant="subtle" onClick={saveCurrent}>
                Enregistrer cette sélection
              </Button>
            </div>
          ) : null}
          {saved.length ? (
            <div className="mt-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-subtle">
                Sauvegardées
              </p>
              <div className="flex flex-wrap gap-2">
                {saved.map((ids, i) => (
                  <Button
                    key={ids.join("-") + i}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(ids)}
                  >
                    {ids.length} risque{ids.length > 1 ? "s" : ""}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <NiddleFiMeter report={report} />
          <LayerStack stack={report.stack} />
          <WarningsList warnings={report.warnings} />
        </div>
      </section>

      {selected.length ? (
        <section>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Couverture par risque</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {report.coverage.map((c) => {
              const h = HAZARDS.find((x) => x.id === c.hazard);
              return (
                <li
                  key={c.hazard}
                  className="flex items-center justify-between rounded-lg bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]"
                >
                  <span className="text-sm">{h?.name}</span>
                  <span className="font-mono text-sm tabular-nums text-muted">{c.score}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Ensembles les plus proches
          </h2>
          <Link to="/ensembles" className="text-sm text-muted hover:text-fg">
            Tous les kits
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(selected.length ? report.ranked : ENSEMBLES.map((e) => ({ ensemble: e, score: 0 })))
            .slice(0, 4)
            .map(({ ensemble, score }) => (
              <Link
                key={ensemble.id}
                to="/ensembles/$id"
                params={{ id: ensemble.id }}
                className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
              >
                <p className="font-mono text-xs text-subtle">{ensemble.code}</p>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                  {ensemble.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{ensemble.tagline}</p>
                {selected.length ? (
                  <p className="mt-3 font-mono text-xs tabular-nums text-subtle">NF {score}</p>
                ) : null}
              </Link>
            ))}
        </div>
        {top && selected.length ? (
          <p className="mt-4 text-sm text-muted">
            Meilleur alignement :{" "}
            <Link
              to="/ensembles/$id"
              params={{ id: top.ensemble.id }}
              className="text-fg underline-offset-2 hover:underline"
            >
              {top.ensemble.name}
            </Link>
            .
          </p>
        ) : null}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Pièces</h2>
          <Link to="/produits" className="text-sm text-muted hover:text-fg">
            Catalogue
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {matching.map((g) => (
            <ProductCard key={g.id} garment={g} />
          ))}
        </div>
      </section>
    </main>
  );
}
