import express from 'express';
import pinoHttp from 'pino-http';
import { db } from '@db';
import { todosRoutes, MySqlTodoRepository } from '@todos';

const pino = pinoHttp();

const app = express();
app.use(express.json());
app.use(pino);

// Repositories
const todoRepository = new MySqlTodoRepository(db);

// Register the routes
todosRoutes(app, todoRepository);

const port = 8080;

app.listen(port, () => {
    pino.logger.info(`Server running at http://localhost:${port}`);
});