const express = require('express')
const cookieParser = require('cookie-parser');
const router = express.Router({ mergeParams: true })

router.use(cookieParser());
router.use(express.json());
const { TokenMiddleware } = require('../middleware/TokenMiddleware');
const UserDAO = require('../db/UserDAO');
const GameDAO = require('../db/GameDAO');

//Update user info
router.put('/update/:username', TokenMiddleware, (req,  res) => {
    if (req.user && req.params.username)
        UserDAO.updateUser(req.user.id, req.params.username).then(status => {
        req.user.username = req.params.username;
        res.json({status: status});
    }).catch(err => {
        console.log(err);
      res.status(err.code || 500).json({error: err.message});
    });
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