import React, { createContext, useEffect, useState } from 'react';
import { products } from "./data/products";

const BidsContext = createContext();

export const BidsProvider = ({ children }) => {
    const [productBids, setProductBids] = useState([]);
    const [bidData, setBidData] = useState({});

    useEffect(() => {
        let bids = localStorage.getItem('bids');
        if (!bids) {
            bids = products;
            localStorage.setItem('bids', JSON.stringify(products));
        } else {
            bids = JSON.parse(bids);
        }
        setProductBids(bids);

        let auctions = localStorage.getItem('auctions');
        if (!auctions) {
            auctions = {};
            localStorage.setItem('auctions', JSON.stringify(auctions));
        } else {
            auctions = JSON.parse(auctions);
        }
        setBidData(auctions);
    }, [])

    const setAuctions = (id, auctionUser) => {
        return new Promise((resolve) => {
            setBidData((prevAuctions) => {
                const newAuctions = { ...prevAuctions };
                if (newAuctions[id]) {
                    let newAuctionData = newAuctions[id].find(p => p.email === auctionUser.email)
                    if (newAuctionData) {
                        newAuctionData.bidValue = auctionUser.bidValue;
                    } else {
                        newAuctions[id] = [...newAuctions[id], { ...auctionUser }];
                    }

                } else {
                    newAuctions[id] = [{ ...auctionUser }];
                }
                localStorage.setItem('auctions', JSON.stringify(newAuctions));
                return newAuctions;
            });
            resolve();
        })
    }

    const updateProductWithBidValue = (id, bidValue) => {
        return new Promise((resolve) => {
            setProductBids((prds) => {
                let u = prds.find(p => p.id === Number(id));
                u.currentBid = Number(bidValue);
                localStorage.setItem('bids', JSON.stringify(prds));
                return Array.from(prds);
            });
            resolve();
        })
    }

    const getAuctionData = (id) => {
        return new Promise((resolve) => {
            let auctions = localStorage.getItem('auctions');
        if (!auctions) {
            auctions = {};
        } else {
            auctions = JSON.parse(auctions);
        }
            resolve(auctions[id] || []);
        })
    }

    return (
        <BidsContext.Provider value={{ productBids, auctions: bidData, setAuctions, updateProductWithBidValue, getAuctionData }}>
            {children}
        </BidsContext.Provider>
    );
};

export const useBids = () => React.useContext(BidsContext);