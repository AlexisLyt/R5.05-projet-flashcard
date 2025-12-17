import { eq } from 'drizzle-orm';
import { db } from "../db/database.js";
import { collectionsTable } from "../db/schema.js";

export const getUserCollections = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await db.select().from(collectionsTable).where(eq(collectionsTable.idUser, userId));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch user collections"
        });
    }
};

export const getCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.select().from(collectionsTable).where(eq(collectionsTable.id, id));
        const userId = req.user.userId;
        const isAdmin = req.user.admin;

        if (!result || (result.visibility === "private" && !isAdmin && result.idUser !== userId)) {
            return res.status(404).send({
                error: "Collection not found"
            });
        }

        res.status(200).send({
            message: "Collection fetched",
            collection: result
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch collection"
        });
    }
};

export const createCollection = async (req, res) => {
    try {
        const newCollection = req.body;

        const result = await db.insert(collectionsTable).values(newCollection).returning();

        res.status(201).json({
            message: "Collection created",
            collection: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create collection"
        });
    }
};

export const deleteCollection = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.select().from(collectionsTable).where(eq(collectionsTable.id, id));
        const userId = req.user.userId;
        const isAdmin = req.user.admin;

        if (!result || (!isAdmin && result.idUser !== userId)) {
            return res.status(404).send({
                error: "Collection not found"
            });
        }

        await db.delete(collectionsTable).where(eq(collectionsTable.id, id)).returning();

        res.status(200).send({
            message: `Collection ${id} deleted`
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete collection"
        });
    }
};

export const updateCollection = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.select().from(collectionsTable).where(eq(collectionsTable.id, id));
        const userId = req.user.userId;
        const isAdmin = req.user.admin;

        if (!result || (!isAdmin && result.idUser !== userId)) {
            return res.status(404).send({
                error: "Collection not found"
            });
        }

        if (Object.values(req.body).every(value => !value)) {
            return res.status(404).send({
                error: "You need to update at least one field"
            });
        }

        await db.update(collectionsTable).set(req.body).where(eq(collectionsTable.id, id)).returning();

        res.status(200).send({
            message: `Collection ${id} updated`
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update collection"
        });
    }
};