import axios from 'axios';

function useUpdateProduct() {
    axios.defaults.withCredentials = true;

    const updateProduct = async(id, name, description, price, availability) => {
        try {
            const res = await axios.put(process.env.REACT_APP_API_ENDPOINT + 'products/updateProduct/' + id, {
                name, 
                description, 
                price, 
                availability
            });

            return {
                success: true,
                data: res?.data
            }
        } catch (err) {
            return {
                err: err.response?.data,
                success: false
            }
        }
    }

    return { updateProduct };
}

export default useUpdateProduct;