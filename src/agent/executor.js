import usePosStore from "@/store/usePosStore";

import { employees } from "@/mock/employees";
import { tables } from "@/mock/tables";
import { menu } from "@/mock/menu";

import orderService from "@/services/orderService";
import paymentService from "@/services/paymentService";
import speechService from "@/services/speechService";

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

  // Speak overall plan once
  if (plan.summary) {
    speechService.summarize(plan.summary);
  }

  for (const step of plan.steps) {
    switch (step.tool) {
      case TOOLS.LOGIN: {
        speechService.announce({
          timeline: "🔐 Logging in...",
          speech: "Logging you in.",
          type: "thinking",
        });

        const employee = employees.find((e) => e.pin === step.arguments.pin);

        if (!employee) {
          speechService.announce({
            timeline: "❌ Invalid PIN.",
            speech: "Sorry, the PIN is invalid.",
            type: "error",
          });

          break;
        }

        store.login(employee);

        speechService.announce({
          timeline: `✅ Logged in as ${employee.name}.`,
          speech: `Welcome ${employee.name}.`,
          type: "success",
        });

        break;
      }

      case TOOLS.OPEN_TABLE: {
        speechService.announce({
          timeline: `🪑 Opening Table ${step.arguments.table}...`,
          speech: `Opening Table ${step.arguments.table}.`,
          type: "thinking",
        });

        const table = tables.find((t) => t.id === step.arguments.table);

        if (!table) {
          speechService.announce({
            timeline: "❌ Table not found.",
            speech: "Sorry, I couldn't find that table.",
            type: "error",
          });

          break;
        }

        store.selectTable(table);

        speechService.announce({
          timeline: `✅ Opened ${table.name}.`,
          speech: `${table.name} is ready.`,
          type: "success",
        });

        break;
      }

      case TOOLS.SELECT_CATEGORY: {
        speechService.announce({
          timeline: `📂 Opening ${step.arguments.category}...`,
          speech: `Opening ${step.arguments.category}.`,
          type: "thinking",
        });

        const category = findCategory(step.arguments.category);

        if (!category) {
          speechService.announce({
            timeline: `❌ Category "${step.arguments.category}" not found.`,
            speech: `Sorry, I couldn't find the ${step.arguments.category} category.`,
            type: "error",
          });

          break;
        }

        store.setSelectedCategory(category);

        speechService.announce({
          timeline: `✅ Switched to ${category}.`,
          speech: `${category} menu is open.`,
          type: "success",
        });

        break;
      }

      case TOOLS.ADD_ITEM: {
        speechService.announce({
          timeline: `🍽 Adding ${step.arguments.quantity} ${step.arguments.item}...`,
          speech: `Adding ${step.arguments.quantity} ${step.arguments.item}.`,
          type: "thinking",
        });

        const item = findMenuItem(step.arguments.item);

        if (!item) {
          speechService.announce({
            timeline: `❌ Menu item "${step.arguments.item}" not found.`,
            speech: `Sorry, I couldn't find ${step.arguments.item}.`,
            type: "error",
          });

          break;
        }

        for (let i = 0; i < step.arguments.quantity; i++) {
          orderService.addItem(item);
        }

        speechService.announce({
          timeline: `✅ Added ${step.arguments.quantity} × ${item.name}.`,
          speech: `${step.arguments.quantity} ${item.name} added.`,
          type: "success",
        });

        break;
      }
      case TOOLS.REMOVE_ITEM: {
        speechService.announce({
          timeline: `🗑 Removing ${step.arguments.quantity} ${step.arguments.item}...`,
          speech: `Removing ${step.arguments.quantity} ${step.arguments.item}.`,
          type: "thinking",
        });

        const item = findMenuItem(step.arguments.item);

        if (!item) {
          speechService.announce({
            timeline: `❌ Menu item "${step.arguments.item}" not found.`,
            speech: `Sorry, I couldn't find ${step.arguments.item}.`,
            type: "error",
          });

          break;
        }

        for (let i = 0; i < step.arguments.quantity; i++) {
          orderService.removeItem(item.id);
        }

        speechService.announce({
          timeline: `✅ Removed ${step.arguments.quantity} × ${item.name}.`,
          speech: `${step.arguments.quantity} ${item.name} removed.`,
          type: "success",
        });

        break;
      }

      case TOOLS.CLEAR_CART: {
        speechService.announce({
          timeline: "🧹 Clearing cart...",
          speech: "Clearing your cart.",
          type: "thinking",
        });

        orderService.clear();

        speechService.announce({
          timeline: "✅ Cart cleared.",
          speech: "Your cart has been cleared.",
          type: "success",
        });

        break;
      }

      case TOOLS.CHECKOUT: {
        speechService.announce({
          timeline: "💳 Opening Checkout...",
          speech: "Opening checkout.",
          type: "thinking",
        });

        const currentState = usePosStore.getState();

        if (!currentState.selectedTable) {
          speechService.announce({
            timeline: "❌ Please open a table first.",
            speech: "Please open a table first.",
            type: "error",
          });

          break;
        }

        if (currentState.cart.length === 0) {
          speechService.announce({
            timeline: "❌ Cart is empty.",
            speech: "Your cart is empty.",
            type: "error",
          });

          break;
        }

        currentState.navigate("CHECKOUT");

        speechService.announce({
          timeline: "✅ Checkout screen opened.",
          speech: "Checkout is ready.",
          type: "success",
        });

        break;
      }

      case TOOLS.PAY: {
        speechService.announce({
          timeline: "💳 Starting payment...",
          speech: "Processing your payment.",
          type: "thinking",
        });

        const state = usePosStore.getState();

        if (state.currentScreen !== "CHECKOUT") {
          speechService.announce({
            timeline: "❌ Payment can only be made from Checkout.",
            speech: "Payment can only be made from the checkout screen.",
            type: "error",
          });

          break;
        }

        if (state.cart.length === 0) {
          speechService.announce({
            timeline: "❌ Cart is empty.",
            speech: "Your cart is empty.",
            type: "error",
          });

          break;
        }

        await paymentService.pay();

        speechService.say("Done. Your payment was successful.");

        break;
      }

      default: {
        speechService.announce({
          timeline: `❌ Unknown tool: ${step.tool}`,
          speech: "Sorry, I don't know how to perform that action.",
          type: "error",
        });

        break;
      }
    }
  }
}
