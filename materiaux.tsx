import { createFileRoute } from "@tanstack/react-router";
import { HAZARDS, MATERIALS } from "@/lib/catalog";
import { heatmapValue } from "@/lib/niddlefi";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/materiaux")({ component: MaterialsPage });

function cellTone(v: number) {
  if (v >= 85) return "bg-primary text-primary-fg";
  if (v >= 65) return "bg-primary/35 text-fg";
  if (v >= 40) return "bg-bg-subtle text-muted";
  return "bg-bg text-subtle";
}

function MaterialsPage() {
  return (
    <main className="space-y-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">12 fibres</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Matériaux</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Nievlar™ₙᵢ, para-aramide, basalte, carbone, polyélastomère. Le tableau croise chaque
          fibre avec chaque risque — 0 à 100, cibles de conception.
        </p>
      </div>

      <section className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
        <table className="min-w-[52rem] border-separate border-spacing-1 text-left">
          <caption className="sr-only">Matrice matériaux × risques</caption>
          <thead>
            <tr>
              <th className="sticky left-0 bg-bg px-2 py-2 font-mono text-xs font-medium text-subtle">
                Fibre
              </th>
              {HAZARDS.map((h) => (
                <th
                  key={h.id}
                  className="h-28 w-10 px-0 py-2 text-center font-mono text-xs font-medium text-subtle"
                >
                  <span className="inline-block rotate-180 [writing-mode:vertical-rl]">
                    {h.short}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATERIALS.map((m) => (
              <tr key={m.id}>
                <th className="sticky left-0 bg-bg px-2 py-1 text-sm font-medium">{m.name}</th>
                {HAZARDS.map((h) => {
                  const v = heatmapValue(m.id, h.id);
                  return (
                    <td key={h.id} className="p-0">
                      <span
                        className={cn(
                          "flex h-10 min-w-12 items-center justify-center rounded-sm font-mono text-xs tabular-nums",
                          cellTone(v),
                        )}
                      >
                        {v}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {MATERIALS.map((m) => (
          <article
            key={m.id}
            className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]"
          >
            <p className="font-mono text-xs text-subtle">{m.family}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight">{m.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.summary}</p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-subtle">{m.composition}</p>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-md bg-bg-subtle p-2">
                <dt className="text-subtle">Fusion</dt>
                <dd className="mt-0.5">{m.melts ? "Fond" : "Ne fond pas"}</dd>
              </div>
              <div className="rounded-md bg-bg-subtle p-2">
                <dt className="text-subtle">Élec.</dt>
                <dd className="mt-0.5">{m.conductive ? "Conducteur" : "Isolant"}</dd>
              </div>
              <div className="rounded-md bg-bg-subtle p-2">
                <dt className="text-subtle">Eau</dt>
                <dd className="mt-0.5">{m.hydrophilic ? "Hydrophile" : "Hydrophobe"}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm leading-relaxed text-muted">{m.notes}</p>
            <p className="mt-2 text-sm text-fg">{m.pairing}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
