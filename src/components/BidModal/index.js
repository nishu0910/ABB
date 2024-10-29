import React, { useState } from 'react';
import "./index.css";

function BidModal({ isOpen, onClose, product }) {
    const [straightBid, setStraightBid] = useState('');
    const [maxBid, setMaxBid] = useState('');

    const handleStraightBidChange = (e) => {
        setStraightBid(e.target.value);
    };

    const handleMaxBidChange = (e) => {
        setMaxBid(e.target.value);
    };

    const handleSubmit = () => {
        onClose(straightBid, maxBid);
    };

    if (!isOpen) return null;

    return (
        <div className='bid-modal-container'>
            <div class="backdrop"></div>
            <div className="bid-modal">
                <div className="bid-form">
                    <span className="close-button" onClick={onClose}>
                        &times;
                    </span>
                    <h2>Submit Bid</h2>
                    <div className="input-group">
                        <label htmlFor="straight-bid">Straight bid</label>
                        <input
                            type="number"
                            id="straight-bid"
                            value={straightBid}
                            onChange={handleStraightBidChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="max-bid">Maximum bid</label>
                        <input
                            type="number"
                            id="max-bid"
                            value={maxBid}
                            onChange={handleMaxBidChange}
                        />
                    </div>
                    <div className="bid-info">
                        <p>Minimum Bid: ${product.minimumBid}</p>
                        <p>Current Bid: ${product.currentBid}</p>
                        <p>Ends in: {product.endTime}</p>
                    </div>
                    <button className='submit-button' disabled={!maxBid || !straightBid} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default BidModal;