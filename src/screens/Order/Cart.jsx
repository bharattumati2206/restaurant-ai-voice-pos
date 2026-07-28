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
    <div className="flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
      {/* Header */}

      <div className="border-b border-slate-700 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <ShoppingCart className="text-white" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">Current Order</h2>

            <p className="text-sm text-slate-400">{cart.length} Item(s)</p>
          </div>
        </div>
      </div>

      {/* Items */}

      <div className="flex-1 space-y-4 overflow-auto p-5">
        {cart.length === 0 && (
          <div className="mt-10 text-center">
            <ShoppingCart className="mx-auto text-slate-600" size={60} />

            <p className="mt-4 text-slate-400">No Items Added</p>

            <p className="text-sm text-slate-500">
              Tap a menu item or use your voice
            </p>
          </div>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">{item.name}</h3>

                <p className="mt-1 text-sm text-slate-400">
                  ₹{item.price} each
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-emerald-400">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>

            {/* Quantity */}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => orderService.removeItem(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 transition hover:bg-red-700"
                >
                  <Minus size={16} className="text-white" />
                </button>

                <div className="w-8 text-center font-bold text-white">
                  {item.quantity}
                </div>

                <button
                  onClick={() => orderService.addItem(item)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 transition hover:bg-blue-700"
                >
                  <Plus size={16} className="text-white" />
                </button>
              </div>

              <button
                onClick={() => orderService.removeItem(item.id)}
                className="text-sm text-red-400 transition hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="border-t border-slate-700 p-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-lg text-slate-300">Total</span>

          <span className="text-3xl font-bold text-emerald-400">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={orderService.clear}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <Trash2 size={18} />
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
    flex w-full items-center justify-center gap-2 rounded-xl py-4
    text-lg font-bold text-white transition
    ${
      cart.length === 0
        ? "cursor-not-allowed bg-slate-600 opacity-50"
        : "bg-emerald-600 hover:bg-emerald-700"
    }
  `}
        >
          <CreditCard size={20} />
          Send to Kitchen
        </button>
      </div>
    </div>
  );
}
