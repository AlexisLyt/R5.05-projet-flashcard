
import { ConsoleLogWriter } from "drizzle-orm";
import { db } from "./database.js";
import { collectionsTable, flashcardsTable, revisionsTable, levelsTable, usersTable } from "./schema.js";
import bcrypt from "bcrypt";

async function seed() {
    try {

        console.log('Seeding database...');

        await db.delete(revisionsTable);
        await db.delete(flashcardsTable);
        await db.delete(collectionsTable);
        await db.delete(levelsTable);
        await db.delete(usersTable);

		const hashPassword1 = await bcrypt.hash("raclette123", 10)
		const hashPassword2 = await bcrypt.hash("raclette123", 10)
		const hashPassword3 = await bcrypt.hash("raclette123", 10)

		const seedUsers = [
			{
				email: 'racletterose@gmail.com',
				firstName: 'clem',
                lastName: 'pavy',
				password: hashPassword1,
				admin: true, 
			},
			{
				email: 'alexis@alexis.com',
				firstName: 'alexis',
                lastName: 'loyant',
				password: hashPassword2,
			},
			{
				email: 'maceo@legoat.com',
				firstName: 'maceo',
                lastName: 'david',
				password: hashPassword3,
			},
		]

        const insertedusers = await db.insert(usersTable).values(seedUsers).returning()

		const seedLevels = [
			{
				id: 1,
				revisionPeriod: 1,
			},
			{
				id: 2,
				revisionPeriod: 2,
			},
			{
				id: 3,
				revisionPeriod: 4,
			},
			{
				id: 4,
				revisionPeriod: 8,
			},
			{
				id: 5,
				revisionPeriod: 16,
			},
		]

        const insertedlevels = await db.insert(levelsTable).values(seedLevels).returning()

        const seedCollections = [
			{
                idUser: insertedusers[0].id,
                title: "Raclette",
                description: "la raclette et le rose, c'est la vie !!!!!",
                visibility: "public",
			},
			{
                idUser: insertedusers[1].id,
                title: "alexis",
                visibility: "prive",
			},
			{
                idUser: insertedusers[2].id,
                title: "nimporte",
                description: "yop yop",
			},
		]
        
        const insertedcollections = await db.insert(collectionsTable).values(seedCollections).returning()

        const seedFlashcards = [
			{
				idCollection: insertedcollections[0].id,
                front: "La raclette c'est...",
                back: "LA VIE !!!",
                urlFront: "https://images-ca-1-0-1-eu.s3-eu-west-1.amazonaws.com/photos/original/1278/raclette-produit-AdobeStock_176989816.jpg",
                urlBack: "https://cache.marieclaire.fr/data/photo/w1200_h630_c17/5x/classement-meilleur-fromage-raclette1.jpg",
			},
            {
				idCollection: insertedcollections[0].id,
                front: "Quel est la meilleure couleur qui existe ?",
                back: "LE ROSE !!!!",
                urlFront: "https://previews.123rf.com/images/anelina/anelina1106/anelina110600028/9842136-rainbow-wave-background-with-glittering-stars.jpg",
                urlBack: "https://as2.ftcdn.net/v2/jpg/05/48/01/43/1000_F_548014396_54cr4YQ7HvWIG0brtVHllgPjkTEi7Myw.jpg",
			},
            {
				idCollection: insertedcollections[0].id,
                front: "Pourquoi le feu sa brûle ?",
                back: "Parce que l'eau ça mouille !",
                urlFront: "https://media.tenor.com/MYZgsN2TDJAAAAAe/this-is.png",
                urlBack: "https://images.bfmtv.com/-U7rd6jYb8Dsf3anUF4aXwsVZN4=/25x1:933x682/944x0/images/Un-meme-internet-2023975.jpg",
			},
            {
				idCollection: insertedcollections[1].id,
                front: "Je suis mieux que dieu, pire que le diable. Les pauvres en ont, les riche en on besoin, et si on en mange on meurt. Qui suis-je ?",
                back: "rien",
			},
            {
				idCollection: insertedcollections[1].id,
                front: "pain au chocolat ou chocolatine ?",
                back: "Pain au chocolat ! ça existe pas chocolatine !",
			},
            {
				idCollection: insertedcollections[1].id,
                front: "Je suis en tête de nuage et en queue d'avion. Pourtant, on ne me voit pas dans le ciel. PS : on me voit deux fois dans l'année.",
                back: "la lettre N",
                urlFront: "https://www.shutterstock.com/image-photo/cute-curious-cat-question-marks-600nw-2423488953.jpg",
                urlBack: "https://i.ytimg.com/vi/njofwqMuYAQ/maxresdefault.jpg",
			},
            {
				idCollection: insertedcollections[2].id,
                front: "droite ou gauche ?",
                back: "je sais pas",
                urlBack: "https://i.redd.it/ck5bzpxk7al61.jpg",
			},
            {
				idCollection: insertedcollections[2].id,
                front: "hiver ou été ?",
                back: "je sais pas",
			},
            {
				idCollection: insertedcollections[2].id,
                front: "salé ou sucré ?",
                back: "raclette",
			},
		]

        const insertedflashcards = await db.insert(flashcardsTable).values(seedFlashcards).returning()

        const seedRevisions = [
			{
				idUser: insertedusers[0].id,
                idLevel: insertedlevels[1].id,
                idFlashcard: insertedflashcards[0].id,
			},
			{
				idUser: insertedusers[0].id,
                idLevel: insertedlevels[2].id,
                idFlashcard: insertedflashcards[1].id,
			},
			{
				idUser: insertedusers[0].id,
                idLevel: insertedlevels[4].id,
                idFlashcard: insertedflashcards[2].id,
			},
			{
				idUser: insertedusers[1].id,
                idLevel: insertedlevels[0].id,
                idFlashcard: insertedflashcards[0].id,
			},
			{
				idUser: insertedusers[1].id,
                idLevel: insertedlevels[0].id,
                idFlashcard: insertedflashcards[1].id,
			},
			{
				idUser: insertedusers[1].id,
                idLevel: insertedlevels[0].id,
                idFlashcard: insertedflashcards[2].id,
			},
			{
				idUser: insertedusers[1].id,
                idLevel: insertedlevels[0].id,
                idFlashcard: insertedflashcards[3].id,
			},
			{
				idUser: insertedusers[1].id,
                idLevel: insertedlevels[0].id,
                idFlashcard: insertedflashcards[4].id,
			},
			{
				idUser: insertedusers[1].id,
                idLevel: insertedlevels[0].id,
                idFlashcard: insertedflashcards[5].id,
			},
			{
				idUser: insertedusers[2].id,
                idLevel: insertedlevels[4].id,
                idFlashcard: insertedflashcards[0].id,
			},
			{
				idUser: insertedusers[2].id,
                idLevel: insertedlevels[2].id,
                idFlashcard: insertedflashcards[1].id,
			},
			{
				idUser: insertedusers[2].id,
                idLevel: insertedlevels[0].id,
                idFlashcard: insertedflashcards[2].id,
			},
			{
				idUser: insertedusers[2].id,
                idLevel: insertedlevels[4].id,
                idFlashcard: insertedflashcards[6].id,
			},
			{
				idUser: insertedusers[2].id,
                idLevel: insertedlevels[1].id,
                idFlashcard: insertedflashcards[7].id,
			},
			{
				idUser: insertedusers[2].id,
                idLevel: insertedlevels[1].id,
                idFlashcard: insertedflashcards[8].id,
			},
		]

        await db.insert(revisionsTable).values(seedRevisions).returning()

        console.log('Database seeded successfully')
		console.log('email : ', insertedusers[0].email)
		console.log('password: password')

    } catch (error) {
        console.log('Error seeding database', error)
    }
}

seed()

//dankmono

/*
{
  "email": "racletterose@gmail.com",
  "password": "raclette123"
}*/
// seeding code