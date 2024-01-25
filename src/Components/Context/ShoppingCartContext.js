// Importing necessary dependencies
import { createContext, useContext, useEffect, useState } from "react";
import ShoppingCart from "../ShoppingCart";

// Creating a context for the shopping cart
const ShoppingCartContext = createContext({});

// Retrieving initial cart items from local storage or using an empty array
const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

// Provider component for managing shopping cart state and actions
const ShoppingCartProvider = ({ children }) => {
  // State for controlling the visibility of the shopping cart
  const [isOpen, setIsOpen] = useState(false);

  // State for managing the items in the shopping cart
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Effect to update local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculating total quantity of items in the cart
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  // Function to open the shopping cart
  const openCart = () => {
    setIsOpen(true);
  };

  // Function to close the shopping cart
  const closeCart = () => {
    setIsOpen(false);
  };

  // Function to get the quantity of a specific item in the cart
  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // Function to increase the quantity of a specific item in the cart
  const increaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // Function to decrease the quantity of a specific item in the cart
  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // Function to remove a specific item from the cart
  const removeFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  // Providing the shopping cart context to the component tree
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      {/* Rendering the ShoppingCart component with its visibility controlled by the state */}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

// Exporting the ShoppingCartProvider component as the default export
export default ShoppingCartProvider;

// Exporting a custom hook to consume the shopping cart context
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
