// DEPENDENCIES //
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



// MODEL //
const User = require('../models/user');
const Artwork = require('../models/artwork.js');

// DATA
const userSeed = [
    { username: 'user1', password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)) },
    { username: 'user2', password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)) }
];

const artworkSeed = [
    { user: null, title: 'Fragment of Kinetic Dimension', height: 8, width: 10, borders: 20 },
    { user: null, title: 'Feeling with Shape', height: 24, width: 30, borders: 50 },
    { user: null, title: 'Vision of Falling Larque', height: 40, width: 50, borders: 10 },
    { user: null, title: 'Scene with Shimmering Sentiment', height: 28, width: 100, borders: 67 },
    { user: null, title: 'Contrast of Fear 11-18th April', height: 48, width: 96, borders: 0 },
    { user: null, title: 'Mediterranean Appendix', height: 60, width: 75, borders: 84 },
    { user: null, title: 'Faust & Purpose', height: 100, width: 150, borders: 45 },
    { user: null, title: 'Reality or Image', height: 11, width: 14, borders: 54 },
    { user: null, title: 'Sphere and Joy', height: 30, width: 40, borders: 14 },
    { user: null, title: 'Limestone Post Detaching the Composition', height: 28, width: 34, borders: 80 }
];

function linkUsersAndArtWork(users, artwork) {
    artwork.forEach(peice => {
        peice.user = users[Math.floor(Math.random() * users.length)]
    })
};

// ROUTES
// seed
router.get('/', (req, res) => {
    User.create(userSeed, (error, createdUsers) => {
        linkUsersAndArtWork(createdUsers, artworkSeed);
        Artwork.create(artworkSeed, (error, createdArtwork) => {
            res.redirect('/');
        });
    });
});

module.exports = router;