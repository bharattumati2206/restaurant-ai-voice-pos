"use client";

import { useState, useMemo } from "react";
import { X, CheckCircle, Sparkles } from "lucide-react";
import orderService from "@/services/orderService";

export default function ItemModifierModal({ item, onClose }) {
  // Initialize selections with first option for required groups
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
        return {
          ...prev,
          [groupName]: optionObj,
        };
      } else {
        const currentList = Array.isArray(prev[groupName]) ? prev[groupName] : [];
        const exists = currentList.some((opt) => opt.name === optionObj.name);

        const updatedList = exists
          ? currentList.filter((opt) => opt.name !== optionObj.name)
          : [...currentList, optionObj];

        return {
          ...prev,
          [groupName]: updatedList,
        };
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 select-none animate-fadeIn">
      <div className="flex max-h-[85vh] w-[460px] flex-col rounded-2xl border border-amber-500/30 bg-[#262d3f] text-white shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 bg-[#2e3749] px-5 py-3.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-wide">{item.name}</h2>
              <p className="text-[11px] text-amber-400 font-semibold">Customize Your Item</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Modifier Groups */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {item.description && (
            <p className="text-xs text-slate-300 leading-relaxed bg-[#1c2130] p-3 rounded-xl border border-slate-700">
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
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    group.required
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {group.required ? "Required (Choose 1)" : "Optional Options"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
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
                          ? "border-amber-500/80 bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 shadow-sm"
                          : "border-slate-700 bg-[#313a4d]/60 text-slate-300 hover:border-slate-600 hover:bg-[#3a4459]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-amber-400 bg-amber-500 text-slate-950"
                              : "border-slate-600 bg-slate-800"
                          }`}
                        >
                          {isSelected && <CheckCircle size={12} className="stroke-[3]" />}
                        </div>
                        <span>{optObj.name}</span>
                      </div>

                      {optObj.price > 0 && (
                        <span className="text-[11px] font-extrabold text-emerald-400">
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

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-700 bg-[#202536] px-5 py-3.5 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Total Item Price</span>
            <span className="text-lg font-extrabold text-emerald-400">
              ${calculatedTotalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmAdd}
              className="rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 transition hover:from-emerald-500 hover:to-teal-400 active:scale-95"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
