<script type="documentation">
/**
 * @name CloseButton
 * @description A simple close button... for closing that which are open.
 *
 * @event click.native Used to trigger a method when the user clicks on the button.
 *
 * @example <teedev-close-button {{ props }} {{ events }} />
 */
</script>

<template>
  <div class="teedev-close-button">
    <font-awesome-icon :icon="faTimes" />
  </div>
</template>

<script>
import { faTimes } from '@fortawesome/pro-light-svg-icons';

export default {
  name: 'teedev-close-button',
  data() {
    return {
      faTimes,
    };
  },
};
</script>

<style lang="scss" scoped>
.teedev-close-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 2em;
  height: 2em;
  color: rgba($color-text, 0.5);
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $anim-time-m, color $anim-time-m;

  &:hover {
    background-color: $color-highlight;
    color: $color-text;
  }

  svg {
    padding: 0.5em;
    width: 100%;
    height: 100%;
  }
}
</style>
