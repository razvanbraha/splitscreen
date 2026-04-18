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

            const createdDate = new Date();

            return db.query(
                `INSERT INTO review (rev_usr_id, rev_gam_id, rev_score, rev_message, rev_created_at)
                VALUES (?, ?, ?, ?, ?)`,
                [userId, gameId, score, reviewMessage, createdDate]
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
    updateReview: (reviewId, score, reviewMessage) => {
        return new Promise((resolve, reject) => {
            if (score && (score < 1 || score > 5)) {
                reject({ code: 400, message: "score must be between 1 and 5" });
            }

            const updatedDate = new Date();

            return db.query(
                `UPDATE review SET rev_score = ?, rev_message = ?, rev_updated_at = ?
                WHERE rev_id = ? AND rev_usr_id = ?`,
                [score, reviewMessage, updatedDate, reviewId, userId]
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

    // DELETE a review
    deleteReview: (reviewId, userId) => {
        return db.query(
            `DELETE FROM review WHERE rev_id = ? AND rev_usr_id = ?`,
            [reviewId, userId]
        ).then(result => {
            return result.affectedRows > 0;
        });
    },
};