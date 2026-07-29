"use client";

import usePosStore from "@/store/usePosStore";
import orderService from "@/services/orderService";
import { updateTableStatus } from "../../services/tableService";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { createCheck } from "../../services/checkService";

export default function Cart() {
  const navigate = usePosStore((state) => state.navigate);
  const addTimeline = usePosStore((state) => state.addTimeline);
  const selectedTable = usePosStore((state) => state.selectedTable);

  const cart = usePosStore((state) => state.cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const setSelectedCheckTable = usePosStore(
    (state) => state.setSelectedCheckTable,
  );

  const setActiveTableTab = usePosStore((state) => state.setActiveTableTab);

  return (
    <div className="flex h-full flex-col rounded-xl border border-amber-500/20 bg-[#121722]/95 shadow-2xl shadow-black/80 overflow-hidden">
      {/* Header */}

      <div className="border-b border-amber-500/20 p-2.5 shrink-0 bg-[#171E2C]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 shadow-sm text-slate-950">
            <ShoppingCart size={16} />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-white tracking-wide">Current Order</h2>

            <p className="text-[10px] text-slate-400 font-medium">{cart.length} Item(s)</p>
          </div>
        </div>
      </div>

      {/* Items */}

      <div className="flex-1 space-y-2 overflow-y-auto p-2 custom-scrollbar">
        {cart.length === 0 && (
          <div className="mt-8 text-center">
            <ShoppingCart className="mx-auto text-slate-700" size={36} />

            <p className="mt-3 text-xs text-slate-400 font-medium">No Items Added</p>

            <p className="text-[10px] text-slate-500">
              Tap a menu item or use your voice
            </p>
          </div>
        )}

        {cart.map((item) => {
          const itemKey = item.cartKey || item.id;
          return (
            <div
              key={itemKey}
              className="rounded-lg border border-slate-800 bg-[#182030]/80 p-2.5 shadow-sm"
            >
              <div className="flex items-start justify-between text-xs">
                <div>
                  <h3 className="font-semibold text-white">{item.name}</h3>

                  {item.modifierText && (
                    <p className="mt-0.5 text-[10px] text-amber-300/90 italic leading-snug">
                      {item.modifierText}
                    </p>
                  )}

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Quantity */}

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => orderService.removeItem(itemKey)}
                    className="flex h-6 w-6 items-center justify-center rounded bg-rose-600/80 transition hover:bg-rose-600"
                  >
                    <Minus size={12} className="text-white" />
                  </button>

                  <div className="w-5 text-center text-xs font-bold text-white">
                    {item.quantity}
                  </div>

                  <button
                    onClick={() => orderService.addItem(item, item.selectedModifiers || [], item.price)}
                    className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 transition hover:bg-indigo-500"
                  >
                    <Plus size={12} className="text-white" />
                  </button>
                </div>

                <button
                  onClick={() => orderService.removeItem(itemKey)}
                  className="text-[10px] font-semibold text-rose-400 transition hover:text-rose-300"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <div className="border-t border-amber-500/20 p-2.5 shrink-0 bg-[#0E131C]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Total</span>

          <span className="text-lg font-extrabold text-emerald-400">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={orderService.clear}
          className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-600/80 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600"
        >
          <Trash2 size={13} />
          Clear Order
        </button>

        <button
          disabled={cart.length === 0}
          onClick={() => {
            if (!selectedTable) {
              addTimeline("❌ Please select a table first.", "error");
              return;
            }

            addTimeline("📤 Sending order to kitchen...", "thinking");

            createCheck(selectedTable, cart);

            updateTableStatus(selectedTable.id, "OCCUPIED");

            setSelectedCheckTable(selectedTable);
            setActiveTableTab("OPEN_CHECKS");

            orderService.clear();

            navigate("TABLES");

            addTimeline("✅ Order sent to kitchen.", "success");
          }}
          className={`
    flex w-full items-center justify-center gap-1.5 rounded-lg py-2
    text-xs font-bold text-white transition
    ${
      cart.length === 0
        ? "cursor-not-allowed bg-slate-800 text-slate-500 opacity-50 border border-slate-700"
        : "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 shadow-md shadow-emerald-950/50 border border-emerald-400/30 active:scale-95"
    }
  `}
        >
          <CreditCard size={14} />
          Send to Kitchen
        </button>
      </div>
    </div>
  );
}
