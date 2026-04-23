import api from './APIClient.js';

api.getCurrentUser().then(user => { 
    document.querySelector('#username').innerText = user.username;
    document.querySelector('#name').innerText = `${user.first_name} ${user.last_name}`
})