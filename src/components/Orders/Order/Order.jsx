import React from "react";
import { Link } from "react-router-dom"

import useGetProduct from "../../../hooks/useGetProduct";

function Order({order}) {

    const { product } = useGetProduct(order.product);

    return (
        <Link to={`/order/${order.invoiceNo}`} style={{textDecoration: "none", color: "black"}}>
            <div className="order"> 
            <div className="order-main">
                <div>
                    <p>Product: {product?.name}</p>
                    <p>Invoice: {order.invoiceNo.slice(0, 10) + '...'}</p>
                    <p>Order Id: {order._id.slice(0, 10) + '..'}</p>
                </div>
                <div>
                    <img src={process.env.REACT_APP_API_ENDPOINT + 'images/' + product?.picture} alt=""/>
                </div>
            </div>
            <div className="order-body">
                <div >
                    <p>Quantity: {order.quantity}</p>
                    <p>Address: {order.shippingAddress}</p>
                    <p>Amount: {order.total}</p>
                </div>
                <div className="order-status" style={order.status == "success"?{ backgroundColor: "green"}: {backgroundColor: "red"}}>
                    {order.status == "success"? "SUCCESS": "CANCELED"}
                </div>
            </div>
        </div>
        </Link>
    );
}

export default Order;