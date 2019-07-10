export default class GridRow extends Array {
  constructor({
    cells  = [],
    height = 'auto',
  } = {}) {
    super(...cells);

    this.height = height;
  }
}
