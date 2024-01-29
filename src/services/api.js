import axios from 'axios';

const BASE_URL = 'https://localhost:7166';

export const fetchProducts = () => axios.get(`${BASE_URL}/api/Products`);


export const fetchCartItemsByUserId = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Carts/CartItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },      
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart items for user:`, error);
    throw error;
  }
};
export const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Products/${productId}`);
      return response;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
};

export const addToCart = async (productId, quantity, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/api/Carts/AddToCart/${productId}?quantity=${quantity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },      
    });

    if (!response.ok) {
      throw new Error('Error adding item to cart');
    }
  } catch (error) {
    throw new Error(`Error adding item to cart: ${error.message}`);
  }
};
export const deleteFromCart = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/CartItems/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error deleting item from cart');
    }
  } catch (error) {
    throw new Error(`Error deleting item from cart: ${error.message}`);
  }
};
