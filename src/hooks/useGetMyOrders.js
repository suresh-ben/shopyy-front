import { useEffect, useState } from "react";
import axios from 'axios';

function useGetMyOrders(id) {
    axios.defaults.withCredentials = true;
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'orders/viewMyOrders');
            console.log("Orders: " + JSON.stringify(res.data));
            setOrders(res?.data?.reverse());
        } catch (err) {
            console.log(err);
            setOrders({})
        }
    }

    return { orders };
}

export default useGetMyOrders;