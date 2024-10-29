import React from "react";
import { Link } from 'react-router-dom';
import ProductCard from "../ProductCard";
import "./index.css";
import { useBids } from "../../context/BidsContext";

const ProductListing = () => {
    const {productBids} = useBids();
  
    return (
      <div className="auction-list">
        {productBids?.map((product) => (
          <Link to={`/bid-detail/${product.id}`} key={product.id}>
          <ProductCard product={product} />
        </Link>
        ))}
      </div>
    );
  };
  
  export default ProductListing;