const express = require('express')
const router = express.Router({ mergeParams: true })


//Create new activity
router.post('/', (req,  res) => {
    if (!process.env?.RAWG_API_KEY) {
        console.log("Error: No API KEY");
        res.status(401).json({ error: 'Unable to retrieve RAWG Api Key'});
        return;
    }
});

//Get a user's activities
router.get('/:userId', (req,  res) => {
    res.json({message: `${req.params.userId}'s reviews served`});
});


module.exports = router