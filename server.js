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
const User = require('./models/user');

// CONTROLLERS //
const artworksController = require('./controllers/artworks');
app.use('/artworks', artworksController);

const usersController = require('./controllers/users');
app.use('/users', usersController);

// ROUTES //
// root
app.get('/', (req, res) => {
    res.redirect('/artworks');
});

app.listen(3000, () => {
    console.log('Express listening at', PORT);
});

