<template>
  <div class="grid">
    <masonry-grid />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { MasonryGrid } from '../../plugins/masonry-grid';

export default Vue.extend({
  name: 'home',

  components: {
    MasonryGrid,
  },
});
</script>
