"use client";

import { useMemo, useState } from "react";
import usePosStore from "../../store/usePosStore";
import paymentService from "../../services/paymentService";
import { closeCheck, hasOpenChecks } from "../../services/checkService";
import { updateTableStatus } from "../../services/tableService";
import { ArrowLeft, CreditCard, CheckCircle2, QrCode, Receipt } from "lucide-react";

const TAX_PERCENTAGE = 5;

export default function CheckoutScreen() {
  const [processing, setProcessing] = useState(false);
  const navigate = usePosStore((s) => s.navigate);
  const addTimeline = usePosStore((s) => s.addTimeline);
  const check = usePosStore((s) => s.selectedCheckoutCheck);
  const currentEmployee = usePosStore((s) => s.currentEmployee);

  const subtotal = useMemo(() => {
    if (!check || !check.items) {
      return 0;
    }

    return check.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }, [check]);

  const tax = useMemo(() => {
    return subtotal * (TAX_PERCENTAGE / 100);
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  const handleCancel = () => {
    navigate("TABLES");
  };

  const handlePayment = async () => {
    if (processing || !check) return;

    setProcessing(true);

    await paymentService.pay();

    // Close the selected check
    closeCheck(check.id);

    // If no more open checks exist, free the table
    if (!hasOpenChecks(check.tableId)) {
      updateTableStatus(check.tableId, "AVAILABLE");
    }

    setProcessing(false);

    navigate("TABLES");
  };

  const formattedTime = useMemo(() => {
    if (!check?.createdAt) return "Just Now";
    try {
      return new Date(check.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Now";
    }
  }, [check]);

  return (
    <div className="h-screen bg-[#07090E] p-3.5 text-white flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between border-b border-amber-500/20 pb-2.5 shrink-0 bg-[#0F141C] px-4 py-2.5 rounded-xl">
        <button
          onClick={handleCancel}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold transition hover:bg-slate-700 hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to Floor Map
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm">
            <CreditCard size={18} />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-wide">Checkout & Payment</h1>
            <p className="text-[10px] text-amber-400 font-semibold">Darden Restaurant POS</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block font-medium">Cashier</span>
          <span className="text-xs font-bold text-amber-300">
            {currentEmployee?.name || "Server"}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid flex-1 grid-cols-2 gap-3.5 overflow-hidden min-h-0">
        {/* Left Column: Check Details */}
        <div className="flex flex-col rounded-xl border border-amber-500/20 bg-[#121722]/95 p-4 shadow-2xl overflow-hidden">
          {/* Check Number & Table Header Card */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-3 shrink-0 bg-[#171E2C] p-3 rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <Receipt size={16} className="text-amber-400" />
                <h2 className="text-sm font-extrabold text-white tracking-wide">
                  {check?.tableName ?? "No Table"}
                </h2>
                {check?.id && (
                  <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                    Check #{check.id.slice(-4)}
                  </span>
                )}
              </div>

              {check?.id && (
                <p className="mt-1 text-[11px] text-slate-400 font-medium">
                  Full Check ID: <span className="text-slate-200 font-mono font-bold">{check.id}</span>
                </p>
              )}
            </div>

            <div className="text-right text-[11px]">
              <p><span className="text-slate-400">Server:</span> <span className="text-amber-300 font-bold">{check?.employeeName || currentEmployee?.name || "Server"}</span></p>
              <p><span className="text-slate-400">Time:</span> <span className="text-slate-200 font-semibold">{formattedTime}</span></p>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
            {!check || !check.items || check.items.length === 0 ? (
              <p className="text-xs text-slate-400">No items in current check.</p>
            ) : (
              check.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-xs bg-[#182030]/50 p-2 rounded-lg"
                >
                  <div>
                    <p className="flex items-center gap-1.5 font-bold text-white">
                      {item.name}
                      <span className="rounded bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-300">
                        × {item.quantity}
                      </span>
                    </p>

                    {item.modifierText && (
                      <p className="mt-0.5 text-[10px] text-amber-300/90 italic leading-snug">
                        {item.modifierText}
                      </p>
                    )}

                    <p className="text-[10px] text-slate-400">{item.category}</p>
                  </div>

                  <span className="font-extrabold text-emerald-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Totals Section */}
          <div className="mt-3 space-y-1.5 border-t border-amber-500/20 pt-2.5 text-xs shrink-0 bg-[#0E131C] p-3 rounded-xl">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Subtotal</span>
              <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Tax ({TAX_PERCENTAGE}%)</span>
              <span className="font-bold text-white">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t border-slate-800 pt-2 text-base font-extrabold">
              <span className="text-white">Total Due</span>
              <span className="text-emerald-400">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: QR Payment Action */}
        <div className="flex flex-col justify-between rounded-xl border border-amber-500/20 bg-[#121722]/95 p-4 shadow-2xl overflow-hidden">
          <div>
            <div className="text-center mb-3">
              <h2 className="text-sm font-extrabold text-white tracking-wide">
                Scan QR Code to Pay
              </h2>
              <p className="text-[11px] text-slate-400">
                Supports UPI, Credit/Debit, Apple Pay
              </p>
            </div>

            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-xl bg-white p-3 shadow-xl border-2 border-amber-400/40">
              <QrCode size={140} color="black" />
            </div>

            <div className="mt-4 bg-[#171E2C] p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Payment Amount</span>
              <span className="text-xl font-extrabold text-emerald-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            disabled={processing || !check || !check.items || check.items.length === 0}
            onClick={handlePayment}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-950/50 transition hover:from-emerald-500 hover:to-teal-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 border border-emerald-400/30"
          >
            {processing ? (
              <>Processing Payment...</>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Complete Payment (${total.toFixed(2)})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
