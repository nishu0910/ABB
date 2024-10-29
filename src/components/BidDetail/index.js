import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "./index.css";
import { useBids } from '../../context/BidsContext';
import BidModal from '../BidModal';
import { useAuth } from '../../context/AuthContext';

const BidDetail = ({ id }) => {
    const { productBids,
        setAuctions,
        updateProductWithBidValue,
        getAuctionData
    } = useBids();
    const { user } = useAuth();
    const history = useHistory();
    const [productData, setProductData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [currentBid, setCurrentBid] = useState(0);
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);
    const [bidUsers, setBidUsers] = useState([]);

    const handleBidClick = () => {
        setIsBidModalOpen(true);
    };

    //   The "Straight Bid" is the amount of money you are willing to pay for the item right now. 
    //   The "Maximum Bid" is the highest amount you are willing to pay for the item. 
    //   If the current bid is lower than your straight bid, you will win the auction. 
    //   If the current bid is higher than your straight bid, you will only win the auction if 
    //   the maximum bid is higher than the current bid and you are willing to pay the maximum bid.
    const handleCloseBidModal = (straightbid, maxBid) => {
        if (straightbid && maxBid) {
            const { firstname, email } = user;
            let bidValue
            if (Number(straightbid) > productData.currentBid && Number(straightbid) > Number(maxBid)) {
                bidValue = Number(straightbid);
            } else {
                bidValue = +maxBid;
            }
            const bidUser = {
                firstname,
                email,
                bidValue
            }
            setCurrentBid(bidValue);
            setAuctions(id, bidUser);

            updateProductWithBidValue(id, bidValue);
            setBidUsers((prev)=>{
                return [...prev,{...bidUser}]
            });
        }

        setIsBidModalOpen(false);
    }

    useEffect(() => {
        const product = productBids.find(p => p.id === Number(id));
        if (product) {
            setProductData(product);
            setCurrentBid(product.currentBid);
        }
    }, [productBids, id]);

    if (!user) {
        history.push("/login");
    }

    useEffect(() => {
        if(id){
            getAuctionData(id).then(d => setBidUsers(d || []));
        }
    }, [id])

    return (
        <div className="bid-detail-page">
            {showDetails && (
                <div className="details-container">
                    <h2>Bid Details</h2>
                    <p>Current Bid: ${currentBid}</p>
                </div>
            )}
            {productData ? <div className="product-details">
                <h2>{productData.name}</h2>
                <img src={productData.image} alt={productData.name} />
                <p>{productData.description}</p>
                <p>Current Bid: ${productData.currentBid}</p>
                <button onClick={handleBidClick} className="bid-button">
                    Bid Now
                </button>
            </div> : null}
            <div className='bids-section'>
                {bidUsers.map((bid) => {
                    return <div>{bid.firstname} bids $ {bid.bidValue}</div>
                })}
            </div>
            <BidModal isOpen={isBidModalOpen} onClose={handleCloseBidModal} product={productData} />

        </div>
    );
};

export default BidDetail;