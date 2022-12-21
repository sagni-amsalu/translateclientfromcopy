import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import authHeader from "../../../authHeader";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import Loader from "../../loader/Loader";
import styles from "./ViewPayments.module.scss";

import axios from "axios";

const ViewPayments = () => {
  //const { data, isLoading } = useFetchCollection("products");
  //const products = useSelector(selectProducts);

  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(
    //   STORE_PRODUCTS({
    //     products: data,
    //   }),
    //   [dispatch, data]
    // );
  });

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "http://localhost:7000/api/clients/getPayments",
        { headers: authHeader() }
      );
      console.log(res.data.data);
      setPayments(res.data.data);

      toast.success("Payments Loaded");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        // alert('Thank you.');
        deletePayment(id);
      },
      function cancelCb() {
        // alert('If you say so...');
        console.log("Delete Cancelled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimation: "zoom",
        // etc...
      }
    );
  };

  const deletePayment = async (id) => {
    try {
      // await deleteDoc(doc(db, "products", id));

      // const storageRef = ref(storage, imageUrl);
      // await deleteObject(storageRef);  /deleteUser/:id

      const res = await axios.delete(
        `http://localhost:7000/api/clients/deletePayment/${id}`,
        { headers: authHeader() }
      );
      //console.log(res.data.data);
      // setUsers(res.data.data);

      getPayments();

      toast.success("Payment Deleted Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className={styles.table}>
        <h2>All Payments</h2>
        {payments.length === 0 ? (
          <p>No Payment Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Amount</th>
                <th>EmailID</th>
                <th>datePaid</th>
                <th>userID</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => {
                const {
                  _id,
                  amount,
                  datePaid,
                  unitOfPayment,
                  emailID,
                  userID,
                  description,
                } = payment;

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{amount}</td>
                    <td>{emailID}</td>
                    <td>{datePaid}</td>
                    <td>{userID}</td>
                    <td>{description}</td>
                    <td>
                      <Link to={`/admin/add-Payment/${_id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(_id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewPayments;
