<template>
  <div class="teedev-loader">
    <transition name="fade" mode="out-in">
      <template v-if="!loading">
        <slot/>
      </template>
      <teedev-spinner v-else :height="height" />
    </transition>
  </div>
</template>

<script>
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons/faCircleNotch';

export default {
  name: 'teedev-loader',

  props: {
    loading: Boolean,
    height: String,
  },

  data: () => ({
    faCircleNotch,
  }),
};
</script>

<style lang="scss" scoped>
.teedev-loader {
  width: 100%;
}
</style>
