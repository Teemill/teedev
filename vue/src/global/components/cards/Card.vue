<template>
  <div class="teedev-card">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'teedev-card',
};
</script>

<style lang="scss" scoped>


.teedev-card {
  padding: 1em 1em 0 1em;
  margin-bottom: 1em;
  // background-color: rgba(0,0,0,0.05);
  border-bottom: 1px solid $color-secondary;
  // border-radius: $border-radius;
}
</style>
