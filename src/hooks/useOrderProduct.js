import axios from 'axios';

function useOrderProduct() {
    axios.defaults.withCredentials = true;

    const orderProductById = async(productID, quantity, shippingAddress) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'orders/', {
                productID, quantity, shippingAddress
            });
            console.log("Order: " + JSON.stringify(res.data));
            
            return{
                success: true,
                data: res?.data
            };
        } catch (err) {
            console.log(err);
            return{
                success: false,
                data: err
            }
        }
    }

    return { orderProductById };
}

export default useOrderProduct;