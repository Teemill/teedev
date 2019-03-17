<template>
  <div class="page-mesh">
    <p>Hi</p>
    <torchlight
      @torchlight-initialised="onTorchlightInitialised"
      />
  </div>
</template>

<script>
import {
  Torchlight,
  BaseObject,
  Rect,
} from '@/global/modules/ProjectTorchlight';

console.log(Torchlight);

export default {
  name: 'page-mesh',

  components: {
    Torchlight,
  },

  methods: {
    onTorchlightInitialised(tcl) {
      console.log(tcl);

      window.cnv = tcl;
      tcl.addObject(new Rect({
        z: 100,
        cornerRadius: 5,
      }));
      tcl.addObject(new Rect({
        x: 200,
        colour: 'red',
        z: 5,
      }));
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
