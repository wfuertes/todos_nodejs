import { Todo } from "@todos/types";

export interface TodoRepository {
    getAll(): Promise<Todo[]>;
    add(todo: Todo): Promise<void>;
    delete(id: string): Promise<void>;
}