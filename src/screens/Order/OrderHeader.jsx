"use client";

import usePosStore from "@/store/usePosStore";
import { ChefHat, User, ReceiptText, Clock3, LogOut } from "lucide-react";

export default function OrderHeader() {
  const employee = usePosStore((s) => s.currentEmployee);
  const table = usePosStore((s) => s.selectedTable);
  const logout = usePosStore((s) => s.logout);

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="h-20 border-b border-slate-700 bg-slate-900 px-8 flex items-center justify-between shadow-lg">
      {/* Logo */}

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
          <ChefHat className="h-7 w-7 text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Darden Restaurant AI POS
          </h1>

          <p className="text-sm text-slate-400">
            AI Powered Restaurant Ordering
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">
        {/* Live Time */}

        <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
            <Clock3 size={14} />
            Time
          </div>

          <div className="mt-1 font-semibold text-white">{time}</div>
        </div>

        {/* Table */}

        <div className="rounded-xl bg-blue-600 px-5 py-2 shadow-md">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-100">
            <ReceiptText size={14} />
            Table
          </div>

          <div className="mt-1 text-lg font-bold text-white">
            {table?.name ?? "--"}
          </div>
        </div>

        {/* Employee */}

        <div className="rounded-xl bg-emerald-600 px-5 py-2 shadow-md">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-100">
            <User size={14} />
            Cashier
          </div>

          <div className="mt-1 text-lg font-bold text-white">
            {employee?.name ?? "--"}
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-2

            rounded-xl

            border
            border-red-500

            px-4
            py-3

            text-red-400

            transition-all
            duration-200

            hover:bg-red-600
            hover:text-white
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
