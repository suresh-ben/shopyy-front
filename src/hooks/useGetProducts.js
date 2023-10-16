import { useEffect, useState } from "react";
import axios from 'axios';

function useGetProducts() {
    axios.defaults.withCredentials = true;
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'products/');
            console.log("products: " + JSON.stringify(res.data) + "mowa");
            setProducts(res?.data?.reverse());
        } catch (err) {
            console.log(err);
            setProducts([])
        }
    }

    return { products };
}

export default useGetProducts;