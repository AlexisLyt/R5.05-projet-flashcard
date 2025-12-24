import { collectionsTable, flashcardsTable, levelsTable, revisionsTable } from "../db/schema.js";
import { request, response } from "express";
import { db } from "../db/database.js"
import { eq } from "drizzle-orm";

/**
 * Create a flashcard
 * @param {request} req 
 * @param {response} res 
 */
export const createFlashcard = async (req, res) => {

    let { frontText, backText, frontUrl, backUrl, collection } = req.body
    frontUrl = frontUrl || null
    backUrl = backUrl || null

    try {
        const [collec] = await db.select().from(collectionsTable)
        .where(eq(collectionsTable.id, collection))
        if (!collec ) {
            return res.status(400).json({message : "Collection not found"})
        } 
        
        if (!req.user.admin && collec.idUser !== req.user.userId) {
            return res.status(403).json({message : "You can't create a flashcard in this collection"})
        } 

        await db.insert(flashcardsTable).values({
            front : frontText,
            back : backText,
            urlFront : frontUrl,
            urlBack : backUrl,
            idCollection : collection
        })
        .returning()
        res.status(201).json({
            message : "Flashcard created succesfully"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Internal server error"})
    }
}
/**
 * Get one flashcard with id
 * @param {request} req 
 * @param {response} res 
 */
export const getOneFlashcard = async (req, res) => {
    const { id } = req.params
    try {
        const [flashcard] = await db.select().from(flashcardsTable)
        .where(eq(flashcardsTable.id, id))

        const collection = flashcard.idCollection

        const [collec] = await db.select().from(collectionsTable)
        .where(eq(collectionsTable.id, collection))
        if (!collec || (collec.visibility === "private" && !req.user.admin && collec.idUser !== req.user.userId)) {
            return res.status(400).json({message : "Can't access the collection or collection not found"})
        } 

        if (!flashcard) {
            return res.status(404).json({
                message : "Flashcard not found"
            })
        }
        return res.status(200).json(flashcard)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

/**
 * Get the flashcards from the collection
 * @param {request} req 
 * @param {response} res 
 */
export const getCollectionFlashcards = async (req, res) => {
    const { id } = req.params
    try {
        const flashcards = await db.select().from(flashcardsTable)
        .where(eq(flashcardsTable.idCollection, id))
        
        const [collec] = await db.select().from(collectionsTable)
        .where(eq(collectionsTable.id, id))
        if (!collec || collec.visibility === "private") {
            return res.status(400).json({message : "Can't access the collection or collection not found"})
        } 

        if (!flashcards || flashcards.length === 0) {
            return res.status(404).json({
                message : "Collection not found or is empty"
            })
        }
        return res.status(200).json(flashcards)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}
/**
 * Get the flashcards to revise
 * @param {response} res 
 * @param {request} req 
 */
export const getFlashCardsToRevise = async (req, res) => {
    const { id } = req.params
    try {
        const [collec] = await db.select().from(collectionsTable)
        .where(eq(collectionsTable.id, id))
        if (!collec || (collec.visibility === "private" && !req.user.admin && collec.idUser !== req.user.userId)) {
            return res.status(400).json({message : "Can't access the collection or collection not found"})
        } 

        const flashcards = await db.select({
            idFlashcard : flashcardsTable.id,
            idCollection : flashcardsTable.idCollection,
            front : flashcardsTable.front,
            back : flashcardsTable.back,
            urlFront : flashcardsTable.urlFront,
            urlBack : flashcardsTable.urlBack,
            revisionPeriod : levelsTable.revisionPeriod,
            latestDate : revisionsTable.latestDate
        })
        .from(revisionsTable)
        .rightJoin(flashcardsTable,eq(revisionsTable.idFlashcard, flashcardsTable.id))
        .rightJoin(levelsTable, eq(levelsTable.id, revisionsTable.idLevel))
        .where(eq(flashcardsTable.idCollection, id))
        if (!flashcards) {
            res.status(404).json({message : "Collection not found"})
        }
        let flashcardsToRevise = []
        for (let f of flashcards) {
            const dateR = new Date(f.latestDate * 1000)
            const nextRevision = new Date(dateR.getTime() + f.revisionPeriod * 24 * 60 * 1000)
            if (nextRevision >= new Date()) flashcardsToRevise.push(f)
        }
        console.log(flashcardsToRevise)
        if (flashcardsToRevise.length == 0) {
            console.log("liste vide")
            return res.status(204).json({message : "No flashcards to revise"})
        }
        return res.status(200).json(flashcardsToRevise)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}
/**
 * Update the flashcard
 * @param {request} req 
 * @param {response} res 
 */
export const updateFlashcard = async (req, res) => {
    const { frontText, backText, frontUrl, backUrl } = req.body
    const { id } = req.params

    try {
        const [flashcard] = await db.update(flashcardsTable)
        .set({front : frontText, back : backText, urlFront : frontUrl, urlBack : backUrl})
        .where(eq(flashcardsTable.id, id))
        .returning()

        const [collec] = await db.select().from(collectionsTable)
        .where(eq(collectionsTable.id, flashcard.idCollection))
        if (!collec || collec.idUser !== req.user.userId) {
            return res.status(400).json({message : "Can't access the collection or collection not found"})
        } 

        if (!flashcard) {
            return res.status(404).json({
                message : "Flashcard not found"
            })
        }
        return res.status(200).json(flashcard)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}
/**
 * Delete the flashcard by id
 * @param {request} req 
 * @param {response} res 
 **/
export const deleteFlashcard = async (req, res) => {
    const { id } = req.params

    try {
        const [flashcard] = await db.delete(flashcardsTable)
        .where(eq(flashcardsTable.id, id))
        .returning()

        const [collec] = await db.select().from(collectionsTable)
        .where(eq(collectionsTable.id, flashcard.idCollection))
        if (!collec || collec.idUser !== req.user.userId) {
            return res.status(400).json({message : "Can't access the collection or collection not found"})
        }         

        if (!flashcard) {
            return res.status(404).json({message : "Flashcard not found"})
        }
        return res.status(200).json(flashcard)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

/**
 * Revise the flashcard
 * @param {request} req 
 * @param {response} res 
 */
export const reviseFlashCard = async (req, res) => {
    const { id } = req.params
    const { level } = req.body
    const currDate = new Date()
    try {

        const [flashcard] = await db.select().from(flashcardsTable)
        .where(eq(flashcardsTable.id, revision.idFlashcard)).returning()

        const [collec] = await db.select().from(collectionsTable)
        .where(eq(collectionsTable.id, flashcard.idCollection))
        
        const [revision] = await db.update(revisionsTable)
        .set({idLevel : level, latestDate : currDate})
        .where(eq(revisionsTable.idFlashcard, id))
        .returning()

        if (!revision) {
            return res.status(404).json({message : "Flashcard not found"})
        }
        if (!collec) {
            return res.status(400).json({message : "Collection not found"})
        }

        return res.status(200).json({
            message : "Flashcard revised",
            latestDate : `${currDate}`
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}