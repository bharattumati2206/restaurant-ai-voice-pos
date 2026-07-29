import usePosStore from "@/store/usePosStore";

const orderService = {
  addItem(item, selectedModifiers = [], customPrice = null) {
    const { cart, setCart } = usePosStore.getState();

    const price = customPrice !== null ? customPrice : item.price;
    const modifierText =
      selectedModifiers.length > 0
        ? selectedModifiers
            .map((m) => `${m.group}: ${m.option}`)
            .join(", ")
        : "";

    const cartKey = modifierText ? `${item.id}-${modifierText}` : `${item.id}`;

    const existing = cart.find(
      (x) => x.cartKey === cartKey || (!x.cartKey && x.id === item.id && !modifierText),
    );

    if (existing) {
      const updatedCart = cart.map((x) =>
        (x.cartKey === cartKey || (!x.cartKey && x.id === item.id && !modifierText))
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
        cartKey,
        price,
        selectedModifiers,
        modifierText,
        quantity: 1,
      },
    ]);
  },

  removeItem(targetKey) {
    const { cart, setCart } = usePosStore.getState();

    const existing = cart.find(
      (x) => x.cartKey === targetKey || x.id === targetKey,
    );

    if (!existing) return;

    if (existing.quantity > 1) {
      const updatedCart = cart.map((x) =>
        (x.cartKey === targetKey || x.id === targetKey)
          ? {
              ...x,
              quantity: x.quantity - 1,
            }
          : x,
      );

      setCart(updatedCart);
      return;
    }

    setCart(cart.filter((x) => x.cartKey !== targetKey && x.id !== targetKey));
  },

  clear() {
    usePosStore.getState().clearCart();
  },
};

export default orderService;
