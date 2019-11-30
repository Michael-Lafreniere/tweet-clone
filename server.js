const express = require('express');
const assert = require('assert');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

const {
  HOST,
  PORT,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD
} = process.env;

assert(HOST, 'HOST value not found in .env file.');
assert(PORT, 'PORT value not found in .env file.');
assert(SQL_SERVER, 'SQL_SERVER value not found in .env file.');
assert(SQL_DATABASE, 'SQL_DATABASE value not found in .env file.');
assert(SQL_USER, 'SQL_USER value not found in .env file.');
assert(SQL_PASSWORD, 'SQL_PASSWORD value not found in .env file.');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/public/views'));
app.set('port', PORT);
app.use(express.json());
//app.use(express.static(path.join(__dirname + '/public')));

//
// Connect to MySQL DB:
//
const connection = mysql.createConnection({
  host: SQL_SERVER,
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DATABASE
});

connection.connect(error => {
  if (error) throw error;
  console.log(`Connected to ${SQL_DATABASE}`);
});
// Double check the connection:
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

app.get('/', (req, res, next) => {
  res.render('index', {});
});

//
// Error handing needs to be after routes:
//
app.use((req, res, next) => {
  const error = new Error('Page not found.');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { status: err.status, message: err.message });
});

//
// Start the server:
//
app.listen(app.get('port'), HOST, () => {
  console.log(`tweet-clone listening on ${HOST}:${PORT}`);
});
