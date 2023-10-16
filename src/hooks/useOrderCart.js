import axios from 'axios';

function useOrderCart() {
    axios.defaults.withCredentials = true;

    const orderCart = async(shippingAddress) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'users/orderCart', {
                shippingAddress
            });
            console.log(res.data);
            return {
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                success: false
            };
        }
    }

    return { orderCart };
}

export default useOrderCart;