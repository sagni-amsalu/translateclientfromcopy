import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./contactus.module.scss";
import registerImg from "../../assets/register.png";
import { FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebase/config'
import Loader from "../../components/loader/Loader";
import { selectRole } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const ContactUS = () => {
  const navigate = useNavigate();

  const userRole = useSelector(selectRole);
  //  const userEmail=useSelector(selectEmail);

  //console.log("role iiis-", userRole);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  var templateParams = {
    from_name: name,
    message,
    phone,
    email_id: email,
  };

  const sendEmail = async () => {
    try {
      emailjs.send("service_4hdghgw", "template_73ei08x", templateParams).then(
        function (response) {
          toast.success("Successfully submitted your message! Thank you");
        },
        function (error) {
          toast.error("Failed to Submit your message");
        }
      );
    } catch (error) {
      toast.error("Failed to Submit your message");
    }
  };

  useState(() => {
    (function () {
      emailjs.init("-l3bEH4Oankwj3_T2");
    })();
  }, []);

  const registerUser = (e) => {
    e.preventDefault();

    sendEmail();

    try {
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth} `}>
        <Card>
          <div className={styles.form}>
            <h2>Contact Us </h2>

            <form onSubmit={sendEmail}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <textarea
                type="text"
                width="300px"
                rows={3}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Send
              </button>
            </form>

            {/* <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span> */}
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="register" width="500px" />
        </div>
      </section>
    </>
  );
};

export default ContactUS;
