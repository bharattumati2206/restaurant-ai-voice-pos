"use client";

import orderService from "@/services/orderService";

import {
  Beef,
  Drumstick,
  Fish,
  CookingPot,
  CupSoda,
  IceCream,
  UtensilsCrossed,
} from "lucide-react";

function getIcon(category) {
  switch (category) {
    case "Burgers":
      return <Beef size={30} />;

    case "Chicken":
      return <Drumstick size={30} />;

    case "Steaks":
      return <UtensilsCrossed size={30} />;

    case "Seafood":
      return <Fish size={30} />;

    case "Sides":
      return <CookingPot size={30} />;

    case "Drinks":
      return <CupSoda size={30} />;

    case "Desserts":
      return <IceCream size={30} />;

    default:
      return <CookingPot size={30} />;
  }
}

function getColor(category) {
  switch (category) {
    case "Burgers":
      return "bg-orange-500 hover:bg-orange-600";

    case "Chicken":
      return "bg-red-600 hover:bg-red-700";

    case "Steaks":
      return "bg-amber-700 hover:bg-amber-800";

    case "Seafood":
      return "bg-sky-600 hover:bg-sky-700";

    case "Sides":
      return "bg-purple-600 hover:bg-purple-700";

    case "Drinks":
      return "bg-cyan-600 hover:bg-cyan-700";

    case "Desserts":
      return "bg-pink-600 hover:bg-pink-700";

    default:
      return "bg-slate-700 hover:bg-slate-600";
  }
}

export default function MenuItemCard({ item }) {
  return (
    <button
      onClick={() => orderService.addItem(item)}
      className={`
        h-28
        rounded-2xl
        text-white
        transition-all
        duration-200
        hover:scale-[1.03]
        active:scale-95
        shadow-lg
        ${getColor(item.category)}
      `}
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 px-3">
        {getIcon(item.category)}

        <span className="text-center text-base font-bold leading-tight">
          {item.name}
        </span>
      </div>
    </button>
  );
}
