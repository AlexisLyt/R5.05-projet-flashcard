import { Router } from "express"

const router = Router()

router.post("/register", () => console.log("register")) //TODO : registerUser
router.post("/login", () => console.log("login")) //TODO : loginUser
router.get("/", () => console.log("get user infos")) //TODO : getUserInfos

export default router