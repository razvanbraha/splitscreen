const express = require('express')
const router = express.Router({ mergeParams: true })
const activityDAO = require('../db/ActivityDAO');


//Create new activity
router.post('/', (req, res) => {
    const { userId, gameId, action } = req.body;

    activityDAO.createActivity(userId, gameId, action)
        .then(activity => res.status(201).json(activity))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

//Update user's activity
router.put('/:activityId', (req, res) => {
    const { activityId } = req.params;
    const { action } = req.body;

    activityDAO.updateActivity(activityId, action)
        .then(() => res.json({ message: `Activity ${activityId} updated.` }))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

//Get a user's activities
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    activityDAO.getActivitiesByUser(userId)
        .then(activities => res.json(activities))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});


module.exports = router