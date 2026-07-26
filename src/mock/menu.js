export const menu = [
  {
    id: 1,
    category: "Burgers",
    name: "Classic Cheeseburger",
    description:
      "Juicy grilled beef patty with cheddar cheese, lettuce, tomato, onions and house sauce.",
    price: 12.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cheese",
        required: false,
        options: ["American", "Cheddar", "Swiss", "Pepper Jack", "No Cheese"],
      },
      {
        group: "Cooking",
        required: false,
        options: ["Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Bacon", "Extra Patty", "Jalapeños", "Fried Egg", "Avocado"],
      },
    ],
  },

  {
    id: 2,
    category: "Burgers",
    name: "Bacon BBQ Burger",
    description:
      "Beef burger topped with crispy bacon, BBQ sauce, cheddar cheese and onion rings.",
    price: 14.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking",
        required: false,
        options: ["Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Bacon", "Extra BBQ Sauce", "Jalapeños", "Avocado"],
      },
    ],
  },

  {
    id: 3,
    category: "Burgers",
    name: "Mushroom Swiss Burger",
    description: "Grilled beef topped with sautéed mushrooms and Swiss cheese.",
    price: 13.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Cooking",
        required: false,
        options: ["Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Mushrooms", "Extra Swiss Cheese", "Bacon"],
      },
    ],
  },

  {
    id: 4,
    category: "Burgers",
    name: "Spicy Jalapeño Burger",
    description:
      "Loaded with jalapeños, pepper jack cheese and spicy chipotle sauce.",
    price: 13.49,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Spice Level",
        required: false,
        options: ["Mild", "Medium", "Hot", "Extra Hot"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Jalapeños", "Bacon", "Avocado"],
      },
    ],
  },

  {
    id: 5,
    category: "Burgers",
    name: "Double Stack Burger",
    description:
      "Two grilled beef patties layered with cheddar cheese and signature sauce.",
    price: 16.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cheese",
        required: false,
        options: ["American", "Cheddar", "Swiss"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Bacon", "Fried Egg", "Extra Patty"],
      },
    ],
  },

  {
    id: 6,
    category: "Burgers",
    name: "Crispy Chicken Burger",
    description:
      "Golden fried chicken breast with lettuce, tomato and garlic mayo.",
    price: 12.49,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Sauce",
        required: false,
        options: ["Garlic Mayo", "BBQ", "Buffalo", "Ranch"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Cheese", "Bacon", "Jalapeños"],
      },
    ],
  },

  {
    id: 7,
    category: "Burgers",
    name: "Grilled Chicken Burger",
    description:
      "Flame grilled chicken breast with lettuce, tomato and honey mustard.",
    price: 12.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Sauce",
        required: false,
        options: ["Honey Mustard", "BBQ", "Garlic Mayo"],
      },
    ],
  },

  {
    id: 8,
    category: "Burgers",
    name: "Veggie Garden Burger",
    description:
      "Plant-based patty with lettuce, tomato, onions and vegan sauce.",
    price: 11.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Cheese",
        required: false,
        options: ["Vegan Cheese", "No Cheese"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Avocado", "Grilled Mushrooms", "Jalapeños"],
      },
    ],
  },

  {
    id: 9,
    category: "Burgers",
    name: "Tex Mex Burger",
    description:
      "Beef burger with pepper jack cheese, salsa and crispy tortilla strips.",
    price: 14.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Spice Level",
        required: false,
        options: ["Mild", "Medium", "Hot"],
      },
    ],
  },

  {
    id: 10,
    category: "Burgers",
    name: "Ultimate House Burger",
    description:
      "Signature burger loaded with bacon, cheddar, onion rings, BBQ sauce and fried egg.",
    price: 17.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking",
        required: false,
        options: ["Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Patty", "Extra Bacon", "Extra Cheese", "Avocado"],
      },
    ],
  },
  {
    id: 11,
    category: "Chicken",
    name: "Crispy Chicken Tenders",
    description:
      "Golden fried chicken tenders served with your choice of dipping sauce.",
    price: 10.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Sauce",
        required: true,
        options: ["Ranch", "Honey Mustard", "BBQ", "Buffalo", "Chipotle"],
      },
      {
        group: "Side",
        required: false,
        options: ["Fries", "Curly Fries", "Mashed Potato", "Coleslaw"],
      },
    ],
  },

  {
    id: 12,
    category: "Chicken",
    name: "Buffalo Wings",
    description: "Classic chicken wings tossed in spicy buffalo sauce.",
    price: 13.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Quantity",
        required: true,
        options: ["6 Pieces", "10 Pieces", "15 Pieces"],
      },
      {
        group: "Spice Level",
        required: false,
        options: ["Mild", "Medium", "Hot", "Extra Hot"],
      },
      {
        group: "Dip",
        required: false,
        options: ["Ranch", "Blue Cheese"],
      },
    ],
  },

  {
    id: 13,
    category: "Chicken",
    name: "BBQ Chicken Wings",
    description: "Slow cooked wings coated in smoky barbecue sauce.",
    price: 13.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Quantity",
        required: true,
        options: ["6 Pieces", "10 Pieces", "15 Pieces"],
      },
      {
        group: "Dip",
        required: false,
        options: ["Ranch", "Honey Mustard"],
      },
    ],
  },

  {
    id: 14,
    category: "Chicken",
    name: "Grilled Herb Chicken",
    description:
      "Tender grilled chicken breast seasoned with fresh herbs and garlic butter.",
    price: 15.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Side",
        required: true,
        options: ["Mashed Potato", "Steamed Vegetables", "Rice Pilaf", "Fries"],
      },
      {
        group: "Add-On",
        required: false,
        options: ["Extra Chicken", "Garlic Butter", "Gravy"],
      },
    ],
  },

  {
    id: 15,
    category: "Chicken",
    name: "Southern Fried Chicken",
    description: "Crispy seasoned fried chicken served fresh from the fryer.",
    price: 16.49,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Pieces",
        required: true,
        options: ["2 Pieces", "3 Pieces", "4 Pieces"],
      },
      {
        group: "Side",
        required: true,
        options: ["Fries", "Mashed Potato", "Coleslaw", "Mac & Cheese"],
      },
    ],
  },

  {
    id: 16,
    category: "Chicken",
    name: "Chicken Alfredo Pasta",
    description: "Grilled chicken served over creamy Alfredo pasta.",
    price: 16.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Pasta",
        required: false,
        options: ["Fettuccine", "Penne", "Spaghetti"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Chicken", "Extra Parmesan", "Mushrooms", "Broccoli"],
      },
    ],
  },

  {
    id: 17,
    category: "Chicken",
    name: "Chicken Parmesan",
    description:
      "Breaded chicken breast topped with marinara sauce and mozzarella cheese.",
    price: 17.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Pasta",
        required: true,
        options: ["Spaghetti", "Penne", "Fettuccine"],
      },
    ],
  },

  {
    id: 18,
    category: "Chicken",
    name: "Honey Garlic Chicken",
    description: "Grilled chicken glazed with sweet honey garlic sauce.",
    price: 16.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Side",
        required: true,
        options: ["Rice Pilaf", "Steamed Vegetables", "Mashed Potato"],
      },
    ],
  },

  {
    id: 19,
    category: "Chicken",
    name: "Spicy Cajun Chicken",
    description:
      "Blackened Cajun chicken breast packed with bold southern flavors.",
    price: 16.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Spice Level",
        required: false,
        options: ["Medium", "Hot", "Extra Hot"],
      },
      {
        group: "Side",
        required: true,
        options: ["Rice Pilaf", "Fries", "Steamed Vegetables"],
      },
    ],
  },

  {
    id: 20,
    category: "Chicken",
    name: "Chicken & Rice Bowl",
    description:
      "Grilled chicken served over seasoned rice with sautéed vegetables.",
    price: 14.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Sauce",
        required: false,
        options: ["Teriyaki", "Garlic Butter", "BBQ", "Chipotle"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Chicken", "Extra Rice", "Cheese", "Jalapeños"],
      },
    ],
  },
  {
    id: 21,
    category: "Steaks",
    name: "Classic Ribeye Steak",
    description:
      "12 oz hand-cut ribeye grilled to your preferred temperature and served with your choice of side.",
    price: 26.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Side",
        required: true,
        options: [
          "Mashed Potato",
          "Baked Potato",
          "French Fries",
          "Rice Pilaf",
          "Steamed Vegetables",
        ],
      },
      {
        group: "Steak Topping",
        required: false,
        options: [
          "Garlic Butter",
          "Mushroom Sauce",
          "Peppercorn Sauce",
          "Grilled Onions",
        ],
      },
    ],
  },

  {
    id: 22,
    category: "Steaks",
    name: "New York Strip",
    description:
      "A flavorful New York Strip seasoned and grilled over an open flame.",
    price: 24.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Side",
        required: true,
        options: ["Mashed Potato", "Rice Pilaf", "Fries", "Steamed Vegetables"],
      },
    ],
  },

  {
    id: 23,
    category: "Steaks",
    name: "Sirloin Steak",
    description: "Lean and tender sirloin cooked just the way you like it.",
    price: 21.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Side",
        required: true,
        options: ["Rice Pilaf", "Fries", "Mashed Potato", "Vegetables"],
      },
    ],
  },

  {
    id: 24,
    category: "Steaks",
    name: "Filet Mignon",
    description:
      "Premium center-cut filet known for its exceptional tenderness.",
    price: 32.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well"],
      },
      {
        group: "Topping",
        required: false,
        options: ["Garlic Butter", "Blue Cheese Crumble", "Mushroom Sauce"],
      },
    ],
  },

  {
    id: 25,
    category: "Steaks",
    name: "T-Bone Steak",
    description: "A generous T-Bone steak featuring both strip and tenderloin.",
    price: 31.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Side",
        required: true,
        options: ["Baked Potato", "Fries", "Rice", "Vegetables"],
      },
    ],
  },

  {
    id: 26,
    category: "Steaks",
    name: "Porterhouse Steak",
    description: "A massive premium porterhouse perfect for steak lovers.",
    price: 36.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Add-On",
        required: false,
        options: ["Garlic Shrimp", "Grilled Mushrooms", "Extra Butter"],
      },
    ],
  },

  {
    id: 27,
    category: "Steaks",
    name: "Garlic Butter Steak",
    description: "Juicy sirloin finished with rich garlic herb butter.",
    price: 23.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Side",
        required: true,
        options: ["Mashed Potato", "Rice", "Vegetables", "Fries"],
      },
    ],
  },

  {
    id: 28,
    category: "Steaks",
    name: "Peppercorn Steak",
    description: "Grilled steak topped with creamy black peppercorn sauce.",
    price: 25.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
    ],
  },

  {
    id: 29,
    category: "Steaks",
    name: "Steak & Garlic Shrimp",
    description: "Tender sirloin paired with garlic butter shrimp.",
    price: 29.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        group: "Side",
        required: true,
        options: ["Rice", "Mashed Potato", "Vegetables", "Fries"],
      },
    ],
  },

  {
    id: 30,
    category: "Steaks",
    name: "Steak Dinner Combo",
    description:
      "Grilled sirloin served with two sides and fresh dinner bread.",
    price: 27.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Cooking Temperature",
        required: true,
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        group: "First Side",
        required: true,
        options: ["Mashed Potato", "Rice", "Fries", "Vegetables"],
      },
      {
        group: "Second Side",
        required: true,
        options: ["Side Salad", "Coleslaw", "Mac & Cheese", "Corn"],
      },
    ],
  },
  {
    id: 31,
    category: "Seafood",
    name: "Grilled Atlantic Salmon",
    description:
      "Fresh Atlantic salmon fillet seasoned and grilled to perfection.",
    price: 24.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Side",
        required: true,
        options: [
          "Rice Pilaf",
          "Mashed Potato",
          "Steamed Vegetables",
          "French Fries",
        ],
      },
      {
        group: "Sauce",
        required: false,
        options: ["Lemon Butter", "Garlic Butter", "Herb Sauce", "No Sauce"],
      },
    ],
  },

  {
    id: 32,
    category: "Seafood",
    name: "Lemon Butter Salmon",
    description: "Atlantic salmon finished with fresh lemon butter sauce.",
    price: 25.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Side",
        required: true,
        options: ["Rice", "Vegetables", "Mashed Potato", "Baked Potato"],
      },
    ],
  },

  {
    id: 33,
    category: "Seafood",
    name: "Fish & Chips",
    description:
      "Beer battered white fish served with crispy fries and tartar sauce.",
    price: 18.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Sauce",
        required: false,
        options: ["Tartar", "Cocktail", "Malt Vinegar", "No Sauce"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Fries", "Extra Fish", "Coleslaw"],
      },
    ],
  },

  {
    id: 34,
    category: "Seafood",
    name: "Garlic Butter Shrimp",
    description: "Succulent shrimp sautéed in garlic butter and fresh herbs.",
    price: 21.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Side",
        required: true,
        options: ["Rice", "Pasta", "Vegetables", "Mashed Potato"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Shrimp", "Extra Garlic Butter", "Parmesan"],
      },
    ],
  },

  {
    id: 35,
    category: "Seafood",
    name: "Crispy Fried Shrimp",
    description: "Golden fried shrimp served with fries and cocktail sauce.",
    price: 20.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Sauce",
        required: false,
        options: ["Cocktail", "Ranch", "Honey Mustard", "BBQ"],
      },
      {
        group: "Side",
        required: true,
        options: ["French Fries", "Curly Fries", "Coleslaw"],
      },
    ],
  },

  {
    id: 36,
    category: "Seafood",
    name: "Blackened Cajun Salmon",
    description:
      "Fresh salmon coated with Cajun spices and grilled over open flame.",
    price: 25.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Spice Level",
        required: false,
        options: ["Medium", "Hot", "Extra Hot"],
      },
      {
        group: "Side",
        required: true,
        options: ["Rice", "Vegetables", "Mashed Potato"],
      },
    ],
  },

  {
    id: 37,
    category: "Seafood",
    name: "Grilled Tilapia",
    description:
      "Lightly seasoned tilapia grilled and served with seasonal vegetables.",
    price: 19.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Sauce",
        required: false,
        options: ["Garlic Butter", "Lemon Butter", "Herb Sauce"],
      },
    ],
  },

  {
    id: 38,
    category: "Seafood",
    name: "Shrimp Alfredo Pasta",
    description:
      "Creamy Alfredo pasta tossed with grilled shrimp and parmesan.",
    price: 22.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Pasta",
        required: false,
        options: ["Fettuccine", "Penne", "Spaghetti"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Extra Shrimp", "Extra Parmesan", "Broccoli", "Mushrooms"],
      },
    ],
  },

  {
    id: 39,
    category: "Seafood",
    name: "Seafood Platter",
    description:
      "A generous combination of fried shrimp, fish fillet and calamari.",
    price: 29.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Sauces",
        required: false,
        options: ["Tartar", "Cocktail", "Ranch", "Garlic Aioli"],
      },
      {
        group: "Side",
        required: true,
        options: ["Fries", "Rice", "Coleslaw"],
      },
    ],
  },

  {
    id: 40,
    category: "Seafood",
    name: "Coconut Fried Shrimp",
    description:
      "Crispy coconut-coated shrimp served with sweet chili dipping sauce.",
    price: 21.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Sauce",
        required: false,
        options: ["Sweet Chili", "Honey Mustard", "Ranch"],
      },
      {
        group: "Side",
        required: true,
        options: ["Fries", "Rice", "Vegetables"],
      },
    ],
  },
  {
    id: 41,
    category: "Sides",
    name: "French Fries",
    description: "Golden crispy fries lightly seasoned with sea salt.",
    price: 4.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Regular", "Large"],
      },
      {
        group: "Seasoning",
        required: false,
        options: ["Regular Salt", "Cajun", "Garlic Parmesan", "No Salt"],
      },
      {
        group: "Dip",
        required: false,
        options: ["Ketchup", "Ranch", "BBQ", "Chipotle Mayo"],
      },
    ],
  },

  {
    id: 42,
    category: "Sides",
    name: "Loaded Cheese Fries",
    description:
      "French fries topped with melted cheddar cheese, bacon bits and green onions.",
    price: 7.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Extras",
        required: false,
        options: ["Extra Cheese", "Extra Bacon", "Jalapeños", "Sour Cream"],
      },
    ],
  },

  {
    id: 43,
    category: "Sides",
    name: "Curly Fries",
    description: "Seasoned spiral-cut fries fried until crispy.",
    price: 5.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Dip",
        required: false,
        options: ["Ketchup", "Ranch", "Honey Mustard", "Cheese Sauce"],
      },
    ],
  },

  {
    id: 44,
    category: "Sides",
    name: "Onion Rings",
    description: "Beer battered onion rings served hot and crispy.",
    price: 6.49,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Dip",
        required: false,
        options: ["BBQ", "Ranch", "Chipotle Mayo", "Honey Mustard"],
      },
    ],
  },

  {
    id: 45,
    category: "Sides",
    name: "Mozzarella Sticks",
    description: "Breaded mozzarella cheese sticks served with marinara sauce.",
    price: 8.49,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Sauce",
        required: false,
        options: ["Marinara", "Ranch", "Garlic Aioli"],
      },
    ],
  },

  {
    id: 46,
    category: "Sides",
    name: "Garlic Bread",
    description: "Toasted artisan bread brushed with garlic butter and herbs.",
    price: 5.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Add Cheese",
        required: false,
        options: ["No", "Mozzarella", "Parmesan", "Cheddar"],
      },
    ],
  },

  {
    id: 47,
    category: "Sides",
    name: "Mac & Cheese",
    description: "Creamy macaroni baked with a blend of cheddar cheeses.",
    price: 6.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Extras",
        required: false,
        options: ["Bacon", "Extra Cheese", "Jalapeños", "Grilled Chicken"],
      },
    ],
  },

  {
    id: 48,
    category: "Sides",
    name: "Mashed Potato",
    description: "Creamy mashed potatoes served with rich brown gravy.",
    price: 5.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Gravy",
        required: false,
        options: ["Brown Gravy", "No Gravy", "Extra Gravy"],
      },
    ],
  },

  {
    id: 49,
    category: "Sides",
    name: "Steamed Vegetables",
    description: "Fresh seasonal vegetables lightly seasoned and steamed.",
    price: 5.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Finish",
        required: false,
        options: ["Butter", "Garlic Butter", "No Butter"],
      },
    ],
  },

  {
    id: 50,
    category: "Sides",
    name: "Caesar Side Salad",
    description:
      "Fresh romaine lettuce with parmesan cheese, croutons and Caesar dressing.",
    price: 6.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Dressing",
        required: false,
        options: ["Caesar", "Ranch", "Italian", "Balsamic", "On the Side"],
      },
      {
        group: "Extras",
        required: false,
        options: ["Grilled Chicken", "Extra Parmesan", "No Croutons"],
      },
    ],
  },
  {
    id: 51,
    category: "Drinks",
    name: "Coca-Cola",
    description: "Classic Coca-Cola served chilled.",
    price: 2.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Ice",
        required: false,
        options: ["Regular Ice", "Light Ice", "No Ice"],
      },
      {
        group: "Lemon",
        required: false,
        options: ["No Lemon", "Add Lemon"],
      },
    ],
  },

  {
    id: 52,
    category: "Drinks",
    name: "Diet Coke",
    description: "Refreshing sugar-free Coca-Cola.",
    price: 2.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Ice",
        required: false,
        options: ["Regular Ice", "Light Ice", "No Ice"],
      },
    ],
  },

  {
    id: 53,
    category: "Drinks",
    name: "Sprite",
    description: "Lemon-lime soft drink served ice cold.",
    price: 2.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Ice",
        required: false,
        options: ["Regular Ice", "No Ice"],
      },
      {
        group: "Lemon",
        required: false,
        options: ["No Lemon", "Add Lemon"],
      },
    ],
  },

  {
    id: 54,
    category: "Drinks",
    name: "Fanta Orange",
    description: "Refreshing sparkling orange soda.",
    price: 2.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Ice",
        required: false,
        options: ["Regular Ice", "Light Ice", "No Ice"],
      },
    ],
  },

  {
    id: 55,
    category: "Drinks",
    name: "Dr Pepper",
    description: "Classic blend of 23 signature flavors.",
    price: 3.29,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Ice",
        required: false,
        options: ["Regular Ice", "No Ice"],
      },
    ],
  },

  {
    id: 56,
    category: "Drinks",
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemonade served chilled.",
    price: 3.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Sweetness",
        required: false,
        options: ["Less Sugar", "Regular", "Extra Sweet"],
      },
      {
        group: "Ice",
        required: false,
        options: ["Regular Ice", "Light Ice", "No Ice"],
      },
    ],
  },

  {
    id: 57,
    category: "Drinks",
    name: "Fresh Brewed Iced Tea",
    description: "House brewed black iced tea.",
    price: 3.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Sweetness",
        required: false,
        options: ["Unsweetened", "Light Sweet", "Sweet"],
      },
      {
        group: "Lemon",
        required: false,
        options: ["No Lemon", "Add Lemon"],
      },
    ],
  },

  {
    id: 58,
    category: "Drinks",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice.",
    price: 4.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Ice",
        required: false,
        options: ["No Ice", "Light Ice"],
      },
    ],
  },

  {
    id: 59,
    category: "Drinks",
    name: "Premium Coffee",
    description: "Freshly brewed premium roasted coffee.",
    price: 3.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Size",
        required: true,
        options: ["Small", "Medium", "Large"],
      },
      {
        group: "Milk",
        required: false,
        options: ["Whole", "Skim", "Almond", "Oat", "No Milk"],
      },
      {
        group: "Sugar",
        required: false,
        options: ["No Sugar", "1 Sugar", "2 Sugars", "3 Sugars"],
      },
    ],
  },

  {
    id: 60,
    category: "Drinks",
    name: "Bottled Mineral Water",
    description: "Premium bottled still mineral water.",
    price: 2.49,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Temperature",
        required: false,
        options: ["Chilled", "Room Temperature"],
      },
    ],
  },
  {
    id: 61,
    category: "Desserts",
    name: "New York Cheesecake",
    description: "Creamy baked cheesecake served with strawberry topping.",
    price: 7.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Topping",
        required: false,
        options: ["Strawberry", "Blueberry", "Chocolate", "Caramel", "Plain"],
      },
    ],
  },

  {
    id: 62,
    category: "Desserts",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a rich molten chocolate center.",
    price: 8.49,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Serve With",
        required: false,
        options: [
          "Vanilla Ice Cream",
          "Chocolate Ice Cream",
          "Whipped Cream",
          "No Ice Cream",
        ],
      },
    ],
  },

  {
    id: 63,
    category: "Desserts",
    name: "Brownie Sundae",
    description:
      "Warm fudge brownie topped with vanilla ice cream and chocolate sauce.",
    price: 8.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Ice Cream",
        required: false,
        options: ["Vanilla", "Chocolate", "Strawberry"],
      },
      {
        group: "Extra",
        required: false,
        options: ["Extra Chocolate", "Caramel", "Nuts", "Whipped Cream"],
      },
    ],
  },

  {
    id: 64,
    category: "Desserts",
    name: "Apple Pie",
    description: "Classic apple pie baked with cinnamon and flaky pastry.",
    price: 6.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Serve With",
        required: false,
        options: ["Vanilla Ice Cream", "Whipped Cream", "No Topping"],
      },
    ],
  },

  {
    id: 65,
    category: "Desserts",
    name: "Chocolate Chip Cookie Skillet",
    description: "Fresh baked cookie served warm in a skillet.",
    price: 8.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Ice Cream",
        required: false,
        options: ["Vanilla", "Chocolate", "No Ice Cream"],
      },
    ],
  },

  {
    id: 66,
    category: "Desserts",
    name: "Vanilla Ice Cream",
    description: "Creamy vanilla ice cream made with premium dairy.",
    price: 4.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Scoops",
        required: true,
        options: ["1 Scoop", "2 Scoops", "3 Scoops"],
      },
      {
        group: "Topping",
        required: false,
        options: ["Chocolate Syrup", "Caramel", "Sprinkles", "Cherry"],
      },
    ],
  },

  {
    id: 67,
    category: "Desserts",
    name: "Chocolate Ice Cream",
    description: "Rich chocolate ice cream served chilled.",
    price: 4.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Scoops",
        required: true,
        options: ["1 Scoop", "2 Scoops", "3 Scoops"],
      },
    ],
  },

  {
    id: 68,
    category: "Desserts",
    name: "Carrot Cake",
    description: "Moist carrot cake layered with cream cheese frosting.",
    price: 7.49,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Serve With",
        required: false,
        options: ["Whipped Cream", "Vanilla Ice Cream", "No Topping"],
      },
    ],
  },

  {
    id: 69,
    category: "Desserts",
    name: "Seasonal Fruit Bowl",
    description: "Fresh seasonal fruits served chilled.",
    price: 5.99,
    available: true,
    popular: false,
    modifiers: [
      {
        group: "Extras",
        required: false,
        options: ["Honey", "Whipped Cream", "Mint Leaves"],
      },
    ],
  },

  {
    id: 70,
    category: "Desserts",
    name: "Chef's Dessert Sampler",
    description:
      "A tasting platter featuring cheesecake, brownie, ice cream and seasonal dessert bites.",
    price: 12.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "Ice Cream Flavor",
        required: false,
        options: ["Vanilla", "Chocolate", "Strawberry"],
      },
    ],
  },
];
