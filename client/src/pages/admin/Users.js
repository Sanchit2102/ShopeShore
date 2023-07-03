import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/get-users"
      );
      setUsers(data?.user);
      console.log(data?.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  });
  return (
    <>
      <Layout title={"Users Info"}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card mb-2">
                <table className="table text-center mb-0">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => {
                      return (
                        <>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Users;
