import api from './APIClient.js';

const featuredGame = document.querySelector('.featured-game');

const query = globalThis.location.search;
let parameters = new URLSearchParams(query);
const id = parameters.get('id');

api.getGameById(id).then(game => {
    console.log(game);
    featuredGame.querySelector('#featured-game-image').src=game.image;
    featuredGame.querySelector('#featured-game-image').alt=`${game.name} cover photo`;
    featuredGame.querySelector('#featured-game-title').innerText = game.name;
});

api.getCurrentUser().then(user => {
    if (user) {
        const detailsDiv = document.querySelector('#details-and-statistics');
        detailsDiv.innerHTML += `<div class="card p-3" id="game-status">
                                <h5 class="mb-3">Status</h5>
                                <div class="d-flex flex-wrap gap-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" id="radioPlaying" name="radioStatus" value="playing" required>
                                        <label class="form-check-label" for="radioPlaying">Playing</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" id="radioFinished" name="radioStatus" value="finished" required>
                                        <label class="form-check-label" for="radioFinished">Finished</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" id="radioDropped" name="radioStatus" value="dropped" required>
                                        <label class="form-check-label" for="radioDropped">Dropped</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="checkboxFavorite" name="checkboxFavorite" value="favorite">
                                        <label class="form-check-label" for="checkboxFavorite">Favorite</label>
                                    </div>
                                </div>
                            </div>`
        const subDiv = document.querySelector('#sub-content');
        subDiv.innerHTML += `<!-- Review -->
                    <div class="col-12 col-md-6">
                        <div class="card p-3 h-100" id="game-review">
                            <form action="send" method="POST" enctype="multipart/form-data">

                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5 class="mb-0">Review GAME TITLE</h5>
                                    <div id="star-rating" class="d-flex gap-1">
                                        <input type="radio" id="star1" name="starRating" value="1-star" required>
                                        <label for="star1">★</label>
                                        <input type="radio" id="star2" name="starRating" value="2-star" required>
                                        <label for="star2">★</label>
                                        <input type="radio" id="star3" name="starRating" value="3-star" required>
                                        <label for="star3">★</label>
                                        <input type="radio" id="star4" name="starRating" value="4-star" required>
                                        <label for="star4">★</label>
                                        <input type="radio" id="star5" name="starRating" value="5-star" required>
                                        <label for="star5">★</label>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center mb-3">
                                    <textarea class="form-control" name="review-message" id="review-message" rows="10" minlength="10" placeholder="Game review text..." required></textarea>
                                </div>

                                <div class="d-flex justify-content-center">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>`
        const mainDiv = document.querySelector('#main-content');
        mainDiv.innerHTML += `
                <!-- Right side: Friends Activity -->
                <div class="col-12 col-md-4">
                    <h6 class="mt-1">Recent Activity</h6>
                    <div class="friend-activity d-flex flex-column gap-2 p-2">

                        <div class="card p-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <a href="/user">
                                    <span class="fw-bold review-username">User 1</span>
                                </a>
                                <span>★★★★</span>
                            </div>
                            <textarea class="form-control" rows="4" readonly placeholder="This game was amazing, loved every second of it!"></textarea>
                        </div>

                        <div class="card p-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="fw-bold review-username">Friend 1</span>
                                <span>★★★</span>
                            </div>
                            <textarea class="form-control" rows="5" readonly placeholder="Pretty decent game, story was good but gameplay felt repetitive."></textarea>
                        </div>

                        <div class="card p-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="fw-bold review-username">Friend 2</span>
                                <span>★★★★★</span>
                            </div>
                            <textarea class="form-control" rows="5" readonly placeholder="Absolute masterpiece, one of the best games I have ever played."></textarea>
                        </div>

                        <div class="card p-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="fw-bold review-username">User 2</span>
                                <span>★★</span>
                            </div>
                            <textarea class="form-control" rows="4" readonly placeholder="Had potential but fell short in too many areas for me."></textarea>
                        </div>

                    </div>
                </div>`
    }
}).catch(err => {
    console.log(err);
    console.log("Not logged in");
})