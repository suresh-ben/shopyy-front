import axios from 'axios';

function useAddAdmin() {
    axios.defaults.withCredentials = true;

    const addAdmin = async(id) => {
        try {
            const res = await axios.put(process.env.REACT_APP_API_ENDPOINT + 'users/updateAdmin/' + id);
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

    return { addAdmin };
}

export default useAddAdmin;