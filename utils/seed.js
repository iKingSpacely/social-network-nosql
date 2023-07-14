const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernames, email } = require('./data')

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('Connected to the database');

  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      username: usernames[i],
      email: email[i],
    });
  }

  await User.insertMany(users);
});
