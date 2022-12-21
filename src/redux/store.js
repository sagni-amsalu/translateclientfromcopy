import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js";
import productReducer from "./slice/productSlice.js";
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
