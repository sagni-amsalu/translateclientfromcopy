import React from "react";
import { useSelector } from "react-redux";
import { selectEmail, selectRole } from "../../redux/slice/authSlice";

const LoggedUserOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  const userRole = useSelector(selectRole);
  //  const userEmail=useSelector(selectEmail);

  // console.log("role is-", userRole);
  // console.log("email is-", userEmail);

  //   if (userEmail === "amsaluyadeta@gmail.com") {
  //     return children;
  //   }

  if (userRole === "user") {
    return children;
  }
  return null;
};

export default LoggedUserOnlyRoute;
