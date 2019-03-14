<template>
  <div class="teedev-floating-container">
    <div class="content" :style="{ 'width': maxWidth, 'height': maxHeight }">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teedev-floating-container',
  props: {
    maxWidth: String,
    maxHeight: String,
  },
};
</script>

<style lang="scss" scoped>
.teedev-floating-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 1em;

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
