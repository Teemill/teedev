<template>
  <rect class="teedev-svg-box" :x="x" :y="y" :width="w" :height="h"/>
</template>

<script>
export default {
  name: 'teedev-svg',
  props: {
    x: Number,
    y: Number,
    w: Number,
    h: Number,
  },
};
</script>

<style lang="scss" scoped>
  .teedev-svg-box {
    stroke: #000;
  }
</style>
