// DEPENDENCIES //
const express = require('express');
const app = express();

// CONFIGURATION //

// MIDDLEWARE

// DATABASE SETTINGS //

// MODELS //

// CONTROLLERS //

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
    console.log('Express listening');
});

