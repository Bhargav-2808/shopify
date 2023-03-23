import express from "express";
import dotenv from "dotenv";
import authRouter from "./router/router.js";
import storeRoute from "./router/storeRoute.js";
import dbCustomerRoute from "./router/dbCustomerRoute.js";
import dbProductRoute from "./router/dbProductRoute.js";
import "./db/db.js";
import "./modals/shopSchema.js";
import "./modals/customerSchema.js";
import "./modals/productSchema.js";
import cors from "cors";
import path from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());
app.get("/login", (req, res) => {
  const loginForm = path.join(path.resolve(), "./view/index.html");
  res.sendFile(loginForm);
});
app.use("/", authRouter);
app.use("/", storeRoute);
app.use("/dbCustomer", dbCustomerRoute);
app.use("/dbProduct", dbProductRoute);

app.listen(port, () => {
  console.log(`server starting on the port ${port}`);
});
