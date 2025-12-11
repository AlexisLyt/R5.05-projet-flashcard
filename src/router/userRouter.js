import { Router } from 'express';
import { deleteUser, getAllUsers, getUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { validateParams } from '../middleware/validation.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { userIdSchema } from '../models/user.js';

const router = Router();

router.use(authenticateToken);
router.use(isAdmin);

router.get("/", getAllUsers);
router.get('/:id', validateParams(userIdSchema), getUser);
router.delete('/:id', validateParams(userIdSchema), deleteUser);

export default router;