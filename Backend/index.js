import express from "express";
import dotenv from "dotenv";
import authRouter from "./router/router.js";
import storeRoute from "./router/storeRoute.js";
import "./db/db.js";
import "./modals/shopSchema.js";
import "./modals/customerSchema.js";
import "./modals/productSchema.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/", storeRoute);

app.listen(port, () => {
  console.log(`server starting on the port ${port}`);
});
