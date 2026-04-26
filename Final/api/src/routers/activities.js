const express = require('express')
const router = express.Router({ mergeParams: true })
const activityDAO = require('../db/ActivityDAO');

// GET all activities for a user
router.get('/', (req, res) => {
    const { userId } = req.params;

    activityDAO.getActivitiesByUser(userId)
        .then(activities => res.json(activities))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

// GET status of a specific game for a user
router.get('/:gameId/status', (req, res) => {
    const { userId, gameId } = req.params;

    activityDAO.getActivityByUserAndGame(userId, gameId)
        .then(activity => {
            if (!activity) {
                return res.json({ status: null });
            }
            res.json({ status: activity.action });
        })
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

// GET activities for a user (profile page)
router.get('/', (req, res) => {
    const { userId } = req.params;
    activityDAO.getActivitiesByUser(userId)
        .then(activities => res.json(activities))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

// PUT set or update status for a user's game (creates if doesn't exist)
router.put('/:gameId/status', (req, res) => {
    const { userId, gameId } = req.params;
    const { status } = req.body;

    activityDAO.setActivityStatus(userId, gameId, status)
        .then(() => res.json({ message: `Status updated to: ${status}` }))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

// DELETE clear status for a user's game (set to NULL)
router.delete('/:gameId/status', (req, res) => {
    const { userId, gameId } = req.params;

    activityDAO.clearActivityStatus(userId, gameId)
        .then(() => res.json({ message: `Status cleared for game ${gameId}` }))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

module.exports = router