const express = require('express')
const router = express.Router({ mergeParams: true })
const db = require('../db/DBConnection');

//Login
router.post('/', async (req,  res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Missing username or password'});
    return;
  }

  try {
    const rows = await db.query(
      `SELECT usr_id, usr_first_name, usr_last_name, usr_username, usr_password, usr_salt, usr_inappropriate_content
      FROM user
      WHERE usr_username = ?`,
      [username]
    );

    if (rows.length !== 1) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    const user = rows[0];

    if (user.usr_password !== password) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    res.json({
      usr_id: user.usr_id,
      usr_first_name: user.usr_first_name,
      usr_last_name: user.usr_last_name,
      usr_username: user.usr_username,
      usr_inappropriate_content: user.usr_inappropriate_content
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Database error'});
  }
});

module.exports = router