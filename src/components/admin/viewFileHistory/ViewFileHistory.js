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
import styles from "./ViewFileHistory.module.scss";

import axios from "axios";

const ViewFileHistory = () => {
  //const { data, isLoading } = useFetchCollection("products");
  //const products = useSelector(selectProducts);

  const [fileHistories, setFileHistories] = useState([]);
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
    getfileHistories();
  }, []);

  const getfileHistories = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/getFileHistorys",
        { headers: authHeader() }
      );
      console.log(res.data.data);
      setFileHistories(res.data.data);

      toast.success("FileHistories Loaded");
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
        deleteFileHistory(id);
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

  const deleteFileHistory = async (id) => {
    try {
      // await deleteDoc(doc(db, "products", id));

      // const storageRef = ref(storage, imageUrl);
      // await deleteObject(storageRef);  /deleteUser/:id

      const res = await axios.delete(
        `https://translateapi2-sagni-amsalu.onrender.com/api/clients/deleteFileHistory/${id}`,
        { headers: authHeader() }
      );
      //console.log(res.data.data);
      // setUsers(res.data.data);

      getfileHistories();

      toast.success("Payment Deleted Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className={styles.table}>
        <h2>All FileHistories</h2>
        {fileHistories.length === 0 ? (
          <p>No FileHistory Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>title</th>
                <th>Data</th>
                <th>NumberOfChars</th>
                <th>Service Charge</th>
                <th>ServiceCategory</th>
                <th>UserID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fileHistories.map((filehist, index) => {
                const {
                  _id,
                  title,
                  data,
                  numberOfChars,
                  serviceCharge,
                  userID,
                  serviceCategoryID,
                } = filehist;

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{title}</td>
                    <td>{data}</td>
                    <td>{numberOfChars}</td>
                    <td>{serviceCharge}</td>
                    <td>{serviceCategoryID}</td>
                    <td>{userID}</td>
                    <td>
                      <Link to={`/admin/add-FileHistory/${_id}`}>
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

export default ViewFileHistory;
