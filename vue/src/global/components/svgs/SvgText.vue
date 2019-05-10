

<template>
  <text class="teedev-svg-text" :text-anchor="textAnchor" :x="x" :y="y">{{text}}</text>
</template>

<script>
export default {
  name: 'teedev-svg-text',
  props: {
    x: Number,
    y: Number,

    text: [String, Number],
    align: {
      type: String,
      default: 'left',
    },
  },

  computed: {
    textAnchor() {
      switch (this.align) {
        case 'left':
        default:
          return 'start';
          break;

        case 'center':
          return 'middle';
          break;

        case 'right':
          return 'end';
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .teedev-svg-text {
    fill: #000;
  }
</style>
