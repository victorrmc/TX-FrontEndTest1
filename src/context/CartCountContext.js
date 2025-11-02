import { createContext } from "react";

export const CartCountContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
});
