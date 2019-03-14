<template>
  <div class="page-grid">
    <masonry-grid>
      <p>Test</p>
    </masonry-grid>
  </div>
</template>

<script>
import MasonryGrid from './components/MasonryGrid';

export default {
  name: 'page-grid',

  components: {
    MasonryGrid,
  },
};
</script>

<style lang="scss" scoped>
.page-grid {
}
</style>
