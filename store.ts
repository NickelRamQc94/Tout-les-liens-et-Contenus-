import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HazardId } from "@/lib/catalog";

interface CombinatorState {
  selected: HazardId[];
  saved: HazardId[][];
  toggle: (id: HazardId) => void;
  clear: () => void;
  applyPreset: (ids: HazardId[]) => void;
  saveCurrent: () => void;
}

export const useCombinator = create<CombinatorState>()(
  persist(
    (set, get) => ({
      selected: [],
      saved: [],
      toggle: (id) =>
        set((s) => ({
          selected: s.selected.includes(id)
            ? s.selected.filter((x) => x !== id)
            : [...s.selected, id],
        })),
      clear: () => set({ selected: [] }),
      applyPreset: (ids) => set({ selected: ids }),
      saveCurrent: () => {
        const cur = get().selected;
        if (!cur.length) return;
        const key = [...cur].sort().join(",");
        const exists = get().saved.some((s) => [...s].sort().join(",") === key);
        if (exists) return;
        set({ saved: [cur, ...get().saved].slice(0, 8) });
      },
    }),
    { name: "arachnid-s3-combinator", skipHydration: true },
  ),
);
