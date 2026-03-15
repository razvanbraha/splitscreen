const express = require('express')
const router = express.Router({ mergeParams: true })

//Logout
router.post('/', (req,  res) => {
  res.json({message: `Goodbye ${req.body.username}.`});
});

module.exports = router