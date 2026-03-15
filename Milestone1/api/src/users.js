const express = require('express')
const router = express.Router({ mergeParams: true })

//Update user info
router.put('/:userId', (req,  res) => {
  res.json({message: `Updated user: ${req.params.userId} with ${req.body.username}`});
});

module.exports = router