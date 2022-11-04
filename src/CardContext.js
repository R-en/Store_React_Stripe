import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productsStore";

//Context(cart, addToCart, removeCart)
export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  AddOneToCart: () => {},
  RemoveOneFromCart: () => {},
  DeleteFromCart: () => {},
  getTotalCost: () => {},
});

//Provider
export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  //[{id:1, quantity:2},{id:2,quantity:2}]

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function AddOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function RemoveOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity == 1) {
      DeleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function DeleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);

      totalCost += productData.price * cartItem.quantity;
    });

    return totalCost;
  }

  const contextValue = {
    items: [],
    getProductQuantity,
    AddOneToCart,
    RemoveOneFromCart,
    DeleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
