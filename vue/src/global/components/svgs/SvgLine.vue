<template>
  <path class="teedev-svg-line" :d="pathString"/>
</template>

<script>
export default {
  name: 'teedev-svg-line',
  props: {
    points: Array,
  },
  computed: {
    pathString() {
      let string = '';

      for (let i = 0; i < this.points.length; i += 1) {
        const point = this.points[i];

        if (string === '') {
          string += `M${point.x},${point.y}`;
        } else {
          string += ` L${point.x},${point.y}`;
        }
      }

      return string;
    },
  },
};
</script>

<style lang="scss" scoped>
  .teedev-svg-line {
    fill: none;
    stroke: #000;
  }
</style>
