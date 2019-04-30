<template>
  <div
    class="teedev-flexy-container"
    :style="{
      height: autoHeight ? `${height}px` : 'auto',
      width: autoWidth ? `${width}px` : 'auto',
    }"
  >
    <div
      class="inner"
      ref="container"
      v-resize="onResize"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
import resize from 'vue-resize-directive'

export default {
  name: 'teedev-flexy-container',

  props: {
    autoHeight: {
      type: Boolean,
      default: true,
    },

    autoWidth: {
      type: Boolean,
      default: false,
    },
  },

  directives: {
    resize,
  },

  data: () => ({
    height: 0,
    width: 0,

    expanding: false,
  }),

  methods: {
    onResize() {
      const bounds = this.$refs.container.getBoundingClientRect();

      this.height = bounds.height;
      this.width = bounds.width;

      console.log('Resize', bounds);
    },
  },

  mounted() {
    this.onResize();
  },
}
</script>

<style lang="scss" scoped>
.teedev-flexy-container {
  position: relative;
  overflow: hidden;
  transition: height 0.2s, width 0.2s;

  // &::after {
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 80px;
  //   content: '';
  //   background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, #fff 100%);
  //   pointer-events: none;
  // }
}
</style>

