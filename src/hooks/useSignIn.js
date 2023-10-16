import axios from 'axios';

function useSignIn() {
    axios.defaults.withCredentials = true;

    const signIn = async(userName, password) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'users/login/', {
                userName,
                password
            });
            console.log(res?.data);

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

    return { signIn };
}

export default useSignIn;