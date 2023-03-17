import express from "express";
import { getAllCustomer } from "../controller/customerController/customerController.js";

const router = express.Router();

router.get("/", getAllCustomer);

export default router;
