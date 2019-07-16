const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.get('/', (req, res) => res.send('Hello world'));

app.get('/signup', (req, res) => {
  // NEVER do this
  const { email, password } = req.query;
  const saltRounds = 20;
  const hash = bcrypt.hashSync(password, saltRounds);
  res.send(hash);
});

app.listen(5000);