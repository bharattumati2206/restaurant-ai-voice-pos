"use client";

import { useEffect, useState } from "react";
import { LogOut, Clock3, User, ReceiptText } from "lucide-react";
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
  const [selectedClosedCheckId, setSelectedClosedCheckId] = useState(null);
  const selectedOpenCheckId = usePosStore((s) => s.selectedOpenCheckId);
  const setSelectedOpenCheckId = usePosStore((s) => s.setSelectedOpenCheckId);
  const setSelectedCheckoutCheck = usePosStore(
    (s) => s.setSelectedCheckoutCheck,
  );

  useEffect(() => {
    if (selectedOpenCheckId) {
      setSelectedCheckId(selectedOpenCheckId);
    }
  }, [selectedOpenCheckId]);
  const activeClass =
    "rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-950/40 transition-all";

  const normalClass =
    "rounded-xl bg-[#141A26]/80 border border-slate-700/50 px-4 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white";

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

    if (checks.length > 0) {
      const exists = checks.some((check) => check.id === selectedClosedCheckId);
      if (!exists) {
        setSelectedClosedCheckId(checks[0].id);
      }
    } else {
      setSelectedClosedCheckId(null);
    }
  };

  const selectedOpenCheck = openChecks.find((c) => c.id === selectedCheckId);
  const selectedClosedCheck = closedChecks.find((c) => c.id === selectedClosedCheckId);

  return (
    <div className="h-screen bg-gradient-to-b from-[#0F141C] via-[#0A0D14] to-[#07090E] flex flex-col overflow-hidden select-none">
      {/* Header */}

      <header className="h-16 border-b border-amber-500/10 bg-[#121722]/80 backdrop-blur-md px-6 flex items-center justify-between shadow-lg shrink-0">
        {/* Left */}

        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 text-lg font-extrabold tracking-wider uppercase">
              Restaurant AI POS
            </h1>

            <p className="text-[11px] text-slate-400 font-medium">Floor Dining & Open Checks</p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          {/* Time */}

          <div className="rounded-lg border border-slate-800 bg-[#0B0E14] px-3 py-1.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-amber-400/80 font-bold">
              <Clock3 size={12} />
              Time
            </div>

            <div className="mt-0.5 text-xs font-bold text-slate-200">{time}</div>
          </div>

          {/* Cashier */}

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

      {/* Content */}

      <div className="flex-1 flex flex-col p-5 overflow-hidden">
        <div className="mb-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white">Select a Table</h2>

            <p className="text-xs text-slate-400">
              Choose a table to begin ordering
            </p>
          </div>

          <div className="flex items-center gap-2">
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
          <div className="grid grid-cols-4 gap-4 overflow-y-auto pr-1">
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
          <div className="flex-1 grid grid-cols-10 gap-4 overflow-hidden max-h-[460px]">
            {/* Left 30% - Check Details Panel */}
            <div className="col-span-3 flex flex-col rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl overflow-hidden">
              {selectedOpenCheck ? (
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="border-b border-slate-800 pb-3 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        {selectedOpenCheck.tableName}
                      </span>
                      <span className="rounded-full bg-emerald-600/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        OPEN
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-white mt-1">
                      {selectedOpenCheck.id}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Created:{" "}
                      {new Date(selectedOpenCheck.createdAt).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto my-3 space-y-1.5 pr-1 custom-scrollbar">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Ordered Items ({selectedOpenCheck.items?.length || 0})
                    </p>
                    {selectedOpenCheck.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-800/40 p-2 text-xs"
                      >
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-[11px] text-slate-400">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-emerald-400 text-xs">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-2 text-xs shrink-0 space-y-1">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Subtotal</span>
                      <span className="text-slate-200">
                        ₹{selectedOpenCheck.total?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Tax (5%)</span>
                      <span className="text-slate-200">
                        ₹{(selectedOpenCheck.total * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-xs text-white border-t border-slate-800/60 pt-1.5 mt-1">
                      <span>Total</span>
                      <span className="text-emerald-400">
                        ₹{(selectedOpenCheck.total * 1.05).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCheckoutCheck(selectedOpenCheck);
                        navigate("CHECKOUT");
                      }}
                      className="mt-2 w-full rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md transition"
                    >
                      Proceed to Pay / Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <ReceiptText className="text-slate-700 mb-2" size={36} />
                  <p className="text-xs font-bold text-slate-300">
                    No Check Selected
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Click an open check from the list to view order details.
                  </p>
                </div>
              )}
            </div>

            {/* Right 70% - Checks List Table */}
            <div className="col-span-7 flex flex-col rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl overflow-hidden">
              <div className="mb-3 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {selectedCheckTable
                      ? `${selectedCheckTable.name} - Open Checks`
                      : "All Open Checks"}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {openChecks.length} Open Check(s)
                  </p>
                </div>

                {selectedCheckTable && (
                  <button
                    onClick={() => {
                      orderService.clear();
                      selectTable(selectedCheckTable);
                    }}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
                  >
                    + New Check
                  </button>
                )}
              </div>

              {openChecks.length > 0 ? (
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 bg-slate-900 z-10">
                      <tr className="uppercase tracking-wide text-slate-400 border-b border-slate-800">
                        <th className="pb-2.5">Check ID</th>
                        <th className="pb-2.5">Created</th>
                        <th className="pb-2.5">Items</th>
                        <th className="pb-2.5">Total</th>
                        <th className="pb-2.5">Action</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800/60">
                      {openChecks.map((check) => (
                        <tr
                          key={check.id}
                          onClick={() => setSelectedCheckId(check.id)}
                          className={`
  cursor-pointer transition

  ${selectedCheckId === check.id
                              ? "bg-blue-600/20 border-l-4 border-blue-500"
                              : "hover:bg-slate-800/60"
                            }
  `}
                        >
                          <td className="py-2.5 font-semibold text-white">
                            {check.id}
                          </td>

                          <td className="py-2.5 text-slate-300">
                            {new Date(check.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          <td className="py-2.5 text-slate-300">
                            {check.items.length} item(s)
                          </td>

                          <td className="py-2.5 font-semibold text-emerald-400">
                            ₹{check.total.toFixed(2)}
                          </td>

                          <td className="py-2.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCheckId(check.id);
                                setSelectedCheckoutCheck(check);
                                navigate("CHECKOUT");
                              }}
                              className="rounded-md bg-red-600/90 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-600"
                            >
                              Close
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-500">
                  No open checks found.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTableTab === "CLOSED_CHECKS" && (
          <div className="flex-1 grid grid-cols-10 gap-4 overflow-hidden max-h-[460px]">
            {/* Left 30% - Closed Check Details Panel */}
            <div className="col-span-3 flex flex-col rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl overflow-hidden">
              {selectedClosedCheck ? (
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="border-b border-slate-800 pb-3 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        {selectedClosedCheck.tableName}
                      </span>
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                        CLOSED
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-white mt-1">
                      {selectedClosedCheck.id}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Closed:{" "}
                      {selectedClosedCheck.closedAt
                        ? new Date(selectedClosedCheck.closedAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" },
                        )
                        : "--"}
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto my-3 space-y-1.5 pr-1 custom-scrollbar">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Purchased Items ({selectedClosedCheck.items?.length || 0})
                    </p>
                    {selectedClosedCheck.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-800/40 p-2 text-xs"
                      >
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-[11px] text-slate-400">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-emerald-400 text-xs">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-2 text-xs shrink-0 space-y-1">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Subtotal</span>
                      <span className="text-slate-200">
                        ₹{selectedClosedCheck.total?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Tax (5%)</span>
                      <span className="text-slate-200">
                        ₹{(selectedClosedCheck.total * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-xs text-white border-t border-slate-800/60 pt-1.5 mt-1">
                      <span>Total Paid</span>
                      <span className="text-emerald-400">
                        ₹{(selectedClosedCheck.total * 1.05).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <ReceiptText className="text-slate-700 mb-2" size={36} />
                  <p className="text-xs font-bold text-slate-300">
                    No Check Selected
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Click a closed check from the list to view historical items.
                  </p>
                </div>
              )}
            </div>

            {/* Right 70% - Closed Checks List Table */}
            <div className="col-span-7 flex flex-col rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl overflow-hidden">
              <div className="mb-3 shrink-0">
                <h2 className="text-lg font-bold text-white">Closed Checks</h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  {closedChecks.length} Closed Check(s)
                </p>
              </div>

              {closedChecks.length > 0 ? (
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 bg-slate-900 z-10">
                      <tr className="uppercase tracking-wide text-slate-400 border-b border-slate-800">
                        <th className="pb-2.5">Check ID</th>
                        <th className="pb-2.5">Table</th>
                        <th className="pb-2.5">Items</th>
                        <th className="pb-2.5">Total</th>
                        <th className="pb-2.5">Status</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800/60">
                      {closedChecks.map((check) => (
                        <tr
                          key={check.id}
                          onClick={() => setSelectedClosedCheckId(check.id)}
                          className={`
  cursor-pointer transition

  ${selectedClosedCheckId === check.id
                              ? "bg-slate-800/80 border-l-4 border-slate-400"
                              : "hover:bg-slate-800/40"
                            }
  `}
                        >
                          <td className="py-2.5 font-semibold text-white">
                            {check.id}
                          </td>

                          <td className="py-2.5 text-slate-300">{check.tableName}</td>

                          <td className="py-2.5 text-slate-300">
                            {check.items.length} item(s)
                          </td>

                          <td className="py-2.5 font-semibold text-emerald-400">
                            ₹{check.total.toFixed(2)}
                          </td>

                          <td className="py-2.5">
                            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                              CLOSED
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-500">
                  No closed checks found.
                </div>
              )}
            </div>
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
