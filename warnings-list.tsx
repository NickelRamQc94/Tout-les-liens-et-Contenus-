import type { Warning } from "@/lib/niddlefi";
import { cn } from "@/lib/utils";

export function WarningsList({ warnings }: { warnings: Warning[] }) {
  if (!warnings.length) return null;
  return (
    <ul className="space-y-2">
      {warnings.map((w) => (
        <li
          key={w.title}
          className={cn(
            "rounded-lg p-4 shadow-[var(--shadow-border)]",
            w.level === "danger" && "bg-bg-elevated",
            w.level === "warn" && "bg-bg-elevated",
            w.level === "info" && "bg-bg-elevated",
          )}
        >
          <p className="text-sm font-medium">
            <span
              className={cn(
                "mr-2 font-mono text-xs uppercase tracking-widest",
                w.level === "danger" && "text-danger",
                w.level === "warn" && "text-warn",
                w.level === "info" && "text-muted",
              )}
            >
              {w.level === "danger" ? "Critique" : w.level === "warn" ? "Attention" : "Note"}
            </span>
            {w.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{w.body}</p>
        </li>
      ))}
    </ul>
  );
}
