<template>
  <div>
    I am Grid

    <div
      v-if="grid"
      class="grid"
      :style="{
        gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
        gridTemplateRows: grid.rowCSS,
        gridGap: '0 8px',
      }"
    >
      <div
        v-for="(item, index) in grid.items"
        :key="item.uuid"
        class="grid-item"
        :style="{
          gridColumnStart: item.gridPosition.x + 1,
          gridColumnEnd:   item.gridPosition.x + item.gridSize.x + 1,
          gridRowStart:    item.gridPosition.y + 1,
          gridRowEnd:      item.gridPosition.y + item.gridSize.y + 1,
          marginBottom: '8px',
          /* height: `${item.size.y}px`, */
        }"
      >
        [{{index}}] - [{{item.position.y}}, {{item.size.y}}]
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import {
  Grid,
  GridItem,
} from './';

export default Vue.extend({
  name: 'masonry-grid',

  data: () => ({
    grid: null,
  }),

  mounted() {
    const items = [];

    for (let i = 0; i < 1; i++) {
      items.push(new GridItem({ width: 6, height: 600 }));
      items.push(new GridItem({ width: 3, height: 300 }));
      items.push(new GridItem({ width: 3, height: 300 }));
      items.push(new GridItem({ width: 3, height: 300 }));
      items.push(new GridItem({ width: 3, height: 300 }));
  
      items.push(new GridItem({ width: 6, height: 300 }));
      items.push(new GridItem({ width: 6, height: 600 }));
      items.push(new GridItem({ width: 3, height: 300 }));
      items.push(new GridItem({ width: 3, height: 300 }));
    }

    this.grid = new Grid({
      columns: 12,
      items,
    });

    console.log('Mounted Grid');

    this.grid.update();

    // setInterval(() => {
    //   this.grid.update();
    // }, 2000);

    console.log(this.grid);
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;

  .grid-item {
    border: 1px solid;
  }
}
</style>
