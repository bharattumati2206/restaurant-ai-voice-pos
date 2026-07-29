"use client";

import OrderHeader from "./OrderHeader";
import CategoryList from "./CategoryList";
import MenuList from "./MenuList";
import Cart from "./Cart";

export default function OrderScreen() {
  return (
    <div className="h-full bg-[#0A0D14] text-white flex flex-col">
      <OrderHeader />

      <div className="flex-1 overflow-hidden p-1.5">
        <div className="grid h-full grid-cols-12 gap-1.5">
          <div className="col-span-3 min-h-0">
            <Cart />
          </div>

          <div className="col-span-7 min-h-0">
            <MenuList />
          </div>

          <div className="col-span-2 min-h-0">
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
}
