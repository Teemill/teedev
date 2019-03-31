import uuid from 'uuid/v1';

export default class GridItem {
  constructor({ data, order }) {
    this.uid = uuid();
    this.data = data;
    this.order = order || 0;
  }
}
