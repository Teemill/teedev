<template>
  <div class="masonry-grid-item">
    <slot/>
  </div>
</template>

<script>
import { Vector } from '@/global/plugins/physics';

export default {
  name: 'masonry-grid-item',

  props: {
    size: {
      required: true,
      type: Vector,
    },
  },
}
</script>

<style lang="scss" scoped>
.masonry-grid-item {
  height: 100%;
}
</style>
