import { createFileRoute, Link } from "@tanstack/react-router";
import { MATERIALS } from "@/lib/catalog";

export const Route = createFileRoute("/tech")({ component: TechPage });

function TechPage() {
  const ni = MATERIALS.find((m) => m.id === "nievlar");

  return (
    <main className="mx-auto max-w-2xl space-y-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">
          Techₙᵢlogie Fiboₙᵢcci
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Nievlar™ₙᵢ</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Fibre propriétaire ArachNiD : analog para-aramide, ténacité élevée, ne fond pas.
          L’indice ₙᵢ est la signature de lot — pas un ion libre dans le textile fini.
        </p>
      </div>

      <section className="space-y-3 rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Ce qui est visé</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>Ténacité de classe para-aramide (cible au-delà de 3 500 MPa sur filament).</li>
          <li>Aucune fusion en flash-fire — contrairement au TPU et à l’UHMWPE.</li>
          <li>Coupe, impact, backing balistique souple.</li>
          <li>Dépôt pulsé TranslorPrintStation, toolpath en spirale logarithmique (φ).</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted">{ni?.composition}</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Ce que ça n’est pas</h2>
        <p className="text-sm leading-relaxed text-muted">
          Nievlar n’isole pas du choc électrique. Nievlar nu n’est pas étanche. Les nanotubes,
          s’ils percolent, deviennent un chemin conducteur — d’où le dosage sous seuil et
          l’interdiction du carbone dans le kit diélectrique. Le score ᴺⁱddleFi sépare le
          mesurable (famille de fibre, fusion, conductivité) du plausible (cibles de module)
          et de ce qui reste à certifier (EN, NFPA, CSA, NIJ).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Pile S³</h2>
        <p className="text-sm leading-relaxed text-muted">
          Sports : module élastique variable, mesh, récupération. Style : face ArachNiD,
          orange haute-vis seulement s’il est EN 20471. Security : âme Nievlar, hash de lot
          dans le fil. Fiboₙᵢcci décrit le parcours d’extrusion et le motif de renfort — pas
          une loi physique nouvelle.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Règles de couplage</h2>
        <ul className="space-y-2 text-sm leading-relaxed text-muted">
          <li>Feu / arc : fibre qui ne fond pas à l’extérieur.</li>
          <li>Eau : membrane ePTFE sur aramide hydrophile.</li>
          <li>Choc : caoutchouc classe, jamais de carbone dans la chaîne.</li>
          <li>Arc et choc sont deux missions. On les empile, on ne les confond pas.</li>
        </ul>
      </section>

      <p className="text-sm">
        <Link to="/" className="text-fg underline-offset-2 hover:underline">
          Ouvrir le combinateur
        </Link>
        {" · "}
        <Link to="/materiaux" className="text-fg underline-offset-2 hover:underline">
          Matrice des fibres
        </Link>
      </p>
    </main>
  );
}
