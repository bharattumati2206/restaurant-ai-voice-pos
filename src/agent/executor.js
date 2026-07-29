import usePosStore from "@/store/usePosStore";

import { employees } from "@/mock/employees";
import { tables } from "@/mock/tables";
import { menu } from "@/mock/menu";

import orderService from "@/services/orderService";
import paymentService from "@/services/paymentService";
import speechService from "@/services/speechService";
import {
  createCheck,
  getChecks,
  closeCheck,
  hasOpenChecks,
} from "@/services/checkService";
import { getTables, updateTableStatus } from "@/services/tableService";

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

  // Synonym & variation mapping for Olive Garden categories
  if (
    search.includes("entree") ||
    search.includes("entrees") ||
    search.includes("classic") ||
    search.includes("main")
  ) {
    return "Classic Entrees";
  }
  if (
    search.includes("appetizer") ||
    search.includes("appetizers") ||
    search.includes("starter") ||
    search.includes("starters") ||
    search.includes("apps")
  ) {
    return "Appetizers";
  }
  if (
    search.includes("soup") ||
    search.includes("soups") ||
    search.includes("salad") ||
    search.includes("salads")
  ) {
    return "Soups & Salad";
  }
  if (
    search.includes("pasta") ||
    search.includes("cucina") ||
    search.includes("spaghetti")
  ) {
    return "Cucina Mia! Pasta";
  }
  if (
    search.includes("seafood") ||
    search.includes("steak") ||
    search.includes("steaks") ||
    search.includes("fish") ||
    search.includes("salmon")
  ) {
    return "Seafood & Steak";
  }
  if (
    search.includes("dessert") ||
    search.includes("desserts") ||
    search.includes("sweet") ||
    search.includes("sweets") ||
    search.includes("cake")
  ) {
    return "Desserts";
  }
  if (
    search.includes("drink") ||
    search.includes("drinks") ||
    search.includes("beverage") ||
    search.includes("beverages") ||
    search.includes("wine") ||
    search.includes("bar") ||
    search.includes("tea")
  ) {
    return "Beverages & Wine";
  }

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
          speech: `Checking Table ${step.arguments.table}.`,
          type: "thinking",
        });

        const tableId = step.arguments.table;
        const currentTables = getTables();
        const table =
          currentTables.find((t) => t.id === tableId) ||
          tables.find((t) => t.id === tableId);

        if (!table) {
          speechService.announce({
            timeline: "❌ Table not found.",
            speech: "Sorry, I couldn't find that table.",
            type: "error",
          });

          break;
        }

        if (table.status === "DIRTY") {
          speechService.announce({
            timeline: `⚠️ Table ${table.id} is dirty and being cleaned.`,
            speech: `Table ${table.id} is currently being cleaned. I'll let you know once it's ready.`,
            type: "error",
          });

          break;
        }

        if (table.status === "OCCUPIED") {
          store.setSelectedCheckTable(table);
          store.setActiveTableTab("OPEN_CHECKS");
          store.navigate("TABLES");

          speechService.announce({
            timeline: `📋 Table ${table.id} is occupied. Opening checks list.`,
            speech: `Table ${table.id} is currently occupied. Opening the checks list for you.`,
            type: "info",
          });

          break;
        }

        store.selectTable(table);

        speechService.announce({
          timeline: `✅ Opened ${table.name}.`,
          speech: `${table.name} is ready for ordering.`,
          type: "success",
        });

        break;
      }

      case TOOLS.SELECT_CATEGORY: {
        speechService.announce({
          timeline: `📂 Opening ${step.arguments.category}...`,
          speech: `Opening the ${step.arguments.category} menu.`,
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
          speech: `Here is the ${category} menu.`,
          type: "success",
        });

        break;
      }

      case TOOLS.ADD_ITEM: {
        const item = findMenuItem(step.arguments.item);

        if (!item) {
          speechService.announce({
            timeline: `❌ Menu item "${step.arguments.item}" not found.`,
            speech: `Sorry, I couldn't find ${step.arguments.item} on our menu.`,
            type: "error",
          });

          break;
        }

        const isEntreeWithSides =
          item.category === "Classic Entrees" || (item.modifiers && item.modifiers.length > 0);

        // If customization screen is active, check if requested item is a side option
        if (store.customizingItem && store.customizingItem.modifiers) {
          const sideName = step.arguments.item;
          let matchedOption = null;

          for (const group of store.customizingItem.modifiers) {
            const found = group.options?.find(
              (o) =>
                o.name.toLowerCase() === sideName.toLowerCase() ||
                o.name.toLowerCase().includes(sideName.toLowerCase()) ||
                sideName.toLowerCase().includes(o.name.toLowerCase()),
            );
            if (found) {
              matchedOption = found;
              break;
            }
          }

          if (matchedOption) {
            const customizingItem = store.customizingItem;
            const selectedModifiers = [];

            customizingItem.modifiers.forEach((group) => {
              const opt =
                group.options?.find(
                  (o) =>
                    o.name.toLowerCase() === sideName.toLowerCase() ||
                    o.name.toLowerCase().includes(sideName.toLowerCase()) ||
                    sideName.toLowerCase().includes(o.name.toLowerCase()),
                ) || group.options?.[0];

              if (opt) {
                selectedModifiers.push({
                  group: group.group,
                  option: opt.name,
                  price: opt.price || 0,
                });
              }
            });

            let totalPrice = customizingItem.price;
            selectedModifiers.forEach((m) => {
              totalPrice += m.price;
            });

            orderService.addItem(customizingItem, selectedModifiers, totalPrice);

            const sideText = selectedModifiers.map((m) => m.option).join(" and ");
            speechService.say(
              `Certainly! I've added ${customizingItem.name} with ${sideText} to your order.`,
            );
            store.addTimeline(
              `✅ Added ${customizingItem.name} with ${sideText}.`,
              "success",
            );
            store.setCustomizingItem(null);
            break;
          }
        }

        if (isEntreeWithSides) {
          // Open side customization view on UI for this entree
          store.setSelectedCategory(item.category || "Classic Entrees");
          store.setCustomizingItem(item);

          store.addTimeline(
            `📋 Mandatory sides required for ${item.name}.`,
            "info",
          );

          speechService.say(
            `Certainly! I've selected ${item.name}. Sides are mandatory for this entree — please choose your sides on screen to complete the item.`,
          );

          break;
        } else {
          for (let i = 0; i < step.arguments.quantity; i++) {
            orderService.addItem(item);
          }

          if (item.category) {
            store.setSelectedCategory(item.category);
          }

          store.addTimeline(
            `✅ Added ${step.arguments.quantity} × ${item.name}.`,
            "success",
          );

          const isMultiItemPlan =
            plan.steps.filter((s) => s.tool === TOOLS.ADD_ITEM).length > 1;

          if (!isMultiItemPlan) {
            speechService.say(
              `Certainly! I've added ${
                step.arguments.quantity > 1
                  ? `${step.arguments.quantity} ${item.name}s`
                  : item.name
              } to your order.`,
            );
          }
        }

        break;
      }

      case TOOLS.CONFIRM_MODIFIERS: {
        const customizingItem = store.customizingItem;

        if (!customizingItem) {
          speechService.announce({
            timeline: "ℹ️ No entree customization active.",
            speech: "There is no item customization currently active.",
            type: "info",
          });
          break;
        }

        let selectedModifiers = [];
        const sideName = step.arguments?.side;

        if (sideName && customizingItem.modifiers) {
          const searchSide = sideName.trim().toLowerCase();
          for (const group of customizingItem.modifiers) {
            const foundOpt = group.options?.find(
              (o) =>
                o.name.toLowerCase() === searchSide ||
                o.name.toLowerCase().includes(searchSide) ||
                searchSide.includes(o.name.toLowerCase()),
            );
            if (foundOpt) {
              selectedModifiers.push({
                group: group.group,
                option: foundOpt.name,
                price: foundOpt.price || 0,
              });
            }
          }
        }

        // If no specific side matched or specified, default to first required option per group
        if (selectedModifiers.length === 0 && customizingItem.modifiers) {
          customizingItem.modifiers.forEach((group) => {
            if (group.options?.length > 0) {
              selectedModifiers.push({
                group: group.group,
                option: group.options[0].name,
                price: group.options[0].price || 0,
              });
            }
          });
        }

        let totalPrice = customizingItem.price;
        selectedModifiers.forEach((m) => {
          totalPrice += m.price;
        });

        orderService.addItem(customizingItem, selectedModifiers, totalPrice);

        const sideText = selectedModifiers.map((m) => m.option).join(" and ");
        const confirmationSpeech = sideText
          ? `Certainly! I've added ${customizingItem.name} with ${sideText} to your order.`
          : `Certainly! I've added ${customizingItem.name} to your order.`;

        store.addTimeline(
          `✅ Added ${customizingItem.name} with sides to order.`,
          "success",
        );

        speechService.say(confirmationSpeech);

        // Reset customization state & return to menu
        store.setCustomizingItem(null);
        break;
      }

      case TOOLS.REMOVE_ITEM: {
        speechService.announce({
          timeline: `🗑 Removing ${step.arguments.quantity} ${step.arguments.item}...`,
          speech: `Removing ${step.arguments.item}.`,
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
          speech: `Sure, I've removed ${step.arguments.quantity} ${item.name} from your order.`,
          type: "success",
        });

        break;
      }

      case TOOLS.CLEAR_CART: {
        speechService.announce({
          timeline: "🧹 Clearing cart...",
          speech: "Clearing your order.",
          type: "thinking",
        });

        orderService.clear();

        speechService.announce({
          timeline: "✅ Cart cleared.",
          speech: "Your order has been cleared.",
          type: "success",
        });

        break;
      }

      case TOOLS.SEND_TO_KITCHEN: {
        speechService.announce({
          timeline: "📤 Sending order to kitchen...",
          speech: "Submitting order to the kitchen.",
          type: "thinking",
        });

        const currentState = usePosStore.getState();

        if (!currentState.selectedTable) {
          speechService.announce({
            timeline: "❌ Please open a table first.",
            speech: "Please select a table before sending an order.",
            type: "error",
          });

          break;
        }

        if (currentState.cart.length === 0) {
          speechService.announce({
            timeline: "❌ Cart is empty.",
            speech: "Your order cart is currently empty.",
            type: "error",
          });

          break;
        }

        createCheck(currentState.selectedTable, currentState.cart);

        updateTableStatus(currentState.selectedTable.id, "OCCUPIED");

        currentState.setSelectedCheckTable(currentState.selectedTable);
        currentState.setActiveTableTab("OPEN_CHECKS");

        orderService.clear();

        currentState.navigate("TABLES");

        speechService.announce({
          timeline: "✅ Order sent to kitchen.",
          speech:
            "Order submitted! I've sent that right over to the kitchen for you.",
          type: "success",
        });

        break;
      }

      case TOOLS.SHOW_TABLES: {
        speechService.announce({
          timeline: "🗺 Opening Tables floor map...",
          speech: "Opening the dining room floor map for you.",
          type: "thinking",
        });

        const currentState = usePosStore.getState();
        currentState.setActiveTableTab("TABLES");
        currentState.navigate("TABLES");

        speechService.announce({
          timeline: "✅ Floor map opened.",
          speech: "Here is the dining room floor map.",
          type: "success",
        });

        break;
      }

      case TOOLS.VIEW_OPEN_CHECKS: {
        speechService.announce({
          timeline: "📋 Opening active checks list...",
          speech: "Certainly! Opening the active checks list for you.",
          type: "thinking",
        });

        const currentState = usePosStore.getState();

        if (step.arguments?.table) {
          const currentTables = getTables();
          const table =
            currentTables.find((t) => t.id === step.arguments.table) ||
            tables.find((t) => t.id === step.arguments.table);

          if (table) {
            currentState.setSelectedCheckTable(table);
          }
        } else {
          currentState.setSelectedCheckTable(null);
        }

        currentState.setActiveTableTab("OPEN_CHECKS");
        currentState.navigate("TABLES");

        speechService.announce({
          timeline: "✅ Viewing open checks.",
          speech: "Here are the open checks.",
          type: "success",
        });

        break;
      }

      case TOOLS.VIEW_CLOSED_CHECKS: {
        speechService.announce({
          timeline: "📜 Opening closed check history...",
          speech: "Certainly! Opening the closed check history for you.",
          type: "thinking",
        });

        const currentState = usePosStore.getState();

        currentState.setActiveTableTab("CLOSED_CHECKS");
        currentState.navigate("TABLES");

        speechService.announce({
          timeline: "✅ Viewing closed checks.",
          speech: "Here is the closed check history.",
          type: "success",
        });

        break;
      }

      case TOOLS.CLOSE_CHECK: {
        const currentState = usePosStore.getState();
        const allOpenChecks = getChecks().filter((c) => c.status === "OPEN");

        if (allOpenChecks.length === 0) {
          speechService.announce({
            timeline: "❌ No open checks found.",
            speech: "There are currently no open checks in the system.",
            type: "error",
          });

          break;
        }

        let matchedChecks = [...allOpenChecks];

        // Filter by table if specified or currently selected
        const tableId =
          step.arguments?.table ?? (currentState.selectedTable ? currentState.selectedTable.id : null);

        if (tableId && matchedChecks.some((c) => c.tableId === tableId)) {
          matchedChecks = matchedChecks.filter((c) => c.tableId === tableId);
        }

        // Filter by checkId (full or trailing digits)
        if (step.arguments?.checkId) {
          const query = String(step.arguments.checkId).trim().toLowerCase();
          const idMatches = matchedChecks.filter(
            (c) =>
              c.id.toLowerCase() === query ||
              c.id.toLowerCase().endsWith(query) ||
              c.id.toLowerCase().includes(query),
          );

          if (idMatches.length > 0) {
            matchedChecks = idMatches;
          }
        }

        // Apply modifier if present ("latest", "oldest", "first", "last")
        if (step.arguments?.modifier && matchedChecks.length > 1) {
          const mod = String(step.arguments.modifier).toLowerCase();

          if (mod === "latest" || mod === "last") {
            matchedChecks.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
            matchedChecks = [matchedChecks[0]];
          } else if (mod === "oldest" || mod === "first") {
            matchedChecks.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            );
            matchedChecks = [matchedChecks[0]];
          }
        }

        // Ambiguity check
        if (matchedChecks.length > 1) {
          const checkSummaries = matchedChecks
            .map((c) => `check ending in ${c.id.slice(-4)} for ${c.tableName}`)
            .join(" or ");

          speechService.announce({
            timeline: `❓ Multiple checks found (${matchedChecks.length}).`,
            speech: `I found multiple matching open checks: ${checkSummaries}. Which one would you like to close?`,
            type: "info",
          });

          break;
        }

        if (matchedChecks.length === 0) {
          speechService.announce({
            timeline: "❌ Check not found.",
            speech:
              "Sorry, I couldn't find an open check matching that information.",
            type: "error",
          });

          break;
        }

        const selectedCheck = matchedChecks[0];

        currentState.setSelectedCheckoutCheck(selectedCheck);
        currentState.navigate("CHECKOUT");

        speechService.announce({
          timeline: `✅ Checkout ready for ${selectedCheck.tableName} (${selectedCheck.id}).`,
          speech: `You're all set. Let me open up checkout for ${selectedCheck.tableName}.`,
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
          const openChecks = getChecks().filter(
            (c) =>
              c.status === "OPEN" &&
              c.tableId === currentState.selectedTable.id,
          );

          if (openChecks.length > 0) {
            currentState.setSelectedCheckoutCheck(openChecks[0]);
            currentState.navigate("CHECKOUT");

            speechService.announce({
              timeline: "✅ Checkout screen opened.",
              speech: "Checkout is ready.",
              type: "success",
            });

            break;
          }

          speechService.announce({
            timeline: "❌ Cart is empty.",
            speech: "Your order cart is currently empty.",
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
          speech: "Processing your payment now.",
          type: "thinking",
        });

        const state = usePosStore.getState();

        // Auto-navigate to CHECKOUT screen if not already there
        if (state.currentScreen !== "CHECKOUT") {
          state.navigate("CHECKOUT");
        }

        let check = state.selectedCheckoutCheck;

        // If no checkout check currently selected, try finding active open check for selectedTable or latest open check
        if (!check || !check.items || check.items.length === 0) {
          const allOpen = getChecks().filter((c) => c.status === "OPEN");
          if (state.selectedTable) {
            const tableCheck = allOpen.find((c) => c.tableId === state.selectedTable.id);
            if (tableCheck) check = tableCheck;
          }
          if (!check && allOpen.length > 0) {
            check = allOpen[0];
          }
        }

        if (!check || !check.items || check.items.length === 0) {
          if (state.cart.length > 0) {
            await paymentService.pay();

            orderService.clear();
            state.navigate("TABLES");

            speechService.announce({
              timeline: "✅ Payment completed successfully.",
              speech: "Thank you! Your payment has been completed successfully.",
              type: "success",
            });

            break;
          }

          speechService.announce({
            timeline: "❌ No active check or order ready for payment.",
            speech: "There is currently no check or order ready for payment.",
            type: "error",
          });

          break;
        }

        await paymentService.pay();

        closeCheck(check.id);

        if (!hasOpenChecks(check.tableId)) {
          updateTableStatus(check.tableId, "AVAILABLE");
        }

        state.setSelectedCheckoutCheck(null);
        state.navigate("TABLES");

        speechService.announce({
          timeline: `✅ Payment completed for ${check.id}. Table freed.`,
          speech: "Thank you! Your payment has been completed successfully.",
          type: "success",
        });

        break;
      }

      case TOOLS.SELECT_CHECK: {
        speechService.announce({
          timeline: "🔍 Selecting check...",
          speech: "Selecting check for you.",
          type: "thinking",
        });

        const currentState = usePosStore.getState();
        const allOpen = getChecks().filter((c) => c.status === "OPEN");

        if (allOpen.length === 0) {
          speechService.announce({
            timeline: "❌ No open checks found.",
            speech: "There are currently no open checks in the system.",
            type: "error",
          });
          break;
        }

        let matched = [...allOpen];

        // Filter by checkId (full or trailing digits like ending in 2345 or 5821)
        if (step.arguments?.checkId) {
          const query = String(step.arguments.checkId).trim().toLowerCase();
          const matches = matched.filter(
            (c) =>
              c.id.toLowerCase() === query ||
              c.id.toLowerCase().endsWith(query) ||
              c.id.toLowerCase().includes(query),
          );
          if (matches.length > 0) {
            matched = matches;
          }
        }

        // Filter by table if specified
        if (step.arguments?.table) {
          const tMatches = matched.filter((c) => c.tableId === step.arguments.table);
          if (tMatches.length > 0) {
            matched = tMatches;
          }
        }

        if (matched.length === 0) {
          speechService.announce({
            timeline: "❌ Check not found.",
            speech: "Sorry, I couldn't find an open check matching that ID.",
            type: "error",
          });
          break;
        }

        const targetCheck = matched[0];

        // Set active tab to OPEN_CHECKS, set selected check, and navigate to TABLES screen
        currentState.setActiveTableTab("OPEN_CHECKS");
        currentState.setSelectedOpenCheckId(targetCheck.id);
        currentState.navigate("TABLES");

        const last4Digits = targetCheck.id.slice(-4);
        speechService.announce({
          timeline: `✅ Selected check ending in ${last4Digits}.`,
          speech: `Selected check ending in ${last4Digits} for ${targetCheck.tableName}.`,
          type: "success",
        });

        break;
      }

      case TOOLS.LOGOUT: {
        speechService.announce({
          timeline: "🔒 Logging out...",
          speech: "Logging out of your account.",
          type: "thinking",
        });

        const currentState = usePosStore.getState();
        currentState.logout();

        speechService.announce({
          timeline: "✅ Logged out successfully.",
          speech: "You have been logged out. Have a great day!",
          type: "success",
        });

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
