import { createSlice } from "@reduxjs/toolkit";
import {customerThunk} from "../thunk/customerThunk";


const initialState = {
  user: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(customerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(customerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(customerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export const customerReducer = customerSlice.reducer;
