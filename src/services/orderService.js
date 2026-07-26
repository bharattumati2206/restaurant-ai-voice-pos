import usePosStore from "@/store/usePosStore";

const orderService = {
  addItem(item) {
    const { cart, setCart } = usePosStore.getState();

    const existing = cart.find((x) => x.id === item.id);

    if (existing) {
      const updatedCart = cart.map((x) =>
        x.id === item.id
          ? {
              ...x,
              quantity: x.quantity + 1,
            }
          : x,
      );

      setCart(updatedCart);

      return;
    }

    setCart([
      ...cart,
      {
        ...item,
        quantity: 1,
      },
    ]);
  },

  removeItem(itemId) {
    const { cart, setCart } = usePosStore.getState();

    const existing = cart.find((x) => x.id === itemId);

    if (!existing) return;

    if (existing.quantity > 1) {
      const updatedCart = cart.map((x) =>
        x.id === itemId
          ? {
              ...x,
              quantity: x.quantity - 1,
            }
          : x,
      );

      setCart(updatedCart);

      return;
    }

    setCart(cart.filter((x) => x.id !== itemId));
  },

  clear() {
    usePosStore.getState().clearCart();
  },
};

export default orderService;
