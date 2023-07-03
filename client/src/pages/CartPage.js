import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");

  //total price
  
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        return (total = total + item.price);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Remove Cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //Get payment token
  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );

      if (data?.success) {
        setClientToken(data?.clientToken);
      }
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth]);

  //payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Product ordered")
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout title={"Cart"}>
        {auth?.token ? (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="text-center p-2 mb-1 mt-2">
                  {`Hello ${auth?.token && auth?.user?.name}`}
                </h3>
                <h6 className="text-center text-secondary fw-bold">
                  {cart && cart.length > 0 ? (
                    `You have ${cart.length} items in your cart`
                  ) : (
                    <>
                      Your cart is empty.
                      <br />
                      <button
                        className="btn btn-outline-dark mt-5"
                        onClick={() => navigate("/")}
                        style={{ textDecoration: "none" }}
                      >
                        &larr; Go Back To Homepage
                      </button>
                    </>
                  )}
                </h6>
              </div>
            </div>
            <div className="row mt-4 mb-3">
              <div className="col-md-8">
                {cart?.map((p, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex"
                      style={{
                        border: "1px solid grey",
                        borderRadius: "5px",
                        marginBottom: "20px",
                      }}
                    >
                      <div className="col-md-6" key={p._id}>
                        <img
                          src={`http://localhost:8080/api/v1/product/get-photo/${p?._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{ height: "240px", aspectRatio: "4/4" }}
                        />
                      </div>
                      <div className="col-md-6 mx-2 mt-4">
                        <h6 className="text-secondary ">{p?.category?.name}</h6>
                        <h5 className="mt-4 mb-4">{p?.name}</h5>
                        <h5>₹{p?.price} </h5>

                        {auth?.token ? (
                          <button
                            className="btn btn-danger flex-grow-1 mb-3 mt-4"
                            onClick={() => removeCartItem(p._id)}
                          >
                            Remove From Cart
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {cart.length > 0 && (
                <div className="col-md-4 text-center ">
                  <h4>Cart Summary</h4>
                  <h5 className="text-secondary">Total | Checkout | Payment</h5>
                  <p>Dummy Card No : 4242 4242 4242 4242  
                  <p>date :12/23 cvv:123</p> </p>
                  <hr />
                  <h6>Total :{totalPrice()}</h6>
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3 mt-3">
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        {auth?.token ? (
                          <>
                            <button
                              className="btn btn-outline-warning"
                              onClick={navigate("/dashboard/user/profile")}
                            >
                              Update address
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-outline-warning"
                              onClick={() =>
                                navigate("/login", {
                                  state: "/cart",
                                })
                              }
                            >
                              Please Login to checkout
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  <div className="mt-2">
                    {!clientToken || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={handlePayment}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
                        >
                          {loading ? "Processing ...." : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
   
          <div className=" d-flex justify-content-center align-items-center flex-column" >
          <h4 className="mt-5"> You need to login to see cart </h4>
          <button
              className="btn btn-outline-dark mt-5"
              onClick={() => navigate("/login")}
              style={{ textDecoration: "none" }}
            >
              &larr; Please Go Back To Login Page
            </button>
          </div>
          
          </>
        )}
      </Layout>
    </>
  );
};

export default CartPage;
