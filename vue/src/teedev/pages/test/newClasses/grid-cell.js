export default class GridCell {
  constructor({
    position = null,
    area     = null,
  } = {}) {
    this.position = position;
    this.area     = area;
  }

  get content() {
    if (this.area) {
      return this.area.content;
    }

    return null;
  }
}
