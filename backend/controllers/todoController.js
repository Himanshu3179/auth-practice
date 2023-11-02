const Todo = require("../models/Todo");
const User = require("../models/User");
const asyncHandler = require('express-async-handler');

// new todo

exports.createTodo = asyncHandler(async (req, res) => {
    const user = req.user
    const { title } = req.body;
    if (!title) {
        res.status(400);
        throw new Error("Please enter a title");
    }
    const todo = new Todo({
        title,
        user: user._id
    })
    const createdTodo = await todo.save()
    user.todos.push(createdTodo._id)
    await user.save()


    res.status(201).json({
        message: "Todo created successfully",
        data: createdTodo
    })
});

exports.getTodos = asyncHandler(async (req, res) => {
    const user = req.user
    // get todo in descending order
    const todos = await Todo.find({ user: user._id }).sort({ createdAt: -1 })
    res.json(todos)
});

exports.getTodoById = asyncHandler(async (req, res) => {
    const user = req.user
    const todo = await Todo.findById(req.params.id)
    if (todo) {
        if (todo.user.toString() === user._id.toString()) {
            res.json(todo)
        } else {
            res.status(401)
            throw new Error("Not authorized")
        }
    } else {
        res.status(404)
        throw new Error("Todo not found")
    }
}
);

exports.updateTodo = asyncHandler(async (req, res) => {
    const user = req.user;
    const todo = await Todo.findById(req.params.id);
    if (todo) {
        if (todo.user.toString() === user._id.toString()) {
            todo.title = req.body.title || todo.title
            todo.completed = req.body.completed
            const updatedTodo = await todo.save()
            res.json(updatedTodo)
        } else {
            res.status(401)
            throw new Error("Not authorized")
        }
    } else {
        res.status(404)
        throw new Error("Todo not found")
    }
}
);

exports.deleteTodo = asyncHandler(async (req, res) => {
    const user = req.user
    const todo = await Todo.findById(req.params.id)
    if (todo) {
        if (todo.user.toString() === user._id.toString()) {
            await User.updateOne({ _id: user._id }, { $pull: { todos: todo._id } })
            await todo.deleteOne()
            res.json({ message: "Todo removed" })

        } else {
            res.status(401)
            throw new Error("Not authorized")
        }
    } else {
        res.status(404)
        throw new Error("Todo not found")
    }
}
);

