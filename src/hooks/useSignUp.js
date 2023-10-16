import axios from 'axios';

function useSignUp() {
    axios.defaults.withCredentials = true;
    const signUp = async(userName,firstName, lastName, email, password, mobileNo) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'users/', {
                userName,
                firstName,
                lastName,
                email,
                password,
                mobileNo
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

    return { signUp };
}

export default useSignUp;