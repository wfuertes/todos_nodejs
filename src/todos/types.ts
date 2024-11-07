import { todosTable } from '@db/schema';

export type Todo = typeof todosTable.$inferSelect;