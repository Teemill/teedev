<template>
  <teedev-svg-group
    class="atmosphere"
    :style="{ 'opacity': density }"
  >
    <!-- <teedev-svg-circle
      :r="planetRadius"
    /> -->
    <teedev-svg-circle
      :x="offset"
      :r="planetRadius + size"
      mask="url(#planet-mask)"
    />
  </teedev-svg-group>
</template>

<script>
export default {
  name: 'atmosphere',

  props: {
    density: Number,
    thickness: {
      type: Number,
      default: 10,
    },
    lightDirection: {
      type: Number,
      default: -0.5,
    },
    planetRadius: Number,
  },

  computed: {
    offset() {
      return Math.sin(this.lightDirection * Math.PI * 0.5) * this.thickness * 0.75;
    },

    size() {
      const sizeOffset = Math.sin(
        Math.max(
          Math.abs(this.lightDirection) - 1,
          0,
        ) * Math.PI * 0.5,
      );

      return -Math.abs(this.offset) + this.thickness - (sizeOffset * this.thickness * 0.5);
    },
  },
};
</script>

<style lang="scss" scoped>
.atmosphere {
  fill: #D24913;
}
</style>
