const express = require('express')
const router = express.Router({ mergeParams: true })
const reviewDAO = require('../db/ReviewDAO');

router.use(express.json());

//Post new review
router.post('/', async (req, res) => {
    const { userId, gameId, score, reviewMessage } = req.body;

    reviewDAO.createReview(userId, gameId, score, reviewMessage)
        .then(review => res.status(201).json(review))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

//Update existing review
router.put('/:reviewId', (req,  res) => {
    const { reviewId } = req.params;
    const { userId, score, reviewMessage } = req.body;

    reviewDAO.update(reviewId, userId, score, reviewMessage)
        .then(() => res.json({ message: `Review ${reviewId} updated.` }))
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

//Get existing review 
router.get('/:reviewId', (req,  res) => {
    const { reviewId } = req.params;

    reviewDAO.getReviewById(reviewId)
        .then(review => {
            if (review instanceof Error) {
                return res.status(404).json({ error: review.message });
            }
            res.json(review);
        })
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

//Get all reviews posted by a user
router.get('/user/:userId', (req,  res) => {
    const { userId } = req.params;

    reviewDAO.getReviewsByUser(userId)
        .then(reviews => {
            if (reviews instanceof Error) {
                return res.status(404).json({ error: review.message });
            }
            res.json(reviews);
        })
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

//Get all reviews for a game
router.get('/game/:gameId', (req,  res) => {
    const { gameId } = req.params;

    reviewDAO.getReviewsByGame(gameId)
        .then(reviews => {
            if (reviews instanceof Error) {
                return res.status(404).json({ error: review.message });
            }
            res.json(reviews);
        })
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

//Delete existing review
router.delete('/:reviewId', (req,  res) => {
    const { reviewId } = req.params;
    const { userId } = req.body;

    reviewDAO.deleteReview(reviewId, userId)
        .then(deleted => {
            if (!deleted) {
                return res.status(404).json({ error: 'Review not found or unauthorized.' });
            }
            res.json({ message: `Review ${reviewId} deleted.` });
        })
        .catch(err => res.status(err.code || 500).json({ error: err.message }));
});

module.exports = router