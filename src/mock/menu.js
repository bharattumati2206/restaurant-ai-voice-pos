export const menu = [
  /* -------------------------------------------------------------------------- */
  /* 1. APPETIZERS (Direct Items - No Side Menu) */
  /* -------------------------------------------------------------------------- */
  {
    id: 101,
    category: "Appetizers",
    name: "Calamari",
    description: "Tender calamari lightly breaded and fried. Served with marinara and spicy ranch.",
    price: 13.49,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 102,
    category: "Appetizers",
    name: "Fried Mozzarella",
    description: "Golden-fried mozzarella cheese served with marinara sauce.",
    price: 9.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 103,
    category: "Appetizers",
    name: "Spinach-Artichoke Dip",
    description: "A blend of spinach, artichokes and five cheeses served with flatbread crisps.",
    price: 11.79,
    available: true,
    popular: false,
    modifiers: [],
  },
  {
    id: 104,
    category: "Appetizers",
    name: "Stuffed Ziti Fritta",
    description: "Crispy fried ziti stuffed with five melted cheeses, served with Alfredo and marinara.",
    price: 10.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 105,
    category: "Appetizers",
    name: "Toasted Meat Ravioli",
    description: "Lightly fried ravioli filled with seasoned beef. Served with marinara sauce.",
    price: 10.49,
    available: true,
    popular: true,
    modifiers: [],
  },

  /* -------------------------------------------------------------------------- */
  /* 2. SOUPS & SALAD (Direct Items - No Side Menu) */
  /* -------------------------------------------------------------------------- */
  {
    id: 201,
    category: "Soups & Salad",
    name: "Never-Ending Soup & Salad Combo",
    description: "Our famous house salad and choice of homemade soup with warm garlic breadsticks.",
    price: 11.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 202,
    category: "Soups & Salad",
    name: "Chicken & Gnocchi Soup",
    description: "A creamy soup made with roasted chicken, traditional Italian dumplings and spinach.",
    price: 8.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 203,
    category: "Soups & Salad",
    name: "Zuppa Toscana Soup",
    description: "Spicy Italian sausage, fresh kale and russet potatoes in a rich, creamy broth.",
    price: 8.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 204,
    category: "Soups & Salad",
    name: "Famous House Salad Bowl",
    description: "Fresh garden greens, tomatoes, olives, onions, pepperoncini and parmesan.",
    price: 9.49,
    available: true,
    popular: true,
    modifiers: [],
  },

  /* -------------------------------------------------------------------------- */
  /* 3. CLASSIC ENTREES (WITH SIDES & FIRST COURSE MODIFIERS) */
  /* -------------------------------------------------------------------------- */
  {
    id: 301,
    category: "Classic Entrees",
    name: "Tour of Italy",
    description: "Three Olive Garden classics: Chicken Parmigiana, Lasagna Classico and Fettuccine Alfredo.",
    price: 21.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "First Course Choice",
        required: true,
        options: [
          { name: "Famous House Salad", price: 0 },
          { name: "Chicken & Gnocchi Soup", price: 0 },
          { name: "Zuppa Toscana Soup", price: 0 },
          { name: "Pasta e Fagioli Soup", price: 0 },
        ],
      },
      {
        group: "Chicken Modifier",
        required: false,
        options: [
          { name: "Sub Grilled Chicken", price: 1.50 },
          { name: "Extra Cheese on Chicken", price: 1.25 },
        ],
      },
    ],
  },
  {
    id: 302,
    category: "Classic Entrees",
    name: "Chicken Alfredo",
    description: "Sliced grilled chicken served over fettuccine in rich homemade Alfredo sauce.",
    price: 19.49,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "First Course Choice",
        required: true,
        options: [
          { name: "Famous House Salad", price: 0 },
          { name: "Soup of Choice", price: 0 },
        ],
      },
      {
        group: "Side Pasta",
        required: false,
        options: [
          { name: "Fettuccine (Standard)", price: 0 },
          { name: "Gluten-Free Rotini", price: 1.99 },
        ],
      },
    ],
  },
  {
    id: 303,
    category: "Classic Entrees",
    name: "Lasagna Classico",
    description: "Prepared fresh daily with layers of pasta, meat sauce and mozzarella, ricotta and parmesan.",
    price: 17.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "First Course",
        required: true,
        options: [
          { name: "House Salad", price: 0 },
          { name: "Homemade Soup", price: 0 },
        ],
      },
    ],
  },
  {
    id: 304,
    category: "Classic Entrees",
    name: "Chicken Parmigiana",
    description: "A classic with two crispy chicken breasts topped with marinara and melted mozzarella.",
    price: 18.99,
    available: true,
    popular: true,
    modifiers: [
      {
        group: "First Course",
        required: true,
        options: [
          { name: "House Salad", price: 0 },
          { name: "Soup of Choice", price: 0 },
        ],
      },
      {
        group: "Side Pasta",
        required: true,
        options: [
          { name: "Spaghetti with Marinara", price: 0 },
          { name: "Fettuccine Alfredo", price: 2.49 },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* 4. CUCINA MIA! PASTA (Direct Items - No Side Menu) */
  /* -------------------------------------------------------------------------- */
  {
    id: 401,
    category: "Cucina Mia! Pasta",
    name: "Spaghetti with Meatballs",
    description: "Classic spaghetti tossed in savory marinara topped with seasoned beef meatballs.",
    price: 15.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 402,
    category: "Cucina Mia! Pasta",
    name: "Cheese Ravioli",
    description: "Filled with melted Italian cheeses, topped with marinara or meat sauce.",
    price: 15.99,
    available: true,
    popular: false,
    modifiers: [],
  },
  {
    id: 403,
    category: "Cucina Mia! Pasta",
    name: "Rigatoni Five Cheese Marinara",
    description: "Rigatoni pasta baked in a rich blend of five cheeses and savory marinara.",
    price: 15.49,
    available: true,
    popular: true,
    modifiers: [],
  },

  /* -------------------------------------------------------------------------- */
  /* 5. SEAFOOD & STEAK (Direct Items - No Side Menu) */
  /* -------------------------------------------------------------------------- */
  {
    id: 501,
    category: "Seafood & Steak",
    name: "Herb-Grilled Salmon",
    description: "Filet grilled to perfection, topped with garlic herb butter. Served with parmesan garlic broccoli.",
    price: 22.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 502,
    category: "Seafood & Steak",
    name: "Shrimp Scampi",
    description: "Shrimp sautéed in a garlic sauce, tossed with asparagus, tomatoes and angel hair pasta.",
    price: 20.49,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 503,
    category: "Seafood & Steak",
    name: "6oz Sirloin Steak",
    description: "Tender sirloin grilled to order and brushed with garlic herb butter.",
    price: 21.49,
    available: true,
    popular: true,
    modifiers: [],
  },

  /* -------------------------------------------------------------------------- */
  /* 6. DESSERTS (Direct Items - No Side Menu) */
  /* -------------------------------------------------------------------------- */
  {
    id: 601,
    category: "Desserts",
    name: "Black Tie Mousse Cake",
    description: "Rich chocolate cake, dark chocolate cheesecake and creamy custom mousse.",
    price: 8.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 602,
    category: "Desserts",
    name: "Tiramisu",
    description: "The classic Italian dessert. Espresso-soaked ladyfingers layered with mascarpone cream.",
    price: 8.49,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 603,
    category: "Desserts",
    name: "Warm Italian Doughnuts",
    description: "Freshly baked doughnuts tossed in powdered sugar. Served with raspberry or chocolate sauce.",
    price: 7.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 604,
    category: "Desserts",
    name: "Sicilian Cheesecake",
    description: "Ricotta cheesecake with a shortbread cookie crust, topped with strawberry sauce.",
    price: 8.49,
    available: true,
    popular: false,
    modifiers: [],
  },

  /* -------------------------------------------------------------------------- */
  /* 7. BEVERAGES & WINE (Direct Items - No Side Menu) */
  /* -------------------------------------------------------------------------- */
  {
    id: 701,
    category: "Beverages & Wine",
    name: "Fresh Brewed Iced Tea",
    description: "Freshly brewed daily. Served sweet or unsweetened.",
    price: 3.49,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 702,
    category: "Beverages & Wine",
    name: "Italian Margarita",
    description: "Jose Cuervo Especial Silver tequila, Triple Sec and a shot of amaretto.",
    price: 8.99,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 703,
    category: "Beverages & Wine",
    name: "Moscato Wine Glass",
    description: "Refreshingly sweet white wine with fruity flavors.",
    price: 7.50,
    available: true,
    popular: true,
    modifiers: [],
  },
  {
    id: 704,
    category: "Beverages & Wine",
    name: "Fountain Soft Drink",
    description: "Coke, Diet Coke, Coke Zero, Sprite, Dr Pepper, Lemonade.",
    price: 3.49,
    available: true,
    popular: true,
    modifiers: [],
  },
];
