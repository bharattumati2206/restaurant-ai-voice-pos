"use client";

import { useEffect, useState } from "react";
import { LogOut, Clock3, User } from "lucide-react";

import usePosStore from "@/store/usePosStore";

import { tables } from "@/mock/tables";

import TableCard from "./TableCard";

export default function TableScreen() {
  const employee = usePosStore((s) => s.currentEmployee);
  const selectTable = usePosStore((s) => s.selectTable);
  const logout = usePosStore((s) => s.logout);

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}

      <header className="h-20 border-b border-slate-700 bg-slate-900 px-8 flex items-center justify-between shadow-lg">
        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Darden Restaurant AI POS
          </h1>

          <p className="text-sm text-slate-400">Dining Tables</p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          {/* Time */}

          <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
              <Clock3 size={14} />
              Time
            </div>

            <div className="mt-1 font-semibold text-white">{time}</div>
          </div>

          {/* Cashier */}

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

      {/* Content */}

      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Select a Table</h2>

            <p className="mt-1 text-slate-400">
              Choose a table to begin ordering
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-slate-300">Available</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-slate-300">Occupied</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-slate-300">Dirty</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {tables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onClick={() => selectTable(table)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
