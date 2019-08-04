<template>
  <gbro-layout-standard>

    <gbro-box background="#fff">
      <div class="container mx-auto flex">
        <div class="flex-shrink w-1/4">

          <el-card class="box-card" shadow="never">
            <template #header>
              <span>Profits <small class="text-xs text-gray-500 inline-block float-right">month to date</small></span>
            </template>
            <p class="text-5xl text-blue-500 inline-block">
              £753.51
            </p>
            <p class="text-xs inline-block">
            </p>
          </el-card>

        </div>
        <div class="flex-1 w-3/4 pl-6">

          <el-card class="box-card" shadow="never">
            <template #header>
              <span>Profits</span>
            </template>
            <p>Hi</p>
          </el-card>

        </div>
      </div>
    </gbro-box>

    <gbro-box background="#323232">
      <div class="container mx-auto">
        <vue-frappe
            id="test"
            class="chart-dark"
            :labels="[
                '12am-3am', '3am-6am', '6am-9am', '9am-12pm',
                '12pm-3pm', '3pm-6pm', '6pm-9pm', '9pm-12am'
            ]"
            title="Sales"
            type="axis-mixed"
            :height="300"
            :colors="['#5fcd4a', '#3ba0ff', '#ff993b', '#ff3f3b']"
            :dataSets="chartData"
          >
        </vue-frappe>
      </div>
    </gbro-box>

  </gbro-layout-standard>
</template>

<script>
import GbroLayoutStandard from '@gbro/components/GbroLayoutStandard.vue';
import GbroBox from '@gbro/components/GbroBox.vue';

import { Card } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Chart from 'vue2-frappe';
import Vue from 'vue';

Vue.use(Chart);

Vue.component(Card.name, Card);

export default {
  name: 'gbro-dashboard',

  components: {
    GbroLayoutStandard,
    GbroBox,
  },

  data: () => ({
    chartData: [
        {
            name: "Some Data", chartType: "line",
            values: [25, 40, 30, 35, 8, 52, 17, 4]
        },
        {
            name: "Another Set", chartType: "line",
            values: [25, 50, 10, 15, 18, 32, 27, 14]
        },
        {
            name: "Final Set", chartType: "line",
            values: [14, 33, 10, 8, 23, 31, 27, 2]
        },
    ],
  }),
};
</script>

<style lang="scss">
.chart-dark {
  .frappe-chart {
    .title {
      fill: #fff;
    }

    .y.axis {
      text {
        fill: #fff;
      }
    }

    .x.axis {
      text {
        fill: #fff;
      }
    }

    .chart-legend {
      .legend-dataset-text {
        fill: #fff;
      }
    }

    .dataset-line {
      circle {
        stroke: #323232;
      }
    }

    .line-chart {
      line {
        stroke: #555!important;
      }
    }
  }
}
</style>
