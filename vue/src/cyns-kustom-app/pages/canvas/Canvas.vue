<template>
  <div class="page-canvas">
    Canvas
    <teedev-canvas />
  </div>
</template>

<script>
import TeedevCanvas from './components/Canvas';

export default {
  name: 'page-canvas',

  components: {
    TeedevCanvas,
  },
};
</script>

<style lang="scss" scoped>
.page-canvas {
  padding: 4em;
}
</style>

