"use client";

import { useState } from "react";
import { menu } from "@/mock/menu";
import usePosStore from "@/store/usePosStore";
import orderService from "@/services/orderService";
import MenuItemCard from "./MenuItemCard";
import ItemModifierSubView from "./ItemModifierSubView";

export default function MenuList() {
  const selectedCategory = usePosStore((state) => state.selectedCategory);
  const customizingItem = usePosStore((state) => state.customizingItem);
  const setCustomizingItem = usePosStore((state) => state.setCustomizingItem);

  const filteredMenu = menu.filter(
    (item) => item.category === selectedCategory,
  );

  const handleSelectItem = (item) => {
    if (item.modifiers && item.modifiers.length > 0) {
      setCustomizingItem(item);
    } else {
      orderService.addItem(item);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-amber-500/20 bg-[#262d3f]/95 shadow-2xl p-2.5 overflow-hidden relative">
      {customizingItem ? (
        /* In-Place Sub-Items / Modifiers View */
        <ItemModifierSubView
          item={customizingItem}
          onBack={() => setCustomizingItem(null)}
        />
      ) : (
        /* Main Category Menu Grid View */
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between shrink-0 pb-2 border-b border-amber-500/15">
            <div>
              <h2 className="text-base font-extrabold text-white tracking-wide">{selectedCategory}</h2>

              <p className="text-[11px] text-slate-400">
                Tap an item to add or customize sides
              </p>
            </div>

            <div className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              {filteredMenu.length} Items
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid flex-1 grid-cols-3 gap-2 overflow-y-auto pr-1 custom-scrollbar pt-1">
            {filteredMenu.map((item) => (
              <MenuItemCard key={item.id} item={item} onSelect={handleSelectItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
