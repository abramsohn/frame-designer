// DEPENDENCIES //
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

// CONFIGURATION //
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, './public')))

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// enables DELETE method overide on anchor tags
app.use( ( req, res, next ) => { 
    if ( req.query._method == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }       
    next(); 
});

// DATABASE SETTINGS //
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODBURI || 'mongodb://localhost:27017/frameDesigner'

// conect to db
mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => ('connected to mongodb at', mongodbURI));

// db error handeling 
db.on('error', err => console.log(err.message + ' check database connection'));
db.on('disconnected', () => console.log('mongo disconnected'));

// start connection to mongo
db.on('open' , ()=>{});

// MODELS //
const User = require('./models/user');

// CONTROLLERS //
const artworksController = require('./controllers/artworks');
app.use('/artworks', artworksController);

const usersController = require('./controllers/users');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

//SEED
const Seed = require('./seeds/seed');
app.use('/seed', Seed);

// ROUTES //
// root
app.get('/', (req, res) => {
    res.render('layout/index.ejs', {
        currentUser: req.session.currentUser,
        template:'homepage/homepage.ejs',
    });
});

app.listen(PORT, () => {
    console.log('Express listening at', PORT);
});
