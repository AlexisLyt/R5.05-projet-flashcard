import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';

export const usersTable = sqliteTable('user', {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    
    email: text().notNull().unique(),

    firstName: text('first_name', { length: 30 }).notNull(),

    lastName: text('last_name', { length: 30 }).notNull(),

    password: text({ length: 255 }).notNull(),

    createdAt: integer('created_at', {mode: 'timestamp'})
                .notNull()
                .$defaultFn(() => new Date()),
    
    admin: integer({mode : 'boolean'}).notNull().default(false),
})

export const collectionsTable = sqliteTable('collection', {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),

    idUser: text('id_user').references(() => usersTable.id, { onDelete: 'cascade'}),

    title: text({ length: 255 }).notNull(),

    description: text(),
    
    visibility: text({enum : ['public', 'prive']})
                .notNull()
                .default('prive'),
})

export const flashcardsTable = sqliteTable('flashcard', {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),

    idCollection: text('id_collection').references(() => collectionsTable.id, { onDelete: 'cascade'}),

    front: text().notNull(),

    back: text().notNull(),

    urlFront: text('url_front'),

    urlBack: text('url_back'),
})

export const levelsTable = sqliteTable('level', {
    id: integer()
        .primaryKey(),

    revisionPeriod: integer('revision_period').notNull(),
})

export const revisionsTable = sqliteTable('revision', {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),

    idUser: text('id_user').references(() => usersTable.id, { onDelete: 'cascade'}).notNull(),

    idLevel: integer('id_level').references(() => levelsTable.id, { onDelete: 'cascade'}).notNull(),

    idFlashcard: text('id_flashcard').references(() => flashcardsTable.id, { onDelete: 'cascade'}).notNull(),

    latestDate: integer('latest_date', {mode: 'timestamp'})
                .notNull()
                .$defaultFn(() => new Date()),
})