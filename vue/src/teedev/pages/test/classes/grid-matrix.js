import { Vector } from '@/global/classes';

export default class GridMatrix {
  constructor({ columns }) {
    this.columns = columns;
    this.areas = [];

    this._matrix = [];
  }

  get rows() {
    return this._matrix.length;
  }

  get lastArea() {
    let lastArea = null;

    this.areas.forEach((area) => {
      if (
        !lastArea ||
        area.position.y > lastArea.position.y
      ) {
        lastArea = area;
      }
    });

    return lastArea;
  }

  getRowHeightCSS(rowHeight) {
    return this._matrix
      .map((row) => {
        if (row.height === 'dynamic') {
          return 'auto';
        }

        return `${rowHeight}px`;
      })
      .join(' ');
  }

  getArea(data) {
    return this.areas.find(area => area.data === data);
  }

  getCell(cellPosition) {
    if (!this.validCell(cellPosition)) {
      return null;
    }

    return this._matrix[cellPosition.y][cellPosition.x];
  }

  getRowHeight(row, cellSpacing = 8) {
    let firstRowItem = null;

    row.some((rowCell) => {
      if (rowCell.data) {
        firstRowItem = rowCell.data;

        return true;
      }

      return false;
    });

    let cellHeight = 0;

    if (
      firstRowItem.size.y === 0 ||
      firstRowItem.size.x > this.columns / 2
    ) {
      cellHeight = firstRowItem.vNode.elm.parentNode.getBoundingClientRect().height;
    } else {
      cellHeight = 10;
    }

    return cellHeight + cellSpacing;
  }

  setColumns(columns) {
    this.columns = columns;

    this.update();
  }

  setArea(position, size, data) {
    let dynamicRows = false;

    if (size.y <= 0) {
      size = size.copy();
      size.y = 1;
    }

    if (size.x > this.columns / 2) {
      size.x = this.columns;
      dynamicRows = true;
    }

    this._addRows(
      Math.max(
        0,
        (position.y + size.y) - this.rows,
      ),
      dynamicRows,
    );

    this._foreachInArea(
      position,
      size,
      (cell, x, y) => {
        if (cell) {
          cell.data = data;
          cell.areaSize = size;
          cell.areaPosition = position;

          if (x === position.x && y === position.y) {
            cell.areaTopLeft = true;
          } else {
            cell.areaTopLeft = false;
          }
        }
      },
    );

    this.areas.push({
      position,
      size,
      data,
      dynamicHeight: dynamicRows,
    });
  }

  validCell(cellPosition) {
    if (!this._matrix.length) {
      return false;
    }

    if (cellPosition.x < 0 || cellPosition.y < 0) {
      return false;
    }

    if (cellPosition.x > this.columns - 1 || cellPosition.y > this.rows - 1) {
      return false;
    }

    return true;
  }

  getCellAlignmentDeltas(cell1, cell2) {
    return {
      top   : cell1.position.y - cell2.position.y,
      left  : cell1.position.x - cell2.position.x,
      bottom: (cell1.position.y + cell1.size.y) - (cell2.position.y + cell2.size.y),
      right : (cell1.position.x + cell1.size.x) - (cell2.position.x + cell2.size.x),
    };
  }

  clearMatrix() {
    this.areas   = [];
    this._matrix = [];
  }

  _addRows(number, dynamicHeight) {
    for (let y = 0; y < number; y += 1) {
      const row = [];

      for (let x = 0; x < this.columns; x += 1) {
        row.push({
          data: null,
        });
      }

      if (dynamicHeight) {
        row.height = 'dynamic';
      } else {
        row.height = 'static';
      }

      this._matrix.push(row);
    }
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

  findEmptyArea(size, startPosition, enforceRowAlignment = true, tolerance = 12) {
    if (size.y <= 0) {
      size = size.copy();
      size.y = 1;
    }

    if (size.x > this.columns) {
      size.x = this.columns;
    }

    const currentPosition = startPosition || new Vector(0, 0);
    let foundArea = null;
    let rowAligned = false;
    let previousCell = null;

    let limit = 100;

    do {
      for (let x = 0; x < this.columns; x += 1) {
        currentPosition.x = x;

        if (!foundArea) {
          if (!this._hasCollisions(currentPosition, size)) {
            if (previousCell) {
              const alignmentDeltas = this.getCellAlignmentDeltas(
                {
                  position: currentPosition,
                  size,
                },
                {
                  position: previousCell.areaPosition,
                  size: previousCell.areaSize,
                },
              );

              if (
                alignmentDeltas.top === 0 ||
                alignmentDeltas.bottom <= tolerance
              ) {
                foundArea = currentPosition.copy();
              }
            } else {
              foundArea = currentPosition.copy();
            }

            if (!enforceRowAlignment) {
              break;
            }
          } else {
            const cell = this.getCell(currentPosition);

            if (cell && cell.data) {
              previousCell = cell;
            }
          }
        } else {
          const cell = this.getCell(currentPosition);

          if (
            cell &&
            cell.data
          ) {
            const alignmentDeltas = this.getCellAlignmentDeltas(
              {
                position: currentPosition,
                size,
              },
              {
                position: cell.areaPosition,
                size: cell.areaSize,
              },
            );

            if (alignmentDeltas.bottom > tolerance) {
              foundArea = null;
              currentPosition.x = 0;
              currentPosition.y = cell.areaPosition.y + cell.areaSize.y;
            } else {
              rowAligned = true;
            }

            break;
          } else if (x === this.columns - 1) {
            rowAligned = true;
          }
        }
      }

      if (!foundArea) {
        if (currentPosition.y >= this.rows) {
          foundArea = currentPosition.copy();
        } else {
          previousCell = null;
          currentPosition.y += 1;
        }
      }

      limit--;

      if (limit === 0) {
        console.error('Limit hit');
      }
    } while (
      (
        !foundArea ||
        !rowAligned
      ) &&
      limit > 0 &&
      currentPosition.y <= this.rows
    );

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

  positionToCell(position, container, cellSpacing = 0, includeDebug = false) {
    const cell = new Vector(0, 0);

    const debug = {
      totalHeight: 0,
      rowIndex: 0,
    };

    if (container) {
      const containerBounds = container.getBoundingClientRect();
      const relativePosition = position.subtract(
        new Vector(containerBounds.left, containerBounds.top),
      );

      const cellPosition = new Vector(0, 0);
      const cellWidth = containerBounds.width / this.columns;

      cell.x = Math.floor(relativePosition.x / cellWidth);

      this._matrix
        .map(row => this.getRowHeight(row, cellSpacing))
        .some((rowHeight, rowIndex) => {
          const nextRowHeight = cellPosition.y + rowHeight;

          if (cellPosition.y < relativePosition.y) {
            debug.totalHeight += rowHeight;
            debug.rowIndex = rowIndex;

            cellPosition.y = nextRowHeight;
            cell.y = rowIndex;

            return false;
          }

          return true;
        });
    }

    if (includeDebug) {
      return {
        cell,
        debug,
      };
    }

    return cell;
  }

  cellToPosition(cellPosition, container, cellSpacing = 0) {
    const position = new Vector(0, 0);

    if (container) {
      const containerBounds = container.getBoundingClientRect();
      const cellWidth = (containerBounds.width - (cellSpacing * (this.columns - 1))) / this.columns;

      position.x = cellPosition.x * (cellWidth + cellSpacing);

      this._matrix
        .map(row => this.getRowHeight(row))
        .some((rowHeight, rowIndex) => {
          const nextRowHeight = position.y + rowHeight + cellSpacing;

          if (cellPosition.y > rowIndex) {
            position.y = nextRowHeight;

            return false;
          }

          return true;
        });
    }

    return position;
  }

  findNearestItem(cellPosition, includeDebug = false) {
    let foundCell = null;
    let currentPos = cellPosition;
    let iterations = 0;

    const trace = [];

    while (
      !foundCell &&
      currentPos.x >= 0 &&
      currentPos.y >= 0 &&
      iterations < 100
    ) {
      iterations++;

      const cell = this.getCell(currentPos);

      if (cell) {
        if (cell.data) {
          foundCell = cell;
        }

        if (currentPos.x <= 0) {
          currentPos = new Vector(this.columns - 1, currentPos.y - 1);
        } else {
          currentPos = new Vector(currentPos.x - 1, currentPos.y);
        }

        if (includeDebug) {
          trace.push(currentPos.copy());
        }
      }
    }

    if (includeDebug) {
      return {
        item: foundCell,
        iterations,
        trace,
      };
    }

    return foundCell;
  }
}
