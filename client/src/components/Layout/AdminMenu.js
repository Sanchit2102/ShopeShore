import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <ul className="list-group">
        <li className="list-group-item dashboard">
          <NavLink exact="true" to="/dashboard/admin">
            <i className="fa-solid fa-house"></i> Dashboard
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/users">Users</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/products">Products</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/category">Category</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/create-product">Create Product</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/dashboard/admin/orders">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
