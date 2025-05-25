const express = require("express");
const cors = require("cors");
const app = express();

// App Platform annab PORT-i läbi keskkonnamuutuja
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
    const { text } = req.body;
    const todo = { id: Date.now(), text };
    todos.push(todo);
    res.status(201).json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id != id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});