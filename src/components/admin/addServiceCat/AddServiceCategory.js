import React, { useState, useEffect } from "react";
import Card from "../../card/Card";
import styles from "./AddServiceCategory.module.scss";

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

const AddServiceCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialServCat = {
    name: "",
    description: "",
    // status:"active",
    priceSet: 0,
    forCharacters: 0,
    // dateSet,
    // dateSuspended,
  };

  const [servcategories, setServcategories] = useState([]);

  const [serviceCat, setServiceCat] = useState({
    name: "",
    description: "",
    // status:"active",
    priceSet: 0,
    forCharacters: 0,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id != "ADD") {
      getServiceCategories();
    } else {
      setServiceCat(initialServCat);
    }
  }, [id]);

  const findServCat = () => {
    if (servcategories.length > 0) {
      const uss = servcategories.find((item) => item._id == id);
      setServiceCat(uss);
      // setUserEdit(us);
    }
  };

  useEffect(() => {
    findServCat();
  }, [servcategories]);

  const getServiceCategories = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "http://localhost:7000/api/clients/getServiceCategories"
      );
      setServcategories(res.data.data);
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
    setServiceCat({
      ...serviceCat,
      [name]: value,
    });
  };

  const AddServCat = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:7000/api/clients/AddServiceCategory",
        serviceCat,
        {
          headers: authHeader(),
        }
      );
      console.log(res.data);
      toast.success("successfully registered");
      navigate("/admin/all-serviceCategories");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editServCat = async (e) => {
    e.preventDefault();

    const servcat = {
      name: serviceCat.name,
      description: serviceCat.description,
      // status:"active",
      priceSet: serviceCat.priceSet,
      forCharacters: serviceCat.forCharacters,
    };

    //console.log("userr is-", servcat);
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `http://localhost:7000/api/clients/updateServiceCategory/${id}`,
        servcat
      );
      console.log(res.data);
      toast.success("successfully Edited");
      navigate("/admin/all-serviceCategories");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className={styles.product}>
        <h2>
          {detectForm(id, "ADD New Service Category", "Edit Service Category")}
        </h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, AddServCat, editServCat)}>
            <label>Name:</label>
            <input
              type="text"
              required
              placeholder="Name"
              name="name"
              value={serviceCat.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Description:</label>
            <input
              type="text"
              required
              placeholder="desc"
              name="description"
              value={serviceCat.description}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Price Amount:</label>
            <input
              type="text"
              required
              placeholder="0"
              name="priceSet"
              value={serviceCat.priceSet}
              onChange={(e) => handleInputChange(e)}
            />

            <label>For Characters:</label>
            <input
              type="text"
              required
              placeholder="charcaters"
              name="forCharacters"
              value={serviceCat.forCharacters}
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">
              {detectForm(
                id,
                "Save Servivce Category",
                "Edit Servivce Category"
              )}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddServiceCategory;
