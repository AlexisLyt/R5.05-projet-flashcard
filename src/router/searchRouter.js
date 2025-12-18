import { Router } from 'express';
import { searchCollection } from '../controllers/searchController.js';

const router = Router();

router.get('/', searchCollection);

export default router;