// Importing necessary dependencies and components
import React from 'react';
import { useShoppingCart } from './Context/ShoppingCartContext';
import { Button, Card, Col } from 'react-bootstrap';

// Functional component representing an item in the shopping cart
const Item = ({ item }) => {
  // Destructuring methods from the useShoppingCart hook
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // Get the quantity of the item in the cart
  const quantity = getItemQuantity(item.id);

  // JSX structure for displaying the item
  return (
    <Col className="list-group" lg={4} sm={12}>
      <Card className='m-1'>
        <div className='p-4'>
          {/* Item details */}
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>

          <div className="mt-auto">
            {quantity === 0 ? (
              // Display "Add to Cart" button if the quantity is 0
              <Button className="w-100" onClick={() => increaseCartQuantity(item.id)}>
                Add To Cart
              </Button>
            ) : (
              // Display quantity, increase, decrease, and remove buttons if quantity is not 0
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: "0.5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: "0.5rem" }}
                >
                  {/* Decrease quantity button */}
                  <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>

                  {/* Display current quantity in cart */}
                  <div>
                    <span className="fs-3">{quantity} in cart</span>
                  </div>

                  {/* Increase quantity button */}
                  <Button onClick={() => increaseCartQuantity(item.id)}>+</Button>
                </div>

                {/* Remove item from cart button */}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Col>
  );
};

// Exporting the Item component as the default export of this module
export default Item;
