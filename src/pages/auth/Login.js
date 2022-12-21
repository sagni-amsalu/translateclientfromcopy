import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
//import { getAuth, signInWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
// import { auth } from '../../firebase/config'
import Loader from "../../components/loader/Loader";
//import { GoogleAuthProvider } from "firebase/auth";

import {
  BALANCE_STATUS_SET,
  BALANCE_STATUS_UNSET,
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  // const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   // dispatch(
  //   //   STORE_PRODUCTS({
  //   //     products: data,
  //   //   }),
  //   //   [dispatch, data]
  //   // );
  // });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = () => {
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const user = result.user;
    //     toast.success("Login Successful!");
    //     navigate("/")
    //   }).catch((error) => {
    //     toast.error(error.message);
    //   });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const post = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:7000/api/clients/login",
        post
      );

      console.log(JSON.stringify(res));
      if (res.data.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      //  console.log("response is-", res.data.data.email);
      //  console.log("resproleonse is-", res.data.data.Role);
      dispatch(
        SET_ACTIVE_USER({
          email: res.data.data.email,
          userName: res.data.data.email,
          displayName: res.data.data.email,
          userID: res.data.data.uid,
          role: res.data.data.Role,
        })
      );

      if (res.data.data.latestBalance > 0) {
        dispatch(BALANCE_STATUS_SET());
      } else if (res.data.data.latestBalance <= 0) {
        dispatch(BALANCE_STATUS_UNSET());
      }

      navigate("/");
      // localStorage.setItem("user", JSON.stringify(res.data.data));/admin/home
      toast.success("successfully login");
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;

      // dispatch(
      //   SET_ACTIVE_USER({
      //     email: res.data.email,
      //     userName: res.data.email,
      //     displayName: res.data.email,
      //     userID: res.data.uid,
      //     role: res.data.Role,
      //   })
      // );

      setIsLoading(false);
      toast.error(error.message);
    }

    //       signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //   const user = userCredential.user;

    //   setIsLoading(false)
    //   toast.success("Login Successful");
    //   navigate("/")

    // })
    // .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    //  toast.success(error.message);
    //  setIsLoading(false)
    //   });
  };

  return (
    <>
      {/* <ToastContainer />
        {isLoading && <Loader/>} */}
      <section className={`container ${styles.auth} `}>
        <div className={styles.img}>
          <img src={loginImg} alt="img" width="400px" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              {/* <p>--- or ---</p> */}
            </form>

            {/* <button
              type="button"
              onClick={signInWithGoogle}
              className="--btn --btn-danger --btn-block"
            >
              <FaGoogle color="#fff" /> Login in with Google
            </button>

            <span className={styles.register}>
              <p>Don't Have abn Account?</p>
              <Link to="/register">Register</Link>
            </span> */}
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
