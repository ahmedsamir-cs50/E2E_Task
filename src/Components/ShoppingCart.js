// Importing necessary dependencies and components
import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../Components/Context/ShoppingCartContext";
import CartItem from "./CartItem";

// Importing mock data for items
import itemsData from "../Data/items.json";

// Functional component representing the shopping cart
const ShoppingCart = ({ isOpen }) => {
  // Destructuring methods and state from the useShoppingCart hook
  const { closeCart, cartItems } = useShoppingCart();

  // JSX structure for the shopping cart
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* Stack component to arrange child components with a specified gap */}
        <Stack gap={3}>
          {/* Mapping over cart items and rendering CartItem component for each */}
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          {/* Displaying the total cost of items in the cart */}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {
              cartItems.reduce((total, cartItem) => {
                // Finding the corresponding item in the itemsData using its id
                const item = itemsData.find((i) => i.id === cartItem.id);

                // Calculating the total cost by multiplying item price and quantity
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            }
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

// Exporting the ShoppingCart component as the default export of this module
export default ShoppingCart;
