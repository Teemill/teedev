<template>
  <div class="page-test">
    <div class="grid">
      <div
        class="grid-item"
        :style="{
          gridArea: '1 / 1 / 3 / 2',
        }"
      >
        <div
          class="item"
          :style="{
            paddingBottom: '100%',
          }"
        >
          <div>1</div>
        </div>
      </div>
      <div
        class="grid-item"
        :style="{
          gridArea: '1 / 2 / 2 / 3',
        }"
      >
        <div
          class="item"
          :style="{
            paddingBottom: '25%',
          }"
        >
          <div>2</div>
        </div>
      </div>
      <div
        class="grid-item"
        :style="{
          gridArea: '1 / 3 / 2 / 4',
        }"
      >
        <div
          class="item"
          :style="{
            paddingBottom: '30%',
          }"
        >
          <div>3</div>
        </div>
      </div>
      <div
        class="grid-item"
        :style="{
          gridArea: '2 / 2 / 3 / 3',
        }"
      >
        <div
          class="item"
          :style="{
            paddingBottom: '35%',
          }"
        >
          <div>4</div>
        </div>
      </div>
      <div
        class="grid-item"
        :style="{
          gridArea: '2 / 3 / 3 / 4',
        }"
      >
        <div
          class="item"
          :style="{
            paddingBottom: '40%',
          }"
        >
          <div>5</div>
        </div>
      </div>
    </div>

    <grid>
      <grid-item>
        Test
      </grid-item>
      <grid-item>
        Test
      </grid-item>
    </grid>
  </div>
</template>

<script>
import Grid from './components/MasonryGrid';
import GridItem from './components/MasonryGridItem';

export default {
  name: 'page-test',

  components: {
    Grid,
    GridItem,
  },

  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
.page-test {
  padding: 4em;

  .grid {
    display: grid;
    grid-gap: 0.5em;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: max-content;

    margin: 6em 0;
    // border: 1px solid #000;

    >.grid-item {
      position: relative;
      // border: 1px solid #000;

      .item {
        position: relative;
        border: 1px solid #f00;
        grid-auto-rows: auto;

        >div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
