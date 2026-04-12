const express = require('express')
const cookieParser = require('cookie-parser');
const router = express.Router({ mergeParams: true });
const GameDAO = require('../db/GameDAO');

router.use(cookieParser());
router.use(express.json());

//Title, Pictue, Genres, Ratings, Platforms, Age_ratings, release date, developers, publishers, gamemodes
//TODO: For milestone 2 this api is fine but for the information we want this api is subpar, I will look into alternatives in the meantime

router.get('/featured', async (req, res) => {
    if (!process.env?.RAWG_API_KEY) {
        console.log("Error: No API KEY");
        res.status(401).json({ error: 'Unable to retrieve RAWG Api Key'});
        return;
    }

    const d = new Date();
    const formattedPastDate = (d.getMonth() === 0 ? d.getFullYear() - 1 : d.getFullYear()) + '-' + (d.getMonth() === 0 ? 12 : d.getMonth()).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
    const formattedDate = d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');

    const params = new URLSearchParams();
    params.append("key", process.env.RAWG_API_KEY);
    //TODO: Determine how we want to get featured game, some random maybe?
    params.append("metacritic", '80, 100');
    params.append("ordering", '-added');
    params.append("page_size", '1');

    const param2 = new URLSearchParams();
    param2.append("key", process.env.RAWG_API_KEY);

    fetch(`https://api.rawg.io/api/games?${params}`)
    .then(response => response.json())
    .then(async data => {
        let game;
        if(await GameDAO.checkGameExists(data.results[0].slug)) {
            game = await GameDAO.getGameBySlug(data.results[0].slug);
        } else {
            game = await GameDAO.createNewGame(data.results[0]);
        }
        res.json(game);
    }).catch(error => {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to fetch' });
    })
});

router.get('/recent', async (req, res) => {
    if (!process.env?.RAWG_API_KEY) {
        console.log("Error: No API KEY");
        res.status(401).json({ error: 'Unable to retrieve RAWG Api Key'});
        return;
    }

    const d = new Date();
    const formattedPastDate = (d.getMonth() === 0 ? d.getFullYear() - 1 : d.getFullYear()) + '-' + (d.getMonth() === 0 ? 12 : d.getMonth()).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
    const formattedDate = d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');

    const params = new URLSearchParams();
    params.append("key", process.env.RAWG_API_KEY);
    params.append("dates", `${formattedPastDate},${formattedDate}`);
    params.append("ordering", '-added');
    params.append("page_size", '10');

    fetch(`https://api.rawg.io/api/games?${params}`)
      .then(response => response.json())
      .then(async data => {
        let games = [];
        for (const unprocessed_game of data.results) {
            let game;
            if(await GameDAO.checkGameExists(unprocessed_game.slug)) {
                game = await GameDAO.getGameBySlug(unprocessed_game.slug);
            } else {
                game = await GameDAO.createNewGame(unprocessed_game);
            }
            games.push(game);
        }
        res.send(games);
      }).catch(error => {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to fetch' });
      })
});

router.get('/anticipated', async (req, res) => {
    if (!process.env?.RAWG_API_KEY) {
        console.log("Error: No API KEY");
        res.status(401).json({ error: 'Unable to retrieve RAWG Api Key'});
        return;
    }

    const d = new Date();
    const formattedDate = d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
    const formattedFutureDate = (d.getFullYear() + 1) + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');

    const params = new URLSearchParams();
    params.append("key", process.env.RAWG_API_KEY);
    params.append("dates", `${formattedDate},${formattedFutureDate}`);
    params.append("ordering", '-added');
    params.append("page_size", '10');

    fetch(`https://api.rawg.io/api/games?${params}`)
      .then(response => response.json())
      .then(async data => {
        let games = [];
        for (const unprocessed_game of data.results) {
            let game;
            if(await GameDAO.checkGameExists(unprocessed_game.slug)) {
                game = await GameDAO.getGameBySlug(unprocessed_game.slug);
            } else {
                game = await GameDAO.createNewGame(unprocessed_game);
            }
            games.push(game);
        }
        res.send(games);
      }).catch(error => {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to fetch' });
      })
});

router.get('/id/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    GameDAO.getGameById(gameId).then(game => {
        res.json(game);
    }).catch(err => {
        console.log(err);
        res.status(404).json({error: 'Game not found'});
    })
});

router.get('/name/:gameName', (req, res) => {
    const gameName = req.params.gameName;
    GameDAO.getGameByName(gameName).then(game => {
    res.json(game);
  }).catch(err => {
    console.log(err);
    res.status(404).json({error: 'Game not found'});
  })
});

module.exports = router;