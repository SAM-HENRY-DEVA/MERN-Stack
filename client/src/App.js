import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import ProductForm from './components/ProductForm';
import OrderSummary from './components/OrderSummary';

function App() {
  const [products, setProducts] = useState([]); // State to store products fetched from the backend
  const [order, setOrder] = useState([]);

  // Fetch products from the backend API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data); // Update the products state with data from API
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array means this will run once when the component mounts

  const addProductToOrder = (item) => {
    const product = products.find(p => p._id === item.product);
    setOrder([...order, { product, quantity: item.quantity }]);
  };

  return (
    <div className="App">
      <h1>POS System</h1>
      <ProductForm products={products} onAddProduct={addProductToOrder} />
      <OrderSummary order={order} />
    </div>
  );
}

export default App;
