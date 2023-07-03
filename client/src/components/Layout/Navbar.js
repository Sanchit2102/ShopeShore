import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-hot-toast";
import { useSearch } from "../../context/search";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  const handleLogout = () => {
    setAuth({ user: "", token: "" });
    localStorage.removeItem("auth");
    toast.success("User Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <img
            src="/ShopShore.png"
            alt="ShopShore"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div
              className="d-flex mx-auto justify-content-center"
              role="search"
            >
              <SearchInput />
            </div>
            <ul className="navbar-nav">
              <div className="d-flex">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <HomeIcon />
                  </NavLink>
                </li>
                {auth.user ? (
                  <>
                    <li className="nav-item ">
                      <NavLink
                        className="nav-link"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        <AccountCircleIcon />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cart">
                        <ShoppingCartIcon />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-link"
                        onClick={handleLogout}
                      >
                        <LogoutIcon />
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cart">
                        <ShoppingCartIcon />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Signup
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
