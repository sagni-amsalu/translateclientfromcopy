import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Home from "../../components/admin/home/Home";
import NavBar from "../../components/admin/navBar/NavBar";
import ViewOrders from "../../components/admin/orders/viewOrders/ViewOrders";
import AddRole from "../../components/admin/role/AddRole";
import ViewRoles from "../../components/admin/role/ViewRoles";
import AddShopStation from "../../components/admin/shopStation/AddShopStation";
import ViewShopStations from "../../components/admin/shopStation/ViewShopStations";
import AddShopOwner from "../../components/admin/shopOwner/AddShopOwner";
import ViewShopOwners from "../../components/admin/shopOwner/ViewShopOwners";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import CardReader from "../../components/admin/reader/CardReader";
import styles from "./Admin.module.scss";
import ViewUsers from "../../components/admin/viewUsers/ViewUsers";
import AddUser from "../../components/admin/addUser/AddUser";
import AddPayment from "../../components/admin/addPayment/AddPayment";
import ViewPayments from "../../components/admin/viewPayments/ViewPayments";
import ViewServiceCategories from "../../components/admin/viewServiceCat/ViewServiceCategories";
import AddServiceCategory from "../../components/admin/addServiceCat/AddServiceCategory";
import ViewFileHistory from "../../components/admin/viewFileHistory/ViewFileHistory";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NavBar />
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-payments" element={<ViewPayments />} />
          <Route path="add-payment/:id" element={<AddPayment />} />
          <Route path="all-orders" element={<ViewOrders />} />
          <Route path="add-role/:id" element={<AddRole />} />
          <Route path="all-roles" element={<ViewRoles />} />
          <Route path="add-shop-owner/:id" element={<AddShopOwner />} />
          <Route path="all-shop-owners" element={<ViewShopOwners />} />
          <Route path="card-reader" element={<CardReader />} />
          <Route path="add-shop-station/:id" element={<AddShopStation />} />
          <Route
            path="add-shop-station/:id/:stationID"
            element={<AddShopStation />}
          />
          <Route path="all-shop-stations" element={<ViewShopStations />} />
          <Route path="view-shop-stations/:id" element={<ViewShopStations />} />

          <Route path="all-users" element={<ViewUsers />} />
          <Route path="add-User/:id" element={<AddUser />} />

          <Route
            path="all-serviceCategories"
            element={<ViewServiceCategories />}
          />
          <Route
            path="add-ServiceCategory/:id"
            element={<AddServiceCategory />}
          />

          <Route path="all-filehistorys" element={<ViewFileHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
