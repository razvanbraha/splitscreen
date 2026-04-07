const express = require('express')
const router = express.Router({ mergeParams: true })

//Register
router.post('/', (req,  res) => {
  res.json({message: `Created account: ${req.body.username}.`});
});

module.exports = router