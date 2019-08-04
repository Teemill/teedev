<template>
  <div class="gbro-nav-item">
    <router-link :to="to" class="p-4 py-2 inline-block w-full">
      <slot />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'gbro-nav-item',

  props: {
    to: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.gbro-nav-item {
  a:hover {
    background: #e9e9e9;
  }
}
</style>
