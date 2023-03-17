import express from "express";
import dotenv from "dotenv";
import authRouter from "./router/router.js";
import customerRoute from "./router/customerRoute.js";
import "./db/db.js";
import './modals/shopSchema.js'


dotenv.config();
const app = express();
const port = process.env.PORT || 5555;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/customer",customerRoute)

app.listen(port, () => {
  console.log(`server starting on the port ${port}`);
});
