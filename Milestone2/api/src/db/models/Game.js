module.exports = class Game {
  id = null;
  slug = null;
  name = null;
  image = null;

  constructor(data) {
    this.id = data.gme_id;
    this.slug = data.gme_slug;
    this.name = data.gme_name;
    this.image = data.gme_image;
  }
};