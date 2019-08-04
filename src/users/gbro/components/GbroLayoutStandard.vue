<template>
  <div>
    <gbro-header />
    <div class="flex">
      <gbro-navigation />
      <div class="flex-1 mx-auto py-6 min-h-screen">
        <slot />
      </div>
    </div>
    <gbro-footer />
  </div>
</template>

<script>
import GbroHeader from '@/users/gbro/components/GbroHeader.vue';
import GbroFooter from '@/users/gbro/components/GbroFooter.vue';
import GbroNavigation from '@/users/gbro/components/GbroNavigation.vue';

export default {
  name: 'gbro-home',

  components: {
    GbroHeader,
    GbroFooter,
    GbroNavigation,
  },
};
</script>

<style>

</style>
