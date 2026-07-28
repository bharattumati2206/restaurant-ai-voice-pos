"use client";

import { useEffect, useState } from "react";
import { LogOut, Clock3, User } from "lucide-react";
import usePosStore from "@/store/usePosStore";
import { initializeTables, getTables } from "../../services/tableService";
import { initializeChecks, getChecks } from "../../services/checkService";
import orderService from "../../services/orderService";
import TableCard from "./TableCard";

export default function TableScreen() {
  const employee = usePosStore((s) => s.currentEmployee);
  const selectTable = usePosStore((s) => s.selectTable);
  const logout = usePosStore((s) => s.logout);
  const activeTableTab = usePosStore((s) => s.activeTableTab);
  const setActiveTableTab = usePosStore((s) => s.setActiveTableTab);
  const [time, setTime] = useState("");
  const [showDirtyModal, setShowDirtyModal] = useState(false);
  const [tableList, setTableList] = useState([]);
  const currentScreen = usePosStore((s) => s.currentScreen);
  const setSelectedCheckTable = usePosStore((s) => s.setSelectedCheckTable);
  const [openChecks, setOpenChecks] = useState([]);
  const [closedChecks, setClosedChecks] = useState([]);
  const selectedCheckTable = usePosStore((s) => s.selectedCheckTable);
  const navigate = usePosStore((s) => s.navigate);
  const [selectedCheckId, setSelectedCheckId] = useState(null);
  const setSelectedCheckoutCheck = usePosStore(
    (s) => s.setSelectedCheckoutCheck,
  );
  const activeClass =
    "rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white transition-all";

  const normalClass =
    "rounded-xl bg-slate-800 px-5 py-2 font-semibold text-slate-300 transition-all hover:bg-slate-700";

  useEffect(() => {
    initializeTables();
    initializeChecks();
    setTableList(getTables());

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

  useEffect(() => {
    console.log("TableScreen useEffect");
    if (currentScreen !== "TABLES") {
      return;
    }

    setTableList(getTables());

    if (activeTableTab === "OPEN_CHECKS") {
      if (selectedCheckTable) {
        loadOpenChecks(selectedCheckTable.id);
      } else {
        loadOpenChecks();
      }
    }
    if (activeTableTab === "CLOSED_CHECKS") {
      loadClosedChecks();
    }
  }, [currentScreen, activeTableTab, selectedCheckTable]);

  const loadOpenChecks = (tableId = null) => {
    const checks = getChecks().filter((check) => {
      if (check.status !== "OPEN") {
        return false;
      }

      if (tableId) {
        return check.tableId === tableId;
      }

      return true;
    });

    setOpenChecks(checks);

    if (checks.length === 0) {
      setSelectedCheckId(null);

      // If we were viewing a specific table,
      // return to the Tables tab because there
      // are no more open checks.
      if (selectedCheckTable) {
        setActiveTableTab("TABLES");
      }

      return;
    }

    const exists = checks.some((check) => check.id === selectedCheckId);

    if (!exists) {
      setSelectedCheckId(checks[0].id);
    }
  };

  const loadClosedChecks = (tableId = null) => {
    const checks = getChecks().filter((check) => {
      if (check.status !== "CLOSED") {
        return false;
      }

      if (tableId) {
        return check.tableId === tableId;
      }

      return true;
    });

    setClosedChecks(checks);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}

      <header className="h-20 border-b border-slate-700 bg-slate-900 px-8 flex items-center justify-between shadow-lg">
        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Restaurant AI POS
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

          <div className="rounded-xl bg-yellow-600 px-5 py-2 shadow-md">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-yellow-100">
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTableTab("TABLES")}
              className={
                activeTableTab === "TABLES" ? activeClass : normalClass
              }
            >
              Tables
            </button>

            <button
              onClick={() => {
                setSelectedCheckTable(null);
                loadOpenChecks();
                setActiveTableTab("OPEN_CHECKS");
              }}
              className={
                activeTableTab === "OPEN_CHECKS" ? activeClass : normalClass
              }
            >
              Open Checks
            </button>

            <button
              onClick={() => setActiveTableTab("CLOSED_CHECKS")}
              className={
                activeTableTab === "CLOSED_CHECKS" ? activeClass : normalClass
              }
            >
              Closed Checks
            </button>
          </div>
        </div>

        {activeTableTab === "TABLES" && (
          <div className="grid grid-cols-4 gap-6">
            {tableList.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                onClick={() => {
                  // Dirty Table
                  if (table.status === "DIRTY") {
                    setShowDirtyModal(true);
                    return;
                  }

                  // Available Table -> Start New Order
                  if (table.status === "AVAILABLE") {
                    selectTable(table);
                    return;
                  }

                  // Occupied Table -> Show Open Checks
                  if (table.status === "OCCUPIED") {
                    setSelectedCheckTable(table);

                    loadOpenChecks(table.id);
                    setActiveTableTab("OPEN_CHECKS");
                  }
                }}
              />
            ))}
          </div>
        )}

        {activeTableTab === "OPEN_CHECKS" && (
          <div className="rounded-2xl bg-slate-900 p-6 shadow-xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedCheckTable
                    ? `${selectedCheckTable.name} - Open Checks`
                    : "All Open Checks"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {openChecks.length} Open Check(s)
                </p>
              </div>

              {selectedCheckTable && (
                <button
                  onClick={() => {
                    orderService.clear();
                    selectTable(selectedCheckTable);
                  }}
                  className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  + New Check
                </button>
              )}
            </div>

            {openChecks.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm uppercase tracking-wide text-slate-400">
                    <th className="pb-4">Check ID</th>
                    <th className="pb-4">Created</th>
                    <th className="pb-4">Items</th>
                    <th className="pb-4">Total</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {openChecks.map((check) => (
                    <tr
                      key={check.id}
                      onClick={() => setSelectedCheckId(check.id)}
                      className={`
cursor-pointer transition

${
  selectedCheckId === check.id
    ? "bg-blue-600/20 border-l-4 border-blue-500"
    : "hover:bg-slate-800"
}
`}
                    >
                      <td className="py-4 font-semibold text-white">
                        {check.id}
                      </td>

                      <td className="py-4 text-slate-300">
                        {new Date(check.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="py-4 text-slate-300">
                        {check.items.length}
                      </td>

                      <td className="py-4 font-semibold text-emerald-400">
                        ₹{check.total.toFixed(2)}
                      </td>

                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                            OPEN
                          </span>

                          {selectedCheckId === check.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();

                                const check = openChecks.find(
                                  (c) => c.id === selectedCheckId,
                                );

                                if (!check) {
                                  return;
                                }

                                setSelectedCheckoutCheck(check);

                                navigate("CHECKOUT");
                              }}
                              className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                            >
                              Close
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-10 text-center text-slate-500">
                No open checks found.
              </div>
            )}
          </div>
        )}

        {activeTableTab === "CLOSED_CHECKS" && (
          <div className="rounded-2xl bg-slate-900 p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Closed Checks</h2>

              <p className="mt-1 text-sm text-slate-400">
                {closedChecks.length} Closed Check(s)
              </p>
            </div>

            {closedChecks.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm uppercase tracking-wide text-slate-400">
                    <th className="pb-4">Check ID</th>
                    <th className="pb-4">Table</th>
                    <th className="pb-4">Items</th>
                    <th className="pb-4">Total</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {closedChecks.map((check) => (
                    <tr key={check.id} className="border-b border-slate-800">
                      <td className="py-4 font-semibold text-white">
                        {check.id}
                      </td>

                      <td className="py-4 text-slate-300">{check.tableName}</td>

                      <td className="py-4 text-slate-300">
                        {check.items.length}
                      </td>

                      <td className="py-4 font-semibold text-emerald-400">
                        ₹{check.total.toFixed(2)}
                      </td>

                      <td className="py-4">
                        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-white">
                          CLOSED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-10 text-center text-slate-500">
                No closed checks found.
              </div>
            )}
          </div>
        )}
      </div>

      {showDirtyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[420px] rounded-2xl bg-slate-900 p-6 shadow-2xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white">Table Unavailable</h2>

            <p className="mt-4 text-slate-300">Cleaning in progress.</p>

            <p className="mt-1 text-slate-500 text-sm">
              Please select another table.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDirtyModal(false)}
                className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
