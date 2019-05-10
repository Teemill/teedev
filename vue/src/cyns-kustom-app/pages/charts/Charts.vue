<template>
  <div class="page-charts">
    <teedev-svg>
      <chart
        :w="300"
        :h="300"
        :data="test"
      />
    </teedev-svg>
    <teedev-button
      text="Random"
      @click="onRandom"
    />
  </div>
</template>

<script>
import Chart from './components/Chart';

export default {
  name: 'page-charts',

  components: {
    Chart,
  },

  data: () => ({
    test: [
      200,
      150,
      100,
      50,
      0,
      -50,
      -100,
    ],

    data: {
      labels: [
        'A',
        'B',
        'C',
        'D',
        'E',
      ],
      datasets: {
        test: [
          20,
          15,
          18,
          22,
          10,
          ],
      },
    },
  }),

  methods: {
    onRandom() {
      const values = [];

      this.test.forEach((value, index) => {
        values.push(Math.floor(Math.random() * 200));
      });

      this.test = values;
    },
  },
}
</script>

<style lang="scss" scoped>
.page-charts {
  padding: 4em;
}
</style>

