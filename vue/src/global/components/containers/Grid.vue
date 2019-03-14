<template>
  <div
    class="teedev-grid"
    :class="{ 'fill': fill }"
  >
    <div
      class="inner"
      :style="{ 'margin': `calc(-${spacing} * 0.5)` }"
    >
      <teedev-grid-item
        v-for="(slotItem, index) in $slots.default"
        :key="index"
        :slot-item="slotItem"
        :flex-basis="itemFlexBasis"
        :max-width="maxItemWidth"
        :margin="`calc(${spacing} * 0.5)`"
      />
    </div>
  </div>
</template>

<script>
const TeedevGridItem = {
  functional: true,
  render(h, ctx) {
    return h(
      'div',
      {
        class: ['grid-item'],
        style: {
          width: `${ctx.props.flexBasis}%`,
          'max-width': `${ctx.props.maxWidth}px`,
          'flex-basis': `${ctx.props.flexBasis}%`,
        },
      },
      [
        h(
          'div',
          {
            style: {
              margin: ctx.props.margin,
            },
          },
          [ctx.props.slotItem],
        ),
      ],
    );
  },
};

export default {
  name: 'teedev-grid',
  components: {
    TeedevGridItem,
  },
  props: {
    relative: Boolean,
    fill: Boolean,
    breakpoints: Object,
    minItemWidth: Number,
    maxItemWidth: Number,
    spacing: String,
  },
  computed: {
    itemFlexBasis() {
      return (1 / this.columns) * 100;
    },
    computedBreakpoints() {
      const breakpoints = {};

      const breakpointKeys = Object.keys(this.breakpoints);
      for (let i = 0; i < breakpointKeys.length; i += 1) {
        const breakpointKey = breakpointKeys[i];
        const breakpointValue = this.breakpoints[breakpointKey];

        if (typeof breakpointKey === 'string') {
          const presetKey = this.presetBreakPoints[breakpointKey];
          breakpoints[presetKey] = breakpointValue;
        } else {
          breakpoints[breakpointKey] = breakpointValue;
        }
      }

      return breakpoints;
    },
  },
  data() {
    return {
      columns: 0,
      presetBreakPoints: {
        xl: 1200,
        lg: 992,
        md: 768,
        sm: 576,
        xs: 0,
      },
    };
  },
  methods: {
    onResize() {
      if (this.minItemWidth) {
        this.columns = Math.floor(this.$el.clientWidth / this.minItemWidth);
      } else {
        const breakpointKeys = Object.keys(this.computedBreakpoints);
        for (let i = 0; i < breakpointKeys.length; i += 1) {
          const breakpointWidth = breakpointKeys[i];
          const breakpointColumns = this.computedBreakpoints[breakpointWidth];

          if (
            (this.$el.clientWidth > breakpointWidth && this.relative)
            || (window.innerWidth > breakpointWidth && !this.relative) // eslint-disable-line
          ) {
            this.columns = breakpointColumns;
          }
        }
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize); // eslint-disable-line
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize); // eslint-disable-line
  },
};
</script>

<style lang="scss" scoped>
.teedev-grid {
  display: inline-block;
  width: 100%;

  .inner {
    display: flex;
    flex-wrap: wrap;

    .grid-item {
      flex-basis: 25%;
    }

    &.fill .grid-item {
      flex-grow: 1;
    }
  }
}
</style>
