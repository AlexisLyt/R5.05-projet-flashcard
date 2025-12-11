import { request, response } from "express";
import { db } from "../db/database.js";
import { usersTable } from "../db/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import "dotenv/config";

/**
 * @param {request} req 
 * @param {response} res 
 */
export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const [result] = await db.insert(usersTable).values({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            admin: false
        }).returning({
            id: usersTable.id,
            email: usersTable.email,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            admin: usersTable.admin
        });
        
        const token = jwt.sign(
            {
                userId: result.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );
        res.status(201).json({
            message: "User created",
            user: result,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to register"
        });
    }
};

/**
 * @param {request} req 
 * @param {response} res 
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        delete user.password;
        
        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );
        res.status(201).json({
            message: "User logged in",
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to login"
        });
    }
};