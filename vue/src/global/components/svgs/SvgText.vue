

<template>
  <text class="teedev-svg-text" :x="x" :y="y">{{text}}</text>
</template>

<script>
export default {
  name: 'teedev-svg-text',
  props: {
    x: Number,
    y: Number,
    text: String,
  },
};
</script>

<style lang="scss" scoped>
  .teedev-svg-text {
    fill: #000;
  }
</style>
