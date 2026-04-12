const express = require('express')
const cookieParser = require('cookie-parser');
const router = express.Router({ mergeParams: true })
const UserDAO = require('../db/UserDAO');

router.use(cookieParser());
router.use(express.json());
const { TokenMiddleware } = require('../middleware/TokenMiddleware');

//Add new friend
router.post('/', TokenMiddleware, (req,  res) => {
  res.json({message: `Friend Added`});
});

//Get a user's friends
router.get('/:userId', TokenMiddleware, (req,  res) => {
  res.json({message: `${req.params.userId}'s friends served`});
});

//Remove a friend
router.get('/:userId/friendId', TokenMiddleware, (req,  res) => {
  res.json({message: `${req.params.friendId} removed from ${req.params.userId}'s friends list`});
});


module.exports = router