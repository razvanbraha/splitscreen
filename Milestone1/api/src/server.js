const express = require('express');

const app = express();
const PORT = process.env.PORT;

const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const users = require('./users')
const reviews = require('./reviews')
const activities = require('./activities')
const friends = require('./friends')

app.use(express.json());
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/users', users);
app.use('/reviews', reviews);
app.use('/activities', activities);
app.use('/friends', friends);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));