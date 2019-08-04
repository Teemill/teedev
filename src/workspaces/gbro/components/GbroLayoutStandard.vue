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
import GbroHeader from '@/workspaces/gbro/components/GbroHeader.vue';
import GbroFooter from '@/workspaces/gbro/components/GbroFooter.vue';
import GbroNavigation from '@/workspaces/gbro/components/GbroNavigation.vue';

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
