import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Order.css';

import useGetMyOrderById from "../../hooks/useGetMyOrderById";
import useGetProduct from "../../hooks/useGetProduct";
import useCancelOrder from "../../hooks/useCancelOrder";

import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

function Order() {
    const { invoiceNo } = useParams();
    const { order } = useGetMyOrderById(invoiceNo);
    const { product } = useGetProduct(order?.product);
    const { cancelOrder } = useCancelOrder();
    const [ cancelPrompt, setCancelPrompt ] = useState("");
    const [ cancelPromptColor, setCancelPromptColor ] = useState("red");
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="main-order-home"> 

                { product && order &&
                    <>
                        <img draggable="false" className="product-image" src={process.env.REACT_APP_API_ENDPOINT + 'images/' + product.picture} alt=""/>

                        <div className="main-order-body">
                            <p className="main-cancel-prder-tag">Invoice No: {order.invoiceNo}</p>
                            <p className="main-cancel-prder-tag">Order Id: {order._id}</p>

                            <p className="main-cancel-prder-tag">Product: {product?.name}</p>

                            <p>Quantity: {order.quantity}</p>
                            <p>Address: {order.shippingAddress}</p>
                            <p>Amount: {order.total}</p>

                            {
                                order.status == 'canceled'? 
                                <p style={{color: 'red', fontSize: 'large', fontWeight: 'bold'}}>Order Canceled</p>
                                : 
                                <>
                                <button type=""
                                    className="main-cancel-order-button"
                                    onClick={async ()=>{
                                        const res = await cancelOrder(invoiceNo);
                                        if(res.success) {
                                            setCancelPrompt("Order Canceled Successfully, you will be redirected to orders page");
                                            setCancelPromptColor("green");
                                            setTimeout(()=>{
                                                navigate('/orders');
                                            }, [1500]);
                                        }
                                        else {
                                            setCancelPrompt("Unable to cancel Order");
                                            setCancelPromptColor("red");
                                        }
                                    }}
                                >
                                    Cancel Order
                                </button>
                                <p style={{color: cancelPromptColor}}>{cancelPrompt}</p>
                                </>
                            }
                        </div>
                    </>                
                }

            </div>
            <Footer />
        </div>
    );
}

export default Order;