import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product-List/ProductListSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
