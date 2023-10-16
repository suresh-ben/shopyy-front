import React from "react";
import { Link } from "react-router-dom";

import './Footer.css'

function Footer() {

    const SignOut = async () => {

        //clear cookies
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [cookieName] = cookie.split('=');
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }

        //reload
        window.location.reload();
    }

    return (
        <footer className="footer">
            <div className="foot-links">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/cart">Cart</Link>
                <button onClick={SignOut} style={{color: 'gray'}} to="/">SignOut</button>
            </div>
            <div className="foot-bottom">
                <p>©shopyy, 2023 October</p>
            </div>
        </footer>
    );
}

export default Footer;