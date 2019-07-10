import { Vector } from '@/global/classes';

import GridRow from './grid-row';
import GridCell from './grid-cell';
import GridArea from './grid-area';

export default class Grid {
  constructor({
    columns = 4,
    rows    = 0,
  } = {}) {
    this.size   = new Vector(columns, rows);
    this.matrix = [];
    this.areas  = [];

    this._generateMatrix();
  }

  get columns() {
    return this.size.x;
  }

  set columns(value) {
    this.size.x = value;
  }

  get rows() {
    return this.size.y;
  }

  set rows(value) {
    this.size.y = value;
  }

  isValidPosition(position) {
    if (
      this.matrix[position.y] &&
      this.matrix[position.y][position.x]
    ) {
      return true;
    }

    return false;
  }

  isValidArea(position, size) {
    return !this._forEachInArea(
      position,
      size,
      cell => !cell,
    );
  }

  isPositionWithinBounds(position) {
    return (
      position.x >= 0 &&
      position.y >= 0 &&
      position.x < this.columns &&
      position.y < this.rows
    );
  }

  isAreaWithinBounds(position, size) {
    return (
      position.x >= 0 &&
      position.y >= 0 &&
      position.x + size.x < this.columns &&
      position.y + size.y < this.rows
    );
  }

  getCell(position) {
    if (this.isValidPosition(position)) {
      return this.matrix[position.y][position.x];
    }

    return null;
  }

  getArea(position) {
    const cell = this.getCell(position);

    if (
      cell &&
      cell.area
    ) {
      return cell.area;
    }

    return null;
  }

  getAreaBoundsDeltas(position, size) {
    return {
      top    : position.y,
      left   : position.x,
      bottom : this.rows - (position.y + size.y),
      right  : this.columns - (position.x + size.x),
    };
  }

  setArea(position, size, content) {
    if (!this.isValidArea(position, size)) {
      if (!this.isAreaWithinBounds(position, size)) {
        const deltas = this.getAreaBoundsDeltas(position, size);

        console.log(deltas);

        if (
          deltas.top >= 0 &&
          deltas.left >= 0 &&
          deltas.right >= 0 &&
          deltas.bottom < 0
        ) {
          this._addMatrixRows(-deltas.bottom);
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    const area = new GridArea({
      position,
      size,
      content,
    });

    this._forEachInArea(
      position,
      size,
      (cell) => {
        cell.area = area;
      },
    );

    this.areas.push(area);

    return true;
  }

  // _findEmptyArea() {

  // }

  _forEachInArea(position, size, callback) {
    for (
      let { y } = position,
        yCount = position.y + size.y;
      y < yCount;
      y++
    ) {
      for (
        let { x } = position,
          xCount = position.x + size.x;
        x < xCount;
        x++
      ) {
        const cellPosition = new Vector(x, y);

        const result = callback(
          this.getCell(cellPosition),
          cellPosition,
        );

        if (result) {
          return result;
        }
      }
    }

    return false;
  }

  _generateMatrix() {
    this.matrix = [];

    for (let y = 0; y < this.rows; y++) {
      this.matrix[y] = new GridRow();

      for (let x = 0; x < this.columns; x++) {
        this.matrix[y].push(new GridCell({
          position: new Vector(x, y),
        }));
      }
    }
  }

  _addMatrixColumns(count = 1) {
    const currentColumnCount = this.matrix[0].length;

    for (let y = 0; y < this.matrix.length; y++) {
      for (let i = 0; i < count; i++) {
        const x = currentColumnCount + i;

        this.matrix[y].push(new GridCell({
          position: new Vector(x, y),
        }));
      }
    }

    this.columns = currentColumnCount + count;
  }

  _addMatrixRows(count = 1) {
    const currentRowCount = this.matrix.length;

    for (let i = 0; i < count; i++) {
      const row = new GridRow();
      const y = currentRowCount + i;

      for (let x = 0; x < this.columns; x++) {
        row.push(new GridCell({
          position: new Vector(x, y),
        }));
      }

      this.matrix.push(row);
    }

    this.rows = currentRowCount + count;
  }

  _insertRows(rowIndex, count = 1) {
    const currentRowCount = this.matrix.length;

    for (let i = 0; i < count; i++) {
      const row = new GridRow();
      const y = rowIndex + i;

      for (let x = 0; x < this.columns; x++) {
        row.push(new GridCell({
          position: new Vector(x, y),
          area:     this.matrix[y][x].area,
        }));
      }

      this.matrix.splice(
        rowIndex,
        0,
        row,
      );
    }

    this.rows = currentRowCount + count;

    this._forEachInArea(
      new Vector(0, rowIndex + 1),
      new Vector(this.columns, this.rows - (rowIndex + count)),
      (cell) => {
        cell.position.y += count;
      },
    );
  }
}
