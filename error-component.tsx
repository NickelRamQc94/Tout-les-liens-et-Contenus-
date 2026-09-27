import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "Une erreur inattendue s’est produite. Rechargez la page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-danger" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-lg font-semibold">Quelque chose a cloché</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
    </main>
  );
}

export function AppNotFoundComponent() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="font-display text-2xl font-semibold">Introuvable</h1>
      <p className="text-sm text-muted">Cette pièce ou cet ensemble n’existe pas.</p>
      <Link to="/" className="mt-2 text-sm text-fg underline-offset-2 hover:underline">
        Retour au combinateur
      </Link>
    </main>
  );
}
