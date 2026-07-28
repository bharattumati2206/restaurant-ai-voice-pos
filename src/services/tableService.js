import { tables } from "@/mock/tables";

const STORAGE_KEY = "restaurant_tables";

export function initializeTables() {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (existing) {
    return;
  }

  const initialTables = tables.map((table) => ({
    ...table,
    status: "AVAILABLE",
  }));

  initialTables.find((t) => t.id === 4).status = "DIRTY";
  initialTables.find((t) => t.id === 7).status = "DIRTY";
  initialTables.find((t) => t.id === 12).status = "DIRTY";

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTables));
}

export function getTables() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTables(tables) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
}

export function updateTableStatus(tableId, status) {
  const tables = getTables();

  const table = tables.find((t) => t.id === tableId);

  if (!table) return;

  table.status = status;

  saveTables(tables);
}
