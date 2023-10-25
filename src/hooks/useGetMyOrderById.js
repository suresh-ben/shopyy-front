import { useEffect, useState } from "react";
import axios from 'axios';

function useGetMyOrderById(invoice) {
    axios.defaults.withCredentials = true;
    const [order, setOrder] = useState(null);

    useEffect(() => {
        getOrder();
    }, []);

    const getOrder = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'orders/viewMyOrders/' + invoice);
            console.log("Order: " + JSON.stringify({...res.data}));
            setOrder({
                success: true,
                ...res?.data
            });
        } catch (err) {
            console.log(err);
            setOrder({
                success: false
            })
        }
    }

    return { order };
}

export default useGetMyOrderById;