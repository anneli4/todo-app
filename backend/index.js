const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serveeri React build kausta
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API päringud
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

// Kui API päringut ei ole, saada Reacti buildi index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});