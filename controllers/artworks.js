// DEPENDENCIES //
const express = require('express');
const router = express.Router();

// MODEL //
const Artwork = require('../models/artwork.js');

// index
router.get('/', (req, res) => {
    Artwork.find({user: req.session.currentUser}, (error, allArtworks) => {
        res.render('layout/index.ejs', {
            artworks: allArtworks,
            currentUser: req.session.currentUser,
            template: 'artworks/index.ejs',
        });
    });
});

// new
router.get('/new', (req, res) => {
    res.render('layout/index.ejs', {
        template: 'artworks/new.ejs',
        currentUser: req.session.currentUser,
    });
});

// create
router.post('/', (req, res) => {
    req.body.user = req.session.currentUser;
    Artwork.create(req.body, (error, createdArtwork) => {
        console.log(createdArtwork)
        res.redirect('/artworks')
    });
});

// show
router.get('/:id', (req, res) => {
    Artwork.findById(req.params.id, (error, foundArtwork) => {
        res.render('layout/index.ejs', {
            artwork: foundArtwork,
            currentUser: req.session.currentUser,
            template: 'artworks/show.ejs',
        });
    });
});

// edit
router.get('/:id/edit', (req, res) => {
    Artwork.findById(req.params.id, (error, foundArtwork) => {
        res.render('layout/index.ejs', {
            artwork: foundArtwork,
            currentUser: req.session.currentUser,
            template: 'artworks/edit.ejs',
        })
    });
});

// update
router.put('/:id', (req, res) => {
    Artwork.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedArtwork) => {
        res.render('layout/index.ejs', {
            artwork: updatedArtwork,
            currentUser: req.session.currentUser,
            template: 'artworks/show.ejs',
        });
    });
});

// destroy
router.delete('/:id', (req, res) => {
    Artwork.findByIdAndDelete(req.params.id, (error, deletedArtwork) => {
        res.redirect('/')
    });
});

module.exports = router;