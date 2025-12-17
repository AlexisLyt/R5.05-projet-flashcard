import { flashcardsTable } from "../db/schema.js";
import { request, response } from "express";
import { db } from "../db/database.js"

/**
 * Create a flashcard
 * @param {request} req 
 * @param {response} res 
 */
export const createFlashcard = async (req, res) => {
    const { frontText, backText, frontUrl, backUrl, collection } = req.body
    frontUrl = frontUrl ||null
    backUrl = backUrl || null
    try {
        await db.insert(flashcardsTable).values({
            front : frontText,
            back : backText,
            urlFront : frontUrl,
            urlBack : backUrl,
            idCollection : collection
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Internal server error"})
    }
}