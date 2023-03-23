import { configureStore } from "@reduxjs/toolkit";
import { customerReducer } from "./slices/customerSlice";
import { loginReducer } from "./slices/loginSlice";
import { productReducer } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    login:loginReducer,
    customer:customerReducer,
    product:productReducer,

  },
  devTools: true,
});
