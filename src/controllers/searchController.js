import { like } from 'drizzle-orm';
import { db } from "../db/database.js";
import { collectionsTable } from "../db/schema.js";

export const searchCollection = async (req, res) => {
    try {
        const querySearch = req.query.q || "";
        const result = await db.select().from(collectionsTable).where(like(collectionsTable.title, `%${querySearch}%`));
        const userId = req.user.userId;
        const isAdmin = req.user.admin;
        const publicCollections = result.filter(collection =>
            collection.visibility === "public" ||
            isAdmin ||
            collection.idUser === userId
        );

        res.status(200).json(publicCollections);
    } catch (error) {
        res.status(500).json({
            error: "Failed to search collection"
        });
    }
};