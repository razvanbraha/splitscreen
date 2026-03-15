const express = require('express')
const router = express.Router({ mergeParams: true })

//Login
router.post('/', (req,  res) => {
  res.json({message: `Welcome ${req.body.username}.`});
});

module.exports = router