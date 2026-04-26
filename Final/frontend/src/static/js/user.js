import api from './APIClient.js';

const query = globalThis.location.search;
let parameters = new URLSearchParams(query);
const id = parameters.get('id');

const carouselEntryTemplate = document.querySelector('#videogameLesserFeatureTemplate');
const carouselEmptyTemplate = document.querySelector('#UnselectedSlotTemplate');

const favoriteGamesList = document.querySelector('#fav-carousel-inner');
const friendButtonContainer = document.querySelector('#friend-button-container');

api.confirmFriend(id).then(response => {
    console.log(response.status);
    friendButtonContainer.innerHTML = "";
    const friendButton = document.createElement('div');
    friendButton.classList.add('btn', 'btn-primary');
    friendButton.id='friend-button';
    if (response.status) {
        friendButton.innerHTML = 'Remove Friend';
        friendButton.addEventListener('click', e => {
            api.removeFriend(id).then(response => {
                console.log(`Friend Remove Status: ${response.status}`)
                globalThis.location.reload();
            }).catch(err => {
                console.log(err);
            });
        });
    }
    else {
        friendButton.innerHTML = 'Add Friend';
        friendButton.addEventListener('click', e => {
            api.addFriend(id).then(response => {
                console.log(`Friend Add Status: ${response.status}`)
                globalThis.location.reload();
            }).catch(err => {
                console.log(err);
            });
        })
    }
    friendButtonContainer.appendChild(friendButton);
}).catch( err => {
    console.log(err);
})

api.getUser(id).then(user => { 
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
        deleteButton.remove();
        favoriteGamesList.appendChild(carouselEntry);
    })

    for (let i = 0; i < 4 - games.length; i++) {
        const carouselEmptyInstance = carouselEmptyTemplate.content.cloneNode(true);
        const carouselEmpty = carouselEmptyInstance.querySelector('.carousel-item');
        favoriteGamesList.appendChild(carouselEmpty);
    }

})