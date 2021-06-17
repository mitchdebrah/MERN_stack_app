const express = require('express')
const songs = express.Router()

const Song = require('../models/songs.js')

// curl 'http://localhost:3003/songs'
songs.get('/', (req, res) => {
    Song.find({}, (err, foundSongs) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(foundSongs)
    })
  })

// curl -X POST -H "Content-Type: application/json" -d '{"artist":"world kindness"}' 'https://sleepy-tor-42367.herokuapp.com/songs/'


songs.post('/', (req, res) => {
    Song.create(req.body, (error, createdSong) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).json(createdSong) 
    })
})

// curl -X DELETE 'http://localhost:3003/songs/id' (replace the id with the id from your curl request)
songs.delete('/:id', (req, res) => {
    Song.findByIdAndRemove(req.params.id, (err, deletedSong) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json({
          'deleted_song': deletedSong
      })
    })
})

//   curl -X PUT -H "Content-Type: application/json" -d '{"title":"I updated this"}' 'http://localhost:3003/songs/5cc738d41f84cd0a2e1225bb'
  songs.put('/:id', (req, res) => {
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedSong) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedSong)
    })
  })

module.exports = songs