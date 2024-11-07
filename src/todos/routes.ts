import { ulid } from 'ulid'
import { Express } from 'express';
import { Todo } from '@todos/types';
import { TodoRepository } from '@todos/repo/TodoRepository';

export function todosRoutes(app: Express, repository: TodoRepository) {
    app.get('/todos', async (req, res) => {
        const todos = await repository.getAll();
        res.json(todos);
    });

    app.post('/todos', async (req, res) => {
        const { text, date } = req.body;
        const todo: Todo = {
            id: ulid(),
            text,
            date: new Date(date),
            createdAt: new Date(),
            completedAt: null,
        };
        await repository.add(todo);
        res.status(201).json(todo);
    });

    app.delete('/todos/:id', async (req, res) => {
        const { id } = req.params;
        await repository.delete(id);
        res.json({ message: 'Todo deleted' });
    });
}