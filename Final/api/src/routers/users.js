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
router.get('/:userId', TokenMiddleware, (req,  res) => {
  if(req.params.userId) {
    UserDAO.getSpecificUser(req.params.userId).then(user => {
      res.json({user: user});
    }).catch(err => {
      res.status(err.code || 500).json({error: err.message});
    });
  }
  else {
    res.status(400).json({error: 'Credentials not provided'});
  }
});


//Get a specific user's favorite games
router.get('/favorite/:userId', TokenMiddleware, (req,  res) => {
  if(req.params.userId) {
    UserDAO.getUserFavoriteGameIds(req.params.userId).then( async gameIds => {
      let games = [];
      for (let gameId of gameIds) {
        let game = await GameDAO.getGameById(gameId);
        if (game) games.push(game);
      }
      res.send(games);
    }).catch(err => {
      res.status(err.code || 500).json({error: err.message});
    });
  }
  else {
    res.status(400).json({error: 'Credentials not provided'});
  }
});

//Favorite a game
router.post('/favorite/:gameId', TokenMiddleware, (req,  res) => {
  if(req.user && req.params.gameId) {
    UserDAO.addFavoriteGame(req.user.id, req.params.gameId).then(status => {
        res.json({status: status});
    }).catch(err => {
      res.status(err.code || 500).json({error: err.message});
    });
  }
  else {
    res.status(400).json({error: 'Credentials not provided'});
  }
});

//Delete a favorite game
router.delete('/favorite/:gameId', TokenMiddleware, (req,  res) => {
  if(req.user && req.params.gameId) {
    UserDAO.removeFavoriteGame(req.user.id, req.params.gameId).then(status => {
        res.json({status: status});
    }).catch(err => {
      res.status(err.code || 500).json({error: err.message});
    });
  }
  else {
    res.status(400).json({error: 'Credentials not provided'});
  }
});



module.exports = router