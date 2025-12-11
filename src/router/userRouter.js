import { Router } from "express"

const router = Router()

router.get("/", () => console.log("get all users")) //TODO : getAllUsers
router.get("/:id", () => console.log("get a user")) //TODO : getOneUser
router.delete("/:id", () => console.log("delete user")) //TODO : deleteUser

export default router