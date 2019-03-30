<template>
  <g
    :style="{
      'transform': `
        translate(${x}px, ${y}px)
      `,
    }"
  >
    <slot />
  </g>
</template>

<script>
export default {
  name: 'teedev-svg-group',

  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
};
</script>
