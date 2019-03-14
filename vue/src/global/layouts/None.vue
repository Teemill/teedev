<template>
  <div class="layout-none">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'layout-none',
};
</script>

<style lang="scss" scoped>
.layout-none{
  min-height: 100vh;
}
</style>
