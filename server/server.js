const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let taskIdCounter = 1;

app.get('/tasks', (req, res) => {
  res.send(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, status, created } = req.body;
  if (title && status && created) {
    const newTask = { id: taskIdCounter++, title, status, created };
    tasks.push(newTask);
    res.send(newTask);
  } else {
    res.status(400).send({ message: 'Invalid task data' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index >= 0) {
    tasks.splice(index, 1);
    if (tasks.length === 0) {
      taskIdCounter = 1;
    }
    res.sendStatus(200);
  } else {
    res.status(404).send({ message: `Task ${taskId} not found` });
  }
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, status, updated } = req.body;
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.title = title || task.title;
    task.status = status || task.status;
    task.updated = updated || new Date();
    res.sendStatus(200);
  } else {
    res.status(404).send({ message: `Task ${taskId} not found` });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
