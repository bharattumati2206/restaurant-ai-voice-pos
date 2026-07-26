"use client";

import { menu } from "../../mock/menu";
import usePosStore from "../../store/usePosStore";
import { Grid2X2, Beef, CookingPot, CupSoda, IceCream } from "lucide-react";

const categoryIcons = {
  Burgers: Beef,
  Chicken: CookingPot,
  Steaks: Beef,
  Seafood: CookingPot,
  Sides: CookingPot,
  Drinks: CupSoda,
  Desserts: IceCream,
};

const categoryColors = {
  Burgers: "bg-orange-500",
  Chicken: "bg-red-600",
  Steaks: "bg-amber-700",
  Seafood: "bg-sky-600",
  Sides: "bg-purple-600",
  Drinks: "bg-cyan-600",
  Desserts: "bg-pink-600",
};

const categories = [...new Set(menu.map((item) => item.category))].map(
  (category) => ({
    id: category,
    label: category,
    icon: categoryIcons[category] ?? Grid2X2,
    color: categoryColors[category] ?? "bg-slate-700",
  }),
);

export default function CategoryList() {
  const selectedCategory = usePosStore((state) => state.selectedCategory);

  const setSelectedCategory = usePosStore((state) => state.setSelectedCategory);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-xl">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-white">Categories</h2>

        <p className="text-sm text-slate-400">Choose a menu group</p>
      </div>

      <div className="flex-1 space-y-3 overflow-auto">
        {categories.map((category) => {
          const Icon = category.icon;

          const active = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group w-full rounded-xl border p-4 transition-all duration-200 ${
                active
                  ? "border-blue-500 bg-blue-600 shadow-lg"
                  : "border-slate-700 bg-slate-800 hover:border-slate-500 hover:bg-slate-700"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${
                    active ? "bg-white/20" : category.color
                  }`}
                >
                  <Icon size={24} />
                </div>

                <span className="text-center text-sm font-semibold text-white">
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
