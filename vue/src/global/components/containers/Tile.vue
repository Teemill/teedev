<template>
  <div
    class="teedev-tile"
    :style="{
      'background': `
        ${!noBackgroundShade ?
        'linear-gradient(rgba(0, 0, 0, 0.35) 60%, rgba(0, 0, 0, 0.20)), ' :
        ''}url(${backgroundImage})`,
      'min-height': minHeight
    }"
    @click="$router.push({ name: 'TeeDev Article', params: { slug: link }})"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'teedev-tile',

  props: {
    backgroundImage: String,
    link: String,
    minHeight: String,
    noBackgroundShade: Boolean,
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: $color-text;
}

.teedev-tile {
  display: flex;
  flex-direction: column;

  position: relative;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  border-radius: $border-radius;

  cursor: pointer;
  padding: 1rem;
}
</style>
