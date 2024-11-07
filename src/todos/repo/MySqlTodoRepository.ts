import { Todo, TodoRepository } from "@todos";
import { todosTable } from "@db/schema";
import { eq, count } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { Page, PageableQuery } from "@db/types";
import { PageUtils } from "@db/PageUtils";

export class MySqlTodoRepository implements TodoRepository {

    private readonly db: MySql2Database;

    constructor(db: MySql2Database) {
        this.db = db;
    }

    public async getAll(query: PageableQuery): Promise<Page<Todo>> {
        const total = await this.db.select({ count: count() }).from(todosTable).execute();
        const items = await this.db.select().from(todosTable).limit(query.size).offset(PageUtils.offset(query)).execute();
        const totalPages = Math.ceil(total[0].count / query.size);
        return { items, total: total[0].count, page: query.page, size: query.size, totalPages };
    }

    public async add(todo: Todo): Promise<void> {
        this.db.insert(todosTable).values(todo).execute();
    }

    public async delete(id: string): Promise<void> {
        this.db.delete(todosTable).where(eq(todosTable.id, id)).execute();
    }
}