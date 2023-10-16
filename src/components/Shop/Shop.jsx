import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";

import './Shop.css';
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

import AuthContext from "../../contexts/AuthContext";
import useGetProducts from "../../hooks/useGetProducts";

function Shop() {

    const { currentUser } = useContext(AuthContext);
    const { products } = useGetProducts();

    return(
        <div>
            <Navbar />
            { currentUser && currentUser.isAdmin &&
                <div className="shop-owner">
                This option is Visible only to admins of this page

                <Link className="to-admin" to={'/admin'}>
                    Edit shop
                </Link>
            </div>
            }
            <div className="shop-body">

                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '1rem 2rem'}}>Hot Deals 🔥</p>
                <div className="products-container">
                {
                    products && products.map((item) => {
                        if(item.tag == "hot")
                        return (
                            <Link to={`/product/${item._id}`} className="shop-product">
                                <img src={process.env.REACT_APP_API_ENDPOINT + 'images/' + item.picture} alt={item.name}/>
                                <div style={{width: '85%'}}>
                                    <p className="shop-product-name">{item.name}</p>
                                    <p className="shop-product-desc">{item.description.length > 24? item.description.slice(0, 24) + '...' : item.description}</p>
                                    <p className="shop-product-price">{item.price}</p>
                                </div>
                            </Link>
                        );
                    })
                }
                </div>

                <hr style={{borderWidth: '.5rem', borderColor: 'black', margin: '2rem'}}/>

                <div className="products-container">
                {
                    products && products.map((item) => {
                        return (
                            <Link to={`/product/${item._id}`} className="shop-product">
                                <img src={process.env.REACT_APP_API_ENDPOINT + 'images/' + item.picture} alt={item.name}/>
                                <div style={{width: '85%'}}>
                                    <p className="shop-product-name">{item.name}</p>
                                    <p className="shop-product-desc">{item.description.length > 24? item.description.slice(0, 24) + '...' : item.description}</p>
                                    <p className="shop-product-price">{item.price}</p>
                                </div>
                            </Link>
                        );
                    })
                }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Shop;