<template>
  <div
    class="teedev-column"
    :class="{ 'expand': expand }"
    :style="{ 'min-width': minWidth }"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'teedev-column',
  props: {
    expand: Boolean,
    minWidth: String,
  },
};
</script>

<style lang="scss" scoped>
.teedev-column {
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 1em;
  flex-basis: 0%;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  &.expand {
    flex-basis: 100%;
  }
}
</style>
