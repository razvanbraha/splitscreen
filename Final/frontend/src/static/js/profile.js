import api from './APIClient.js';


const carouselEntryTemplate = document.querySelector('#videogameLesserFeatureTemplate');
const carouselEmptyTemplate = document.querySelector('#UnselectedSlotTemplate');

const favoriteGamesList = document.querySelector('#fav-carousel-inner');

api.getCurrentUser().then(user => { 
    document.querySelector('#username').innerText = user.username;
    document.querySelector('#name').innerText = `${user.first_name} ${user.last_name}`;
    return api.getUserFavoriteGames(user.id);
}).then(games => {
    games.forEach((game, idx) => {
        const carouselEntryInstance = carouselEntryTemplate.content.cloneNode(true);
        const carouselEntry = carouselEntryInstance.querySelector('.carousel-item');

        carouselEntry.querySelector('#card-link').href=`/gameauth?id=${game.id}`;
        carouselEntry.querySelector('.card-img-top').src=game.image;
        carouselEntry.querySelector('.card-img-top').alt=`${game.name} cover photo`;
        carouselEntry.querySelector('.card-title').innerText = game.name;

        const deleteButton = carouselEntry.querySelector('.btn');
        deleteButton.addEventListener('click', e => {
            api.removeUserFavoriteGame(game.id).then(response => {
                console.log(`Remove Fav Game:  ${response.status}`)
                globalThis.location.reload();
            }).catch(err => {
                console.log(err);
            })
        })



        favoriteGamesList.appendChild(carouselEntry);
    })

    for (let i = 0; i < 4 - games.length; i++) {
        const carouselEmptyInstance = carouselEmptyTemplate.content.cloneNode(true);
        const carouselEmpty = carouselEmptyInstance.querySelector('.carousel-item');
        favoriteGamesList.appendChild(carouselEmpty);
    }

})