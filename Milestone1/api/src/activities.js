const express = require('express')
const router = express.Router({ mergeParams: true })


//Create new activity
router.post('/', (req,  res) => {
  res.json({message: `Activity Created!`});
});

//Get a user's activities
router.get('/:userId', (req,  res) => {
  res.json({message: `${req.params.userId}'s reviews served`});
});


module.exports = router