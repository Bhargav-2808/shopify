import { createSlice } from "@reduxjs/toolkit";
import {customerEditThunk} from "../thunk/customerThunk";

const initialState = {
  editUser: null,
  loading: false,
  error: null,
};

const customerEditSlice = createSlice({
  name: "customeredit",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(customerEditThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(customerEditThunk.fulfilled, (state, action) => {
        
        state.editUser = action.payload;
        state.loading = false;
      })
      .addCase(customerEditThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const customerEditReducer = customerEditSlice.reducer;
