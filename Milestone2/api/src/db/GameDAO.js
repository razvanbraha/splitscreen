const db = require('./DBConnection');
const Game = require('./models/Game');

module.exports = {
    createNewGame: (unprocessedGame) => {
        return db.query('INSERT INTO game (gme_slug, gme_name, gme_image) VALUES (?, ?, ?) RETURNING *',
            [unprocessedGame.slug, unprocessedGame.name, unprocessedGame.background_image]).then(rows => {
            if (!rows[0]) {
                console.log('Error: User could not be created');
                return new Error('Error unable to create game: ' + err);
            }
            let game = new Game(rows[0]);
            return game;
        }).catch(err => {
            console.log(err);
            return new Error("Database Error: " + err);
        })
    },

    checkGameExists: (slug) => {
        return db.query('SELECT COUNT(*) AS total FROM game WHERE gme_slug=?', [slug]).then(count => {
            return count[0].total === 1n;
        });
    },

    getGameBySlug: (slug) => {
        return db.query('SELECT * FROM game WHERE gme_slug=?', [slug]).then(rows => {
            if (rows.length === 1) {
                return new Game(rows[0]);
            }
            return new Error("No such Game");
        });
    },

    getGameByName: (name) => {
        return db.query('SELECT * FROM game WHERE gme_name=?', [name]).then(rows => {
            if (rows.length === 1) {
                return new Game(rows[0]);
            }
            return new Error("No such Game");
        });
    },

    getGameById: (gameId) => {
        return db.query('SELECT * FROM game WHERE gme_id=?', [gameId]).then(rows => {
            if (rows.length === 1) {
                return new Game(rows[0]);
            }
            return new Error("No such Game");
        });
    }
};
