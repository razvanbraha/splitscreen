const express = require('express');

const app = express();
const PORT = process.env.PORT;

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/home-page.html');
});

app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/templates/game-page.html');
});

app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/templates/user-page.html');
});

app.get('/profile', (req, res) => {
  console.log("reached");
  res.sendFile(__dirname + '/templates/profile-page.html');
});

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));