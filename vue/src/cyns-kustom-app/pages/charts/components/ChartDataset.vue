<template>
  <teedev-svg-group
    class="teedev-chart-dataset"
    :x="x"
    :y="y"
  >
    <template
      v-for="(bar, index) in bars"
    >
      <teedev-animation
        :key="`bar-${index}`"
        :value="bar.h"
        :time="500"
      >
        <template #default="{ value }">
          <teedev-svg-group>
            <teedev-svg-text
              :x="bar.x + (bar.w * 0.5)"
              :y="h + 16"
              :text="bar.val"
              align="center"
              style="font-size: 12px;"
            />
            <teedev-svg-box
              class="bar"
              :x="bar.x"
              :y="h - bar.y - value.berp"
              :w="bar.w"
              :h="value.berp"
            />
          </teedev-svg-group>
        </template>
      </teedev-animation>
    </template>
  </teedev-svg-group>
</template>

<script>
export default {
  name: 'teedev-chart-dataset',

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

    data: {
      type: Array,
      required: true,
    },

    min: {
      type: Number,
      required: true,
    },

    max: {
      type: Number,
      required: true,
    },
  },
  
  computed: {
    bars() {
      const xInterval = this.w / this.data.length;
      const barWidth = Math.min(50, xInterval);

      return this.data.map((value, index) => {
        return {
          x: (index * xInterval) + ((xInterval - barWidth) * 0.5),
          y: 0,
          w: barWidth,
          h: ((value - this.min) / (this.max - this.min)) * this.h,
          val: value,
        };
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.teedev-chart-dataset {
  .bar {
    fill: rgba(0, 0, 0, 0.2);
    stroke: rgba(0, 0, 0, 0.8);
    stroke-width: 1px;
  }
}
</style>

