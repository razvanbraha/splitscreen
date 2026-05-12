import api from './APIClient.js';
import carousel from './carousel.js';

const recentlyReleasedCarouselList = document.querySelector('#rr-carousel-inner');
const comingSoonCarouselList = document.querySelector('#cs-carousel-inner');
const featuredGame = document.querySelector('.featured-game');

const carouselEntryTemplate = document.querySelector('#videogameLesserFeatureTemplate');

api.getFeaturedGame().then(game => {
    if (!featuredGame) return;

    const linkEl = featuredGame.querySelector('#featured-game-link');
    const imgEl = featuredGame.querySelector('#featured-game-image');
    const titleEl = featuredGame.querySelector('#featured-game-title');

    if (linkEl) linkEl.href = `/game?id=${game.id}`;
    if (imgEl) {
        imgEl.src = game.image;
        imgEl.alt = `${game.name} cover photo`;
    }
    if (titleEl) titleEl.innerText = game.name;

    const date = new Date(game.release_date);
    const releaseEl = featuredGame.querySelector('.release-date');
    if (releaseEl) releaseEl.innerText += ` ${date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}`;

    const genresList = featuredGame.querySelector('#genres-list');
    if (genresList && Array.isArray(game.genres)) {
        for (const element of game.genres) {
            genresList.innerHTML += `<div class='genre'>${element}</div>`;
        }
    }

    const platformsList = featuredGame.querySelector('#platforms-list');
    if (platformsList && Array.isArray(game.platforms)) {
        for (const element of game.platforms) {
            platformsList.innerHTML += `<div class='platform'>${element}</div>`;
        }
    }

    for (let i = 5; i > 0; i--) {
        const starEl = featuredGame.querySelector(`#star-${i}`);
        if (starEl && game.ratings) starEl.innerText += ` ${game.ratings[5 - i]}`;
    }
});

api.getRecentGames().then(games => {
    if (!carouselEntryTemplate || !recentlyReleasedCarouselList) return;

    games.forEach((game, idx) => {
        const carouselEntryInstance = carouselEntryTemplate.content.cloneNode(true);
        const carouselEntry = carouselEntryInstance.querySelector('.carousel-item');
        if (!carouselEntry) return;

        if (idx === 0) carouselEntry.classList.add('active');
        const cardLink = carouselEntry.querySelector('#card-link');
        const img = carouselEntry.querySelector('.card-img-top');

        if (cardLink) cardLink.href = `/game?id=${game.id}`;
        if (img) {
            img.src = game.image;
            img.alt = `${game.name} cover photo`;
        }

        recentlyReleasedCarouselList.appendChild(carouselEntry);
    });
});

api.getAnticipatedGames().then(games => {
    if (!carouselEntryTemplate || !comingSoonCarouselList) return;

    games.forEach((game, idx) => {
        const carouselEntryInstance = carouselEntryTemplate.content.cloneNode(true);
        const carouselEntry = carouselEntryInstance.querySelector('.carousel-item');
        if (!carouselEntry) return;

        if (idx === 0) carouselEntry.classList.add('active');
        const cardLink = carouselEntry.querySelector('#card-link');
        const img = carouselEntry.querySelector('.card-img-top');

        if (cardLink) cardLink.href = `/game?id=${game.id}`;
        if (img) {
            img.src = game.image;
            img.alt = `${game.name} cover photo`;
        }

        comingSoonCarouselList.appendChild(carouselEntry);
    });

    carousel.activateCarousel();
});