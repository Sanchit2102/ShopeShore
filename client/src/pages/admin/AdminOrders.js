import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";

const AdminOrders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/all-orders",
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const filteredOrders = selectedStatus
    ? orders.filter((o) => o.status === selectedStatus)
    : orders;

  return (
    <>
      <Layout title="Orders data">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Orders</h1>
              <div className="mb-3">
                <select
                  className="form-select"
                  style={{ width: 200 }}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="">Select status</option>
                  {status.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              {filteredOrders.map((o, i) => (
                <div key={o._id} className="card mb-2">
                  <table className="table text-center mb-0">
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
                        <td>
                          <select
                            className="form-select"
                            onChange={(e) =>
                              handleChange(o._id, e.target.value)
                            }
                            defaultValue={o.status}
                          >
                            {status.map((s, i) => (
                              <option key={i} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).format("LLLL")}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <button
                      className="btn btn-link"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${o._id}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${o._id}`}
                    >
                      View Products
                    </button>
                    <div
                      id={`collapse-${o._id}`}
                      className="collapse"
                      aria-labelledby={`heading-${o._id}`}
                    >
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
                              <p>Price: {p.price}₹</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminOrders;
