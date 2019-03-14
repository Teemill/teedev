<template>
  <teedev-virtual-slot slot-group="sidebar">
    <div class="teedev-sidebar" :class="{ 'open': isOpen, 'left': left, 'right': right }">
      <slot />
    </div>
  </teedev-virtual-slot>
</template>

<script>
import mixin from './_mixins.js';

export default {
  name: 'teedev-sidebar',
  mixins: [mixin],
  props: {
    name: {
      required: true,
      type: String,
    },
    group: {
      required: true,
      type: String,
    },
    left: Boolean,
    right: Boolean,
  },
  created() {
    this.$store.commit('overlay_elements/add', {
      group: this.group,
      name: this.name,
    });
  },
  destroyed() {
    this.$store.commit('overlay_elements/remove', {
      group: this.group,
      name: this.name,
    });
  },
};
</script>

<style lang="scss" scoped>
.teedev-sidebar {
  position: fixed;
  top: 3em;
  bottom: 0;
  width: 16em;
  background-color: $color-background;
  z-index: 1900;
  transition: transform $anim-time-m;

  &.left {
    left: 0;
    transform: translateX(-100%);
  }

  &.right {
    right: 0;
    transform: translateX(100%);
  }

  &.open {
    transform: translateX(0%);

    &.left {
      box-shadow: -2px 2px 4px 0 #000;
    }

    &.right {
      box-shadow: 2px 2px 4px 0 #000;
    }
  }
}
</style>
