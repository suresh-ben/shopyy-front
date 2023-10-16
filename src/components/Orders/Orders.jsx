import React, { useEffect, useState } from "react";
import './Orders.css';

import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import Order from "./Order";

import useGetMyOrders from "../../hooks/useGetMyOrders";

function Orders() {

    const { orders } = useGetMyOrders();

    return(
        <div>
            <Navbar />
            <div className="orders-body">
                {
                    orders && orders.map((order)=>{
                        return < Order order={order} />
                    })
                }
            </div>
            <Footer />
        </div>
    );
}

export default Orders;