import z from "zod";

export const createCollectionSchema = z.object({
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(300).nullish(),
    visibility: z.enum(["public", "private"])
});

export const collectionIdSchema = z.object({
    id: z.uuid()
});

export const updateCollectionSchema = z.object({
    title: z.string().min(1).max(300).optional(),
    description: z.string().min(1).max(300).optional(),
    visibility: z.enum(["public", "private"]).optional()
});