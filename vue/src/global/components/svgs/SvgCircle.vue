<template>
  <circle
    cx="0"
    cy="0"
    :r="r"
    :style="{
      'transform': `
        translate(${x}px, ${y}px)
        rotate(${rotate}deg)
        scale(${sx}, ${sy})
      `,
    }"
  />
</template>

<script>
export default {
  name: 'teedev-svg-circle',

  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    r: {
      required: true,
      type: Number,
    },
    rotate: {
      type: Number,
      default: 0,
    },
    sx: {
      type: Number,
      default: 1,
    },
    sy: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
  .teedev-svg-box {
    stroke: #000;
  }
</style>
