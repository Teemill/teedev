import uuid from 'uuid/v4';
import { Vector } from '@teedev/core';

export interface GridItemParams {
  order?:  number;
  width?:  number;
  height?: number;
}

export class GridItem {
  public order:  number;
  public width:  number;
  public height: number;

  public uuid:     string;
  public size:     Vector;
  public position: Vector;

  public gridSize: Vector = new Vector();
  public gridPosition: Vector = new Vector();

  constructor({
    order  = 0,
    width  = 1,
    height = 1,
  }: GridItemParams = {}) {
    this.order  = order;
    this.width  = width;
    this.height = height;

    this.uuid = uuid();

    this.size = new Vector(
      this.width,
      this.height,
    );
    this.position = new Vector(
      0,
      0,
    );
  }

  public inColumn(column: number) {
    return column >= this.position.x &&
            column <= this.position.x + this.size.x; 
  }

  public get columns() {
    return new Array<number>(this.size.x)
      .fill(0)
      .map((v, i) => i + this.position.x);
  }
}

interface ItemRowDef {
  id: number,
  start: number,
  end: number,
}

interface RowsDef {
  [row: number]: number[],
}

export interface GridParams {
  items?:   GridItem[];
  columns?: number;
}

export class Grid {
  public items:   GridItem[];
  public columns: number;

  public testRows: string[] = [];
  
  constructor({
    items   = [],
    columns = 12,
  }: GridParams = {}) {
    this.items   = items;
    this.columns = columns;
  }

  get rowCSS() {
    let previousRow: number = 0;

    return this.testRows
      .map(row => {
        const value = parseInt(row) - previousRow;

        previousRow = parseInt(row);

        return `${value}px`;
      })
      .slice(1)
      .join(' ');
  }
  
  public update() {
    const builtItems    = [];
    const columnHeights = new Array<number>(this.columns).fill(0);
    
    this.items.forEach((item, itemIndex) => {
      const previousItem = this.items[itemIndex - 1];

      const useableColumns = columnHeights
        .map((height, column, array) => Math.max(
          previousItem ? previousItem.position.y : 0,
          ...array.slice(column, column + item.size.x)
        ))
        .splice(0, columnHeights.length - (item.size.x - 1));

      console.log(columnHeights, useableColumns);

      const lowestColumn = useableColumns
        .reduce((acc, value, index, array) =>
          (value < array[acc]) ? index : acc,
          0,
        );

      item.position.x = lowestColumn;
      item.position.y = useableColumns[lowestColumn];

      item.gridPosition.x = item.position.x;
      item.gridSize.x     = item.size.x

      item.columns
        .forEach((column: number) => {
          columnHeights[column] = item.position.y + item.size.y;
        });
      
      builtItems.push(item);
    });

    const rows = this.items
      .map<ItemRowDef>((item: GridItem, index: number) => {
        return {
          id:    index,
          start: item.position.y,
          end:   item.position.y + item.size.y,
        };
      })
      .reduce((acc: RowsDef, value: ItemRowDef) => {
        const start = acc[value.start] || [];
        const end   = acc[value.end]   || [];

        acc[value.start] = [...start, value.id];
        acc[value.end]   = [...end, value.id];

        return acc;
      }, <RowsDef>{});

    const setPositionItems = new Set();

    this.testRows = Object.keys(rows);

    Object.values(rows)
      .forEach((rowItems: number[], row: number) => {
        rowItems.forEach((itemId: number) => {
          const item: GridItem = this.items[itemId];

          if (!setPositionItems.has(itemId)) {
            item.gridPosition.y = row;

            setPositionItems.add(itemId);
          } else {
            item.gridSize.y = row - item.gridPosition.y;
          }
        })
      });
  }
}