"use client";

import usePosStore from "@/store/usePosStore";
import { ChefHat, User, ReceiptText, Clock3, LogOut } from "lucide-react";
import orderService from "../../services/orderService";

export default function OrderHeader() {
  const employee = usePosStore((s) => s.currentEmployee);
  const table = usePosStore((s) => s.selectedTable);
  const logout = usePosStore((s) => s.logout);
  const navigate = usePosStore((s) => s.navigate);

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="h-16 border-b border-amber-500/10 bg-[#262d3f]/80 backdrop-blur-md px-6 flex items-center justify-between shadow-lg shrink-0 select-none">
      {/* Logo */}

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-md shadow-amber-950/50">
          <ChefHat className="h-5 w-5 text-slate-950" />
        </div>

        <div>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 text-lg font-extrabold tracking-wider uppercase">
            Restaurant AI POS
          </h1>

          <p className="text-[11px] text-slate-400 font-medium">
            Executive Restaurant Ordering
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-3">
        {/* Live Time */}

        <div className="rounded-lg border border-slate-700 bg-[#1c2130] px-3 py-1.5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-amber-400/80 font-bold">
            <Clock3 size={12} />
            Time
          </div>

          <div className="mt-0.5 text-xs font-bold text-slate-200">{time}</div>
        </div>

        {/* Table */}

        <div
          onClick={() => {
            orderService.clear();
            navigate("TABLES");
          }}
          className="cursor-pointer rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 shadow-sm transition hover:bg-emerald-500/30 active:scale-95"
        >
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
            <ReceiptText size={12} />
            Table
          </div>

          <div className="mt-0.5 text-xs font-extrabold text-emerald-200">
            {table?.name ?? "--"}
          </div>
        </div>

        {/* Employee */}

        <div className="rounded-lg bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-amber-300 font-bold">
            <User size={12} />
            Cashier
          </div>

          <div className="mt-0.5 text-xs font-extrabold text-amber-100">
            {employee?.name ?? "--"}
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-1.5

            rounded-lg

            border
            border-rose-500/40
            bg-rose-500/10

            px-3
            py-2

            text-xs
            font-bold
            text-rose-300

            transition-all
            duration-200

            hover:bg-rose-600
            hover:text-white
            active:scale-95
          "
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
