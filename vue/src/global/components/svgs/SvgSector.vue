<template>
  <path class="teedev-svg-sector" :d="pathString"/>
</template>

<script>
Math.radians = degrees => degrees * Math.PI / 180;
Math.degrees = radians => radians * 180 / Math.PI;

export default {
  name: 'teedev-svg-sector',
  props: {
    x: Number,
    y: Number,
    radius: Number,
    innerRadius: Number,
    startAngle: Number,
    angle: Number,
  },
  computed: {
    pathString() {
      let string = '';

      const arcStartRadians = Math.radians(this.startAngle ? this.startAngle : 0);
      const arcEndRadians = arcStartRadians + Math.radians(this.angle);
      const arcOuterStart = {
        x: this.x + (Math.cos(arcStartRadians) * this.radius),
        y: this.y + (Math.sin(arcStartRadians) * this.radius),
      };
      const arcOuterEnd = {
        x: this.x + (Math.cos(arcEndRadians) * this.radius),
        y: this.y + (Math.sin(arcEndRadians) * this.radius),
      };
      const arcLarge = this.a > 180 ? 1 : 0;

      string += `M${arcOuterStart.x},${arcOuterStart.y}`;
      string += `A${this.radius} ${this.radius}, 0, ${arcLarge}, 1, ${arcOuterEnd.x} ${arcOuterEnd.y}`;

      if (this.innerRadius !== 0) {
        const arcInnerStart = {
          x: this.x + (Math.cos(arcEndRadians) * this.innerRadius),
          y: this.y + (Math.sin(arcEndRadians) * this.innerRadius),
        };
        const arcInnerEnd = {
          x: this.x + (Math.cos(arcStartRadians) * this.innerRadius),
          y: this.y + (Math.sin(arcStartRadians) * this.innerRadius),
        };

        string += `L${arcInnerStart.x},${arcInnerStart.y}`;
        string += `A${this.innerRadius} ${this.innerRadius}, 0, ${arcLarge}, 0, ${arcInnerEnd.x} ${arcInnerEnd.y}Z`;
      } else {
        string += `L${this.x},${this.y}Z`;
      }

      return string;
    },
  },
};
</script>

<style lang="scss" scoped>
  .teedev-svg-sector {
    fill: rgba(0,0,0,0.05);
    // fill: none;
    stroke: rgba(0,0,0,0.2);
  }
</style>
