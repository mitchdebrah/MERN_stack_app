const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3003
const MONGODBURI = process.env.MONGODBURI || 'mongodb://localhost:27017/stuffILike';

app.use(express.json());

mongoose.connect(MONGODBURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false
})

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo :)')
})

const whitelist = ['http://localhost:3000', 'https://sleepy-tor-42367.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

const songsController = require('./controllers/songs.js')
const moviesController = require('./controllers/movies.js')

app.use('/songs/', songsController)
app.use('/movies/', moviesController)

app.get('/', (req, res) => {
  res.send('server up')
})

app.listen(PORT, () => {
    console.log('listening on', PORT)
  })