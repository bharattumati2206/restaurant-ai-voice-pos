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
    return "Okay. I'll take care of that.";
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
        actions.push(`add ${step.arguments.quantity} ${step.arguments.item}`);
        break;

      case TOOLS.REMOVE_ITEM:
        actions.push(
          `remove ${step.arguments.quantity} ${step.arguments.item}`,
        );
        break;

      case TOOLS.CLEAR_CART:
        actions.push("clear the cart");
        break;

      case TOOLS.CHECKOUT:
        actions.push("proceed to checkout");
        break;

      case TOOLS.PAY:
        actions.push("complete the payment");
        break;

      default:
        break;
    }
  }

  return `Okay. I'll ${actions.join(", ")}.`;
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
        .map((item) => `  - ${item.name}`)
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

6. Always choose the closest matching menu item from the available menu.

7. If the customer says:

- Coke → Coca-Cola
- Fries → French Fries
- Cheeseburger → Classic Cheeseburger
- Burger → Classic Cheeseburger
- Wings → Buffalo Wings (unless BBQ Wings is clearly requested)

8. If the user asks to:

- open
- show
- switch
- navigate
- change category

then use:

SELECT_CATEGORY

9. Menu item names returned in JSON MUST exactly match one of the available menu items.

10. Category names returned in JSON MUST exactly match one of the available categories.

11. A single user command may require multiple steps.

12. Preserve the order of execution.

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

Arguments

{
  "category":"Burgers"
}

----------------------------

ADD_ITEM

Arguments

{
  "item":"Classic Cheeseburger",
  "quantity":2
}

----------------------------

REMOVE_ITEM

Arguments

{
  "item":"Classic Cheeseburger",
  "quantity":1
}

----------------------------

CLEAR_CART

Arguments

{}

----------------------------

CHECKOUT

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

Open burgers

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Burgers"
      }
    }
  ]
}

--------------------------------------------------

User:

Show drinks

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Drinks"
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

Open seafood

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Seafood"
      }
    }
  ]
}

--------------------------------------------------

User:

Open chicken

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Chicken"
      }
    }
  ]
}

--------------------------------------------------

User:

Open steaks

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Steaks"
      }
    }
  ]
}

--------------------------------------------------

User:

Open sides

Response:

{
  "steps":[
    {
      "tool":"SELECT_CATEGORY",
      "arguments":{
        "category":"Sides"
      }
    }
  ]
}

--------------------------------------------------

User:

Add two French Fries

Response:

{
  "steps":[
    {
      "tool":"ADD_ITEM",
      "arguments":{
        "item":"French Fries",
        "quantity":2
      }
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
- pay now
- complete payment
- finish payment
- confirm payment
- charge customer

Arguments:
{}

User:
Login with 1234, open table 4, add one cheeseburger, checkout and pay.

Plan:

LOGIN

OPEN_TABLE

SELECT_CATEGORY

ADD_ITEM

CHECKOUT

PAY

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
