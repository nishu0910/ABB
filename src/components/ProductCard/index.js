import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [currentBid, setCurrentBid] = useState(product.currentBid);
  const [isBidding, setIsBidding] = useState(false);

  const handleBid = () => {
    setIsBidding(true);
    // Implement bidding logic here, e.g., update currentBid
    // and send a request to your backend to update the bid
    setTimeout(() => {
      setCurrentBid(product.currentBid + 10); // Increase bid by $10
      setIsBidding(false);
    }, 1000); // Simulate bidding delay
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="bid-details">
          <div className="bid-price">
            <span className="bid-label">Minimum Bid:</span>
            <span className="bid-amount">${product.minimumBid}</span>
          </div>
          <div className="bid-price">
            <span className="bid-label">Current Bid:</span>
            <span className="bid-amount">${currentBid}</span>
          </div>
          <div className="bid-timer">
            <span className="bid-label">Ends in:</span>
            <span className="bid-time">{product.endTime}</span>
          </div>
        </div>
        <button className="bid-button" onClick={handleBid} disabled={isBidding}>
          {isBidding ? 'Bidding...' : 'Bid Now'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;