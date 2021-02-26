// DEPENDENCIES //
const express = require('express');
const router = express.Router();

// MODEL //
const Artwork = require('../models/artwork.js');

// seed 
const artworkSeed = require('../seeds/artwork.js')
router.get('/seed', (req, res) => {
    Artwork.create(artworkSeed, (error, data) => {
        res.redirect('artworks');
    });
});

// index
router.get('/', (req, res) => {
    Artwork.find({}, (error, allArtworks) => {
        res.render('artworks/index.ejs', {
            artworks: allArtworks,
        });
    });
});

// new
router.get('/new', (req, res) => {
    res.render('artworks/new.ejs');
});

// create
router.post('/', (req, res) => {
    Artwork.create(req.body, (error, createdArtwork) => {
        console.log(createdArtwork)
        res.redirect('/')
    });
});

// show
router.get('/:id', (req, res) => {
    Artwork.findById(req.params.id, (error, foundArtwork) => {
        res.render('artworks/show.ejs', {
            artwork: foundArtwork
        });
    });
});

// edit
router.get('/:id/edit', (req, res) => {
    Artwork.findById(req.params.id, (error, foundArtwork) => {
        res.render('artworks/edit.ejs', {
            artwork: foundArtwork
        })
    });
});

// update
router.put('/:id', (req, res) => {
    Artwork.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedArtwork) => {
        res.render('artworks/show.ejs', {
            artwork: updatedArtwork,
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