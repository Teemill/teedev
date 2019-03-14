<template>
  <div
    class="teedev-selection-highlighter"
    :class="{
      'active': hoveringIndex !== null,
      'smooth': smoothAnim,
      'vertical': vertical,
    }"
  >
    <div ref="items" class="items" @mouseout="onLeave()">
      <div
        v-for="(item, index) in $slots.default"
        :key="index"
        class="item"
        @mouseover="onHover(index, item)"
      >
        <v-node :node="item" />
      </div>
    </div>
    <Motion :values="hoveringItem">
      <div
        slot-scope="values"
        class="selection-highlight"
        :style="{
          'left': `${smoothAnim ? values.x : hoveringItem.x}px`,
          'top': `${smoothAnim ? values.y : hoveringItem.y}px`,
          'width': `${smoothAnim ? values.w : hoveringItem.w}px`,
          'height': `${smoothAnim ? values.h : hoveringItem.h}px`,
        }"
      >
        <div class="underline"></div>
      </div>
    </Motion>
  </div>
</template>

<script>
const VNode = {
  functional: true,
  render: (h, ctx) => ctx.props.node,
};

export default {
  name: 'teedev-selection-highlighter',
  components: {
    VNode,
  },
  props: {
    vertical: Boolean,
  },
  computed: {
    hoveringItem() {
      const self = this._computedWatchers.hoveringItem.value;
      const childIndex = this.hoveringIndex;

      if (childIndex !== null) {
        const slotItemContainer = this.$refs.items;

        if (slotItemContainer) {
          const slotItem = slotItemContainer.children[childIndex].firstChild;

          return {
            x: slotItem.offsetLeft,
            y: slotItem.offsetTop,
            w: slotItem.offsetWidth,
            h: slotItem.offsetHeight,
          };
        }
      } else if (self) {
        return {
          x: self.x,
          y: self.y,
          w: self.w,
          h: self.h,
        };
      }
      return {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      };
    },
  },
  data() {
    return {
      hoveringIndex: null,
      smoothAnim: false,
    };
  },
  methods: {
    onHover(index) {
      this.hoveringIndex = index;
    },
    onLeave() {
      this.hoveringIndex = null;
    },
  },
  watch: {
    hoveringIndex(newValue, oldValue) {
      this.smoothAnim = (oldValue !== null);
    },
  },
};
</script>

<style lang="scss" scoped>


.teedev-selection-highlighter {
  position: relative;

  .items {
    &::after {
      display: table;
      content: '';
      clear: both;
    }
  }

  .selection-highlight {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    transition: background-color $anim-time-m;
    pointer-events: none;
    overflow: hidden;

    .underline {
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 0%;
      height: 2px;
      background-color: $color-primary;
      transition: left $anim-time-m, width $anim-time-m;
    }
  }

  &.active {
    .selection-highlight {
      background-color: rgba(#000, 0.05);
      transition: background-color $anim-time-m;

      .underline {
        left: 0%;
        width: 100%;
      }
    }
  }

  &.smooth {
    .selection-highlight {
      // transition:
      // top $anim-time-m,
      // left $anim-time-m,
      // width $anim-time-m,
      // height $anim-time-m, background-color $anim-time-m;
    }
  }

  &.vertical {
    .selection-highlight {
      border-top-left-radius: 0;
      border-bottom-right-radius: $border-radius;

      .underline {
        top: 50%;
        left: 0;
        right: 0;
        width: 2px;
        height: 0%;
        transition: top $anim-time-m, height $anim-time-m;
      }
    }

    &.active {
      .selection-highlight {
        .underline {
          top: 0%;
          height: 100%;
        }
      }
    }
  }
}
</style>
