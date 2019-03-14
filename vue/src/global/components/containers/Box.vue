<template>
  <div class="teedev-box">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'teedev-box',
  props: {
    maxWidth: String,
    maxHeight: String,
  },
};
</script>

<style lang="scss" scoped>
.teedev-box {
  position: relative;
  width: 100%;
  padding: 1em;
  background-color: $color-background;
  border-radius: $border-radius;
  overflow-y: auto;
}
</style>
