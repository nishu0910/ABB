import React from "react";
import ProductListing from "../ProductListing";
import { BidsProvider } from "../../context/BidsContext";
const Dashboard = () => {
    return (
        <BidsProvider>
            <ProductListing />
        </BidsProvider>
    )
}

export default Dashboard;