<template>
  <div class="gbro-navigation flex-shrink w-64 shadow">
    <gbro-nav-item>
      About
    </gbro-nav-item>
    <gbro-nav-item>
      Dank
    </gbro-nav-item>
  </div>
</template>

<script>
import GbroNavItem from './GbroNavItem.vue';

export default {
  name: 'gbro-navigation',

  components: {
    GbroNavItem,
  },
};
</script>

<style>

</style>
