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
        <t-chart
          id="dark"
          :labels="[
              '12am-3am', '3am-6am', '6am-9am', '9am-12pm',
              '12pm-3pm', '3pm-6pm', '6pm-9pm', '9pm-12am'
          ]"
          title="Sales"
          :datasets="chartData"
          dark-mode
        />
        <div>
          <div class="inline-block w-1/3">
            <t-chart
              id="dark-pie"
              :labels="[
                  'A', 'B', 'C', 'D', 'E', 'F',
              ]"
              title="Swagness"
              :datasets="pieData"
              type="pie"
              dark-mode
            />
          </div>
          <div class="inline-block w-2/3">
            <t-chart
              id="dark-line"
              :labels="[
                  'A', 'B', 'C', 'D', 'E', 'F',
              ]"
              title="Swagness"
              :datasets="pieData"
              type="bar"
              dark-mode
            />
          </div>
        </div>
      </div>
    </gbro-box>

    <gbro-box background="#fff">
      <div class="container mx-auto">
        <t-chart
          id="light"
          :labels="[
              '12am-3am', '3am-6am', '6am-9am', '9am-12pm',
              '12pm-3pm', '3pm-6pm', '6pm-9pm', '9pm-12am'
          ]"
          title="Swag over time"
          :datasets="chartData"
          :colors="[
            '#673AB7',
            '#009688',
            '#E91E63',
          ]"
        />
        <div>
          <div class="inline-block w-1/3">
            <t-chart
              id="light-pie"
              :labels="[
                  'A', 'B', 'C', 'D', 'E', 'F',
              ]"
              title="Swagness"
              :datasets="pieData"
              type="pie"
            />
          </div>
          <div class="inline-block w-2/3">
            <t-chart
              id="light-line"
              :labels="[
                  'A', 'B', 'C', 'D', 'E', 'F',
              ]"
              title="Swagness"
              :datasets="pieData"
              type="bar"
            />
          </div>
        </div>
      </div>
    </gbro-box>

  </gbro-layout-standard>
</template>

<script>
import TChart from '@/components/charts/TChart.vue';

import GbroLayoutStandard from '@gbro/components/GbroLayoutStandard.vue';
import GbroBox from '@gbro/components/GbroBox.vue';

import { Card } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';

Vue.component(Card.name, Card);

export default Vue.extend({
  name: 'gbro-dashboard',

  components: {
    GbroLayoutStandard,
    GbroBox,
    TChart,
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
    pieData: [
      {
        name: 'swag',
        chartType: 'bar',
        values: [14, 6, 8, 2, 5, 7],
      },
    ],
  }),
});
</script>