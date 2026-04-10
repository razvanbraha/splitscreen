const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../db/DBConnection');

//Register
router.post('/', async (req,  res) => {
  const { firstName, lastName, username, password, salt } = req.body;

  if (!firstName || !lastName || !username || !password || !salt) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const result = await db.query(
      `INSERT INTO user
      (usr_first_name, usr_last_name, usr_username, usr_password, usr_salt, usr_inappropriate_content)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, username, password, salt, 0]
    );

    if (result.affectedRows !== 1) {
      res.status(500).json({ error: 'User could not be created' });
      return;
    }

    const rows = await db.query(
      `SELECT usr_first_name, usr_last_name, usr_username, usr_inappropriate_content
      FROM user
      WHERE usr_id = ?`,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Username already exists' });
      return;
    }

    console.log(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router