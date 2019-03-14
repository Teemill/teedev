<template>
  <svg class="teedev-svg" width="400" height="200" viewBox="0 0 400 200">
    <slot/>
  </svg>
</template>

<script>
export default {
  name: 'teedev-svg',
};
</script>

<style lang="scss" scoped>
  .teedev-svg {
    transform: translate(0.5px, 0.5px);
  }
</style>
