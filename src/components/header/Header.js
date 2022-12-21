import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes, FaUserCircle } from "react-icons/fa";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from '../../firebase/config'

import Loader from "../loader/Loader";
// import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenlink/HiddenLink";
import AdminOnlyRoute from "../adminOnlyRoute/AdminOnlyRoute";
import LoggedUserOnlyRoute from "../loggedUserOnlyRoute/LoggedUserOnlyRoute";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h4 style={{ fontSize: "32px" }}>
        FasT
        <span>ranslator</span>
      </h4>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  const logoutUser = () => {
    // signOut(auth).then(() => {
    //     toast.success("logout successful");
    //     navigate("/login")
    //   }).catch((error) => {
    //     toast.error(error.message);
    //   });

    localStorage.removeItem("user");
    setDisplayName("");
    dispatch(REMOVE_ACTIVE_USER());
    navigate("/login");
  };

  useEffect(() => {
    //  onAuthStateChanged(auth, (user) => {

    const userr = localStorage.getItem("user");
    const user = JSON.parse(userr);

    console.log("hist is-", user);
    console.log("the user id-", user.data.userID);

    console.log("uuuu-", user);
    //console.log("user isss-", user.user);

    if (user) {
      if (user.data.email == null) {
        const ul = user.data.email.substring(0, user.data.email.indexOf("@"));
        const uname = ul.charAt(0).toUpperCase() + ul.slice(1);
        setDisplayName(uname);
      }

      const uid = user.uid;
      setDisplayName(user.data.email);

      dispatch(
        SET_ACTIVE_USER({
          email: user.data.email,
          userName: user.data.email,
          displayName: user.data.email,
          userID: user.data.userID,
          role: user.data.Role,
        })
      );
    } else {
      //setDisplayName("")
      dispatch(REMOVE_ACTIVE_USER());
    }

    //  });
  }, [dispatch, displayName]);

  return (
    <>
      {/* <ToastContainer />
        {isLoading && <Loader/>} */}
      <header>
        <div className={styles.header}>
          {logo}
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} 
                ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} onClick={hideMenu} />
              </li>
              {/* 
              <AdminOnlyRoute>
                <li>
                  <button
                    className="--btn --btn-primary"
                    className={activeLink}
                  >
                    Admin
                  </button>
                </li>
              </AdminOnlyRoute> */}

              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>

              <LoggedUserOnlyRoute>
                <li>
                  <NavLink to="/trans" className={activeLink}>
                    Trans
                  </NavLink>
                </li>
              </LoggedUserOnlyRoute>
              <AdminOnlyRoute>
                <li>
                  <NavLink to="/trans" className={activeLink}>
                    Trans
                  </NavLink>
                </li>
              </AdminOnlyRoute>

              <AdminOnlyRoute>
                <li>
                  <NavLink to="/admin/home" className={activeLink}>
                    Admin
                  </NavLink>
                </li>
              </AdminOnlyRoute>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
              <AdminOnlyRoute>
                <li>
                  <NavLink to="/register" className={activeLink}>
                    Register
                  </NavLink>
                </li>
              </AdminOnlyRoute>
            </ul>

            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                  {" "}
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogout>

                <ShowOnLogin>
                  <a href="#home">
                    <FaUserCircle size={16} />
                    Hi, {displayName}
                  </a>
                </ShowOnLogin>

                <AdminOnlyRoute>
                  <ShowOnLogout>
                    <NavLink to="/register" className={activeLink}>
                      Register
                    </NavLink>
                  </ShowOnLogout>
                </AdminOnlyRoute>

                <ShowOnLogin>
                  <NavLink to="/login" onClick={logoutUser}>
                    LogOut
                  </NavLink>
                </ShowOnLogin>
              </span>
            </div>
          </nav>
          <div className={styles["menu-icon"]} onClick={toggleMenu}>
            <HiOutlineMenuAlt3 size={28} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
