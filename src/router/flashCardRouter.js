import { Router } from "express"

const router = Router()

router.post("/", () => console.log("create flashcard")) //TODO : createFlashcard
router.get("/:id", () => console.log("get a flashcard")) //TODO : getOneFlashcard
router.get("/collection/:id", () => console.log("get flashcards from collection")) //TODO : getCollectionFlashcards
router.get("/collection/:id/revise", () => console.log("get flashcard to revise from a collection")) //TODO : getFlashCardsToRevise
router.patch("/:id", () => console.log("update flashcard")) //TODO : updateFlashcard
router.delete("/:id", () => console.log("delete flashcard")) //TODO : deleteFlashcard
router.post("/revise/:id", () => console.log("revise flashcard")) //TODO : reviseFlashCard

export default router