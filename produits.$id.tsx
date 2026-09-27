import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LayerStack } from "@/components/layer-stack";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_LABEL,
  ENSEMBLES,
  GARMENTS,
  HAZARDS,
  MATERIALS,
  garmentById,
  type Material,
} from "@/lib/catalog";
import { useCombinator } from "@/lib/store";

export const Route = createFileRoute("/produits/$id")({
  component: ProductDetail,
  loader: ({ params }) => {
    const garment = garmentById(params.id);
    if (!garment) throw notFound();
    return garment;
  },
});

function ProductDetail() {
  const garment = Route.useLoaderData();
  const applyPreset = useCombinator((s) => s.applyPreset);
  const kits = ENSEMBLES.filter((e) => e.garments.includes(garment.id));
  const mats = garment.materials
    .map((id) => MATERIALS.find((m) => m.id === id))
    .filter((m): m is Material => m != null);
  const others = GARMENTS.filter((g) => g.id !== garment.id).slice(0, 4);

  return (
    <main className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
        <img src={garment.image} alt={garment.name} className="aspect-[3/4] w-full object-cover" />
      </div>
      <div className="space-y-8">
        <div>
          <Link to="/produits" className="text-sm text-muted hover:text-fg">
            Produits
          </Link>
          <p className="mt-4 font-mono text-xs text-subtle">{garment.sku}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{garment.name}</h1>
          <p className="mt-1 text-sm text-muted">{CATEGORY_LABEL[garment.category]}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{garment.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {garment.hazards.map((id) => {
              const h = HAZARDS.find((x) => x.id === id);
              return (
                <span key={id} className="rounded-sm bg-bg-subtle px-2 py-1 text-xs text-muted">
                  {h?.short}
                </span>
              );
            })}
          </div>
          <div className="mt-6">
            <Button asChild>
              <Link to="/" onClick={() => applyPreset(garment.hazards)}>
                Tester ces risques
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">Coupe</h2>
          <LayerStack stack={garment.layers} />
        </div>

        <div>
          <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">Fibres</h2>
          <ul className="space-y-2">
            {mats.map((m) => (
              <li key={m.id} className="rounded-lg bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
                <p className="font-medium">{m.name}</p>
                <p className="mt-1 text-sm text-muted">{m.summary}</p>
              </li>
            ))}
          </ul>
        </div>

        {kits.length ? (
          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">Dans les kits</h2>
            <div className="flex flex-wrap gap-2">
              {kits.map((e) => (
                <Link
                  key={e.id}
                  to="/ensembles/$id"
                  params={{ id: e.id }}
                  className="rounded-md bg-bg-elevated px-3 py-2 text-sm shadow-[var(--shadow-border)]"
                >
                  {e.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">Autres pièces</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((g) => (
              <Link
                key={g.id}
                to="/produits/$id"
                params={{ id: g.id }}
                className="rounded-md bg-bg-elevated px-3 py-2 text-sm shadow-[var(--shadow-border)]"
              >
                {g.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
