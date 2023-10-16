import axios from 'axios';

function useAddToCart() {
    axios.defaults.withCredentials = true;

    const addToCart = async(productId) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'users/addToCart/' + productId);
            console.log("add to cart: "+ JSON.stringify(res?.data));
            return {
                success: true
            }
        } catch (err) {
            console.log(err);
            return {
                success: false
            }
        }
    }

    return { addToCart };
}

export default useAddToCart;