const express = require('express')
const router = express.Router({ mergeParams: true })

//Logout
app.post('/', (req,  res) => {
  res.json({message: `Goodbye ${req.body.username}.`});
});

module.exports = router