import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LayerStack } from "@/components/layer-stack";
import { ProductCard } from "@/components/product-card";
import { WarningsList } from "@/components/warnings-list";
import { Button } from "@/components/ui/button";
import { ENSEMBLES, GARMENTS, HAZARDS, ensembleById, type Garment } from "@/lib/catalog";
import { analyze } from "@/lib/niddlefi";
import { useCombinator } from "@/lib/store";

export const Route = createFileRoute("/ensembles/$id")({
  component: EnsembleDetail,
  loader: ({ params }) => {
    const ensemble = ensembleById(params.id);
    if (!ensemble) throw notFound();
    return ensemble;
  },
});

function EnsembleDetail() {
  const ensemble = Route.useLoaderData();
  const applyPreset = useCombinator((s) => s.applyPreset);
  const report = analyze(ensemble.hazards);
  const pieces = ensemble.garments
    .map((id) => GARMENTS.find((g) => g.id === id))
    .filter((g): g is Garment => g != null);

  return (
    <main className="space-y-10">
      <div>
        <Link to="/ensembles" className="text-sm text-muted hover:text-fg">
          Ensembles
        </Link>
        <p className="mt-4 font-mono text-xs text-subtle">{ensemble.code}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{ensemble.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{ensemble.tagline}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{ensemble.use}</p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/" onClick={() => applyPreset(ensemble.hazards)}>
              Charger dans le combinateur
            </Link>
          </Button>
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">Pile</h2>
          <LayerStack stack={ensemble.stack} />
        </div>
        <div className="space-y-4">
          <div className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">Risques visés</p>
            <ul className="mt-3 space-y-2">
              {ensemble.hazards.map((id) => {
                const h = HAZARDS.find((x) => x.id === id);
                return (
                  <li key={id}>
                    <p className="text-sm font-medium">{h?.name}</p>
                    <p className="text-sm text-muted">{h?.whatItIs}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs uppercase tracking-widest text-subtle">Référentiels</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {ensemble.standards.join(" · ")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{ensemble.notes}</p>
          </div>
          <WarningsList warnings={report.warnings} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight">Pièces du kit</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {pieces.map((g) => (
            <ProductCard key={g.id} garment={g} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">Autres kits</h2>
        <div className="flex flex-wrap gap-2">
          {ENSEMBLES.filter((e) => e.id !== ensemble.id).map((e) => (
            <Link
              key={e.id}
              to="/ensembles/$id"
              params={{ id: e.id }}
              className="rounded-md bg-bg-elevated px-3 py-2 text-sm shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
            >
              {e.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
