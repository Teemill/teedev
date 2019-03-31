import GridItem from './gridItem';

export default class Grid {
  constructor({ items }) {
    this.items = this._mapItems(items);
  }

  _mapItems(items) {
    return items.map((item, index) => {
      if (item instanceof GridItem) {
        return item;
      }

      return new GridItem({ data: item, order: index });
    });
  }
}
