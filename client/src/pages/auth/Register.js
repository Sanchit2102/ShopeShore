import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    answer: "",
  });
  const navigate = useNavigate();
  const [setAuth] = useAuth();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const { name, email, password, address, phone, answer } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        { name, email, password, address, phone, answer },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data?.success) {
        setAuth({
          user: data.user,
          token: data.authtoken,
        });

        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Your Account is Created");
        navigate("/");
      } else {
        toast.error(data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Register Now"}>
        <div className="signup-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h4 className="title">Register Now</h4>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Username"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="answer"
                  placeholder="Your childhood nickname?"
                  name="answer"
                  value={answer}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-1">
                REGISTER
              </button>
            </form>
            <div className="form-img">
              <img src="ShopShore.png" alt="" />
              <h1>Be You!</h1>
              <h5>Find Yourself in a Truly Remarkable E-commerce World!</h5>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
