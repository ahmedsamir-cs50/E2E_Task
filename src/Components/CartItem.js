// Importing necessary dependencies and components
import React from "react";
import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../Components/Context/ShoppingCartContext";
import itemsData from "../Data/items.json";

// Functional component representing a single item in the shopping cart
const CartItem = ({ id, quantity }) => {
  // Destructuring methods from the useShoppingCart hook
  const { removeFromCart } = useShoppingCart();

  // Finding the item data based on its id
  const item = itemsData.find((i) => i.id === id);

  // Return null if the item is not found
  if (item == null) return null;

  // JSX structure for displaying a cart item
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      {/* Displaying item image */}
      <img
        src={item.imgUrl}
        alt="cart-img"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />

      <div className="me-auto">
        <div>
          {/* Displaying item name */}
          {item.name}{" "}
          
          {/* Displaying quantity if greater than 1 */}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>

        {/* Displaying item price */}
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {item.price}
        </div>
      </div>

      {/* Displaying total cost for the quantity */}
      <div>{item.price * quantity}</div>

      {/* Remove item button */}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

// Exporting the CartItem 
export default CartItem;