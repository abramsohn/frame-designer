// DEPENDENCIES //
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// MODELS
const User = require('../models/user');

// ROUTES
// new
router.get('/new', (req, res) => {
    console.log(req.session.currentUser)
    res.render('layout/index.ejs', {
        template: 'sessions/new.ejs',
        currentUser: req.session.currentUser
    });
});

//post (sign-in)
router.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (error, foundUser) => {
        if (error) { // Database error
            res.send('There was a thechnical problem') // TODO: handle error better
        } else if (!foundUser) {
            res.send ('no user found') // TODO: Handle error better
        } else { // if user is found
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/artworks');
            } else {
                res.send('username and password did not match'); // TODO: Handle error better
            }
        }
    });   
});

// destroy (signout)
router.delete('/', (req, res) => {
    req.session.destroy( () => {
        res.redirect('/');
    });
});


module.exports = router;
