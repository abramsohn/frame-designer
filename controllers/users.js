// DEPENDENCIES //
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// MODEL //
const User = require('../models/user.js')

// ROUTES //

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
        if (error && error.code == "11000") {
            res.render('layout/index.ejs', {
                currentUser: req.session.currentUser,
                template: 'users/new.ejs',
                flash: 'This username in already take, please try a diffrent one'
            });
        } else if (error) {
            res.render('layout/index.ejs', {
                currentUser: req.session.currentUser,
                template: 'users/new.ejs',
                flash: 'that\'s embarrassing... something went wrong on our end. Plase try again'
            }); 
            
        } else {
            res.render('layout/index.ejs', {
                currentUser: req.session.currentUser,
                template: 'sessions/new.ejs',
                flash: 'Welcome! Please log in'
            }); 
        }
    });
});

// TODO show
// TODO edit
// TODO update
// TODO desrtoy

module.exports = router;
