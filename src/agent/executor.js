import usePosStore from "@/store/usePosStore";

import { employees } from "@/mock/employees";
import { tables } from "@/mock/tables";
import { menu } from "@/mock/menu";

import orderService from "@/services/orderService";

import { TOOLS } from "./tools";

function findMenuItem(itemName) {
  if (!itemName) return null;

  const search = itemName.trim().toLowerCase();

  // Exact match
  let item = menu.find((m) => m.name.toLowerCase() === search);

  if (item) return item;

  // Partial match
  item = menu.find((m) => m.name.toLowerCase().includes(search));

  if (item) return item;

  // Reverse partial match
  item = menu.find((m) => search.includes(m.name.toLowerCase()));

  return item ?? null;
}

function findCategory(categoryName) {
  if (!categoryName) return null;

  const categories = [...new Set(menu.map((m) => m.category))];

  const search = categoryName.trim().toLowerCase();

  return (
    categories.find((c) => c.toLowerCase() === search) ??
    categories.find((c) => c.toLowerCase().includes(search)) ??
    categories.find((c) => search.includes(c.toLowerCase())) ??
    null
  );
}

export async function executePlan(plan) {
  const store = usePosStore.getState();

  const addTimeline = store.addTimeline;

  for (const step of plan.steps) {
    switch (step.tool) {
      case TOOLS.LOGIN: {
        addTimeline("🔐 Logging in...", "thinking");

        const employee = employees.find((e) => e.pin === step.arguments.pin);

        if (!employee) {
          addTimeline("❌ Invalid PIN.", "error");
          break;
        }

        store.login(employee);

        addTimeline(`✅ Logged in as ${employee.name}.`, "success");

        break;
      }

      case TOOLS.OPEN_TABLE: {
        addTimeline(`🪑 Opening Table ${step.arguments.table}...`, "thinking");

        const table = tables.find((t) => t.id === step.arguments.table);

        if (!table) {
          addTimeline("❌ Table not found.", "error");
          break;
        }

        store.selectTable(table);

        addTimeline(`✅ Opened ${table.name}.`, "success");

        break;
      }

      case TOOLS.SELECT_CATEGORY: {
        addTimeline(`📂 Opening ${step.arguments.category}...`, "thinking");

        const category = findCategory(step.arguments.category);

        if (!category) {
          addTimeline(
            `❌ Category "${step.arguments.category}" not found.`,
            "error",
          );
          break;
        }

        store.setSelectedCategory(category);

        addTimeline(`✅ Switched to ${category}.`, "success");

        break;
      }

      case TOOLS.ADD_ITEM: {
        addTimeline(
          `🍽 Adding ${step.arguments.quantity} ${step.arguments.item}...`,
          "thinking",
        );

        const item = findMenuItem(step.arguments.item);

        if (!item) {
          addTimeline(
            `❌ Menu item "${step.arguments.item}" not found.`,
            "error",
          );
          break;
        }

        for (let i = 0; i < step.arguments.quantity; i++) {
          orderService.addItem(item);
        }

        addTimeline(
          `✅ Added ${step.arguments.quantity} × ${item.name}.`,
          "success",
        );

        break;
      }

      case TOOLS.REMOVE_ITEM: {
        addTimeline(`🗑 Removing ${step.arguments.item}...`, "thinking");

        const item = findMenuItem(step.arguments.item);

        if (!item) {
          addTimeline(
            `❌ Menu item "${step.arguments.item}" not found.`,
            "error",
          );
          break;
        }

        for (let i = 0; i < step.arguments.quantity; i++) {
          orderService.removeItem(item.id);
        }

        addTimeline(
          `✅ Removed ${step.arguments.quantity} × ${item.name}.`,
          "success",
        );

        break;
      }

      case TOOLS.CLEAR_CART: {
        addTimeline("🧹 Clearing cart...", "thinking");

        orderService.clear();

        addTimeline("✅ Cart cleared.", "success");

        break;
      }

      case TOOLS.CHECKOUT: {
        addTimeline("💳 Checkout started...", "thinking");

        // Checkout implementation later

        addTimeline("✅ Checkout completed.", "success");

        break;
      }

      default: {
        addTimeline(`❌ Unknown tool: ${step.tool}`, "error");
      }
    }
  }
}
