import { createFileRoute, Link } from "@tanstack/react-router";
import { ENSEMBLES, HAZARDS } from "@/lib/catalog";
import { useCombinator } from "@/lib/store";

export const Route = createFileRoute("/ensembles")({ component: EnsemblesPage });

function EnsemblesPage() {
  const applyPreset = useCombinator((s) => s.applyPreset);

  return (
    <main>
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">17 kits</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Ensembles</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Chaque combinaison est une pile de couches, pas un slogan. Chargez un kit dans le
        combinateur pour voir le score ᴺⁱddleFi et les alertes.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {ENSEMBLES.map((e) => (
          <li key={e.id} className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs text-subtle">{e.code}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight">{e.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{e.tagline}</p>
            <p className="mt-3 flex flex-wrap gap-1.5">
              {e.hazards.map((id) => {
                const h = HAZARDS.find((x) => x.id === id);
                return (
                  <span
                    key={id}
                    className="rounded-sm bg-bg-subtle px-2 py-0.5 text-xs text-muted"
                  >
                    {h?.short}
                  </span>
                );
              })}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/ensembles/$id"
                params={{ id: e.id }}
                className="inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg"
              >
                Détail
              </Link>
              <Link
                to="/"
                onClick={() => applyPreset(e.hazards)}
                className="inline-flex h-11 items-center rounded-md px-4 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
              >
                Charger
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
