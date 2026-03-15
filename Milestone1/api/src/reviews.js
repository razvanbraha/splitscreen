const express = require('express')
const router = express.Router({ mergeParams: true })

//Post new review
app.post('/', (req,  res) => {
  res.json({message: `Review Created!`});
});

//Update existing review
app.put('/:reviewId', (req,  res) => {
  res.json({message: `Review ${req.params.reviewId} updated.`});
});

//Get existing review 
app.get('/:reviewId', (req,  res) => {
  res.json({message: `Review ${req.params.reviewId} deleted.`});
});

//Get all reviews posted by a user
app.get('/user/:userId', (req,  res) => {
  res.json({message: `${req.params.userId}'s reviews served`});
});

//Get all reviews for a game
app.get('/game/:gameId', (req,  res) => {
  res.json({message: `Review for ${req.params.gameId} served`});
});

//Delete existing review
app.delete('/:reviewId', (req,  res) => {
  res.json({message: `Review ${req.params.reviewId} deleted.`});
});

module.exports = router