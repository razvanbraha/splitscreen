const express = require('express')
const router = express.Router({ mergeParams: true })

//Login
app.post('/', (req,  res) => {
  res.json({message: `Welcome ${req.body.username}.`});
});

module.exports = router