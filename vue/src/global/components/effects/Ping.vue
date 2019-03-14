<template>
  <div class="teedev-ping" :class="{ 'mouse-down': mouseDown }">
    <slot />
    <div
      class="inner"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    >
      <div
        class="ping"
        :style="{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }"
      ></div>
      Inner
    </div>
  </div>
</template>

<script>
export default {
  name: 'teedev-ping',

  data: () => ({
    mousePos: { x: 0, y: 0 },

    mouseDown: false,
  }),

  methods: {
    onMouseDown(e) {
      console.log(e);

      this.mousePos.x = e.offsetX;
      this.mousePos.y = e.offsetY;

      this.mouseDown = true;
    },

    onMouseUp() {
      this.mouseDown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.teedev-ping {
  position: relative;
  width: 400px;
  height: 400px;

  .inner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;

    .ping {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.1);
      user-select: none;
      pointer-events: none;
      opacity: 0;

      animation: ripple-leave 0.6s;
    }
  }

  &.mouse-down {
    .ping {
      animation: ripple-enter 0.4s;
      animation-fill-mode: forwards;
    }
  }
}

@keyframes ripple-enter {
  0% {
    top: -25px;
    left: -25px;
    width: 50px;
    height: 50px;
    opacity: 0.6;
  }

  100% {
    top: -200px;
    left: -200px;
    width: 400px;
    height: 400px;
    opacity: 1;
  }
}

@keyframes ripple-leave {
  0% {
    top: -200px;
    left: -200px;
    width: 400px;
    height: 400px;
    opacity: 1;
  }

  99% {
    top: -200px;
    left: -200px;
    width: 400px;
    height: 400px;
    opacity: 0;
  }

  100% {
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
