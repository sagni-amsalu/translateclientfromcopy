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
import styles from "./ViewUsers.module.scss";

import axios from "axios";

const ViewUsers = () => {
  //const { data, isLoading } = useFetchCollection("products");
  //const products = useSelector(selectProducts);

  const [users, setUsers] = useState([]);
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
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/getUsers",
        { headers: authHeader() }
      );
      console.log(res.data.data);
      setUsers(res.data.data);

      toast.success("Products Loaded");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const confirmDelete = (id, imageUrl) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        // alert('Thank you.');
        deleteUser(id);
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

  const deleteUser = async (id) => {
    try {
      // await deleteDoc(doc(db, "products", id));

      // const storageRef = ref(storage, imageUrl);
      // await deleteObject(storageRef);  /deleteUser/:id

      const res = await axios.delete(
        `https://translateapi2-sagni-amsalu.onrender.com/api/clients/deleteUser/${id}`,
        { headers: authHeader() }
      );
      //console.log(res.data.data);
      // setUsers(res.data.data);

      getUsers();

      toast.success("Product Deleted Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className={styles.table}>
        <h2>All Users</h2>
        {users.length === 0 ? (
          <p>No User Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone Number</th>
                <th>currentBalance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const {
                  _id,
                  FirstName,
                  MiddleName,
                  LastName,
                  email,
                  PhoneNumber,
                  Role,
                  Description,
                  currentBalance,
                } = user;

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>
                      {FirstName} - {MiddleName}
                    </td>
                    <td>{email}</td>
                    <td>{Role}</td>
                    <td>{PhoneNumber}</td>
                    <td>{currentBalance}</td>
                    <td>
                      <Link to={`/admin/add-User/${_id}`}>
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

export default ViewUsers;
