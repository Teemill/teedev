<template>
  <svg class="teedev-svg" width="500" height="500" viewBox="0 0 500 500">
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
    margin: 1em;
    transform: translate(0.5px, 0.5px);
  }
</style>
