import express from 'express';
import { generateToken, redirectUrl } from '../controller/authController.js';

const router = express.Router();


router.get("/",redirectUrl);
router.get("/api/auth",generateToken)

export default router;