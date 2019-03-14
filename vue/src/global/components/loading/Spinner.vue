<template>
  <div class="teedev-spinner" :style="{ 'width': width, 'height': height }">
    <font-awesome-icon :icon="faCircleNotch" />
  </div>
</template>

<script>
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons/faCircleNotch';

export default {
  name: 'teedev-spinner',

  props: {
    height: String,
    width: String,
  },

  data: () => ({
    faCircleNotch,
  }),
};
</script>

<style lang="scss" scoped>
.teedev-spinner {
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 1.5em;
    animation: spin $anim-time-l infinite linear;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
