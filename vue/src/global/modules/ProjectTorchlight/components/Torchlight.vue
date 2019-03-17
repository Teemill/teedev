<template>
  <div
    v-torchlight-canvas="onTorchlightInitialised"
  ></div>
</template>

<script>
import Torchlight from './../assets/js/torchlight';
import torchlightDirective from './../directives/torchlight-directive';

export default {
  name: 'torchlight',

  methods: {
    onTorchlightInitialised(e) {
      console.log('twig', e);
      this.$emit('torchlight-initialised', e);
    }
  }
}
</script>

<style>

</style>
