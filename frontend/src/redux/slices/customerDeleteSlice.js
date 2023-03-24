import { createSlice } from "@reduxjs/toolkit";
import {customerDeleteThunk} from "../thunk/customerThunk";

const initialState = {
  user: null,
  loading: false,
  error: null,
  modalOpen: false,
};

const customerDeleteSlice = createSlice({
  name: "customeredit",
  initialState,
  reducers: {
    modalChange(state, action) {
      state.modalOpen = action.payload;
      console.log(state.modalOpen);
    },
    userChange(state, action) {
      state.user = null;
      
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(customerDeleteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(customerDeleteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(customerDeleteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { modalChange,  userChange } = customerDeleteSlice.actions;
export const customerDeleteReducer = customerDeleteSlice.reducer;
