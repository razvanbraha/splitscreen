const db = require('./DBConnection');
const Activity = require('./models/Activity');

module.exports = {
    //POST a new activity
    createActivity: (userId, gameId, action) => {
        return new Promise((resolve, reject) => {

            return db.query(
                `INSERT INTO activity (act_usr_id, act_gme_id, act_action)
                VALUES (?, ?, ?)`,
                [userId, gameId, action]
            ).then(rows => {
                if (!rows[0]) {
                    reject({ code: 500, message: "Error: Activity could not be created" });
                    return;
                }
                resolve(new Activity(rows[0]));
            })
            .catch(err => {
                console.log(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    reject({ code: 409, message: "User has an activity already: " + err });
                } else {
                    reject({ code: 500, message: "Database Error: " + err });
                }
            });
        });
    },

    //PUT an existing activity
    updateActivity: (activityId, action) => {
        return new Promise((resolve, reject) => {

            return db.query(
                `UPDATE activity SET act_action = ?
                WHERE act_id = ?`,
                [action, activityId]
            ).then(result => {
                if (result.affectedRows === 0) {
                    reject({ code: 404, message: "Activity not found or unauthorized" });
                    return;
                }
                resolve(true);
            }).catch(err => {
                console.log(err);
                reject({ code: 500, message: "Database Error: " + err });
            });
        });
    },

    //GET activities by user
    getActivitiesByUser: (userId) => {
        return db.query(
            `SELECT * FROM activity WHERE act_usr_id = ? ORDER BY act_action DESC`, [userId]
        ).then(rows => {
            return rows.map(row => new Activity(row));
        });
    }
};