const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require('../controllers/todoController');

const todoRouter = express.Router();

todoRouter.get('/test', (req, res) => {
    res.json({ message: 'API running...' });
});

todoRouter
    .route('/')
    .get(authMiddleware, getTodos)
    .post(authMiddleware, createTodo)

todoRouter
    .route('/:id')
    .get(authMiddleware, getTodoById)
    .put(authMiddleware, updateTodo)
    .delete(authMiddleware, deleteTodo)





module.exports = todoRouter;