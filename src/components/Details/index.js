import React from "react";
import { BidsProvider } from "../../context/BidsContext";
import { useParams } from 'react-router-dom';
import BidDetail from "../BidDetail";

const Details = () => {
    const { id } = useParams();
    return (
        <BidsProvider>
            <BidDetail id={id} />
        </BidsProvider>
    )
}
export default Details;