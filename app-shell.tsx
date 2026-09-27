import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Mark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { useCombinator } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Combinateur" },
  { to: "/ensembles", label: "Ensembles" },
  { to: "/materiaux", label: "Matériaux" },
  { to: "/produits", label: "Produits" },
  { to: "/tech", label: "Nievlar" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    void useCombinator.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 text-fg">
            <Mark className="size-7 text-primary" />
            <span className="font-display text-lg font-semibold tracking-wide">
              ArachNiD <span className="text-muted">S³</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-150",
                    active ? "bg-bg-subtle text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        {open ? (
          <nav className="border-t border-border px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => {
                const active =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-base",
                      active ? "bg-bg-subtle text-fg" : "text-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        ) : null}
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">{children}</div>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>ArachNiD S³ · Nievlar™ₙᵢ · Fiboₙᵢcci</p>
          <p>Cibles de conception — certifications EN / NFPA / CSA à valider.</p>
        </div>
      </footer>
    </div>
  );
}
