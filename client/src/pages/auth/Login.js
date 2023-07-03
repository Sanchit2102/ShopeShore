import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { email: credentials.email, password: credentials.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      if (data?.success) {
        console.log(data);
        setAuth({
          user: data.user,
          token: data.authtoken,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("User Login Succesfully");
        navigate(location.state || "/");
      } else {
        toast.error(data?.message);
        navigate("/login");
        setCredentials({ email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={"Login"}>
        <div className="login-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h4 className="title">Login to Ecomm</h4>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2 text-center">
                <p
                  type="submit"
                  className="mb-3 fw-bold mt-4"
                  style={{ color: "#0280FF" }}
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot Password?
                </p>
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
