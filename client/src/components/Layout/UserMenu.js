import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="user-menu">
      <ul className="list-group">
        <li className="list-group-item dashboard">
          <NavLink exact="true" to="/dashboard/user">
            Dashboard
          </NavLink>
        </li>

        <li className="list-group-item">
          <NavLink exact="true" to="/dashboard/user/profile">
            Update Profile
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/user/orders">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
