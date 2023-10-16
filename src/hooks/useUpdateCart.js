import axios from 'axios';

function useUpdateCart() {
    axios.defaults.withCredentials = true;

    const updateCart = async(productId, count) => {
        try {
            const res = await axios.put(process.env.REACT_APP_API_ENDPOINT + 'users/updateCart', {
                productId, count
            });
            return {
                success: true,
                ...res?.data
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
            }
        }
    }

    return { updateCart };
}

export default useUpdateCart;