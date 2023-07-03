import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders",
        {
          headers: {
            "auth-token": auth?.token,
          },
        }
      );

      setOrders(data?.orders);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 mt-3">
            <UserMenu />
          </div>
          <div className="col-md-9 mt-5">
            {orders?.map((o, i) => (
              <div className="border shadow mb-2" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="accordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${o._id}`}
                      >
                        View Products
                      </button>
                    </h2>
                    <div
                      id={`collapse-${o._id}`}
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        <div className="container">
                          {o?.products?.map((p, i) => (
                            <div
                              className="row mb-2 p-3 card flex-row"
                              key={p._id}
                            >
                              <div className="col-md-4">
                                <img
                                  src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                                  className="card-img-top"
                                  alt={p.name}
                                  style={{ width: "160px", height: "120px" }}
                                />
                              </div>
                              <div className="col-md-8">
                                <h6>{p.name}</h6>
                                <p>{p.description.substring(0, 30)}</p>
                                <p>Price: ₹{p.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
