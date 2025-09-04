const express = require('express');
const { connectDB } = require('./config/database');
const { Todo } = require('./model/Todo');

const todos = []

const app = express()

app.use(express.json());

app.use('/todos', (req, res) => {
    res.send("Todos",todos)
    console.log("Todos",todos);
});

app.use("/addTodos", (req, res) => {
    const newTodo = new Todo(req.body);
    todos.push(newTodo);
    res.status(201).send("Todo added");
    console.log("Todo added", newTodo);
});

app.use("/deleteTodos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    deletedTodo = todos.find(todo => todo.id === id);
    res.send("Todo deleted");
    console.log("deleted Todo", deletedTodo);
});

app.use("/updateTodos/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    let updatedTodo = todos.find(todo => todo.id === id);
    if (updatedTodo) {
        Object.assign(updatedTodo, updatedData);
        res.send("Todo updated");
        console.log("updated Todo", updatedTodo);
    } else {
        res.status(404).send("Todo not found");
    }
})

connectDB().then(() => {
    console.log("Database connected !");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}).catch((error) => {
    console.error("Database connection failed:", error);
});