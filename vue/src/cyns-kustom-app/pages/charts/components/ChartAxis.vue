<template>
  <teedev-svg-group
    class="teedev-chart-axis"
    :x="x"
    :y="y"
  >
    <teedev-svg-line
      class="axis"
      :points="[
        new Vector(0, 0),
        new Vector(0, h + 16),
      ]"
    />
    <teedev-svg-line
      class="axis"
      :points="[
        new Vector(-16, h),
        new Vector(w, h),
      ]"
    />

    <template
      v-for="(tick, index) in verticalTicks"
    >
      <teedev-svg-line
        :key="`v-tick-${index}`"

        class="tick"
        :class="{
          highlighted: tick.v === 0,
        }"

        :points="[
          new Vector(tick.x, tick.y),
          new Vector(w, tick.y),
        ]"
      />
      <teedev-svg-text
        :key="`v-tick-text-${index}`"

        class="tick-text"
        :x="tick.x - 6"
        :y="tick.y + 5"
        :text="tick.text"
        align="right"
      />
    </template>

    <teedev-svg-line
      v-for="(tick, index) in horizontalTicks"
      :key="`h-tick-${index}`"

      class="tick"
      :points="[
        new Vector(tick.x, 0),
        new Vector(tick.x, h + tick.y),
      ]"
    />
  </teedev-svg-group>
</template>

<script>
import { Vector } from '@/global/plugins/physics';

export default {
  name: 'teedev-chart-axis',

  props: {
    x: { 
      type: Number,
      required: false,
    },

    y: { 
      type: Number,
      required: false,
    },

    w: {
      type: Number,
      required: true,
    },

    h: {
      type: Number,
      required: true,
    },

    xInterval: Number,
    yInterval: Number,

    xLabels: Array,
    yLabels: Array,

    yMin: Number,
    yMax: Number,
  },
  
  data: () => ({
    Vector,

    marginLeft: 10,
    marginBottom: 30,
  }),

  computed: {
    verticalTicks() {
      const ticks = [];

      const delta = this.yMax - this.yMin;
      const tickCount = Math.ceil(delta / this.yInterval)
      const range = tickCount * this.yInterval;
      const scalar = this.h / range;

      for (let i = 0; i <= tickCount; i++) {
        const value = (i * this.yInterval) + this.yMin;

        const tick = {
          x: -8,
          y: Math.round(((tickCount - i) * this.yInterval) * scalar),
          v: value,
        };

        tick.text = value; // Math.round(this.yMin * (range / delta));
        
        ticks.push(tick);
      }

      // const yInterval = this.h / this.yTicks;

      // for (let i = 0; i < this.yTicks; i++) {
      //   const tick = {
      //     x: -8,
      //     y: i * yInterval,
      //   };  
        
      //   tick.text = this.yMin + ((this.yMax - this.yMin) / this.yTicks) * (this.yTicks - i);

      //   ticks.push(tick);
      // }

      return ticks;
    },

    horizontalTicks() {
      const ticks = [];
      const xInterval = this.w / this.xTicks;

      for (let i = 0; i < this.xTicks; i++) {
        ticks.push({
          x: i * xInterval,
          y: 8,
        });        
      }

      return ticks;
    },
  },
}
</script>

<style lang="scss" scoped>
.teedev-chart-axis {
  .axis {
    stroke: rgba(0, 0, 0, 0.4);
  }

  .tick {
    stroke: rgba(0, 0, 0, 0.2);

    &.highlighted {
      stroke: rgba(0, 0, 0, 0.6);
    }
  }

  .tick-text {
    fill: rgba(0, 0, 0, 0.6);
    font-size: 0.75em;
  }
}
</style>

