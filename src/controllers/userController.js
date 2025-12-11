import { eq } from 'drizzle-orm';
import { db } from "../db/database.js";
import { usersTable } from "../db/schema.js";

export const getAllUsers = async (req, res) => {
    try {
        const result = await db.select().from(usersTable).orderBy("createdAt", "desc");

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch users"
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.select().from(usersTable).where(eq(usersTable.id, id));

        if (!result) {
            return res.status(404).send({
                error: "User not found"
            });
        }

        res.status(200).send({
            message: "User fetched",
            user: result
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch user"
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.select().from(usersTable).where(eq(usersTable.id, id));

        if (!result) {
            return res.status(404).send({
                error: "User not found"
            });
        }

        await db.delete(usersTable).where(eq(usersTable.id, id)).returning();

        res.status(200).send({
            message: `User ${id} deleted`
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete user"
        });
    }
};