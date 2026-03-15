const express = require('express')
const router = express.Router({ mergeParams: true })

//Register
app.post('/', (req,  res) => {
  res.json({message: `Created account: ${req.body.username}.`});
});

module.exports = router