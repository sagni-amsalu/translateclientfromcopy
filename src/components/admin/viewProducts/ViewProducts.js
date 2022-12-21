import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import Loader from "../../loader/Loader";
import styles from "./ViewProducts.module.scss";

import axios from "axios";

const ViewProducts = () => {
  //const { data, isLoading } = useFetchCollection("products");
  //const products = useSelector(selectProducts);

  const [products, setProducts] = useState([]);
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
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/getUsers"
      );
      console.log(res.data);
      setProducts(res.data);

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
        deleteProduct(id);
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

  const deleteProduct = async (id) => {
    try {
      // await deleteDoc(doc(db, "products", id));

      // const storageRef = ref(storage, imageUrl);
      // await deleteObject(storageRef);
      toast.success("Product Deleted Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No Product Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, imageUrl, category } = product;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{price}</td>
                    <td>
                      <Link to={`/admin/add-Product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageUrl)}
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

export default ViewProducts;
