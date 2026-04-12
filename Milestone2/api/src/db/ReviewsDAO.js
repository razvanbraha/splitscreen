const db = require('./DBConnection');
const Review = require('./models/Review');

module.exports = {

    // POST new review
    createReview: (userId, gameId, score, reviewMessage) => {
        return new Promise((resolve, reject) => {
            if (!userId || !gameId || !score) {
                reject({ code: 400, message: "Missing required review information" });
            }

            if (score < 1 || score > 5) {
                reject({ code: 400, message: "score must be between 1 and " });
            }

            return db.query(
                `INSERT INTO review (rvw_usr_id, rvw_gme_id, rvw_rating, rvw_text, rvw_created_at)
                VALUES (?, ?, ?, ?, ?)`,
                [userId, gameId, rating, reviewText, createdDate]
            ).then(rows => {
                if (!rows[0]) {
                    reject({ code: 500, message: "Error: Review could not be created" });
                    return;
                }
                resolve(new Review(rows[0]));
            }).catch(err => {
                console.log(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    reject({ code: 409, message: "User has already reviewed this game: " + err });
                } else {
                    reject({ code: 500, message: "Database Error: " + err });
                }
            });
        });
    },

    // PUT existing review
    updateReview: (reviewId, userId, score, reviewMessage) => {
        return new Promise((resolve, reject) => {
            if (score && (score < 1 || score > 5)) {
                reject({ code: 400, message: "score must be between 1 and 5" });
            }

            return db.query(
                `UPDATE review SET rvw_rating = ?, rvw_text = ?, rvw_updated_at = ?
                WHERE rvw_id = ? AND rvw_usr_id = ?`,
                [rating, reviewText, updatedDate, reviewId, userId]
            ).then(result => {
                if (result.affectedRows === 0) {
                    reject({ code: 404, message: "Review not found or unauthorized" });
                    return;
                }
                resolve(true);
            }).catch(err => {
                console.log(err);
                reject({ code: 500, message: "Database Error: " + err });
            });
        });
    },

    // GET existing review
    getReviewById: (reviewId) => {
        return db.query(
            `SELECT * FROM review WHERE rev_id = ?`, [reviewId]
        ).then(rows => {
            if (rows.length === 1) {
                return new Review(rows[0]);
            }
            return new Error("Review not found");
        });
    },

    // GET reviews by user
    getReviewsByUser: (userId) => {
        return db.query(
            `SELECT * FROM review WHERE rev_usr_id = ? ORDER BY rev_created_at DESC`, [userId]
        ).then(rows => {
            return rows.map(row => new Review(row));
        });
    },

    // GET reviews by game
    getReviewsByGame: (gameId) => {
        return db.query(
            `SELECT * FROM review WHERE rev_gam_id = ? ORDER BY rev_created_at DESC`, [gameId]
        ).then(rows => {
            return rows.map(row => new Review(row));
        });
    },

    // GET average score
    getAverageScoreForGame: (gameId) => {
        return db.query(
            `SELECT AVG(rev_score) AS average_score, COUNT(*) AS total_reviews
             FROM review WHERE rev_gam_id = ?`,
            [gameId]
        ).then(rows => {
            return rows[0];
        });
    },

    // DELETE - Remove a review
    deleteReview: (reviewId, userId) => {
        return db.query(
            `DELETE FROM review WHERE rev_id = ? AND rev_usr_id = ?`,
            [reviewId, userId]
        ).then(result => {
            return result.affectedRows > 0;
        });
    },
};