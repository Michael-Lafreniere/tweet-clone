const express = require('express');
const assert = require('assert');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

const {
  NODE_ENV,
  HOST,
  PORT,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD
} = process.env;

// Verify we have all the data from the .env file we need:
assert(NODE_ENV, 'NODE_ENV value not found in .env file.');
assert(HOST, 'HOST value not found in .env file.');
assert(PORT, 'PORT value not found in .env file.');
assert(SQL_SERVER, 'SQL_SERVER value not found in .env file.');
assert(SQL_DATABASE, 'SQL_DATABASE value not found in .env file.');
assert(SQL_USER, 'SQL_USER value not found in .env file.');
assert(SQL_PASSWORD, 'SQL_PASSWORD value not found in .env file.');

//
// Setup the express server:
//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/public/views'));
app.set('port', PORT);
app.use(cors());
// app.use((req, res, next) => {
//   // Website you wish to allow to connect
//   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // Request methods you wish to allow
//   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Pass to next layer of middleware
//   next();
// });
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
//app.use(express.urlencoded());
// Check for production setup:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//
// Connect to MySQL DB:
//
const connection = mysql.createConnection({
  host: SQL_SERVER,
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DATABASE
});
// Check the connection:
connection.connect(error => {
  if (error) throw error;
  console.log(`Connected to ${SQL_DATABASE}`);
});
// Double check the connection:
// connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

//
// Handle the default route:
//
app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/chirps', (req, res) => {
  res.json({ message: 'chirp chirp!' });
});

const isValidChirp = data => {
  if (
    data.name &&
    data.name.toString().trim() !== '' &&
    data.chirp &&
    data.chirp.toString().trim() !== ''
  ) {
    return true;
  }
  return false;
};

app.post('/post', (req, res) => {
  if (isValidChirp(req.body)) {
    const chirp = {
      name: req.body.name.toString(),
      chirp: req.body.chirp.toString(),
      ip: req.ip.toString()
    };
    console.log('chirp:', chirp);
    req.setTimeout(0);
    res.status(200);
  } else {
    res.status(422).send({ message: 'Requires a name and a message.' });
  }
});

//
// Error handing needs to be after routes:
//
app.get('*', function(req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
  err.statusCode = 404;
  err.shouldRedirect = true; //New property on err so that our middleware will redirect
  next(err);
});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err

  if (err.shouldRedirect) {
    res.render('error', { status: err.statusCode, message: err.message }); // Renders a myErrorPage.html for the user
  } else {
    res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
  }
});

//
// Start the server:
//
app.listen(app.get('port'), HOST, () => {
  console.log(`tweet-clone listening on ${HOST}:${PORT}`);
});
