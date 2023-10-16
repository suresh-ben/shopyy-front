import { useEffect, useState } from "react";
import axios from 'axios';

function useCurrentUser() {
    axios.defaults.withCredentials = true;
    const [user, setUser] = useState(null);

    useEffect(() => {
        currentUSer();
    }, []);

    const currentUSer = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'users/currentuser');
            console.log(res);
            console.log("res: "+ JSON.stringify(res));
            setUser({
                ...res?.data.user,
                success: true
            });
        } catch (err) {
            console.log(err);
            setUser({
                success: false
            })
        }
    }

    return { user };
}

export default useCurrentUser;