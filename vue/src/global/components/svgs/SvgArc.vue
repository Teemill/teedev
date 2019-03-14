<template>
  <path class="teedev-svg-arc" :d="pathString"/>
</template>

<script>
Math.radians = degrees => degrees * Math.PI / 180;
Math.degrees = radians => radians * 180 / Math.PI;

export default {
  name: 'teedev-svg-arc',
  props: {
    x: Number,
    y: Number,
    r: Number,
    s: Number,
    a: Number,
  },
  computed: {
    pathString() {
      let string = '';

      const arcStartRadians = Math.radians(this.s ? this.s : 0);
      const arcEndRadians = arcStartRadians + Math.radians(this.a);
      const arcStart = {
        x: this.x + (Math.cos(arcStartRadians) * this.r),
        y: this.y + (Math.sin(arcStartRadians) * this.r),
      };
      const arcEnd = {
        x: this.x + (Math.cos(arcEndRadians) * this.r),
        y: this.y + (Math.sin(arcEndRadians) * this.r),
      };
      const arcLarge = this.a > 180 ? 1 : 0;

      string += `M${arcStart.x},${arcStart.y}`;
      string += `A${this.r} ${this.r}, 0, ${arcLarge}, 1, ${arcEnd.x} ${arcEnd.y}`;

      string += `L${this.x},${this.y}Z`;

      // string += `M${this.x},${this.y} L${arcStart.x},${arcStart.y}`
      // string += `M${this.x},${this.y} L${arcEnd.x},${arcEnd.y}`

      return string;
    },
  },
};
</script>

<style lang="scss" scoped>
  .teedev-svg-arc {
    fill: rgba(0,0,0,0.05);
    // fill: none;
    stroke: rgba(0,0,0,0.2);
  }
</style>
