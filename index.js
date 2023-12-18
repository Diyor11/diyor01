const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())

app.locals.list = []; // Array to store the list data

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/add', (req, res) => {
  const { text, date } = req.body;
  
  const id = new Date(); // Get the current timestamp
  const newItem = { text: text, date, id: Date.now() }; // Create a new item with the text and timestamp
  // Store the new item in the list
  app.locals.list.push(newItem);
  res.send('ok');
});

app.get('/list', (req, res) => {
  res.json(app.locals.list);
});


app.delete('/list/:id', (req, res) => {
  const { id } = req.params;
  // Find the index of the item with the given timestamp
  const index = app.locals.list.findIndex(item => item.id == id);
  
  if (index !== -1) {
    // Remove the item from the list
    app.locals.list.splice(index, 1);
    res.sendStatus(204); // Return a success status code (204 No Content)
  } else {
    res.sendStatus(404); // Return a not found status code (404 Not Found)
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});