import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
  role: null,
  balanceOkay: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      //console.log(action.payload)
      const { email, userName, userID, role } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
      state.role = role;
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      //console.log(action.payload)
      // const {email,userName,userID} =action.payload;
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      state.role = null;
    },
    BALANCE_STATUS_SET: (state, action) => {
      state.balanceOkay = true;
    },
    BALANCE_STATUS_UNSET: (state, action) => {
      state.balanceOkay = false;
    },
  },
});

export const { SET_ACTIVE_USER } = authSlice.actions;
export const { REMOVE_ACTIVE_USER } = authSlice.actions;
export const { BALANCE_STATUS_SET } = authSlice.actions;
export const { BALANCE_STATUS_UNSET } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;
export const selectRole = (state) => state.auth.role;
export const selectBalanceStatus = (state) => state.auth.balanceOkay;

export default authSlice.reducer;
