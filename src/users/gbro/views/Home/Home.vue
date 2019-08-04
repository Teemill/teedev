<template>
  <gbro-layout-standard>
    <div class="container mx-auto">
      <h1>Welcome to my workspace</h1>
      <p class="mb-3">Here is a tortoise.</p>
    </div>
    <img :src="require('@/users/gbro/assets/tortoise_sky.png')" />
    <div class="container mx-auto">
      <p>His name is Jeffrey and he doesn't like you</p>
    </div>
  </gbro-layout-standard>
</template>

<script>
import GbroLayoutStandard from '@/users/gbro/components/GbroLayoutStandard.vue';

export default {
  name: 'gbro-home',

  components: {
    GbroLayoutStandard,
  },
};
</script>

<style>

</style>
