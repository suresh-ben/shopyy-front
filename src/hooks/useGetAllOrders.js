import { useEffect, useState } from "react";
import axios from 'axios';

function useGetAllOrders() {
    axios.defaults.withCredentials = true;
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'orders/viewAllOrders');
            console.log("All Orders: " + JSON.stringify(res.data));
            setOrders(res?.data);
        } catch (err) {
            console.log(err);
            setOrders({})
        }
    }

    return { orders };
}

export default useGetAllOrders;