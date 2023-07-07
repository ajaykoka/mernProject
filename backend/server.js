const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login')
const db = require('./db');
const dotenv = require('dotenv');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors()); // Enable CORS for all routes

app.use('/register', registerRoute); // register api

app.use('/login', loginRoute); // login api

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
