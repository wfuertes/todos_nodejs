import { Todo, TodoRepository } from "@todos";

export class InMemoryTodoRepository implements TodoRepository {

    private readonly todos = new Map<string, Todo>();

    getAll(): Promise<Todo[]> {
        return Promise.resolve(Array.from(this.todos.values()));
    }

    add(todo: Todo): Promise<void> {
        this.todos.set(todo.id, todo);
        return Promise.resolve();
    }

    delete(id: string): Promise<void> {
        this.todos.delete(id);
        return Promise.resolve();
    }
}