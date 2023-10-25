import React, {useState, useContext} from "react";
import './Product.css'
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

import useGetProduct from "../../hooks/useGetProduct";
import useOrderProduct from "../../hooks/useOrderProduct";
import AuthContext from "../../contexts/AuthContext";
import useAddToCart from "../../hooks/useAddToCart";

function Product() {
    const {id} = useParams();
    const {product} = useGetProduct(id);
    const [ prompt, setPrompt ] = useState("");
    const [ promptColor, setPromptColor ] = useState("");
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { orderProductById } = useOrderProduct();
    const [quantity, setQuantity] = useState(0);
    const [shippingAddress, setShippingAddress] = useState("");
    const [orderPrompt, setOrderPrompt] = useState(false);
    const [orderErr, setOrderErr] = useState(false);
    const {addToCart} = useAddToCart();
    const [cartPrompt, setCartPrompt] = useState(false);
    const [cartPromptColor, setCartPromptColor] = useState(false);

    const orderManager = () => {
        if(!currentUser || !currentUser.success)
            navigate('/auth');
        else if(currentUser.isAdmin) {
            setPrompt("Admin can not order products");
            setPromptColor('red');
        }
        else {
            setOrderPrompt(true);
        }
    }

    const OrderProduct = async ()=> {
        if(quantity <=0 ) {
            setOrderErr("PLease provide Quantity");
            return;
        }
        if(shippingAddress.length <=0) {
            setOrderErr("Please provide Shipping Address");
        }

        const order = await orderProductById(id, quantity, shippingAddress);
        if(!order.success)
            setOrderErr("UNable to Order Product: " + order?.err);
        else {
            setOrderErr("Order Successfull!!!, you will be redirected to your orders");
            setTimeout(()=>{
                navigate('/orders');
            }, [1500])
        }
            
    }

    async function handleAddToCart() {
        if(currentUser?.isAdmin) {
            setCartPrompt("Cart is Unavailable to Admin!!");
            setCartPromptColor('red');
            return;
        }
        
        const res = await addToCart(id);
        if(!res.success) {
            setCartPrompt("Unable to add to cart");
            setCartPromptColor('red');
        }
        else {
            setCartPrompt("Successfullu added to Cart");
            setCartPromptColor('green');
        }
    }

    return (
        <div>
            <Navbar />
            <div className="product-body">
                {
                    product &&
                    <>
                        <img className="product-image" src={process.env.REACT_APP_API_ENDPOINT + 'images/' + product.picture} alt=""/>
                        <div className="product-details">
                            <p className="product-detail-name">{product.name}</p>
                            <p className="product-detail-desc">{product.description}</p>
                            <p className="product-detail-pric">Price: {product.price}</p>

                            <div className="prod-buttons-mobile-holder">
                            <button onClick={()=>orderManager()} className="">Order now</button>
                            <button 
                                onClick={handleAddToCart}
                            >Add to Cart</button>
                            </div>
                            <p style={{color: promptColor}}>{prompt}</p>
                            <p style={{color: cartPromptColor}}>{cartPrompt}</p>
                        </div>

                        {
                            orderPrompt && 
                            <div className="pop-up-window">
                                <div className="pop-up">
                                    <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}> <button onClick={()=>{setOrderPrompt(false)}} type="">X</button>  </div>
                                    <p style={{textAlign: 'center', fontSize: 'xx-large', fontWeight: 'bold'}}>Order Product</p>

                                    <input className="sign-input-names" type="number"
                                        placeholder="Quantity"
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <input className="sign-input-names" type="text" 
                                        placeholder="Address"
                                        onChange={(e)=> setShippingAddress(e.target.value)}
                                    />

                                    
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                                        <button style={{width: '90%', margin: '1rem'}}
                                            onClick={OrderProduct}
                                        >
                                        Order now
                                        </button>
                                    </div>
                                    <p style={{textAlign: 'center'}}>{orderErr}</p>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
            <Footer />
        </div>
    );
}

export default Product;