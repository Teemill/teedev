<template>
  <g class="teedev-data-set">

    <path class="line-light" :d="testAreaMarks('x', 200, 190, 10)"/>
    <path class="line-light" :d="testAreaMarks('y', 200, 190, 10)"/>
    <path class="line" :d="testAxis('x', 200, 190, 20, 4, 2)"/>
    <path class="line" :d="testAxis('y', 200, 190, 20, 4, 2)"/>

    <g
      v-for="(dataset, dsIndex) in chartData"
      :key="dsIndex"
    >
      <path
        v-for="(value, key) in dataset"
        :key="key"

        :class="`${dsIndex === 0 ? 'green' : (dsIndex === 1 ? 'red' : 'blue')}-line`"
        :d="testSection(
          value.value,
          value.fromOffset + (dsIndex * 50),
          value.value,
          value.toOffset + (key * 50),
          200
        )"
      />
    </g>

    <!-- <path class="green-line" :d="testSection(5, 20, 5, 50, 200)"/>
    <path class="green-line" :d="testSection(30, 25, 30, 5, 200)"/>

    <path class="red-line" :d="testSection(10, 65, 10, 55, 200)"/>
    <path class="red-line" :d="testSection(40, 75, 40, 100, 200)"/>

    <path class="blue-line" :d="testSection(5, 125, 5, 0, 200)"/>
    <path class="blue-line" :d="testSection(20, 130, 20, 65, 200)"/>
    <path class="blue-line" :d="testSection(30, 150, 30, 140, 200)"/> -->

    <!-- <circle
      v-for="(point, index) in dataPoints"
      :key="index"
      class="point"
      :cx="point.x"
      :cy="point.y"
      r="4"
    /> -->
  </g>
</template>

<script>
export default {
  name: 'teedev-data-set',
  props: {
    height: Number,
    width: Number,
    dataSet: Array,
    dataMax: Number,
  },
  data() {
    return {
      datasets: [
        {
          1: 20,
          2: 10,
          3: 15,
        },
        {
          1: 10,
          2: 20,
          3: 15,
        },
        {
          1: 15,
          2: 5,
        },
      ],
    };
  },
  computed: {
    chartData() {
      const data = [];

      const fromGroups = {};
      const toGroups = {};

      for (let fromKey = 0; fromKey < this.datasets.length; fromKey += 1) {
        const dataset = this.datasets[fromKey];
        const group = [];

        if (!fromGroups[fromKey]) {
          fromGroups[fromKey] = 0;
        }

        const datasetKeys = Object.keys(dataset);
        for (let i = 0; i < datasetKeys.length; i += 1) {
          const toKey = datasetKeys[i];
          const value = dataset[toKey];

          if (!toGroups[toKey]) {
            toGroups[toKey] = 0;
          }

          group.push({
            value,
            fromOffset: fromGroups[fromKey],
            toOffset: toGroups[toKey],
          });

          toGroups[toKey] += value;
          fromGroups[fromKey] += value;
        }

        data.push(group);
      }

      console.log(data);
      return data;
    },
    dataPoints() {
      const points = [];

      for (let i = 0; i < this.dataSet.length; i += 1) {
        points.push({
          x: i * (this.width / (this.dataSet.length - 1)),
          y: this.height - (this.dataSet[i] * (this.height / this.dataMax)),
        });
      }

      return points;
    },
  },

  methods: {
    testAxis(axis, width, height, ticks, largeTicks, medTicks) {
      let path = '';

      if (axis === 'x') {
        const tickSpacing = width / ticks;
        for (let i = 0; i < ticks + 1; i += 1) {
          const something = i % medTicks ? 2 : 3;

          path += this.line(
            { x: i * tickSpacing, y: height },
            { x: i * tickSpacing, y: height - (i % largeTicks ? something : 5) },
          );
        }

        path += this.line(
          { x: 0, y: height },
          { x: width, y: height },
        );
      } else {
        const tickSpacing = height / ticks;
        for (let i = 0; i < ticks + 1; i += 1) {
          const something = i % medTicks ? 2 : 3;

          path += this.line(
            { x: 0, y: height - (i * tickSpacing) },
            { x: (i % largeTicks ? something : 5), y: height - (i * tickSpacing) },
          );
        }

        path += this.line(
          { x: 0, y: 0 },
          { x: 0, y: height },
        );
      }

      return path;
    },

    testAreaMarks(axis, width, height, ticks) {
      let path = '';

      if (axis === 'x') {
        const tickSpacing = width / ticks;
        for (let i = 0; i < ticks + 1; i += 1) {
          path += this.line(
            { x: i * tickSpacing, y: 0 },
            { x: i * tickSpacing, y: height },
          );
        }
      } else {
        const tickSpacing = width / ticks;
        for (let i = 0; i < ticks + 1; i += 1) {
          path += this.line(
            { x: 0, y: height - (i * tickSpacing) },
            { x: width, y: height - (i * tickSpacing) },
          );
        }
      }

      return path;
    },

    testSection(value1, offset1, value2, offset2, width) {
      let path = '';
      const halfWidth = width * 0.5;

      path += this.bezierCurve(
        { x: 0, y: offset1 },
        { x: halfWidth, y: offset1 },
        { x: halfWidth, y: offset2 },
        { x: width, y: offset2 },
      );

      path += this.line(null, { x: width, y: offset2 + value2 });

      path += this.bezierCurve(
        null,
        { x: halfWidth, y: offset2 + value2 },
        { x: halfWidth, y: offset1 + value1 },
        { x: 0, y: offset1 + value1 },
      );

      path += this.line(null, { x: 0, y: 0 });

      return path;
    },

    bezierCurve(p1, c1, c2, p2) {
      if (p1) {
        return `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y} `;
      }
      return `C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y} `;
    },

    line(x1, x2) {
      if (x1) {
        return `M${x1.x},${x1.y} L${x2.x},${x2.y} `;
      }
      return `L${x2.x},${x2.y} `;
    },
  },
};
</script>

<style lang="scss" scoped>
  .teedev-data-set {
    transform: translate(0.5px, 0.5px);

    .green-line {
      fill: rgba(#2ecc71, 0.5);
      // stroke: #2ecc71;
      stroke-width: 1px;

      &:hover {
        fill: rgba(#2ecc71, 0.8);
      }
    }
    .red-line {
      fill: rgba(#e74c3c, 0.5);
      // stroke: #e74c3c;
      stroke-width: 1px;

      &:hover {
        fill: rgba(#e74c3c, 0.8);
      }
    }
    .blue-line {
      fill: rgba(#3498db, 0.5);
      // stroke: #3498db;
      stroke-width: 1px;

      &:hover {
        fill: rgba(#3498db, 0.8);
      }
    }

    .blue {
      &:hover {
        .blue-line {
          fill: rgba(#3498db, 0.8);
        }
      }
    }

    .line {
      stroke: rgba(0,0,0,0.5);
      stroke-width: 1px;
    }

    .line-light {
      stroke: rgba(0,0,0,0.05);
      stroke-width: 1px;
    }

    .point {
      fill: #fff;
      stroke: #000;
      stroke-width: 1px;
    }
  }
</style>
