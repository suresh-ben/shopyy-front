import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";

import './Admin.css';
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import AuthContext from "../../contexts/AuthContext";
import useGetProducts from "../../hooks/useGetProducts";
import useAddProduct from "../../hooks/useAddProduct";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import useGetAllOrders from "../../hooks/useGetAllOrders";
import useGetProduct from "../../hooks/useGetProduct";
import useAddAdmin from "../../hooks/useAddAdmin";

function Admin() {
    const {currentUser} = useContext(AuthContext);
    const {products} = useGetProducts();
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [tag, setTag] = useState(null);
    const [addProd, setAddProd] = useState(false);
    const { addProduct } = useAddProduct();
    const [err, setErr] = useState("");
    const [picture, setPicture] = useState(null);
    const [productsVsOrders, setProductsVsOrders] = useState(true); //true = products | false = orders
    const { orders } = useGetAllOrders();
    const [adminPop, setAdminPop] = useState(false);
    const [newAdminId, setNewAdminId] = useState(null);
    const [newAdminErr, setNewAdminErr] = useState("");
    const [newAdminPrompt, setNewAdminPrompt] = useState("");
    const {addAdmin} = useAddAdmin();


    async function addProductHandle () {
      if(!name || name.length <= 0) {
        setErr("Please provide a name");
        return;
      }

      if(!description || description.length <= 0){
        setErr("Please provide some description");
        return;
      }

      if(!price || price <= 0) {
        setErr("Please provide a price");
        return;
      }

      if(!picture) {
        setErr("No image selected");
        return;
      }

      const res = await addProduct(name, description, price, picture, tag);
      if(!res.success)
        setErr("Unable to add this product");
      else {
        setErr("");
        setAddProd(false);
        products.push({
          name, description, price
        });
      }
    }

    async function addNewAdmin() {
      if(!newAdminId || newAdminId.length <=0) {
         setNewAdminErr("Please provide an user Id");
      }

      const res = await addAdmin(newAdminId);
      if(!res.success) {
        setNewAdminErr("Unable to add user. Please check userId");
      }
      else {
        setAdminPop(false);
        setNewAdminErr("");
        setNewAdminPrompt("Admin Added successfully!!");
      }
    }

    return (
        <div>
            <Navbar />
            <div className="admin-body">
                {
                    currentUser && currentUser.isAdmin?
                    <div className="admin-body-main">
                        <p style={{textAlign: 'center', color: 'green', fontSize: '1rem'}}>{newAdminPrompt}</p>
                        <div style={{display: 'flex', justifyContent: 'flex-end', width: '95vw', position: 'relative'}}>
                          <button onClick={()=>setAdminPop(true)} type="">Add an Admin</button>
 
                          {
                            adminPop &&
                            <div className="pop-up-window">
                                <div className="pop-up">
                                  <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}> <button onClick={()=>{setAdminPop(false)}} type="">X</button>  </div>
                                  <p>Add an Admin</p>
                                  <input 
                                    className="sign-input-names"
                                    placeholder="New Admin Id"
                                    onChange={(e) => {
                                      setNewAdminId(e.target.value);
                                    }}
                                    type="text" />

                                  <button onClick={addNewAdmin} >
                                    Add Admin
                                  </button>
                                  <p style={{fontSize: '1rem', color: 'red', textAlign: 'center'}}>{newAdminErr}</p>
                                </div>
                            </div>
                          }
                        </div>

                        <p style={{marginTop: '1rem'}}>Admin Page</p>
                        <div >
                            <button onClick={()=>setProductsVsOrders(true)} type="">Products</button>
                            <button onClick={()=>setProductsVsOrders(false)} type="">Orders</button>
                        </div>
                        {
                          productsVsOrders?
                            <>
                            {/* product */}
                            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%'}}>
                               <button
                                onClick={()=>{setAddProd(true)}}
                                type="">Add Product</button>
                            </div>

                            {
                              addProd && 

                              <div className="pop-up-window">
                              <div className="pop-up">
                                <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}> <button onClick={()=>{setAddProd(false)}} type="">X</button>  </div>
                                <p>Add Product</p>

                                <input 
                                  className="sign-input-names"
                                  placeholder="Product Name"
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                  type="text" />
                                <textarea 
                                  rows="4" 
                                  placeholder="Description"
                                  className="sign-input-names"
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                  type="text" multiple />
                                <input 
                                  className="sign-input-names"
                                  placeholder="Price"
                                  onChange={(e) => {
                                    setPrice(e.target.value);
                                  }}
                                  type="number" />

                                <input 
                                    type="file" 
                                    name="picture"
                                    className="sign-input-names"
                                    onChange={(e)=>{
                                      setPicture(e.target.files[0]);
                                    }}
                                    />

                                <input 
                                  className="sign-input-names"
                                  placeholder="Tag | optional"
                                  onChange={(e) => {
                                    setTag(e.target.value);
                                  }}
                                  type="text" />

                                  <button 
                                    onClick={()=> addProductHandle()}
                                    type="">
                                    Add Product
                                  </button>
                                  <p style={{color: 'red', fontSize: '.75rem', textAlign: 'center'}}>{err}</p>
                              </div>
                              </div>
                            }

                            <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Availability</th>
                                    <th scope="col">Options</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    products && products.map( (item)=>{
                                      return(
                                        <Product key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} availability={item.isActive} />
                                      );
                                    })
                                  }
                                  
                                </tbody>
                            </table>
                            </>
                            :

                            <>
                              {/* Orders */}
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">OrderId</th>
                                    <th scope="col">Invoice</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Shipping Address</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    orders && orders.map( (order)=>{
                                      return <Order id={order._id} invoice={order.invoiceNo} productId={order.product} quantity={order.quantity} address={order.shippingAddress} key={order._id} />
                                    })
                                  }
                                  
                                </tbody>
                            </table>
                            </>
                          }
                        </div> :

                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{fontSize: '2rem', textAlign: 'center'}}>This page is available only to admins</p>
                        <Link to={'/'}>
                            Home
                        </Link>
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
}

function Product({id, name, description, price, availability}) {

  const { updateProduct } = useUpdateProduct();
  const [ productUpdateWindow, setProductUpdateWindow ] = useState(false);
  const [prodName, setProdName] = useState(name);
  const [prodDesc, setProdDesc] = useState(description);
  const [prodPrice, setProdPrice] = useState(price);
  const [prodAvail, setProdAvail] = useState(availability);

  const [newName, setNewName] = useState(null);
  const [newDesc, setNewDesc] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const [newAvail, setNewAvail] = useState(availability);
  const [err, setErr] = useState("");

  async function update() {
    const res = await updateProduct(id, newName, newDesc, newPrice, newAvail);
    if(res.success) {
      setProdName(newName);
      setProdDesc(newDesc);
      setProdPrice(newPrice);
      setProdAvail(newAvail);
      setProductUpdateWindow(false);
    }
    else
      setErr("Unable to update Product");
  }

  return (
    <tr>
      <td>{prodName? prodName: name}</td>
      <td className="des-div">
        {prodDesc? prodDesc: description}
      </td>
      <td>{prodPrice? prodPrice: price}</td>
      <th scope="row">{prodAvail? "Available" : "Not available"}</th>
      <th scope="row">
        <button
          onClick={()=>setProductUpdateWindow(true)}
        >
          Update
        </button>
        {
          productUpdateWindow && 
          <div className="pop-up-window">
            <div className="pop-up">
              <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}> <button onClick={()=>{setProductUpdateWindow(false)}} type="">X</button>  </div>
              <label >Name</label>
              <input 
                className="sign-input-names"
                name="name"
                defaultValue={prodName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
                type="text" />
              
              <label >Description</label>
              <textarea 
                className="sign-input-names"
                name="desc"
                defaultValue={prodDesc}
                onChange={(e) => {
                  setNewDesc(e.target.value);
                }}
                type="text" />
              
              <label >Price</label>
              <input 
                className="sign-input-names"
                name="price"
                defaultValue={prodPrice}
                onChange={(e) => {
                  setNewPrice(e.target.value);
                }}
                type="number" />
                
              <div style={{width: '90%', display: "flex", alignItems: 'center'}}>
                <label >Availability</label>
                <input 
                style={{width: '1rem'}}
                  className="sign-input-names"
                  name="avail"
                  checked={newAvail}
                  onChange={() => {
                    setNewAvail(!newAvail);
                  }}
                  type="checkbox" />
              </div>

              <button 
                onClick={update}
              >
                Update Product
              </button>
              <p style={{fontSize: '.95rem', color: 'red', textAlign: 'center'}}>{err}</p>
            </div>
          </div>
        }
      </th>
    </tr>                       
  );
}

function Order({id, invoice, productId, quantity, address}) {
  
  const { product } = useGetProduct(productId);

  return (
    <tr>
      <td>{id.slice(0, 8) + '...'}</td>
      <td>{invoice.slice(0, 8) + '...'}</td>
      <td>{product?.name}</td>
      <td>{quantity}</td>
      <td className="des-div">{address}</td>
    </tr>
  );
}

export default Admin;