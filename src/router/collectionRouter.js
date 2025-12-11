import { Router } from "express";

const router = Router()

//TODO : middleware

router.get("/", () => console.log("get user collections")) //TODO : getUserCollections
router.get("/:id", () => console.log("get collection")) //TODO : getCollection
router.post("/", () => console.log("create collection")) //TODO : createCollection
router.get("/search/", () => console.log("search collection")) //TODO : searchCollection
router.patch("/:id", () => console.log("update collection")) //TODO : updateCollection
router.delete("/:id", () => console.log("delete collection")) //TODO : deleteCollection

export default router