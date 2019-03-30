<template>
  <ellipse :cx="x" :cy="y" :rx="rx" :ry="ry" />
</template>

<script>
export default {
  name: 'teedev-svg',
  props: {
    x: Number,
    y: Number,
    rx: Number,
    ry: Number,
  },
};
</script>

<style lang="scss" scoped>
  .teedev-svg-box {
    stroke: #000;
  }
</style>
