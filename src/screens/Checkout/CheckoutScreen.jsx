"use client";

import { useMemo, useState } from "react";

import usePosStore from "../../store/usePosStore";
import paymentService from "../../services/paymentService";

import { ArrowLeft, CreditCard, CheckCircle2, QrCode } from "lucide-react";

const TAX_PERCENTAGE = 5;

export default function CheckoutScreen() {
  const [processing, setProcessing] = useState(false);

  const cart = usePosStore((s) => s.cart);
  const selectedTable = usePosStore((s) => s.selectedTable);

  const navigate = usePosStore((s) => s.navigate);
  const addTimeline = usePosStore((s) => s.addTimeline);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const tax = useMemo(() => {
    return subtotal * (TAX_PERCENTAGE / 100);
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  const handleCancel = () => {
    navigate("ORDER");
  };

  const handlePayment = async () => {
    if (processing) return;

    setProcessing(true);

    await paymentService.pay();

    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-10 py-8 text-white">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 transition hover:bg-slate-800"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <CreditCard className="text-green-400" />

          <h1 className="text-3xl font-bold">Payment</h1>
        </div>

        <div />
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left */}

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {selectedTable?.name ?? "No Table"}
          </h2>

          <div className="space-y-3">
            {cart.length === 0 ? (
              <p className="text-slate-400">No items in current order.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-slate-800 pb-3"
                >
                  <div>
                    <p className="flex items-center gap-2 font-medium">
                      {item.name}

                      <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-200">
                        × {item.quantity}
                      </span>
                    </p>

                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>

                  <span className="font-semibold text-emerald-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 space-y-3 border-t border-slate-700 pt-5">
            <div className="flex justify-between">
              <span className="text-slate-300">Subtotal</span>

              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">Tax ({TAX_PERCENTAGE}%)</span>

              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t border-slate-700 pt-3 text-2xl font-bold">
              <span>Total</span>

              <span className="text-emerald-400">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-8 text-center text-xl font-semibold">
            Scan to Pay
          </h2>

          <div className="mx-auto flex h-72 w-72 items-center justify-center rounded-xl bg-white">
            <QrCode size={180} color="black" />
          </div>

          <p className="mt-6 text-center text-slate-400">
            Customer scans the QR code to complete payment.
          </p>

          <button
            disabled={processing || cart.length === 0}
            onClick={handlePayment}
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-4 text-lg font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? (
              <>Processing...</>
            ) : (
              <>
                <CheckCircle2 size={20} />
                Pay
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
