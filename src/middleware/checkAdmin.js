import { request, response } from "express";

/**
 * @param {request} req 
 * @param {response} res 
 * @param {Function} next 
 */
export const checkAdmin = (req, res, next) => {
    if (!req.user.admin) {
        return res.status(403).json({ error: "You are not admin" });
    }

    next();
}