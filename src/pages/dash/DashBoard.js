import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./DashBoard.module.scss";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../../authHeader";
import DashCard from "./DashCard";

const DashBoard = () => {
  const [totalPay, setTotalPay] = useState(0);
  const [totalExtract, setTotalExtract] = useState(0);
  const [totalConverted, setTotalConverted] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [memberSince, setMemberSince] = useState("");

  useEffect(() => {
    dashData();
  }, []);

  const dashData = async () => {
    //  setIsLoading(true);

    const userr = localStorage.getItem("user");
    const user = JSON.parse(userr);

    //console.log("hist is-", user);
    // console.log("the user id-", user?.data?.userID);
    const id = user?.data?.userID;
    const post = {
      id,
    };

    try {
      const res = await axios.post(
        "https://translateapi2-sagni-amsalu.onrender.com/api/clients/dashData",
        post,
        { headers: authHeader() }
      );
      // console.log("data is--", res.data.data);
      // console.log("the total balance-", parseFloat(res.data.data.totalbalance));
      //new Date(year,month,day)
      // setFileHistories(res.data.data);
      const dd = new Date(res.data.data.memberSince);
      const ddis = dd.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
      });

      setTotalPay(res.data.data.totalpay);
      setCurrentBalance(res.data.data.totalbalance);
      setMemberSince(ddis);
      setTotalConverted(res.data.data.totalconverted);
      setTotalExtract(res.data.data.totalextract);

      // console.log("new date -", new Date(res.data.data.memberSince));

      //toast.success("FileHistories Loaded");
    } catch (error) {
      // setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.menu}>
      {/* <h1>import data displayed in here</h1> */}
      <div className={styles.rightContainer}>
        <DashCard title="Total Paid" data={totalPay} desc="Birr" />
        <DashCard
          title="Total Extracted"
          data={totalExtract}
          desc="Characters"
        />
        <DashCard
          title="Total Converted"
          data={totalConverted}
          desc="Characters"
        />
        <DashCard title="Current Balance" data={currentBalance} desc="Birr" />
        <DashCard title="Member Since" data={memberSince} desc="" />
      </div>
    </div>
  );
};

export default DashBoard;
