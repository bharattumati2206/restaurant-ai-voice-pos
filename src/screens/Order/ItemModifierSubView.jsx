"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import orderService from "@/services/orderService";
import usePosStore from "@/store/usePosStore";

export default function ItemModifierSubView({ item, onBack }) {
  const setCustomizingItem = usePosStore((s) => s.setCustomizingItem);
  const [selections, setSelections] = useState(() => {
    const initial = {};
    if (item.modifiers) {
      item.modifiers.forEach((group) => {
        if (group.required && group.options?.length > 0) {
          initial[group.group] = group.options[0];
        } else {
          initial[group.group] = [];
        }
      });
    }
    return initial;
  });

  const handleSelectOption = (groupName, optionObj, isRequired) => {
    setSelections((prev) => {
      if (isRequired) {
        return { ...prev, [groupName]: optionObj };
      } else {
        const currentList = Array.isArray(prev[groupName]) ? prev[groupName] : [];
        const exists = currentList.some((opt) => opt.name === optionObj.name);
        const updatedList = exists
          ? currentList.filter((opt) => opt.name !== optionObj.name)
          : [...currentList, optionObj];

        return { ...prev, [groupName]: updatedList };
      }
    });
  };

  const selectedModifierList = useMemo(() => {
    const list = [];
    Object.entries(selections).forEach(([groupName, val]) => {
      if (Array.isArray(val)) {
        val.forEach((opt) => {
          list.push({ group: groupName, option: opt.name, price: opt.price || 0 });
        });
      } else if (val && val.name) {
        list.push({ group: groupName, option: val.name, price: val.price || 0 });
      }
    });
    return list;
  }, [selections]);

  const calculatedTotalPrice = useMemo(() => {
    let price = item.price;
    selectedModifierList.forEach((mod) => {
      price += mod.price;
    });
    return price;
  }, [item.price, selectedModifierList]);

  const handleConfirmAdd = () => {
    orderService.addItem(item, selectedModifierList, calculatedTotalPrice);
    onBack();
  };

  return (
    <div className="flex h-full flex-col text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white active:scale-95"
          >
            <ArrowLeft size={14} />
            Back to Menu
          </button>

          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide">{item.name}</h2>
            <p className="text-[11px] text-amber-400 font-semibold">Select Sub-items & Options</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block font-medium">Base Price</span>
          <span className="text-sm font-extrabold text-amber-300">${item.price.toFixed(2)}</span>
        </div>
      </div>

      {/* Body: Sub-item Modifier Options */}
      <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1 custom-scrollbar">
        {item.description && (
          <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0E14] p-3 rounded-xl border border-slate-800">
            {item.description}
          </p>
        )}

        {item.modifiers?.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {group.group}
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  group.required
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                }`}
              >
                {group.required ? "Required Choice" : "Optional Add-on"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {group.options?.map((optObj, oIdx) => {
                const isRequired = group.required;
                const currentVal = selections[group.group];
                const isSelected = isRequired
                  ? currentVal?.name === optObj.name
                  : Array.isArray(currentVal) &&
                    currentVal.some((opt) => opt.name === optObj.name);

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(group.group, optObj, isRequired)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-xs font-semibold transition-all ${
                      isSelected
                        ? "border-amber-500/80 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-300 shadow-md"
                        : "border-slate-800 bg-[#182030]/60 text-slate-300 hover:border-slate-700 hover:bg-[#1B2436]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-amber-400 bg-amber-500 text-slate-950"
                            : "border-slate-600 bg-slate-800"
                        }`}
                      >
                        {isSelected && <CheckCircle2 size={12} className="stroke-[3]" />}
                      </div>
                      <span className="text-xs font-semibold">{optObj.name}</span>
                    </div>

                    {optObj.price > 0 && (
                      <span className="text-[11px] font-extrabold text-emerald-400 shrink-0 ml-1">
                        +${optObj.price.toFixed(2)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Confirm */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-3 shrink-0 bg-[#141A26]">
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Total Item Price</span>
          <span className="text-lg font-extrabold text-emerald-400">
            ${calculatedTotalPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmAdd}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 transition hover:from-emerald-500 hover:to-teal-400 active:scale-95"
          >
            <ShoppingBag size={14} />
            Add to Order (${calculatedTotalPrice.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
}
