// DEPENDENCIES //
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// MODEL //
const User = require('../models/user.js')

// ROUTES //
// seed
const userSeed = require('../seeds/user.js')
router.get('/seed', (req, res) => {
    User.create(userSeed, (error, data) => {
        res.redirect('/users');
    });
});

//index TODO: DEV ROUTE - DELETE
router.get('/', (req, res) => {
    User.find({}, (error, allUsers) => {
        res.render('layout/index.ejs', {
            users: allUsers,
            currentUser: req.session.currentUser,
            template: 'users/index.ejs',
        });
    });
});
// new
router.get('/new', (req, res) => {
    res.render('layout/index.ejs', {
        template: 'users/new.ejs',
        currentUser: req.session.currentUser
    });
});
// create
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        console.log(error)
        console.log(req.body)
        res.redirect('/')
    });
});

// TODO show
// TODO edit
// TODO update
// TODO desrtoy

module.exports = router;
