"use client";

import { menu } from "@/mock/menu";
import usePosStore from "@/store/usePosStore";

import MenuItemCard from "./MenuItemCard";

export default function MenuList() {
  const selectedCategory = usePosStore((state) => state.selectedCategory);

  const filteredMenu = menu.filter(
    (item) => item.category === selectedCategory,
  );

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{selectedCategory}</h2>

          <p className="text-sm text-slate-400">
            Tap any item to add it to the order
          </p>
        </div>

        <div className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          {filteredMenu.length} Items
        </div>
      </div>

      {/* Menu Grid */}

      <div className="grid flex-1 grid-cols-4 gap-4 overflow-y-auto pr-1">
        {filteredMenu.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
