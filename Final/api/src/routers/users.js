const express = require('express')
const cookieParser = require('cookie-parser');
const router = express.Router({ mergeParams: true })

router.use(cookieParser());
router.use(express.json());
const { TokenMiddleware } = require('../middleware/TokenMiddleware');
const UserDAO = require('../db/UserDAO');
const GameDAO = require('../db/GameDAO');

//Update user info
router.put('/update/:userId', (req,  res) => {
    //TODO Add update user functionality (change username & innapropriate content settings)
    res.json({message: `Updated user: ${req.params.userId} with ${req.body.username}`});
});

//Get current user
router.get('/current', TokenMiddleware, (req,  res) => {
  res.json(req.user);
});

//Get a specific user
router.get('/id/:userId', TokenMiddleware, (req,  res) => {
  if(req.params.userId) {
    UserDAO.getSpecificUser(req.params.userId).then(user => {
      console.log(user);
      res.json(user);
    }).catch(err => {
      res.status(err.code || 500).json({error: err.message});
    });
  }
  else {
    res.status(400).json({error: 'Credentials not provided'});
  }
});

//Search for a user with a given username
router.get('/name/:username', TokenMiddleware, (req,  res) => {
  if(req.params.username) {
    UserDAO.searchForUser(req.params.username).then(user => {
      console.log(user);
      res.json({id: user.id});
    }).catch(err => {
      res.status(err.code || 500).json({error: err.message});
    });
  }
  else {
    res.status(400).json({error: 'Credentials not provided'});
  }
});

module.exports = router