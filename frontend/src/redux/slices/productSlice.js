import { createSlice } from "@reduxjs/toolkit";
import productThunk from "../thunk/productThunk.js";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(productThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(productThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productReducer = productSlice.reducer;
