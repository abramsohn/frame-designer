// DEPENDENCIES //
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
require('dotenv').config()

// CONFIGURATION //
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use( ( req, res, next ) => { // enables method overide on a tags
    if ( req.query._method == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }       
    next(); 
});

// DATABASE SETTINGS //
const db = mongoose.connection;
const PORT = process.env.PORT;
// const mongodbURI = process.env.MONGODBURI + process.env.DBNAME;
const mongodbURI = 'mongodb://localhost:27017/frameDesigner'

// conect to db
mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => ('connected to mongodb at', mongodbURI));

// db error handeling 
db.on('error', err => console.log(err.message + ' is mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MODELS //
const Artwork = require('./models/artwork');
const User = require('./models/user');

// CONTROLLERS //

// ROUTES //
// root
app.get('/', (req, res) => {
    res.redirect('/artworks');
});

// seed 
const artworkSeed = require('./seeds/artwork.js')
app.get('/artworks/seed', (req, res) => {
    Artwork.create(artworkSeed, (error, data) => {
        res.redirect('/artworks');
    });
});

// index
app.get('/artworks', (req, res) => {
    Artwork.find({}, (error, allArtworks) => {
        res.render('index.ejs', {
            artworks: allArtworks,
        });
    });
});

// new
app.get('/artworks/new', (req, res) => {
    res.render('new.ejs');
});

// create
app.post('/artworks', (req, res) => {
    Artwork.create(req.body, (error, createdArtwork) => {
        console.log(createdArtwork)
        res.redirect('/artworks')
    });
});

// show
app.get('/artworks/:id', (req, res) => {
    Artwork.findById(req.params.id, (error, foundArtwork) => {
        res.render('show.ejs', {
            artwork: foundArtwork
        });
    });
});

// edit
app.get('/artworks/:id/edit', (req, res) => {
    Artwork.findById(req.params.id, (error, foundArtwork) => {
        res.render('edit.ejs', {
            artwork: foundArtwork
        })
    });
});

// update
app.put('/artworks/:id', (req, res) => {
    console.log('+++++++++++', req.params);
    Artwork.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedArtwork) => {
        res.render('show.ejs', {
            artwork: updatedArtwork,
        });
    });
});

// destroy
app.delete('/artworks/:id', (req, res) => {
    Artwork.findByIdAndDelete(req.params.id, (error, deletedArtwork) => {
        res.redirect('/artworks')
    });
});

app.listen(3000, () => {
    console.log('Express listening at', PORT);
});

