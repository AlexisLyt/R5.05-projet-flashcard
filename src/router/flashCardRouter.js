import { Router } from "express"
import { editFlashCardSchema, flashcardSchema, idSchema, reviseSchema } from "../models/flashCard.js"
import { validateBody, validateParams } from "../middleware/validation.js"
import { createFlashcard, deleteFlashcard, getCollectionFlashcards, getFlashCardsToRevise, getOneFlashcard, reviseFlashCard, updateFlashcard } from "../controllers/flashCardController.js"
const router = Router()

router.post("/", validateBody(flashcardSchema), createFlashcard)
router.get("/:id", validateParams(idSchema), getOneFlashcard)
router.get("/collection/:id", validateParams(idSchema), getCollectionFlashcards)
router.get("/collection/:id/revise",validateParams(idSchema), getFlashCardsToRevise)
router.patch("/:id", validateBody(editFlashCardSchema), validateParams(idSchema), updateFlashcard)
router.delete("/:id", validateParams(idSchema), deleteFlashcard)
router.post("/revise/:id", validateParams(idSchema), validateBody(reviseSchema), reviseFlashCard)
export default router