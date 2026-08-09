import { askGemini } from "@/services/geminiService";
import { menu } from "@/mock/menu";
import { TOOLS } from "./tools";

/**
 * --------------------------------------------------
 * Builds a spoken summary of the execution plan
 * --------------------------------------------------
 */
function buildPlanSummary(steps) {
  if (!steps?.length) {
    return "Certainly! I'll take care of that for you.";
  }

  const addSteps = steps.filter((s) => s.tool === TOOLS.ADD_ITEM);

  if (addSteps.length > 3 && steps.length === addSteps.length) {
    return "Certainly! I've added all requested items to your order.";
  }

  const actions = [];

  for (const step of steps) {
    switch (step.tool) {
      case TOOLS.LOGIN:
        actions.push("log you in");
        break;

      case TOOLS.OPEN_TABLE:
        actions.push(`open Table ${step.arguments.table}`);
        break;

      case TOOLS.SELECT_CATEGORY:
        actions.push(`open the ${step.arguments.category} menu`);
        break;

      case TOOLS.ADD_ITEM:
        actions.push(
          step.arguments.quantity > 1
            ? `${step.arguments.quantity} ${step.arguments.item}s`
            : `${step.arguments.item}`,
        );
        break;

      case TOOLS.REMOVE_ITEM:
        actions.push(
          `remove ${step.arguments.quantity} ${step.arguments.item}`,
        );
        break;

      case TOOLS.CLEAR_CART:
        actions.push("clear the current order");
        break;

      case TOOLS.SEND_TO_KITCHEN:
        actions.push("send the order to the kitchen");
        break;

      case TOOLS.VIEW_OPEN_CHECKS:
        actions.push(
          step.arguments?.table
            ? `view open checks for Table ${step.arguments.table}`
            : "open the active checks list",
        );
        break;

      case TOOLS.VIEW_CLOSED_CHECKS:
        actions.push("view closed check history");
        break;

      case TOOLS.CLOSE_CHECK:
        actions.push(
          step.arguments?.table
            ? `close the check for Table ${step.arguments.table}`
            : step.arguments?.checkId
            ? `close check ending in ${step.arguments.checkId}`
            : "close the check",
        );
        break;

      case TOOLS.CHECKOUT:
        actions.push("proceed to checkout");
        break;

      case TOOLS.PAY:
        actions.push("complete your payment");
        break;

      case TOOLS.CONFIRM_MODIFIERS:
        actions.push(
          step.arguments?.side
            ? `add item with ${step.arguments.side} to your order`
            : "add the item with sides to your order",
        );
        break;

      case TOOLS.SHOW_TABLES:
        actions.push("view the dining room floor map");
        break;

      case TOOLS.LOGOUT:
        actions.push("log out of your account");
        break;

      case TOOLS.SELECT_CHECK:
        actions.push(
          step.arguments?.checkId
            ? `select check ending in ${step.arguments.checkId}`
            : "select the check",
        );
        break;

      default:
        break;
    }
  }

  if (addSteps.length > 0 && addSteps.length === steps.length) {
    return `Certainly! I'll add ${actions.join(", ")} to your order.`;
  }

  return `Certainly! I'll ${actions.join(", ")}.`;
}

export async function planCommand(command) {
  const availableTools = Object.values(TOOLS)
    .map((tool) => `- ${tool}`)
    .join("\n");

  //==========================================
  // Build Menu grouped by Category
  //==========================================

  const categories = [...new Set(menu.map((item) => item.category))];

  const menuItems = categories
    .map((category) => {
      const items = menu
        .filter((item) => item.category === category)
        .map((item) => {
          let line = `  - ${item.name}`;
          if (item.modifiers && item.modifiers.length > 0) {
            const opts = item.modifiers
              .map((g) => g.options?.map((o) => o.name).join(", "))
              .join(", ");
            line += ` [Sides/Options: ${opts}]`;
          }
          return line;
        })
        .join("\n");

      return `${category}\n${items}`;
    })
    .join("\n\n");

  //==========================================
  // Planner Prompt
  //==========================================

  const prompt = `
You are an AI Planner for a Restaurant POS application.

Your ONLY responsibility is to convert the user's voice command into a JSON execution plan.

IMPORTANT RULES

1. Return ONLY valid JSON.

2. Never wrap the JSON inside markdown.

3. Never explain your reasoning.

4. Never return text outside the JSON.

5. Only use the tools listed below.

6. Always choose the closest matching menu item or side option from the available menu.

7. If the user specifies sides or modifiers (e.g. "Extra Cheese on Chicken", "Sub Grilled Chicken", "Famous House Salad", "House Salad", "Gluten-Free Rotini", "Zuppa Toscana"), use the CONFIRM_MODIFIERS tool with arguments {"side": "The Spoken Side Name"}.

8. If the user says:

- Coke → Coca-Cola
- Fries → French Fries
- Cheeseburger → Classic Cheeseburger
- Burger → Classic Cheeseburger

9. If the user asks to:

- open
- show
- switch
- navigate
- change category

then use:

SELECT_CATEGORY

10. Menu item names returned in JSON MUST exactly match one of the available menu items.

11. Category names returned in JSON MUST exactly match one of the available categories.

12. A single user command may require multiple steps.

13. Preserve the order of execution.

13. If you cannot understand the command, return:

{
  "steps":[]
}

==================================================
Available Tools
==================================================

${availableTools}

==================================================
Tool Definitions
==================================================

LOGIN

Arguments

{
  "pin":"1234"
}

----------------------------

OPEN_TABLE

Arguments

{
  "table":2
}

----------------------------

SELECT_CATEGORY

Use when the user asks to open, show, view, or switch to a category.
Valid Category Names:
- "Appetizers" (starters, small plates, apps)
- "Soups & Salad" (soups, salad, salad bowl)
- "Classic Entrees" (classic entrees, entrees, main course, classics)
- "Cucina Mia! Pasta" (pasta, pasta bowl, cucina mia)
- "Seafood & Steak" (seafood, steaks, fish, steak)
- "Desserts" (desserts, sweets)
- "Beverages & Wine" (drinks, beverages, wine, drinks menu)

Arguments

{
  "category":"Classic Entrees"
}

----------------------------

ADD_ITEM

Arguments

{
  "item":"Tour of Italy",
  "quantity":1
}

----------------------------

REMOVE_ITEM

Arguments

{
  "item":"Tour of Italy",
  "quantity":1
}

----------------------------

CLEAR_CART

Arguments

{}

----------------------------

SEND_TO_KITCHEN

Use when the user asks to send order to kitchen, submit order to kitchen, or place order.

Arguments

{}

----------------------------

VIEW_OPEN_CHECKS

Use when the user asks to show open checks, view open checks, view checks, go to open checks, navigate to open checks, display open checks, show active checks, current open orders, or outstanding checks.

Arguments

{
  "table":5
}

----------------------------

VIEW_CLOSED_CHECKS

Use when the user asks to show closed checks, view closed checks, show completed checks, paid checks, finished checks, completed orders, history, or check history.

Arguments

{}

----------------------------

CLOSE_CHECK

Use when the user asks to:
- close this check
- close the check
- close the selected check
- close check for table X (with specific table)
- close table X (with specific table number)
- checkout table X (with specific table)
- close check ending in 2345 (with specific check ID)
- close check 2345 (with specific check ID)
- select check 2345 (with specific check ID)
- open check 2345 (with specific check ID)
- choose check ending 2345 (with specific check ID)
- select last check (with modifier)
- select first check (with modifier)
- open latest check (with modifier)
- open oldest check (with modifier)
- can you please close this check
- please close this check
- close it
- close this

Arguments

{
  "table":5,
  "checkId":"2345",
  "modifier":"latest"
}

----------------------------

CHECKOUT

Arguments

{}

----------------------------

CONFIRM_MODIFIERS

Use when the user is customizing an entree item and says:
- "side added"
- "ok i have added the side"
- "i have added the side"
- "add to order"
- "add this side to order"
- "can you add to order"
- "confirm side"
- "done selecting sides"
- "add with house salad"
- "house salad"
- "zuppa toscana"
- "spaghetti marinara"

Arguments

{
  "side": "Famous House Salad"
}

----------------------------

SHOW_TABLES

Use when the user asks to:
- go to tables
- can you go to tables
- show tables
- open tables
- select tables
- view tables
- tables
- dining room
- floor map
- back to tables
- go back to tables
- show floor map
- table map
- view dining floor

Arguments

{}

----------------------------

SELECT_CHECK

Use when the user asks to select, view, or highlight a specific check ending in 4 digits (without checking it out), e.g.:
- "select check ending in 2345"
- "select check 2345"
- "open check 2345"
- "choose check 2345"
- "highlight check ending in 2345"

Arguments

{
  "checkId": "2345"
}

----------------------------

LOGOUT

Use when the user asks to:
- logout
- log out
- sign out
- log off
- exit account
- lock session

Arguments

{}

==================================================
Available Menu
==================================================

${menuItems}

==================================================
Examples
==================================================

User:

Login with pin 1234

Response:

{
  "steps":[
    {
      "tool":"LOGIN",
      "arguments":{
        "pin":"1234"
      }
    }
  ]
}

--------------------------------------------------

User:

Open table 2

Response:

{
  "steps":[
    {
      "tool":"OPEN_TABLE",
      "arguments":{
        "table":2
      }
    }
  ]
}

--------------------------------------------------

User:

Open Classic Entrees

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Classic Entrees"
      }
    }
  ]
}

--------------------------------------------------

User:

Show appetizers

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Appetizers"
      }
    }
  ]
}

--------------------------------------------------

User:

Switch to desserts

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Desserts"
      }
    }
  ]
}

--------------------------------------------------

User:

Open Seafood & Steak

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Seafood & Steak"
      }
    }
  ]
}

--------------------------------------------------

User:

Add Fried Mozzarella

Response:

{
  "steps":[
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Fried Mozzarella",
        "quantity":1
      }
    }
  ]
}

--------------------------------------------------

User:

side added

Response:

{
  "steps":[
    {
      "tool":"CONFIRM_MODIFIERS",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

ok i have added the side

Response:

{
  "steps":[
    {
      "tool":"CONFIRM_MODIFIERS",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

can you add to order

Response:

{
  "steps":[
    {
      "tool":"CONFIRM_MODIFIERS",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

Add with House Salad

Response:

{
  "steps":[
    {
      "tool":"CONFIRM_MODIFIERS",
      "arguments":{
        "side":"House Salad"
      }
    }
  ]
}

--------------------------------------------------

User:

can you go to tables

Response:

{
  "steps":[
    {
      "tool":"SHOW_TABLES",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

show tables

Response:

{
  "steps":[
    {
      "tool":"SHOW_TABLES",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

open tables

Response:

{
  "steps":[
    {
      "tool":"SHOW_TABLES",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

select tables

Response:

{
  "steps":[
    {
      "tool":"SHOW_TABLES",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

logout

Response:

{
  "steps":[
    {
      "tool":"LOGOUT",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

select check ending in 2345

Response:

{
  "steps":[
    {
      "tool":"SELECT_CHECK",
      "arguments":{
        "checkId":"2345"
      }
    }
  ]
}

--------------------------------------------------

User:

clear cart

Response:

{
  "steps":[
    {
      "tool":"CLEAR_CART",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

Add one Coca-Cola

Response:

{
  "steps":[
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Coca-Cola",
        "quantity":1
      }
    }
  ]
}

--------------------------------------------------

User:

Add two Classic Cheeseburgers and one Coca-Cola

Response:

{
  "steps":[
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Classic Cheeseburger",
        "quantity":2
      }
    },
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Coca-Cola",
        "quantity":1
      }
    }
  ]
}

--------------------------------------------------

User:

Remove one Classic Cheeseburger

Response:

{
  "steps":[
    {
      "tool":"REMOVE_ITEM",
      "arguments":{
        "item":"Classic Cheeseburger",
        "quantity":1
      }
    }
  ]
}

--------------------------------------------------

User:

Clear cart

Response:

{
  "steps":[
    {
      "tool":"CLEAR_CART",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

Checkout

Response:

{
  "steps":[
    {
      "tool":"CHECKOUT",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:

Open burgers and add two classic cheeseburgers

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Burgers"
      }
    },
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Classic Cheeseburger",
        "quantity":2
      }
    }
  ]
}

--------------------------------------------------

User:

Open drinks and add two Coca-Cola and one Fresh Lemonade

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Drinks"
      }
    },
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Coca-Cola",
        "quantity":2
      }
    },
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Fresh Lemonade",
        "quantity":1
      }
    }
  ]
}

--------------------------------------------------

User:

Login with pin 1234, open table 5, open burgers, add two Classic Cheeseburgers, open drinks, add one Coca-Cola

Response:

{
  "steps":[
    {
      "tool":"LOGIN",
      "arguments":{
        "pin":"1234"
      }
    },
    {
      "tool":"OPEN_TABLE",
      "arguments":{
        "table":5
      }
    },
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Burgers"
      }
    },
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Classic Cheeseburger",
        "quantity":2
      }
    },
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Drinks"
      }
    },
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Coca-Cola",
        "quantity":1
      }
    }
  ]
}

--------------------------------------------------

PAY

Use when the user says:
- pay
- make payment
- please make the payment
- can you please make the payment
- please do the payment
- pay it
- checkout and do payment
- checkout and pay
- pay now
- complete payment
- finish payment
- confirm payment
- charge customer
- pay bill
- proceed to payment
- proceed to payment and close
- make payment and close
- pay this check
- pay this
- pay and close
- process payment
- settle the bill
- settle this

Note: For "close this check", "close the check", "close it" use CLOSE_CHECK tool instead.

Arguments:
{}

--------------------------------------------------

VIEW_OPEN_CHECKS

User:
Can you show my open checks please?

Response:

{
  "steps":[
    {
      "tool":"VIEW_OPEN_CHECKS",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

VIEW_OPEN_CHECKS (Indirect)

User:
I want to see current open orders

Response:

{
  "steps":[
    {
      "tool":"VIEW_OPEN_CHECKS",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

VIEW_CLOSED_CHECKS

User:
Could you show the check history?

Response:

{
  "steps":[
    {
      "tool":"VIEW_CLOSED_CHECKS",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

CLOSE_CHECK (Check ID Ending)

User:
Please open check ending in 2345

Response:

{
  "steps":[
    {
      "tool":"CLOSE_CHECK",
      "arguments":{
        "checkId":"2345"
      }
    }
  ]
}

--------------------------------------------------

CLOSE_CHECK (Modifier)

User:
Select the latest check

Response:

{
  "steps":[
    {
      "tool":"CLOSE_CHECK",
      "arguments":{
        "modifier":"latest"
      }
    }
  ]
}

--------------------------------------------------

Polite Indirect Ordering

User:
Could you please open table 3, add two Classic Cheeseburgers and one Fresh Lemonade, then send it to the kitchen?

Response:

{
  "steps":[
    {
      "tool":"OPEN_TABLE",
      "arguments":{
        "table":3
      }
    },
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Burgers"
      }
    },
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Classic Cheeseburger",
        "quantity":2
      }
    },
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Drinks"
      }
    },
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"Fresh Lemonade",
        "quantity":1
      }
    },
    {
      "tool":"SEND_TO_KITCHEN",
      "arguments":{}
    }
  ]
}

User:
Login with 1234, open table 4, add one cheeseburger, checkout and pay.

Plan:

LOGIN

OPEN_TABLE

SELECT_CATEGORY

ADD_ITEM

CHECKOUT

PAY

--------------------------------------------------

User:
proceed to payment and close

Response:

{
  "steps":[
    {
      "tool":"PAY",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:
make payment and close

Response:

{
  "steps":[
    {
      "tool":"PAY",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:
close this check

Response:

{
  "steps":[
    {
      "tool":"CLOSE_CHECK",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:
pay this check

Response:

{
  "steps":[
    {
      "tool":"PAY",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:
can you please close this check

Response:

{
  "steps":[
    {
      "tool":"CLOSE_CHECK",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:
close the selected check

Response:

{
  "steps":[
    {
      "tool":"CLOSE_CHECK",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:
can you please proceed to payment

Response:

{
  "steps":[
    {
      "tool":"PAY",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User:
proceed to checkout

Response:

{
  "steps":[
    {
      "tool":"CHECKOUT",
      "arguments":{}
    }
  ]
}

--------------------------------------------------

User Command:

${command}
`;

  const response = await askGemini(prompt);

  try {
    const cleanedResponse = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const plan = JSON.parse(cleanedResponse);

    // Basic validation
    if (!plan.steps || !Array.isArray(plan.steps)) {
      throw new Error("Invalid plan format");
    }

    plan.summary = buildPlanSummary(plan.steps);

    return plan;
  } catch (error) {
    console.error("Failed to parse Gemini response:");

    console.error(response);

    return {
      summary: "",
      steps: [],
    };
  }
}
