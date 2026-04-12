module.exports = class Review {
  id = null;
  user = null;
  game = null;
  score = null;
  message = null;

  constructor(data) {
    this.id = data.rev_id;
    this.score = data.rev_score;
    this.message = data.rev_message;
  }

  setUser(user) {
    this.user = user;
  }

  setGame(game) {
    this.game = game;
  }

};