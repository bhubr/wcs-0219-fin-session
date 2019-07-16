const bcrypt = require('bcrypt');
const saltRounds = 20;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

console.log(hash);