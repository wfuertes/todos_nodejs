import express from 'express';
import pinoHttp from 'pino-http';
import { db } from '@db';
import { todosRoutes, MySqlTodoRepository } from '@todos';
import { engine } from 'express-handlebars';

import { DateTimeFormatter, nativeJs } from '@js-joda/core';

const pino = pinoHttp();
const app = express();
app.use(express.json());
app.use(pino);

// Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Repositories
const todoRepository = new MySqlTodoRepository(db);

// Register API routes
app.use('/api/todos', todosRoutes(todoRepository));

// Register Web routes
app.get('/', async (req, res) => {
    const { page = '0', size = '10' } = req.query;
    const _page = parseInt(page as string, 10); 
    const _size = parseInt(size as string, 10);

    const todosPage = await todoRepository.getAll({ page: _page, size: _size });
    res.render('index', { 
        title: 'Todos', 
        todos: todosPage.items.map(todo => {
            const formatter = DateTimeFormatter.ofPattern('yyyy-MM-dd');
            const date = nativeJs(todo.date).format(formatter);
            const createdAt = nativeJs(todo.createdAt).format(formatter);
            const completedAt = todo.completedAt ? nativeJs(todo.completedAt).format(formatter) : null;
            return {
                ...todo,
                date,
                createdAt,
                completedAt
            };
        }),
        currentPage: todosPage.page,
        totalPages: todosPage.totalPages,
        pageSize: todosPage.size,
        hasPrevPage: todosPage.page > 0,
        hasNextPage: todosPage.page < todosPage.totalPages - 1,
        prevPage: todosPage.page - 1,
        nextPage: todosPage.page + 1
    });
});

const port = 8080;

app.listen(port, () => {
    pino.logger.info(`Server running at http://localhost:${port}`);
});