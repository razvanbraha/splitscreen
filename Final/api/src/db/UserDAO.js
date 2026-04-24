const db = require('./DBConnection');
const User = require('./models/User');
const crypto = require('node:crypto');

module.exports = {

    createNewUser: (username, password, firstName, lastName, innappropriateContent) => {
        return new Promise((resolve, reject) => {
            if (!username || !password || !firstName || !lastName || !innappropriateContent) {
                 reject({code: 400, message: "Missing account information"});
            }

            // Generate random byte salt
            let salt = crypto.randomBytes(32).toString('hex');

            //Generate hashed password
            crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
                if (err) { //problem computing digest, like hash function not available
                    reject({code: 500, message: "Error hashing password " + err});
                    return;
                }
                const digest = derivedKey.toString('hex');
                
                return db.query(`INSERT INTO user (usr_first_name, usr_last_name, usr_username, usr_password, usr_salt, usr_inappropriate_content)
                    VALUES (?, ?, ?, ?, ?, ?) RETURNING *`, [firstName, lastName, username, digest, salt, innappropriateContent === 'on'])
                .then(rows => {
                    if (!rows[0]) {
                        console.log('Error: User could not be created');
                        reject({code: 500, message: "Error failed to create user: " + err});
                        return;
                    }
                    resolve(new User(rows[0]));
                }).catch(err => {
                    console.log(err);
                    if (err.code === 'ER_DUP_ENTRY') {
                        reject({code: 409, message: "Username already exists: " + err});
                    } else {
                        reject({code: 500, message: "Database Error: " + err});
                    }
                });
            });
        });
    },

    getUserByCredentials: (username, password) => {
        return db.query('SELECT * FROM user WHERE usr_username=?', [username]).then(rows => {
            if (rows.length === 1) { // we found our user
                const user = new User(rows[0]);
                return user.validatePassword(password);
            }
            // if no user with provided username
            return new Error("No such user");
        });
    },

    //TODO: NEEDS TESTING
    getSpecificUser: (userId) => {
        return db.query('SELECT * FROM user WHERE usr_id=?', [userId]).then(rows => {
            if (rows.length === 1) { // we found our user
                const user = new User(rows[0]);
                return user;
            }
            return new Error("No such user");
        });
    },

    addFavoriteGame: (userId, gameId) => {
        return db.query('SELECT COUNT(*) AS total FROM user_game WHERE urg_usr_id=?', [userId]).then(count => {
            if (count[0].total >= 4n) {
                console.log("Favorite game limit reached");
                return false;
            }
            return true;
        }).then((state) => {
            if (!state) return false;

            return db.query('INSERT INTO user_game (urg_usr_id, urg_gme_id) VALUES (?, ?)',
              [userId, gameId]).then(result => {
                return result.affectedRows > 0;;
            });
        })
    },

    removeFavoriteGame:  (userId, gameId) => {
        return db.query('DELETE FROM user_game WHERE urg_usr_id = ? AND urg_gme_id = ?', [userId, gameId]).then(result => {
            return result.affectedRows > 0;;
        });
    },

    getUserFavoriteGameIds: (userId) => {
        return db.query('SELECT urg_gme_id FROM user_game WHERE urg_usr_id = ?', [userId]).then(rows => {
            return rows.map(row => row.urg_gme_id);
        });
    },

    addUserFriend: (userId, friendId) => {
        return db.query('INSERT INTO follow (flw_following_user_id, flw_followed_user_id) VALUES (?, ?)', [userId, friendId]).then(result => {
            console.log(result);
            return result.affectedRows > 0;;
        });
    },

    removeUserFriend: (userId, friendId) => {
        //Delete you following friend, and friend following you
        return db.query(`DELETE FROM follow 
            WHERE (flw_following_user_id = ? AND flw_followed_user_id = ?) 
            OR (flw_following_user = ? AND flw_followed_user_id = ?)`, 
            [userId, friendId, friendId, userId])
        .then(result => {
            console.log(result);
            return result.affectedRows;;
        });
    },

    //TODO: TEST EXTENSIVELY
    getUserFriends: (userId) => {
        let data =  { };
        //Check for mutual friends
        db.query(`SELECT * FROM follow t1
                  WHERE flw_followed_user_id=? AND
                  EXISTS (SELECT * 
                              FROM follow t2
                              WHERE t2.flw_following_user_id = t1.flw_followed_user_id
                              AND t2.flw_followed_user_id = t1.flw_following_user_id)`, [userId])
        .then(rows => {
            console.log(rows)
            data.friends = rows.map(row => row.flw_following_user_id);
        });
        //Check for friend requests
        db.query(`SELECT * FROM follow t1
                  WHERE flw_followed_user_id=? AND
                  NOT EXISTS (SELECT * 
                              FROM follow t2
                              WHERE t2.flw_following_user_id = t1.flw_followed_user_id
                              AND t2.flw_followed_user_id = t1.flw_following_user_id)`, [userId])
        .then(rows => {
            console.log(rows)
            data.friendsRequests = rows.map(row => row.flw_following_user_id);
        });
        return data;
    }
};
