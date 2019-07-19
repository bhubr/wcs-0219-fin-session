const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('../db');

const randomUserUrl = 'https://api.randomuser.me/';

const formatUser = ({
  email,
  login: { password },
  name: { first, last },
  location: { street, postcode },
  phone,
  picture: { large: avatar }
}) => {
  const subscribe = Math.random() > 0.5;
  return [email, password, first, last, street, postcode, phone, avatar, subscribe];
};

const seedUsers = async (count = 5) => {
  try {
    const res = await axios.get(
      `${randomUserUrl}?results=${count}&nat=fr`
    );
    const { results } = res.data;
    const formattedUsers = results.map(formatUser);
    await db.queryAsync(
      `INSERT INTO user
        (email, password, firstname, lastname, address, postcode, phone, avatar, subscribe_newsletter)
      VALUES ?`,
      [formattedUsers]
    );
    process.exit();
  } catch(err) {
    console.error(err);
    console.error(err.sql);
    process.exit(1);
  }
};

seedUsers();
