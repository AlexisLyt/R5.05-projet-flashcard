import z from "zod";

export const flashcardSchema = z.object({
    frontText : z.string().max(100),
    backText : z.string().max(30),
    frontUrl : z.url().nullish(),
    backUrl : z.url().nullish(),
    collection : z.uuid()
})

export const editFlashCardSchema = z.object({
    frontText : z.string().max(100).nullish(),
    backText : z.string().max(30).nullish(),
    frontUrl : z.url().nullish(),
    backUrl : z.url().nullish()
})

export const reviseSchema = z.object({
    level : z.int().min(1).max(5).nullish()
})

export const idSchema = z.object({
    id : z.uuid()
})