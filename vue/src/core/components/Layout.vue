<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'layout',
  
  computed: {
    layout() {
      const pageLayout = this.$store.state.route.meta.layout;

      if (pageLayout) {
        return `${pageLayout}-layout`;
      }

      return 'none-layout';
    },
  },
}
</script>
