import axios from 'axios';

function useCancelOrder() {
    axios.defaults.withCredentials = true;

    const cancelOrder = async(invoiceNo) => {
        try {
            const res = await axios.put(process.env.REACT_APP_API_ENDPOINT + 'orders/cancelOrder/' + invoiceNo, {});
            console.log(res.data);
            return {
                success: true,
                ...res?.data
            };
        } catch (err) {
            console.log(err);
            return {
                success: false
            };
        }
    }

    return { cancelOrder };
}

export default useCancelOrder;