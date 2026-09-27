import { CONFIDENCE_LABEL, type NiddleFiReport } from "@/lib/niddlefi";
import { cn } from "@/lib/utils";

export function NiddleFiMeter({ report }: { report: NiddleFiReport }) {
      const tone =
    report.nf === 0
      ? "text-muted"
      : report.confidence === "mesure"
        ? "text-ok"
        : report.confidence === "plausible"
          ? "text-warn"
          : "text-danger";

  return (
    <div className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-subtle">
            PinPointing ᴺⁱddleFi
          </p>
          <p className="mt-2 font-display text-5xl font-semibold tabular-nums leading-none tracking-tight">
            {report.nf}
            <span className="ml-1 text-lg text-muted">/100</span>
          </p>
        </div>
        <span className={cn("rounded-sm bg-bg-subtle px-2.5 py-1 text-xs font-medium", tone)}>
          {CONFIDENCE_LABEL[report.confidence]}
        </span>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-bg-subtle">
        <div
          className="h-full bg-primary transition-[width] duration-200 ease-out"
          style={{ width: `${Math.min(100, report.nf)}%` }}
        />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{report.summary}</p>
    </div>
  );
}
