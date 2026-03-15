const express = require('express')
const router = express.Router({ mergeParams: true })

//Add new friend
app.post('/', (req,  res) => {
  res.json({message: `Friend Added`});
});

//Get a user's friends
app.get('/:userId', (req,  res) => {
  res.json({message: `${req.params.userId}'s friends served`});
});

//Remove a friend
app.get('/:userId/friendId', (req,  res) => {
  res.json({message: `${req.params.friendId} removed from ${req.params.userId}'s friends list`});
});


module.exports = router