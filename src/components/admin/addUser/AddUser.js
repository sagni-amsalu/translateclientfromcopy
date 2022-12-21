import React, { useState, useEffect } from "react";
import Card from "../../card/Card";
import styles from "./AddUser.module.scss";

// import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import { db, storage } from '../../../firebase/config';

// import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useSelector } from "react-redux";
//import { selectProducts } from "../../../redux/slice/productSlice";

//import {} from './redux/useSelector'

import axios from "axios";
import authHeader from "../../../authHeader";

const AddUser = () => {
  const { id } = useParams();

  //console.log("id", id);

  const initialUser = {
    email: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    PhoneNumber: "",
    Description: "",
    Role: "",
    CompanyName: "",
    Status: "",
  };

  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);

  const [user, setUser] = useState({
    email: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    PhoneNumber: "",
    Description: "",
    Role: "",
    CompanyName: "",
    // Status: "",
    currentBalance: 0,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const products = useSelector(selectProducts);
  // const productEdit = products.find((item) => item.id === id);
  //console.log(productEdit);

  useEffect(() => {
    if (id != "ADD") {
      getUsers();
    } else {
      setUser(initialUser);
    }
  }, [id]);

  const findUser = () => {
    console.log("hhhh", users);
    if (users.length > 0) {
      const uss = users.find((item) => item._id == id);
      setUser(uss);
      console.log("aaaa", uss);
      // setUserEdit(us);
    }
  };

  useEffect(() => {
    findUser();
  }, [users]);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/getUsers"
      );

      setUsers(res.data.data);

      // console.log("kkk", res.data.data);
      //   setUsers(res.data);
      //const userEdit = await res.data.data.find((item) => item.id === id);
      // setUser(userEdit);
      //   const edititem = users.find((item) => item.id === id);
      //   setUserEdit(edititem);

      toast.success("Users Loaded");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  //   const [user, setUser] = useState(() => {
  //     const newState = detectForm(id, { ...initialUser }, userEdit);

  //     console.log("new state is-", newState);
  //     return newState;
  //   });

  //  setUser(detectForm(id, { ...initialUser }, user));

  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log("uuu", e.target.value);

    setUser({
      ...user,
      [name]: value,
    });
  };

  const addUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/AddUser",
        user
      );
      console.log(res.data);
      toast.success("successfully registered");
      navigate("/admin/all-users");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();

    const userr = {
      email: user.email,
      FirstName: user.FirstName,
      MiddleName: user.MiddleName,
      LastName: user.LastName,
      PhoneNumber: user.PhoneNumber,
      Description: user.Description,
      Role: user.Role,
      CompanyName: user.CompanyName,
      Status: user.Status,
      currentBalance: user.currentBalance,
    };

    console.log("userr is-", userr);
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `https://translateapi2-sagni-amsalu.onrender.com/api/clients/updateUser/${id}`,
        userr
      );
      console.log(res.data);
      toast.success("successfully Edited");
      navigate("/admin/all-users");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className={styles.product}>
        <h2>{detectForm(id, "ADD New User", "Edit User")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addUser, editUser)}>
            <label>First Name:</label>
            <input
              type="text"
              required
              placeholder="First Name"
              name="FirstName"
              value={user.FirstName}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Middle Name:</label>
            <input
              type="text"
              required
              placeholder="Middle Name"
              name="MiddleName"
              value={user.MiddleName}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Last Name:</label>
            <input
              type="text"
              required
              placeholder="Last Name"
              name="LastName"
              value={user.LastName}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Email:</label>
            <input
              type="text"
              required
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Phone Number:</label>
            <input
              type="text"
              required
              placeholder="Phone Number"
              name="PhoneNumber"
              value={user.PhoneNumber}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Company:</label>
            <input
              type="text"
              required
              placeholder="Company Name"
              name="CompanyName"
              value={user.CompanyName}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Role:</label>
            <input
              type="text"
              required
              placeholder="Role"
              name="Role"
              value={user.Role}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Description:</label>
            <input
              type="text"
              required
              placeholder="Description"
              name="Description"
              value={user.Description}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Status:</label>
            <input
              type="text"
              required
              placeholder="Status"
              name="Status"
              value={user.Status}
              onChange={(e) => handleInputChange(e)}
            />

            <label>currentBalance:</label>
            <input
              type="text"
              required
              placeholder="currentBalance"
              name="currentBalance"
              value={user.currentBalance}
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">
              {detectForm(id, "Save User", "Edit User")}{" "}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddUser;
