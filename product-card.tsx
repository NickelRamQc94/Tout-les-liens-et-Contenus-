import { Link } from "@tanstack/react-router";
import { CATEGORY_LABEL, type Garment } from "@/lib/catalog";

export function ProductCard({ garment }: { garment: Garment }) {
  return (
    <Link
      to="/produits/$id"
      params={{ id: garment.id }}
      className="group block overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="aspect-[3/4] overflow-hidden bg-bg-subtle">
        <img
          src={garment.image}
          alt={garment.name}
          className="size-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <p className="font-mono text-xs text-subtle">{garment.sku}</p>
        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">{garment.name}</h3>
        <p className="mt-1 text-sm text-muted">{CATEGORY_LABEL[garment.category]}</p>
      </div>
    </Link>
  );
}
