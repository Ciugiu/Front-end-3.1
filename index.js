const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to our simple REST API!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//Open your browser and go to http://localhost:3000. 
// You should see the message "Welcome to our simple REST API!"

