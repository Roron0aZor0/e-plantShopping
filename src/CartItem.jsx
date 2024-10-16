import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cart) => {
    return cart.items.reduce((total, item) => {
        return total + (item.quantity * item.cost);
      }, 0);

  };

  const updateTotalCost = () => {
    let total = items.reduce((acc, item) => acc + (item.cost * item.quantity), 0);
    setTotalCost(total); // Assuming you have a state to track total cost
  };

  const updateCartIcon = () => {
    let totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartIconCount(totalItems); // Assuming you have a state to track cart icon count
  };

  const [totalQuantity, setTotalQuantity] = useState(0);

  // Update the total quantity of items in the cart
  const updateTotalQuantity = () => {
    let total = items.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(total);
  };

  
  const handleContinueShopping = (e) => {
   onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    updateCartIcon();
    updateTotalCost();
    updateTotalQuantity();
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      } else {
        dispatch(removeItem(item.name)); // If quantity reaches 0, remove the item
      }
      updateCartIcon();
      updateTotalCost();
      updateTotalQuantity();
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    updateCartIcon();
    updateTotalCost();
    updateTotalQuantity();
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
           return item.cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


