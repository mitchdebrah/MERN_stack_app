const express = require('express')
const movies = express.Router()

const Movie = require('../models/movies.js')

// curl 'http://localhost:3003/movies'
movies.get('/', (req, res) => {
    Movie.find({}, (err, foundMovies) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(foundMovies)
    })
  })


// CREATE
// curl -X POST -H "Content-Type: application/json" -d '{"name":"world kindness"}' 'http://localhost:3003/movies'

movies.post('/', async (req, res) => {
    Movie.create(req.body, (error, createdMovie) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).send(createdMovie) 
    })
})
//DELETE
// curl -X DELETE 'http://localhost:3003/movies/id' (replace the id with the id from your curl request)
movies.delete('/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json({
          'deleted_movie': deletedMovie
      })
    })
})

// UPDATE
//   curl -X PUT -H "Content-Type: application/json" -d '{"title":"I updated this"}' 'http://localhost:3003/movies/5cc738d41f84cd0a2e1225bb'
  movies.put('/:id', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMovie) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedMovie)
    })
  })

  module.exports = movies
