<template>
  <rect
    class="teedev-svg-box"
    :x="w < 0 ? x + w : x"
    :y="h < 0 ? y + h : y"
    :width="w < 0 ? -w : w"
    :height="h < 0 ? -h : h"
  />
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
  transform: translate(0.5px, 0.5px);
}
</style>

