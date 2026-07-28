const STORAGE_KEY = "restaurant_checks";

export function initializeChecks() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

export function getChecks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveChecks(checks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
}

export function createCheck(table, cart) {
  const checks = getChecks();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const check = {
    id: `CHK-${Date.now()}`,
    tableId: table.id,
    tableName: table.name,
    status: "OPEN",
    createdAt: new Date().toISOString(),
    items: [...cart],
    total,
  };

  checks.push(check);

  saveChecks(checks);

  return check;
}

export function closeCheck(checkId) {
  const checks = getChecks();

  const updatedChecks = checks.map((check) =>
    check.id === checkId
      ? {
          ...check,
          status: "CLOSED",
          closedAt: new Date().toISOString(),
        }
      : check,
  );

  saveChecks(updatedChecks);

  return updatedChecks.find((check) => check.id === checkId);
}

export function hasOpenChecks(tableId) {
  return getChecks().some(
    (check) => check.tableId === tableId && check.status === "OPEN",
  );
}
