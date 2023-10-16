import React, { useEffect, useState, useContext } from "react";
import './Cart.css';

import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

import useGetCart from "../../hooks/useGetCart";
import useGetProduct from "../../hooks/useGetProduct";
import useUpdateCart from "../../hooks/useUpdateCart";
import AuthContext from "../../contexts/AuthContext";
import useOrderCart from "../../hooks/useOrderCart";

function Cart() {
    
    const { cart } = useGetCart();
    const [ updateErr, setUpdateErr ] = useState("");
    const { currentUser } = useContext(AuthContext);
    const [ address, setAddress ] = useState(null);
    const { orderCart } = useOrderCart();
    const [ orderPromt, setOrderPrompt ] = useState("");
    const [ orderPromtColor, setOrderPromptColor ] = useState("");

    async function orderCartHandle() {
        if(!address || address.length <= 0) {
            setOrderPrompt("Please provide a valid Address");
            setOrderPromptColor('red');
            return;
        }

        const res = await orderCart(address);
        if(res.success) {
            setOrderPrompt("Order Successfull!!!");
            setOrderPromptColor('green');
        }
        else {
            setOrderPrompt("Unable to Order!!!");
            setOrderPromptColor('red');
        }
    }

    return(
        <div>
            <Navbar />
            {
                currentUser && currentUser.isAdmin?
                    <div className="cart-body">
                        <p>Cart is Not available to Admin</p> 
                    </div>
                    :
                    <div className="cart-body">
                    <p style={{color: 'red'}} >{updateErr}</p>
                    <div style={{display: 'flex', padding: '0 1rem'}}>
                    {
                        cart && cart?.map((product, i) => {
                            if(product.val > 0)
                                return <Product key={i} setUpdateErr={setUpdateErr} productId={product.productId} count={product.val}/>
                        })
                    }
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <textarea className="cart-address" 
                           placeholder="Shipping Address"
                           onChange={(e)=>{
                               setAddress(e.target.value);
                           }}
                        />

                        <button className="cart-order"
                            onClick={orderCartHandle}
                        >
                            Order Cart
                        </button>
                        <p style={{color: orderPromtColor}}>{orderPromt}</p>
                    </div>
            </div>
            }
            <Footer />
        </div>
    );
}

function Product({productId, count, setUpdateErr}) {
    
    const { product } = useGetProduct(productId);
    const [ prodCount, setProdCount ] = useState(count);
    const [ total, setTotal ] = useState(0);
    const { updateCart } = useUpdateCart();

    useEffect(()=>{
        if(product && prodCount)
            setTotal(product.price * prodCount);
    }, [product, prodCount]);

    async function updateCartHandle( diff ) {
        const res = await updateCart(productId, prodCount + diff);
        if(res.success) {
            setProdCount(prodCount + diff);
        }
        else {
            setUpdateErr("Unable to update count!!!");
        }
    }

    if(prodCount <= 0) 
        return;

    return(
        <div className="shop-product">
            <img src={process.env.REACT_APP_API_ENDPOINT + 'images/' + product?.picture} alt=""/>
            <div style={{width: '85%'}}>
                <p className="shop-product-name" >{product?.name}</p>
                <div style={{display: 'flex', alignContent: 'center'}}>
                    <p className="shop-product-desc">Count: {prodCount}</p>
                    <button style={{border: 0, backgroundColor: 'transparent', padding: 0, margin: '0 .1rem'}} 
                        onClick={()=>updateCartHandle(1)}
                    >🔼</button>

                    <button style={{border: 0, backgroundColor: 'transparent', padding: 0, margin: '0 .1rem'}}
                        onClick={()=>updateCartHandle(-1)}
                    >🔽</button>
                </div>
                <p className="shop-product-price">total: {total}</p>
            </div>
        </div>
    );
}

export default Cart;