import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    answer: "",
    newPassword: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {
          email: credentials.email,
          answer: credentials.answer,
          newPassword: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      if (data?.success) {
        toast.success("Password Reset Succesfully");
        navigate("/login");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Reset Password"}>
        <div className="login-container">
          <div className="form-container">
            <form onSubmit={handleResetPassword}>
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
                  type="text"
                  className="form-control"
                  id="answer"
                  placeholder="Your childhood nickname?"
                  name="answer"
                  value={credentials.answer}
                  onChange={onChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="New Password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-4">
                Reset Password
              </button>
              <div className="mb-2 text-center">
                <p
                  type="submit"
                  className="mb-3 fw-bold"
                  style={{ color: "#0280FF" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go Back &#8594;
                </p>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
