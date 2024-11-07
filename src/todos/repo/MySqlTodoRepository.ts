import { Todo, TodoRepository } from "@todos";
import { todosTable } from "@db/schema";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

export class MySqlTodoRepository implements TodoRepository {

    private readonly db: MySql2Database;
    
    constructor(db: MySql2Database) {
        this.db = db;
    }

    public getAll(): Promise<Todo[]> {
        return this.db.select().from(todosTable).execute();
    }

    public add(todo: Todo): Promise<void> {
        this.db.insert(todosTable).values(todo).execute();
        return Promise.resolve();
    }

    public delete(id: string): Promise<void> {
        this.db.delete(todosTable).where(eq(todosTable.id, id)).execute();
        return Promise.resolve();
    }
}