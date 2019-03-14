<template>
  <div class="teedev-logo" :style="{ 'max-width': maxWidth, 'height': height, 'width': width }">
    <div class="image" :style="{ 'background-image': `url('${logo}')` }"></div>
  </div>
</template>

<script>
export default {
  name: 'teedev-logo',
  props: {
    height: String,
    width: String,
    maxWidth: String,
  },
  computed: {
    logo() {
      return this.$theme.logo;
    },
  },
};
</script>

<style lang="scss" scoped>
.teedev-logo {
  width: 100%;

  .image {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
