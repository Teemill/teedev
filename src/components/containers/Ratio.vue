<template>
  <div
    class="t-ratio relative"
    :style="{
      paddingBottom: `${ratio * 100}%`,
    }"
  >
    <div
      class="
        absolute
        top-0
        left-0
        bottom-0
        right-0
      "
    >
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 't-ratio',

  props: {
    ratio: {
      type: Number,
      default: 1,
    },
  },
});
</script>
