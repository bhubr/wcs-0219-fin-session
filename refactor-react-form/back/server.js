const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const genericRouter = require('./routes/generic');

const app = express();
app.use(bodyParser.json());

app.use('/api/users', genericRouter('user'));

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('server listening');
});
