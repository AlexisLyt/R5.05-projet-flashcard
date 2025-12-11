import express from "express"
import logger from "./middleware/logger.js"
import authRoutes from "./router/authRouter.js"
import userRoutes from "./router/userRouter.js"
import flashCardRoutes from "./router/flashCardRouter.js"
import collectionRoutes from "./router/collectionRouter.js"

const PORT = process.env.POST || 3000

const app = express()

app.use(express.json())
app.use(logger)

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/flashcards", flashCardRoutes)
app.use("/collections", collectionRoutes)

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))