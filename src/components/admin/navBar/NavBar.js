import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./NavBar.module.scss";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const NavBar = () => {
  const username = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-payments" className={activeLink}>
              All Payments
            </NavLink>
          </li>
          <li>
            <NavLink to={`/admin/add-payment/ADD`} className={activeLink}>
              Add Payment
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-fileHistorys" className={activeLink}>
              File History
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-role/ADD" className={activeLink}>
              Add Role
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-roles" className={activeLink}>
              View Roles
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-ServiceCategory/ADD" className={activeLink}>
              Add Service Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-serviceCategories" className={activeLink}>
              View Service Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/card-reader" className={activeLink}>
              Reader
            </NavLink>
          </li>
          <li>
            <NavLink to={`/admin/add-user/ADD`} className={activeLink}>
              Add User
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-users" className={activeLink}>
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
