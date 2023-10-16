import { useEffect, useState } from "react";
import axios from 'axios';

function useGetCart() {
    axios.defaults.withCredentials = true;
    const [cart, setCart] = useState(null);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'users/getCart');
            console.log("Cart: " + JSON.stringify(res?.data));
            setCart(res?.data);
        } catch (err) {
            console.log(err);
            setCart([])
        }
    }

    return { cart };
}

export default useGetCart;