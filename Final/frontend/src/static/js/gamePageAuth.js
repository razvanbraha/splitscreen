import api from './APIClient.js';

const featuredGame = document.querySelector('.featured-game');

/**
 * Review, Others' reviews, Activity, and Favorite functionality all go here
 */

const query = globalThis.location.search;
let parameters = new URLSearchParams(query);
const id = parameters.get('id');

const favoriteGame = document.querySelector('#checkboxFavorite');

api.getCurrentUser().then(user => {
    return api.getUserFavoriteGames(user.id);
}).then(games => {
    for (let game of games) {
        if (game.id === Number.parseInt(id)) {
            favoriteGame.checked = true;
        }
    }
})

favoriteGame.addEventListener('change', e => {
    e.preventDefault();
    if (favoriteGame.checked) {
        api.addUserFavoriteGame(id).then(response => {
            if (response.status) {
                console.log("Game Favorited");
            } else {
                alert('Favorite Game Limit Reached.\nPlease visit your profile to remove a favorite');
                favoriteGame.checked = false;
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        api.removeUserFavoriteGame(id).then(response => {
            console.log(`Remove Fav Game:  ${response.status}`)
        }).catch(err => {
            console.log(err);
        })
    }
})