import express from "express";
import { getDbProduct } from "../controller/productDbController/productDbController.js";
import protect from '../middleware/authMiddleware.js'


const router = express.Router();

router.get("/",protect, getDbProduct);

export default router;
