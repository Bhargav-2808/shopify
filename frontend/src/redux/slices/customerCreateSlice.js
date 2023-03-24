import { createSlice } from "@reduxjs/toolkit";
import {addCustomerThunk} from "../thunk/customerThunk";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const customerCreateSlice = createSlice({
  name: "customeradd",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomerThunk.fulfilled, (state, action) => {
        
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(addCustomerThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const customerCreateReducer = customerCreateSlice.reducer;
