<template>
  <div class="layout-onepager">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'layout-onepager',
};
</script>

<style lang="scss" scoped>
.layout-onepager{
  min-height: 100vh;
}
</style>
