<template>
  <div class="page-test">
    <div v-if="relativity">
      <p>Mouse Pos: {{relativity.mousePos}}</p>
      <p>Mouse Start Pos: {{relativity.mouseStartPos}}</p>
      <p>Mouse Delta: {{relativity.mouseDelta}}</p>
      <p>Test Pos: {{relativity.testPos}}</p>
    </div>

    <div
      ref="container"
      class="test-container"
      :style="{ 'left': `${testOffset}px` }"
    >
      <div
        ref="draggable"
        class="test-draggable"
        :style="{
          'top': `${relativity.mouseDelta.y}px`,
          'left': `${relativity.mouseDelta.x}px`,
        }"
      >
      </div>
    </div>
  </div>
</template>

<script>
import Relativity from '@/global/plugins/helpers/relativity';

export default {
  name: 'page-test',

  data: () => ({
    relativity: new Relativity(),

    testOffset: 50,
  }),

  mounted() {
    this.relativity.setElement(this.$refs.draggable);

    console.log(this.relativity);

    setInterval(() => {
      if (this.testOffset === 50) {
        this.testOffset = 200;
      } else {
        this.testOffset = 50;
      }

      window.requestAnimationFrame(this.relativity.update)
    }, 2000);
  },
}
</script>

<style lang="scss" scoped>
.page-test {
  position: relative;
  user-select: none;

  .test-container {
    position: absolute;
    top: 200px;
    left: 100px;
    width: 400px;
    height: 200px;

    border: 1px solid #0f0;

    .test-draggable {
      position: relative;
      top: 0;
      left: 0;
      width: 200px;
      height: 100px;
      background-color: #a44;
      border-radius: 3px;
    }
  }
}
</style>

