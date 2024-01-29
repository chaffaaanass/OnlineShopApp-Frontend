import React, { useEffect, useState } from 'react';
import { deleteFromCart, fetchCartItemsByUserId } from '../services/api';
import '../css/CartItems.css';


const CartItemsList = ({ accessToken }) => {
  console.log('Cart accessToken:', accessToken);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCartItemsByUserId(accessToken);
        setCartItems(response);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchData();
  }, []);
  const handleDeleteFromCart = async (id) => {
    try {
      deleteFromCart(id);
      window.location.href = '/carts';
    }
    catch (error) {
      console.error('Error deleting from cart', error);
    }
  }

  return (
    <div class="Carts">
      <h2>Cart List</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <tr>
            <td>Product Name</td>
            <td>Description</td>
            <td>Price</td>
            <td>Quantity In Stock</td>
            <td>Image</td>
            <td>Quantity</td>
            <td>Delete From Cart</td>
          </tr>
          {cartItems.map((cartItem) => (
          <tr key={cartItem.cartItemId}>
            <td>{cartItem.product.productName}</td>
            <td>{cartItem.product.description}</td>
            <td>{cartItem.product.price}</td>
            <td>{cartItem.product.quantity}</td>
            <td>
              <img src={cartItem.product.image} alt="Product" height="200" width="200"/>
            </td>
            <td>{cartItem.quantity}</td>
            <td>
              <button onClick={() => handleDeleteFromCart(cartItem.cartItemId)}>
                Delete
              </button>
            </td>
          </tr>
          ))}
        </table>      
      )}
        
    </div>
  );
};

export default CartItemsList;
