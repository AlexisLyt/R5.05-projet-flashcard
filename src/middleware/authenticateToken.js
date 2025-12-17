import { request, response } from "express";
import jwt from "jsonwebtoken";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "../db/database.js";

/**
 * @param {request} req 
 * @param {response} res 
 * @param {Function} next 
 */
export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Access token required" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const [result] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
        req.user = { userId, admin: result.admin };

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalid or expired access token" });
    }
}