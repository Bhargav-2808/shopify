import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = sessionStorage.getItem("token");
const customerThunk = createAsyncThunk(
  "customer",
  async (credential, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/dbCustomer?page=${credential.page}&size=${credential.limit}&search=${credential.queryValue}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default customerThunk;
