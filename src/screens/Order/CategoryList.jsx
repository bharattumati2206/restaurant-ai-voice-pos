"use client";

import { menu } from "../../mock/menu";
import usePosStore from "../../store/usePosStore";
import {
  Grid2X2,
  UtensilsCrossed,
  Soup,
  Fish,
  Wine,
  IceCream,
  ChefHat,
  CookingPot,
} from "lucide-react";

const categoryIcons = {
  "Appetizers": CookingPot,
  "Soups & Salad": Soup,
  "Classic Entrees": UtensilsCrossed,
  "Cucina Mia! Pasta": ChefHat,
  "Seafood & Steak": Fish,
  "Desserts": IceCream,
  "Beverages & Wine": Wine,
};

const categories = [...new Set(menu.map((item) => item.category))].map(
  (category) => ({
    id: category,
    label: category,
    icon: categoryIcons[category] ?? Grid2X2,
  }),
);

export default function CategoryList() {
  const selectedCategory = usePosStore((state) => state.selectedCategory);

  const setSelectedCategory = usePosStore((state) => state.setSelectedCategory);

  return (
    <div className="flex h-full flex-col rounded-xl border border-amber-500/20 bg-[#262d3f]/95 shadow-2xl p-2.5 overflow-hidden">
      <div className="mb-2 shrink-0 pb-1.5 border-b border-amber-500/15">
        <h2 className="text-xs font-extrabold text-white tracking-wide uppercase">Categories</h2>

        <p className="text-[10px] text-slate-400">Choose a menu group</p>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto pr-0.5 custom-scrollbar">
        {categories.map((category) => {
          const Icon = category.icon;

          const active = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group w-full rounded-xl border p-2 transition-all duration-200 ${
                active
                  ? "border-amber-500/80 bg-gradient-to-r from-amber-500/25 via-amber-500/10 to-transparent shadow-md shadow-amber-950/40 text-amber-300"
                  : "border-slate-700/80 bg-[#313a4d]/60 text-slate-400 hover:border-slate-600 hover:bg-[#3a4459] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs transition-colors shrink-0 ${
                    active
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                </div>

                <span className="text-[11px] font-bold tracking-tight text-left leading-tight">
                  {category.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
