import { ROLE_LABEL, materialById, type StackLayer } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function LayerStack({
  stack,
  highlight,
}: {
  stack: StackLayer[];
  highlight?: string;
}) {
  if (!stack.length) {
    return (
      <div className="rounded-xl bg-bg-elevated p-6 text-sm text-muted shadow-[var(--shadow-border)]">
        Cochez un risque pour voir la coupe de pile.
      </div>
    );
  }

  return (
    <ol className="space-y-2">
      {stack.map((layer, i) => {
        const mat = materialById(layer.materialId);
        const active = highlight ? layer.materialId === highlight : true;
        return (
          <li
            key={`${layer.role}-${layer.materialId}-${i}`}
            className={cn(
              "rounded-lg bg-bg-elevated p-4 shadow-[var(--shadow-border)] transition-opacity duration-150",
              active ? "opacity-100" : "opacity-45",
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-subtle">
                {ROLE_LABEL[layer.role]}
              </span>
              <span className="text-sm text-muted">{mat?.name ?? layer.materialId}</span>
            </div>
            <p className="mt-1 font-display text-xl font-semibold tracking-tight">
              {layer.roleLabel}
            </p>
            <p className="mt-1 text-sm text-muted">{layer.function}</p>
          </li>
        );
      })}
    </ol>
  );
}
