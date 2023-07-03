import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const { user } = auth;
  const { name, email } = user;
  return (
    <>
      <Layout title={"Admin Dashboard"}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Admin Name: {name}</h5>
                  <p className="card-text">Admin Email : {email}</p>
                  <p className="card-text">Position: CEO</p>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
