<template>
  <teedev-svg-circle
    class="crater"
    :x="position.x"
    :y="position.y"
    :r="radius"
    :rotate="-angle"
    :sx="scale"
  />
</template>

<script>
import { Vector, Angle } from '@/global/plugins/physics';

export default {
  name: 'crater',

  props: {
    angle: Number,
    offset: Number,
    radius: Number,
    planetRadius: Number,
  },

  computed: {
    position() {
      return (new Vector((this.offset * this.planetRadius), 0))
        .rotateAround(
          new Vector(0, 0),
          new Angle(this.angle),
        );
    },

    scale() {
      return Math.cos(((this.offset * this.planetRadius) / (this.planetRadius * 2.5)) * Math.PI);
    },
  },
};
</script>

<style lang="scss" scoped>
.crater {
  fill: #000;
}
</style>
