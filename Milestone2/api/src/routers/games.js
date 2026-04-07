const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/featured', async (req, res) => {
    if (!process.env?.RAWG_API_KEY) {
        console.log("Error: No API KEY");
        res.status(401).json({ error: 'Unable to retrieve RAWG Api Key'});
        return;
    }

    const params = new URLSearchParams();
    params.append("key", process.env.RAWG_API_KEY);
    //TODO: Determine how we want to get featured game, some random maybe?
    params.append("metacritic", '80, 100');
    params.append("ordering", 'released');
    params.append("page_size", '1');

    fetch(`https://api.rawg.io/api/games?${params}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const game = data.results[0];
        //TODO: UPDATE TO CREATE GAME IN DB IF DON't EXIST (May need some create game function as not all game data comes w/ request)
        res.send(game);
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
      .then(data => {
        const games = data.results
        //TODO: UPDATE TO CREATE GAME IN DB IF DON't EXIST (May need some create game function as not all game data comes w/ request)
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
      .then(data => {
        const games = data.results
        //TODO: UPDATE TO CREATE GAME IN DB IF DON't EXIST (May need some create game function as not all game data comes w/ request)
        res.send(games);
      }).catch(error => {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to fetch' });
      })
});

module.exports = router;