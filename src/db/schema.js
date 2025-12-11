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
    
    admin: integer({mode : 'boolean'}).notNull(),
})

export const collectionsTable = sqliteTable('collection', {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),

    idUser: text('id_user').references(() => usersTable.$inferInsert.id, { onDelete: 'cascade'}),

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

    idCollection: text('id_collection').references(() => collectionsTable.$inferInsert.id, { onDelete: 'cascade'}),

    front: text().notNull(),

    back: text().notNull(),

    description: text(),

    urlFront: text('url_front'),

    urlBack: text('url_back'),
    
    visibility: text({enum : ['public', 'prive']})
                .notNull()
                .default('prive'),
})

export const levelsTable = sqliteTable('level', {
    id: integer()
        .primaryKey(),

    revisionPeriod: integer('revision_period').notNull(),
})

export const revisionTable = sqliteTable('revision', {

    idUser: text('id_user').references(() => usersTable.$inferInsert.id, { onDelete: 'cascade'}).primaryKey(),

    idLevel: text('id_level').references(() => levelsTable.$inferInsert.id, { onDelete: 'cascade'}).primaryKey(),

    idFlashcard: text('id_flashcard').references(() => flashcardsTable.$inferInsert.id, { onDelete: 'cascade'}).primaryKey(),

    latestDate: integer('latest_date', {mode: 'timestamp'})
                .notNull()
                .$defaultFn(() => new Date()),
})