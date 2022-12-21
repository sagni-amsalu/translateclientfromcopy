import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Admin from "./pages/admin/Admin";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import Contact from "./components/contact/Contact";

// import "./App.css";

import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home/Home";
import Trans from "./pages/trans/Trans";
import ContactUS from "./pages/auth/Contactus";

import { MantineProvider } from "@mantine/core";

// import Amplify from "@aws-amplify/core";
// import Auth from "@aws-amplify/auth";
// import awsconfig from "./aws-exports";
// Amplify.configure(awsconfig);

const NOTSIGNIN = "You are NOT logged in";
const SIGNEDIN = "You have logged in successfully";
const SIGNEDOUT = "You have logged out successfully";
const WAITINGFOROTP = "Enter OTP number";
const VERIFYNUMBER = "Verifying number (Country code +XX needed)";

function App() {
  const [message, setMessage] = useState("Welcome to Askoottuu");
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const password = Math.random().toString(10) + "Abc#";
  useEffect(() => {
    verifyAuth();
  }, []);
  const verifyAuth = () => {
    // Auth.currentAuthenticatedUser()
    //   .then((user) => {
    //     setUser(user);
    //     setMessage(SIGNEDIN);
    //     setSession(null);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setMessage(NOTSIGNIN);
    //   });
  };
  const signOut = () => {
    // if (user) {
    //   Auth.signOut();
    //   setUser(null);
    //   setOtp("");
    //   setMessage(SIGNEDOUT);
    // } else {
    //   setMessage(NOTSIGNIN);
    // }
  };
  const signIn = () => {
    // setMessage(VERIFYNUMBER);
    // Auth.signIn(number)
    //   .then((result) => {
    //     setSession(result);
    //     setMessage(WAITINGFOROTP);
    //   })
    //   .catch((e) => {
    //     if (e.code === "UserNotFoundException") {
    //       signUp();
    //     } else if (e.code === "UsernameExistsException") {
    //       setMessage(WAITINGFOROTP);
    //       signIn();
    //     } else {
    //       console.log(e.code);
    //       console.error(e);
    //     }
    //   });
  };
  const signUp = async () => {
    // const result = await Auth.signUp({
    //   username: number,
    //   password,
    //   attributes: {
    //     phone_number: number,
    //   },
    // }).then(() => signIn());
    // return result;
  };
  const verifyOtp = () => {
    // Auth.sendCustomChallengeAnswer(session, otp)
    //   .then((user) => {
    //     setUser(user);
    //     setMessage(SIGNEDIN);
    //     setSession(null);
    //   })
    //   .catch((err) => {
    //     setMessage(err.message);
    //     setOtp("");
    //     console.log(err);
    //   });
  };

  return (
    <MantineProvider>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/logout" element={<Reset />} />

          <Route path="/trans" element={<Trans />} />

          <Route
            path="/admin/*"
            element={
              <Admin />

              // <AdminOnlyRoute>
              //   <Admin />
              // </AdminOnlyRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
