import { GROUP_LABEL, HAZARDS, type Hazard, type HazardId } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const GROUPS: Hazard["group"][] = [
  "thermique",
  "electrique",
  "fluide",
  "mecanique",
  "environnement",
];

export function HazardPicker({
  selected,
  onToggle,
}: {
  selected: HazardId[];
  onToggle: (id: HazardId) => void;
}) {
  return (
    <div className="space-y-6">
      {GROUPS.map((group) => {
        const items = HAZARDS.filter((h) => h.group === group);
        return (
          <div key={group}>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-subtle">
              {GROUP_LABEL[group]}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((h) => {
                const on = selected.includes(h.id);
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => onToggle(h.id)}
                    aria-pressed={on}
                    className={cn(
                      "min-h-11 rounded-md px-3.5 py-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-150",
                      on
                        ? "bg-primary text-primary-fg"
                        : "bg-bg-elevated text-muted shadow-[var(--shadow-border)] hover:text-fg hover:shadow-[var(--shadow-border-hover)]",
                    )}
                  >
                    {h.short}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
