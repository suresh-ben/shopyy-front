import axios from 'axios';

function useAddProduct() {
    axios.defaults.withCredentials = true;

    const addProduct = async(name, description, price, picture, tag) => {
        console.log(picture);
        try {
            const formData = new FormData();
            formData.append('picture', picture);

            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('tag', tag);

            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'products/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Important to set the content type
                }}
            );

            console.log(res.data);
            return {
                ...res?.data,
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                success: false
            };
        }
    }

    return { addProduct };
}

export default useAddProduct;