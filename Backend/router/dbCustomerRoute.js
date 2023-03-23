import express from "express";
import { getDbCustomer } from "../controller/customerDbController/customerDbController.js";
import protect from '../middleware/authMiddleware.js'


const router = express.Router();

router.get("/",protect, getDbCustomer);


export default router;
