<template>
  <div
    class="masonry-grid-item"
    @click="$emit('click')"
  >
    Masonry Grid Item<br>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'masonry-grid-item',

  props: {
    name: String,
  },

  created() {
    console.log('Grid Item Created');
  },

  mounted() {
    console.log('Grid Item Mounted');
  },
}
</script>

<style lang="scss" scoped>
.masonry-grid-item {
  padding: 0.5em;
  border: 1px solid #0f0;
  background-color: #fff;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
}
</style>
