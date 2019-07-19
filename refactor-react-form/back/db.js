const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

Promise.promisifyAll(connection);

connection.connectAsync()
  .then(() => console.log('connection established', connection.threadId))
  .catch((err) => {
    console.log('connection error', err);
  });

module.exports = connection;
