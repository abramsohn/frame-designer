const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
    title: String,
    height: Number,
    width: Number
})

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;