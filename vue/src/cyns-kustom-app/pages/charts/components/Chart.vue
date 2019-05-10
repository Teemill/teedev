<template>
  <teedev-svg-group class="teedev-chart">
    <teedev-svg-text
      :x="20"
      :y="10"
      :text="minValue"
    />
    <teedev-svg-text
      :x="20"
      :y="30"
      :text="maxValue"
    />
    <chart-axis
      :x="50"
      :y="50"
      :w="w"
      :h="h"
      :xInterval="10"
      :yInterval="48"
      :yMin="-100"
      :yMax="200"
    />
    <chart-dataset
      :x="50"
      :y="50"
      :w="w"
      :h="h"
      :data="data"
      :min="-100"
      :max="200"
    />
  </teedev-svg-group>
</template>

<script>
import ChartAxis from './ChartAxis';
import ChartDataset from './ChartDataset';

export default {
  name: 'teedev-chart',

  filters: {
    ceil(value) {
      return Math.ceil(value);
    },

    floor(value) {
      return Math.floor(value);
    },
  },

  components: {
    ChartAxis,
    ChartDataset,
  },

  props: {
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      required: true,
    },

    data: Array,
  },

  computed: {
    maxValue() {
      let currentValue = null;

      this.data.forEach(value => {
        if (currentValue === null || value > currentValue) {
          currentValue = value;
        }
      });

      return currentValue;
    },

    minValue() {
      let currentValue = null;

      this.data.forEach(value => {
        if (currentValue === null || value < currentValue) {
          currentValue = value;
        }
      });

      return currentValue;
    },
  }
}
</script>

<style lang="scss" scoped>
.teedev-chart {

}
</style>

