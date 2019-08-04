<template>
  <div class="home">
    This is DEvans home.

    <typescript-comp />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TypescriptComp from '@devan/components/Typescript.vue';

export default Vue.extend({
  name: 'home',

  components: {
    TypescriptComp,
  },
});
</script>
