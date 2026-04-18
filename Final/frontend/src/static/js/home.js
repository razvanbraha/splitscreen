import api from './APIClient.js';
import carousel from './carousel.js';

const recentlyReleasedCarouselList = document.querySelector('#rr-carousel-inner');
const comingSoonCarouselList = document.querySelector('#cs-carousel-inner');
const featuredGame = document.querySelector('.featured-game');

const carouselEntryTemplate = document.querySelector('#videogameLesserFeatureTemplate');

api.getFeaturedGame().then(game => {
    featuredGame.querySelector('#featured-game-link').href=`/game?id=${game.id}`;
    featuredGame.querySelector('#featured-game-image').src=game.image;
    featuredGame.querySelector('#featured-game-image').alt=`${game.name} cover photo`;
    featuredGame.querySelector('#featured-game-title').innerText = game.name;
});

api.getRecentGames().then(games => {
    games.forEach((game, idx) => {
        const carouselEntryInstance = carouselEntryTemplate.content.cloneNode(true);
        const carouselEntry = carouselEntryInstance.querySelector('.carousel-item');

        if (idx === 0) carouselEntry.classList.add('active');
        carouselEntry.querySelector('#card-link').href=`/game?id=${game.id}`;
        carouselEntry.querySelector('.card-img-top').src=game.image;
        carouselEntry.querySelector('.card-img-top').alt=`${game.name} cover photo`;
        carouselEntry.querySelector('.card-title').innerText = game.name;

        recentlyReleasedCarouselList.appendChild(carouselEntry);
    })
});

api.getAnticipatedGames().then(games => {
    games.forEach((game, idx) => {
        const carouselEntryInstance = carouselEntryTemplate.content.cloneNode(true);
        const carouselEntry = carouselEntryInstance.querySelector('.carousel-item');

        if (idx === 0) carouselEntry.classList.add('active');
        carouselEntry.querySelector('#card-link').href=`/game?id=${game.id}`;
        carouselEntry.querySelector('.card-img-top').src=game.image;
        carouselEntry.querySelector('.card-img-top').alt=`${game.name} cover photo`;
        carouselEntry.querySelector('.card-title').innerText = game.name;

        comingSoonCarouselList.appendChild(carouselEntry);
    })

    carousel.activateCarousel();
});