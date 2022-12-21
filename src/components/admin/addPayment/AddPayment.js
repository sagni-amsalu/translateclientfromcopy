import React, { useState, useEffect } from "react";
import Card from "../../card/Card";
import styles from "./AddPayment.module.scss";

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

const AddPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialUser = {
    amount: 0,
    unitOfPayment: "Birr",
    emailID: "",
    userID: "",
    description: "",
  };

  const [payments, setPayments] = useState([]);

  const [payment, setPayment] = useState({
    amount: 0,
    unitOfPayment: "Birr",
    emailID: "",
    userID: "",
    description: "",
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id != "ADD") {
      getPayments();
    } else {
      setPayment(initialUser);
    }
  }, [id]);

  const findPayment = () => {
    if (payments.length > 0) {
      const uss = payments.find((item) => item._id == id);
      setPayment(uss);
      // setUserEdit(us);
    }
  };

  useEffect(() => {
    findPayment();
  }, [payments]);

  const getPayments = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/getPayments"
      );
      setPayments(res.data.data);
      toast.success("Users Loaded");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value,
    });
  };

  const AddPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/AddPayment",
        payment
      );
      console.log(res.data);
      toast.success("successfully registered");
      navigate("/admin/all-payments");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editPayment = async (e) => {
    e.preventDefault();

    const paymentt = {
      amount: payment.amount,
      unitOfPayment: payment.unitOfPayment,
      emailID: payment.emailID,
      userID: payment.userID,
      description: payment.description,
    };

    console.log("userr is-", paymentt);
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `https://translateapi2-sagni-amsalu.onrender.com/api/clients/updatePayment/${id}`,
        paymentt
      );
      console.log(res.data);
      toast.success("successfully Edited");
      navigate("/admin/all-payments");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className={styles.product}>
        <h2>{detectForm(id, "ADD New Payment", "Edit Payment")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, AddPayment, editPayment)}>
            <label>Amount:</label>
            <input
              type="text"
              required
              placeholder="Amount"
              name="amount"
              value={payment.amount}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Unit Of Payment:</label>
            <input
              type="text"
              required
              placeholder="unit Of Payment"
              name="unitOfPayment"
              value={payment.unitOfPayment}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Email ID:</label>
            <input
              type="text"
              required
              placeholder="Email ID"
              name="emailID"
              value={payment.emailID}
              onChange={(e) => handleInputChange(e)}
            />

            <label>User ID:</label>
            <input
              type="text"
              required
              placeholder="User ID"
              name="userID"
              value={payment.userID}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Description:</label>
            <input
              type="text"
              required
              placeholder="Description"
              name="description"
              value={payment.description}
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Payment", "Edit Payment")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddPayment;
