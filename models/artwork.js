const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
    title: { type: String, required: true },
    height: Number,
    width: Number
}, {timestamps: true})

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;