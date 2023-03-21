import express from "express";
import { getAllCustomer, getAllProduct } from "../controller/storeController/storeController.js";

const router = express.Router();

router.get("/customer", getAllCustomer);
router.get("/product", getAllProduct);


export default router;
