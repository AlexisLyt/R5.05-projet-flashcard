import { Router } from 'express';
import { searchCollection } from '../controllers/searchController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = Router();

router.use(authenticateToken); // faut vrm le remettre ?
// jsp mais par contre le search marche pas et j'ai pas testé delete collection et update collection (et les routes admin)

router.get('/', searchCollection);

export default router;