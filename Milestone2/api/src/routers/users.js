const express = require('express')
const cookieParser = require('cookie-parser');
const router = express.Router({ mergeParams: true })

router.use(cookieParser());
router.use(express.json());
const { TokenMiddleware } = require('../middleware/TokenMiddleware');

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
  console.log("USER HERE");
  if(req.params.userId) {
    UserDAO.getSpecificUser(req.body.username).then(user => {
      res.json({user: user});
    }).catch(err => {
      res.status(err.code || 500).json({error: err.message});
    });
  }
  else {
    res.status(400).json({error: 'Credentials not provided'});
  }
});

module.exports = router