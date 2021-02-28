const bcrypt = require('bcrypt');
const password = bcrypt.hashSync('password', bcrypt.genSaltSync(10));

const seed = [
    {
      username: 'user1',
      password: password,
    },
    {
      username: 'user2',
      password: password,
    }
  ];

module.exports = seed;