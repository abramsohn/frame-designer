const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    height: Number,
    width: Number,
    borders: Number,
    frameMolding: Number,
    resolution: Number,
    preview: String,
})

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;