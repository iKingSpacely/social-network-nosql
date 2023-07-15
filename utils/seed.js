const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { usernames, email } = require('./data')

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('Connected to the database');

  await Thoughts.deleteMany({});
  await User.deleteMany({});

  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      username: usernames[i],
      email: email[i],
    });
  }

  await User.insertMany(users);
  process.exit(0);
});

  //IDK WHY THE BELOW WONT GENERATE RANDOM THOUGHTS FOR ME SO I COMMENTED IT OUT
  // for (let i = 0; i < 10; i++) {
  //   const user = user[i];
  //   const thoughts = [];
  //   const randomThoughts = Math.floor(Math.random() * 3) + 3;

  //   for (let j = 0; j < randomThoughts; j++) {
  //     thoughts.push({
  //       thoughtText: `Thought ${j + 1} by ${user.username}`,
  //       username: user.username,
  //       reactions: []
  //     });
  //   }
  //   await Thoughts.insertMany(thoughts);
  // }