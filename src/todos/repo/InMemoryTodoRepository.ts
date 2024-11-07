import { PageUtils } from "@db/PageUtils";
import { Page, PageableQuery } from "@db/types";
import { Todo, TodoRepository } from "@todos";

export class InMemoryTodoRepository implements TodoRepository {

    private readonly todos = new Map<string, Todo>();

    public async getAll(query: PageableQuery): Promise<Page<Todo>> {
        const items = Array.from(this.todos.values());
        const start = PageUtils.offset(query);
        const end = start + query.size;
        const total = items.length;
        const page = items.slice(start, end);
        const totalPages = Math.ceil(total / query.size);
        return Promise.resolve({ items: page, total, page: query.page, size: query.size, totalPages });
    }

    public async add(todo: Todo): Promise<void> {
        this.todos.set(todo.id, todo);
        return Promise.resolve();
    }

    public async delete(id: string): Promise<void> {
        this.todos.delete(id);
        return Promise.resolve();
    }
}