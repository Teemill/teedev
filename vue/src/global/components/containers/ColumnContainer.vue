<template>
  <div class="teedev-column-container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'teedev-column-container',
};
</script>

<style lang="scss" scoped>
.teedev-column-container {
  display: flex;
  width: 100%;
}
</style>
