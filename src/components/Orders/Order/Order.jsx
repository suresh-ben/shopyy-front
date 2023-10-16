import React from "react";

import useGetProduct from "../../../hooks/useGetProduct";

function Order({order}) {

    const { product } = useGetProduct(order.product);

    return (
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
                <p>Quantity: {order.quantity}</p>
                <p>Address: {order.shippingAddress}</p>
                <p>Amount: {order.total}</p>
            </div>
        </div>
    );
}

export default Order;