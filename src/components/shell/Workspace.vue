<template>
  <div class="workspace">
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'workspace',  
})
</script>

<style lang="scss" scoped>
@include page-transition;
</style>


