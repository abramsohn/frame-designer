// DEPENDENCIES //
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

// CONFIGURATION //
const app = express();

// DATABASE SETTINGS //
const db = mongoose.connection;
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODBURI + process.env.DBNAME;

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
Artwork = require('./models/artwork');

// CONTROLLERS //

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
// ROUTES //
// root
app.get('/', (req, res) => {
    res.redirect('/artworks');
});

// index
app.get('/artworks', (req, res) => {
    res.render('index.ejs');
});

// new
app.get('/artworks/new', (req, res) => {
    res.render('new.ejs');
});

// create
app.post('/artworks', (req, res) => {
    res.send('create#post');
});

// show
app.get('/artworks/:id', (req, res) => {
    res.render('show.ejs');
});

// edit
app.get('/artworks/:id/edit', (req, res) => {
    res.render('edit.ejs');
});

// update
app.put('/artworks/:id', (req, res) => {
    res.send('update#put');
});

// destroy
app.delete('/artworks/:id', (req, res) => {
    res.send('destroy#delete');
});


app.listen(3000, () => {
    console.log('Express listening at', PORT);
});

