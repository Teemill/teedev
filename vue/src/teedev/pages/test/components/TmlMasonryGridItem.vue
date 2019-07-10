<template>
  <div
    class="tml-masonry-grid-item"
    :class="{ draggable }"
    v-resize="onUpdateSize"
  >
    <slot/>
    <masonry-grid-item-debugger
      v-if="showDebugger"
      :masonry-grid-item="this"
    />
  </div>
</template>

<script>
/**
 *
 * !!
 * ! This component is still work in progress.
 * ! Expect Bugs, issues and unfinished code.
 * !!
 *
 */

import { Vector } from '@/global/classes';
import resize from 'vue-resize-directive';

export default {
  name: 'tml-masonry-grid-item',

  directives: {
    resize,
  },

  props: {
    size: {
      required: true,
      type: Object,
    },

    order: Number,
    uid: String,
  },

  inject: [
    'rowHeight',
    'requestUpdate',
    'draggable',
    'matrix',
  ],

  data() {
    return {
      correctedHeight: null,

      showDebugger: false,
    };
  },

  methods: {
    onUpdateSize(el) {
      if (this.size.x <= this.matrix().columns / 2) {
        const cellHeight = Math.ceil((el.clientHeight + 8) / this.rowHeight);

        if (
          cellHeight !== this.size.y ||
          cellHeight !== this.correctedHeight
        ) {
          this.correctedHeight = cellHeight;
          this.$emit('sizeChanged', new Vector(this.size.x, cellHeight));

          this.requestUpdate();
        }
      }
    },
  },

  watch: {
    order() {
      this.requestUpdate(true);
    },

    size() {
      this.requestUpdate(true);
    },
  },

  theme: $theme => (`
    .masonry-grid-item {
      background-color: ${$theme.colours.background};
    }
  `),
};
</script>

<style lang="scss" scoped>
.tml-masonry-grid-item {
  position: relative;
  width: 100%;
  border-radius: $border-radius;
  background-color: $color-background;

  &.draggable {
    cursor: move;

    * {
      user-select: none;
      pointer-events: none;
    }
  }
}
</style>
