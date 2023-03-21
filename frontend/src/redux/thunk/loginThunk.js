import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginShop = createAsyncThunk(
  "login/user",
  async (credential, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5555?shop=${credential}`,{
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        }
      );
      window.location.href = response.data.redirectURL;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default loginShop;
