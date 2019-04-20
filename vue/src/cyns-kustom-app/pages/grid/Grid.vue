<template>
  <div ref="container" class="page-grid">

    <teedev-button
      style="margin-bottom: 1em;"
      text="Add Item"
      @click="onAddItem"
    />
    <teedev-button
      style="margin-bottom: 1em;"
      text="Shuffle"
      @click="onShuffle"
    />

    <div
      ref="div"
      :style="{
        border: '1px solid',
        padding: '1em',
        cursor: 'pointer',
        userSelect: 'none',
        transform: `translate(${relativity.relativePosition.x}px, ${relativity.relativePosition.y}px)`,
      }"
    >
      Hello There
    </div>

    <!-- <div v-if="relativity">
      [{{relativity.mouseState}}]
      [{{relativity.mousePosition.x}}, {{relativity.mousePosition.y}}]
      [{{relativity.mouseDelta.x}}, {{relativity.mouseDelta.y}}]
      [{{relativity.mouseMovement.x}}, {{relativity.mouseMovement.y}}]
      [{{relativity.relativePosition.x}}, {{relativity.relativePosition.y}}]
    </div>   -->

    <!-- <masonry-grid>
      <masonry-grid-item
        v-for="(item, index) in items"
        :key="index"
        :size="item.size"
      >
        <p>{{item.id}}</p>
      </masonry-grid-item>
    </masonry-grid> -->
  </div>
</template>

<script>
import uuid from 'uuid/v1';
import { Vector } from '@/global/plugins/physics';
import { shuffle } from '@/global/plugins/helpers/array';
import Relativity from './js/relativity_2';

import MasonryGrid from './components/MasonryGrid';
import MasonryGridItem from './components/MasonryGridItem';

export default {
  name: 'page-grid',

  components: {
    MasonryGrid,
    MasonryGridItem,
  },

  data: () => ({
    items: [],
    relativity: null,

    test: 'Item 1',
  }),

  methods: {
    onAddItem() {
      this.items.push({
        id: uuid(),
        text: this.test,
        size: Vector.random(new Vector(1, 1), new Vector(12, 12)).round(0),
      });
    },

    onShuffle() {
      shuffle(this.items);
    },
  },

  created() {
    this.relativity = new Relativity({}, {});

    console.log(this.relativity);
  },

  mounted() {
    this.relativity.setContainer(this.$refs.container);
    this.relativity.setElement(this.$refs.div);
  }
}
</script>

<style lang="scss" scoped>
.page-grid {
  padding: 4em;

  height: 200vh;
}

.grid {
  display: grid;
  grid-gap: 0.5em 0.5em;

  .grid-item {
    padding: 1em 0.5em;
    box-shadow: 0px 1px 4px rgba(0,0,0,0.2);
    border-radius: 10px;
  }
}
</style>

