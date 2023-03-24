import { configureStore } from "@reduxjs/toolkit";
import { customerCreateReducer } from "./slices/customerCreateSlice";
import { customerDeleteReducer } from "./slices/customerDeleteSlice";
import { customerEditReducer } from "./slices/customerEditSlice";
import { customerReducer } from "./slices/customerSlice";
import { loginReducer } from "./slices/loginSlice";
import { productReducer } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    customer: customerReducer,
    product: productReducer,
    editCustomer: customerEditReducer,
    deleteCustomer: customerDeleteReducer,
    createCustomer: customerCreateReducer,
  },
  devTools: true,
});
