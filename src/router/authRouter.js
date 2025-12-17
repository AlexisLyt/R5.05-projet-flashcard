import { Router } from "express"
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = Router()

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/', authenticateToken, getUserInfos);

export default router
