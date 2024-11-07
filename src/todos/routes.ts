import { ulid } from 'ulid'
import { Router } from 'express';
import { Todo } from '@todos/types';
import { TodoRepository } from '@todos/repo/TodoRepository';
import { PageableQuery } from '@db/types';


export function todosRoutes(repository: TodoRepository) {
    const router = Router();

    router.get('/', async (req, res) => {
        const { page = '0', size = '10' } = req.query;

        const query: PageableQuery = {
            page: parseInt(page as string, 10),
            size: parseInt(size as string, 10),
        };

        const todos = await repository.getAll(query);
        res.json(todos);
    });

    router.post('/', async (req, res) => {
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

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        await repository.delete(id);
        res.json({ message: 'Todo deleted' });
    });

    return router;
}