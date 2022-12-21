import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import { FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebase/config'
import Loader from "../../components/loader/Loader";

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [FirstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Role, setRole] = useState("");
  const [Status, setStatus] = useState("notActive");
  const [CompanyName, setCompanyName] = useState("");
  const [Description, setDescription] = useState("");
  // const [Approved,setEmail]=useState("")
  const [DateRegistered, setDateRegistered] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    // if (password !== cPassword) {
    //   toast.error("Passwords do not match!");
    // }
    setIsLoading(true);
    const post = {
      email,
      password,
      FirstName,
      MiddleName,
      LastName,
      PhoneNumber,
      Role: "user",
      CompanyName,
      Description,
    };

    try {
      const res = await axios.post(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/signup",
        post
      );
      console.log(res.data);
      toast.success("successfully registered");
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* <ToastContainer />
        {isLoading && <Loader/>} */}
      <section className={`container ${styles.auth} `}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>

            <form onSubmit={registerUser}>
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
              {/* <input type="password" placeholder='Confirm Password' value={cPassword} onChange={(e)=>setCPassword(e.target.value)} required/> */}
              <input
                type="text"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Middle Name"
                value={MiddleName}
                onChange={(e) => setMiddleName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="phone Number"
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="user"
                value={Role}
                onChange={(e) => setRole("user")}
                disabled
                required
              />
              <input
                type="text"
                placeholder="Comany Name"
                value={CompanyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <textarea
                type="text"
                width="300px"
                rows={3}
                placeholder="Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              {/* <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
           */}
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            {/* 
            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span> */}
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="register" width="400px" />
        </div>
      </section>
    </>
  );
};

export default Register;
