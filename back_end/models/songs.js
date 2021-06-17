const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
  artist: {type: String, required: true},
  song: {type: String, required: true},
})

module.exports = mongoose.model('Song', songSchema)