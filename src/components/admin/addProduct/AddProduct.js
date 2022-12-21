import React, { useState } from "react";
import Card from "../../card/Card";
import styles from "./AddProduct.module.scss";

// import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import { db, storage } from '../../../firebase/config';

// import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

//import {} from './redux/useSelector'

const categories = [
  { id: 1, name: "laptop" },
  { id: 2, name: "electronics" },
  { id: 3, name: "fashion" },
  { id: 4, name: "phone" },
];

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  //console.log(productEdit);
  const initialProduct = {
    name: "",
    imageUrl: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  };

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialProduct }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: [value],
    });
  };

  const handleImageChange = (e) => {};

  const addProduct = async (e) => {
    e.preventDefault();
    //console.log(product);
    setIsLoading(true);
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "ADD New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product Name:</label>
            <input
              type="text"
              required
              placeholder="product name"
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress} %` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress} %`}
                  </div>
                </div>
              )}

              <input
                type="file"
                placeholder="product image"
                accept="image/*"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageUrl === "" ? (
                ""
              ) : (
                <input
                  type="text"
                  placeholder="image url"
                  name="imageUrl"
                  disabled
                  value={product.imageUrl}
                />
              )}

              <label>Product Price:</label>
              <input
                type="number"
                required
                placeholder="product price"
                name="price"
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />

              <label>Product Category:</label>
              <select
                required
                name="category"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  ---choose product category
                </option>
                {categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>

              <label>Product Company/Brand:</label>
              <input
                type="text"
                required
                placeholder="product brand"
                name="brand"
                value={product.brand}
                onChange={(e) => handleInputChange(e)}
              />

              <label>Description</label>
              <textarea
                name="desc"
                value={product.desc}
                required
                cols={30}
                rows={10}
                onChange={(e) => handleInputChange(e)}
              />

              <button className="--btn --btn-primary">
                {detectForm(id, "Save Product", "Edit Product")}{" "}
              </button>
            </Card>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
