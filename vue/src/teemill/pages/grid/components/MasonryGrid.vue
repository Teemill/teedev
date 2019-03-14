<template>
  <div
    class="teedev-masonry-grid"
    ref="grid"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <template v-if="grid">
      <div
        v-for="(item, index) in grid.items"
        :key="index"
        class="item"
        :class="{ 'special': item.index === '5' }"
        :style="{
          'grid-column-start': item.x + 1,
          'grid-column-end': item.x + 1 + item.w,
          'grid-row-start': item.y + 1,
          'grid-row-end': item.y + 1 + item.h,
        }"
      >
        {{ item.index }}
      </div>
    </template>
    <!-- <div class="item" style="grid-column: 3 / span  1; grid-row: 2 / span 1;">
      Item 4
    </div> -->
  </div>
</template>

<script>
import GridList from '../gridList';

export default {
  name: 'teedev-masonry-grid',

  data: () => ({
    grid: null,
    holding: false,
  }),

  methods: {
    onMouseDown() {
      window.addEventListener('mousemove', this.onMouseMove);
    },
    onMouseUp() {
      window.removeEventListener('mousemove', this.onMouseMove);
    },
    onMouseMove(e) {
      const newPos = this.grid.snapItemPositionToGrid([e.clientX - 100, e.clientY - 100], [1, 1]);

      this.grid.moveItemToPosition(this.grid.items.find(item => item.index === '5'), newPos);
    },
  },

  mounted() {
    const grid = new GridList(
      [
        { w: 2, h: 1, index: '1' },
        { w: 2, h: 2, index: '2' },
        { w: 1, h: 1, index: '3' },
        { w: 2, h: 1, index: '4' },
        { w: 1, h: 1, index: '5' },
        { w: 1, h: 1, index: '6' },
      ],
      {
        direction: 'vertical',
        lanes: 4,
      },
      this.$refs.grid,
    );

    grid.resizeGrid(4);
    // grid.generateGrid();

    // grid.moveItemToPosition(grid.items[4], [0, 1]);

    this.grid = grid;

    // console.log(grid.snapItemPositionToGrid([400, 400], [1, 1]));
  },
};
</script>

<style lang="scss" scoped>
.teedev-masonry-grid {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-auto-rows: 1fr;

  border: 1px solid #f00;

  .item {
    padding: 1em;
    min-height: 200px;
    border: 1px solid #000;

    &.special {
      background-color: rgba(255,0,0,0.1);
    }
  }
}
</style>
