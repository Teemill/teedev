<template>
  <div class="t-chart-container">
    <vue-frappe
      class="w-full"
      :id="id"
      :class="{
        'chart-dark': darkMode,
      }"
      :labels="labels"
      :title="title"
      :type="type"
      :height="height"
      :colors="colors"
      :dataSets="datasets"
    />
  </div>
</template>

<script>
/**
 * @component t-chart
 * An adaptable chart component based on frappe-charts, using the Vue2-frappe
 * package
 *
 * @see frappe-charts
 * @link https://frappe.io/charts/docs/
 *
 * @see vue2-frappe
 * @link https://github.com/JustSteveKing/vue2-frappe
 *
 * @author G-Bro <https://github.com/G-Bro>
 */
import Chart from 'vue2-frappe';
import Vue from 'vue';

Vue.use(Chart);

export default Vue.extend({
  name: 't-chart',

  props: {
    /**
     * The id of the HTML element
     * Required by the Vue2-Frappe package
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * The data in the following format
     * [{name: 'name', chartType: 'line', values: [...]}]
     */
    datasets: {
      type: Array,
      required: true,
    },

    /**
     * An array of strings that will be used for labels
     */
    labels: {
      type: Array,
      required: true,
    },

    /**
     * The chart's title
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * An array of hex codes to use for the colors of the various datapoints
     */
    colors: {
      type: Array,
      default: () => (
        [
          '#2196F3',
          '#4CAF50',
          '#F44336',
          '#FFEB3B',
          '#673AB7',
          '#009688',
          '#E91E63',
          '#FF9800',
          '#3F51B5',
          '#795548',
        ]
      ),
    },

    /**
     * Type of the chart. In 'axis-mixed' charts the type is defined in the
     * datasets
     */
    type: {
      type: String,
      default: 'axis-mixed',
    },

    /**
     * The height in pixels of the chart
     */
    height: {
      type: Number,
      default: 300,
    },

    /**
     * Makes the chart easier to read on a dark background
     * (designed with colors.gray.800 in mind)
     */
    darkMode: {
      type: Boolean,
    },
  },
})
</script>

<style lang="scss">
/**
 * Cannot be scoped as I need to change CSS of the vue-frappe component
 * self-scoped via the .t-chart-container class
 */
.t-chart-container {
  .chart-dark {
    .frappe-chart {
      .title {
        fill: theme('colors.white');
      }

      .y.axis {
        text {
          fill: theme('colors.white');
        }
      }

      .x.axis {
        text {
          fill: theme('colors.white');
        }
      }

      .chart-legend {
        .legend-dataset-text {
          fill: theme('colors.white');
        }
      }

      .dataset-line {
        circle {
          stroke: theme('colors.material.gray.800');
        }
      }

      .line-chart {
        line {
          stroke: theme('colors.material.gray.600')!important;
        }
      }
    }
  }
}
</style>
