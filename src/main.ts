import express from 'express';
import { db } from '@db';
import { todosRoutes, MySqlTodoRepository } from '@todos';

const app = express();
app.use(express.json());

// Repositories
const todoRepository = new MySqlTodoRepository(db);

// Register the routes
todosRoutes(app, todoRepository);

const port = 8080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});