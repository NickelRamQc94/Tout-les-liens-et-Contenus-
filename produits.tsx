import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { CATEGORY_LABEL, GARMENTS, type GarmentCategory } from "@/lib/catalog";

export const Route = createFileRoute("/produits")({ component: ProductsPage });

const ORDER: GarmentCategory[] = [
  "full",
  "torso",
  "legs",
  "hands",
  "head",
  "face",
  "feet",
  "carry",
];

function ProductsPage() {
  return (
    <main>
      <p className="font-mono text-xs uppercase tracking-widest text-subtle">Gamme S³</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Produits</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Veste, combinaison, gants, casque, bottines, cagoule, harnais. Chaque pièce est une
        coupe de Nievlar™ₙᵢ, pas un print décoratif.
      </p>
      {ORDER.map((cat) => {
        const items = GARMENTS.filter((g) => g.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="mt-10">
            <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight">
              {CATEGORY_LABEL[cat]}
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {items.map((g) => (
                <ProductCard key={g.id} garment={g} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
