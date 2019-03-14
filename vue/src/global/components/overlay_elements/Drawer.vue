<template>
  <div class="drawer" :class="{ open: isOpen }">
    <teedev-close-button
      @click.native="$store.commit('overlay_elements/close', { group, name });"
    />
    <slot name="content"></slot>
  </div>
</template>

<script>
import mixin from './_mixins';

export default {
  name: 'teedev-drawer',
  mixins: [mixin],
  props: {
    value: Boolean,
    name: String,
  },
  data() {
    return {
      group: 'drawer',
    };
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
  watch: {
    value(value) {
      this.$store.commit('overlay_elements/setState', {
        group: this.group,
        name: this.name,
        open: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right:  0;
  padding: 1rem;
  z-index: 5000;

  transform: translateY(100%);

  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
  border-top: 1px solid #fafafa;

  transition: all 0.3s cubic-bezier(.3, .8, .15, 1.15);

  &.open {
    transform: translateY(0%);
  }
}
</style>
