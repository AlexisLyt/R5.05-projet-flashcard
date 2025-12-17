import { Router } from 'express';
import { createCollection, deleteCollection, getUserCollections, getCollection, updateCollection } from '../controllers/categoryController.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { createCollectionSchema, collectionIdSchema, updateCollectionSchema } from '../models/category.js';
import searchRoutes from './searchRouter.js';

const router = Router();

router.use(authenticateToken);

router.get("/", getUserCollections);
router.get("/:id", validateParams(collectionIdSchema), getCollection);
router.post("/", validateBody(createCollectionSchema), createCollection);
router.patch("/:id", validateParams(collectionIdSchema), validateBody(updateCollectionSchema), updateCollection);
router.delete("/:id", validateParams(collectionIdSchema), deleteCollection);

router.use("/search", searchRoutes);

export default router;