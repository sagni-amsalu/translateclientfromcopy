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
import styles from "./ViewServiceCategories.module.scss";

import axios from "axios";

const ViewServiceCategories = () => {
  //const { data, isLoading } = useFetchCollection("products");
  //const products = useSelector(selectProducts);

  const [serviceCategories, setServiceCategories] = useState([]);
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
    getservcats();
  }, []);

  const getservcats = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "http://localhost:7000/api/clients/getServiceCategories",
        { headers: authHeader() }
      );
      console.log(res.data.data);
      setServiceCategories(res.data.data);

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
        deleteServiceCategory(id);
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

  const deleteServiceCategory = async (id) => {
    try {
      // await deleteDoc(doc(db, "products", id));

      // const storageRef = ref(storage, imageUrl);
      // await deleteObject(storageRef);  /deleteUser/:id

      const res = await axios.delete(
        `http://localhost:7000/api/clients/deleteServiceCategory/${id}`,
        { headers: authHeader() }
      );
      //console.log(res.data.data);
      // setUsers(res.data.data);

      getservcats();

      toast.success("Payment Deleted Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className={styles.table}>
        <h2>All Service Categories</h2>
        {serviceCategories.length === 0 ? (
          <p>No Service Category Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price Set</th>
                <th>For Characters</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceCategories.map((servcat, index) => {
                const {
                  _id,
                  name,
                  description,
                  status,
                  priceSet,
                  forCharacters,
                } = servcat;

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{priceSet}</td>
                    <td>{forCharacters}</td>
                    <td>{status}</td>
                    <td>
                      <Link to={`/admin/add-ServiceCategory/${_id}`}>
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

export default ViewServiceCategories;
