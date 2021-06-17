const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  year: {type: Number, required: true},
  director:{type: String, required: true},
  category:{type:String, required: true} 
})

module.exports = mongoose.model('Movie', movieSchema);