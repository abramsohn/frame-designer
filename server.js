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
    res.send('root#get');
});

// index
app.get('/artworks', (req, res) => {
    res.send('index#get');
});

// new
app.get('/artworks/new', (req, res) => {
    res.send('new#get');
});

// create
app.post('/artworks', (req, res) => {
    res.send('create#post');
});

// show
app.get('/artworks/:id', (req, res) => {
    res.send('root#get');
});

// edit
app.get('/artworks/:id/edit', (req, res) => {
    res.send('root#get');
});

// update
app.put('/artworks/:id', (req, res) => {
    res.send('update#get');
});

// destroy
app.delete('/artworks/:id', (req, res) => {
    res.send('root#get');
});


app.listen(3000, () => {
    console.log('Express listening');
});

