const User = require('../models/user');

const user1 = User.find({username: 'user1'});
const user2 = User.find({username: 'user2'});

const seed = [
    {
      userId: user1._id,
      title: 'Amazong Art',
      height: 10,
      width: 10
    },
    {
      userId: user1._id,
      title: 'Super Duper',
      height: 24,
      width: 30
    },
    {
      userId: user2._id,
      title: 'A good painting',
      height: 28,
      width: 100
    }
  ]

module.exports = seed;