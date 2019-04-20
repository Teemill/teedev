import { Vector } from '@/global/plugins/physics';

export default class GridMatrix {
  constructor({ columns }) {
    this.columns = columns;
    this.areas = [];

    this._matrix = [];
  }

  get rows() {
    return this._matrix.length;
  }

  setArea(position, size, data) {
    this._addRows(
      Math.max(
        0,
        (position.y + size.y) - this.rows,
      ),
    );

    this._foreachInArea(
      position,
      size,
      (cell) => {
        if (cell) {
          cell.data = data;
        }
      },
    );

    this.areas.push({
      position,
      size,
      data,
    });
  }

  getArea(data) {
    return this.areas.find(area => area.data === data);
  }

  // removeArea(data) {

  // }

  _addRows(number) {
    for (let y = 0; y < number; y += 1) {
      const row = [];

      for (let x = 0; x < this.columns; x += 1) {
        row.push({
          data: null,
        });
      }

      this._matrix.push(row);
    }
  }

  _clearMatrix() {
    this.areas = [];
    this._matrix = [];
  }

  _foreachInArea(position, size, callback) {
    for (let { y } = position; y < position.y + size.y; y += 1) {
      for (let { x } = position; x < position.x + size.x; x += 1) {
        let cell = null;

        if (this._matrix[y] && this._matrix[y][x]) {
          cell = this._matrix[y][x];
        }

        const result = callback(cell, x, y);

        if (result !== undefined) {
          return result;
        }
      }
    }

    return null;
  }

  _findEmptyArea(size, startPosition) {
    const currentPosition = startPosition || new Vector(0, 0);
    let foundArea = null;

    while (!foundArea && currentPosition.y <= this.rows) {
      for (let x = 0; x < this.columns; x += 1) {
        currentPosition.x = x;

        if (!this._hasCollisions(currentPosition, size)) {
          foundArea = currentPosition;
          break;
        }
      }

      if (!foundArea) {
        currentPosition.y += 1;
      }
    }

    return foundArea;
  }

  _hasCollisions(position, size) {
    return this._foreachInArea(
      position,
      size,
      (cell, x, y) => {
        if (x < 0 || y < 0 || x >= this.columns) {
          return true;
        }

        if (cell && cell.data) {
          return true;
        }

        return undefined;
      },
    ) || false;
  }
}
