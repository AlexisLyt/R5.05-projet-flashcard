import express from "express"

const PORT = process.env.POST || 3000

const app = express()

app.use(express.json())

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))