import { Page, PageableQuery } from "@db/types";
import { Todo } from "@todos/types";

export interface TodoRepository {
    getAll(query: PageableQuery): Promise<Page<Todo>>;
    add(todo: Todo): Promise<void>;
    delete(id: string): Promise<void>;
}