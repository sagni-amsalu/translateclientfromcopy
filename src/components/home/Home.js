//import React from "react";
import ContactUS from "../../pages/auth/Contactus";

import { useState } from "react";
import PhotoSphere from "../../PhotoSphere";
import SearchInput from "../../SearchInput";
// import "../../index.css";
import "./another.css";
import styles from "./Home.module.scss";

const Home = () => {
  // Data holds a list of image urls passed from Pixabay API
  const [data, setData] = useState({ imageData: [] });

  const setImageData = (data) => {
    setData({ imageData: data });
  };

  return (
    <>
      {/* <div className="w-screen h-screen p-9 flex flex-col items-center overflow-hidden"> */}
      <div className="m-1 p-11 flex flex-col items-center">
        {/* <h1 className="text-center font-bold text-2xl m-2">
          Language translator here
        </h1> */}
        <SearchInput setImageData={setImageData} />
        <PhotoSphere imageData={data.imageData}></PhotoSphere>
      </div>
    </>
  );
};

export default Home;
