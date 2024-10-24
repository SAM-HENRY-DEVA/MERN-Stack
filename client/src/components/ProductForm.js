
import React, { useState } from 'react';

const ProductForm = ({ products, onAddProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  // const [message, setMessage] = useState('');

  const handleAddProduct = () => {
    console.log("ID: ", selectedProduct, "  Quantity: ", quantity)
    if ((selectedProduct) && (quantity > 0)) {
      onAddProduct({ product: selectedProduct, quantity });
    } 
    // else {
    //   setMessage('Product cannot be added - ID: '+ selectedProduct+ '  Quantity: '+ quantity)
    // }

  };

  return (
    <div className="product-form">
      <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="">Select Product</option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        placeholder="Quantity"
      />
      <button onClick={handleAddProduct}>Add Product</button>
      {/* <p>{message}</p> */}
    </div>
  );
};

export default ProductForm;
