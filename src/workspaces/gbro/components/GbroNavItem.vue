<template>
  <div class="gbro-nav-item">
    <router-link :to="to">
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

<style>

</style>
