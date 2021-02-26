const bcrypt = require('bcrypt');
const password = bcrypt.hashSync('password', bcrypt.genSaltSync(10));

const seed = [
    {
      name: 'user1',
      password: password,
    },
    {
      name: 'user2',
      password: password,
    }
  ];

module.exports = seed;