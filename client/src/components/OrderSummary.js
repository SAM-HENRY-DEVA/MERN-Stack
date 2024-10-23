import React from 'react';

const OrderSummary = ({ order }) => {
  // Helper function to calculate the discounted price
  const calculateDiscountedPrice = (product, quantity) => {
    if (product.offers.length === 0) {
      return product.price * quantity;
    }

    const offer = product.offers[0];
    let discountedPrice = product.price * quantity;

    if (offer.type === 'flat') {
      discountedPrice -= offer.discountValue * quantity;
    } else if (offer.type === 'percentage') {
      discountedPrice -= (product.price * (offer.discountValue / 100)) * quantity;
    }
    
    // For 'product' type, it's generally a free product offer, so no price reduction is applied.
    return discountedPrice;
  };

  // Function to calculate the total price after discount
  const calculateTotal = () => {
    return order.reduce((total, item) => {
      return total + calculateDiscountedPrice(item.product, item.quantity);
    }, 0);
  };

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Original Price (Rs.)</th>
            <th>Discount</th>
            <th>Price After Discount (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => {
            const originalPrice = item.product.price * item.quantity;
            const discountedPrice = calculateDiscountedPrice(item.product, item.quantity);
            const offer = item.product.offers[0] || null;
            return (
              <tr key={index}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>Rs. {originalPrice.toFixed(2)}</td>
                <td>
                  {offer ? (
                    offer.type === 'flat' ? (
                      `Flat Rs. ${offer.discountValue} off`
                    ) : offer.type === 'percentage' ? (
                      `${offer.discountValue}% off`
                    ) : (
                      'Buy one get one free'
                    )
                  ) : (
                    'No Offer'
                  )}
                </td>
                <td>Rs. {discountedPrice.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Total: Rs. {calculateTotal().toFixed(2)}</h4>
    </div>
  );
};

export default OrderSummary;
