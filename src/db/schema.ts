import { datetime, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const todosTable = mysqlTable('todos', {
    id: varchar({ length: 36 }).primaryKey(),
    text: varchar({ length: 255 }).notNull(),
    date: datetime().notNull(),
    createdAt: datetime().notNull(),
    completedAt: datetime(),
});
