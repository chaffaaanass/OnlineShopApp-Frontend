import React, { useEffect, useState } from 'react';
import { fetchProducts, addToCart } from '../services/api';
import '../css/ProductList.css';


const ProductList = ({ accessToken }) => {
  console.log('ProductList accessToken:', accessToken);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetchProducts();
        console.log(response);
        setProducts(response.data);
      };
  
      fetchData();
    }, []);
    const handleAddToCart = async (productId, quantity) => {
      try {
        console.log('Attempting to add to cart:', productId, quantity, accessToken);
        await addToCart(productId, quantity, accessToken);
        console.log('Request Headers:', accessToken);
        window.location.href = '/carts';
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    };
    
  
    return (
      <div class="Products">
        <h2>Product List</h2>
          <table>
            <tr>
              <td>Product Name</td>
              <td>Description</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Image</td>
              <td>Add To Cart</td>
            </tr>
            {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <img src={product.image} alt={product.productName} height="200" width="200"/>
              </td>
              <div class="cartbutton">
              <td>
                <input
                  type="number"
                  min="1"
                  value={product.quantity || 1}
                  onChange={(e) => {
                    const newProducts = products.map((p) => {
                      if (p.productId === product.productId) {
                        return { ...p, quantity: parseInt(e.target.value, 10) };
                      }
                      return p;
                    });
                    setProducts(newProducts);
                  }}
                />
              </td>
              <td>
                <button onClick={() => handleAddToCart(product.productId, product.quantity || 1)}>
                  Add to Cart
                </button>
              </td>
              </div>
            </tr>
            
          ))}
          </table>
          
      </div>
    );
  };
  
  
  export default ProductList;