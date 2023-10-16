import { useEffect, useState } from "react";
import axios from 'axios';

function useGetProduct(id) {
    axios.defaults.withCredentials = true;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if(id)
            getProducts();
    }, [id]);

    const getProducts = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'products/getSingleProduct/' + id);
            console.log("product: " + JSON.stringify(res.data));
            setProduct(res?.data);
        } catch (err) {
            console.log(err);
            setProduct({})
        }
    }

    return { product };
}

export default useGetProduct;