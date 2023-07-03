import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  // Function to extract initials from a name
  function getInitials(name) {
    const nameArray = name.split(" ");
    const initials = nameArray.map((word) => word.charAt(0));
    return initials.join("").toUpperCase();
  }

  const userInitials = getInitials(auth?.user.name);

  return (
    <>
      <Layout title={"Dashboard"}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 mt-3">
              <UserMenu />
            </div>
            <div className="col-md-9 mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="row g-0">
                        <div className="col-md-3">
                          <div className="profile-image p-5">
                            <div className="circle-initials text-light">
                              {userInitials}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="card-body">
                            <h5 className="card-title">
                              Name: {auth?.user.name}
                            </h5>
                            <p className="card-text">
                              Email: {auth?.user.email}
                            </p>
                            <p className="card-text">
                              Mobile: {auth?.user.phone}
                            </p>
                            <p className="card-text">
                              Address: {auth?.user.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
