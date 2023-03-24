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

const customerEditThunk = createAsyncThunk(
  "customerEdit",
  async (credential, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5555/dbCustomer/edit/${credential.id}`,
        credential.data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await credential.cb();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const customerDeleteThunk = createAsyncThunk(
  "customerDelete",
  async (credential, thunkAPI) => {
    try {
      console.log(token);
      const response = await axios.delete(
        `http://localhost:5555/dbCustomer/delete/${credential}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const addCustomerThunk = createAsyncThunk(
  "customeradd",
  async (credential, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:5555/dbCustomer/create`,

        credential.data,

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      credential.cb();

      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export {
  customerThunk,
  customerEditThunk,
  customerDeleteThunk,
  addCustomerThunk,
};
