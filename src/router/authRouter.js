import { Router } from "express";
import { register, login, getUserInfos } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { validateBody } from "../middleware/validation.js";
import { registerSchema, loginSchema } from "../models/auth.js";
const router = Router()

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/', authenticateToken, getUserInfos);

export default router;