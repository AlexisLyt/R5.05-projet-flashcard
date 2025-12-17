import { Router } from 'express';
import { searchCollection } from '../controllers/searchController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = Router();

router.use(authenticateToken); // faut vrm le remettre ?

router.get('/', searchCollection);

export default router;