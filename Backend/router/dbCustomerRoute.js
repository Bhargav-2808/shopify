import express from "express";
import { createDbCustomer, editDbCustomer, getDbCustomer, deleteCustomer } from "../controller/customerDbController/customerDbController.js";
import protect from '../middleware/authMiddleware.js'


const router = express.Router();

router.get("/",protect, getDbCustomer);
router.post("/create",protect, createDbCustomer);
router.put("/edit/:id",protect, editDbCustomer);
router.delete("/delete/:id", protect, deleteCustomer);


export default router;
