<template>
  <component
    class="layout"
    :is="layout"
  >
    <slot />
  </component>
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
