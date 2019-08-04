<template>
  <div
    class="banner"
    :class="{
      parallax: parallax,
      'parallax-left': parallaxAlign === 'left',
      'parallax-right': parallaxAlign === 'right',
    }"
    :style="{
      backgroundColor: background,
      color: color,
      backgroundImage: `url(${src})`,
    }"
  >
    <div
      class="content"
      :class="align"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'g-one-page-banner',

  props: {
    src: {
      type: String,
    },

    background: {
      type: String,
      default: '#fff',
    },

    color: {
      type: String,
      default: '#232323',
    },

    align: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['left', 'right'].indexOf(value) !== -1;
      },
    },

    parallax: {
      type: Boolean,
    },

    parallaxAlign: {
      type: String,
      default: 'fill',
      validator: (value) => {
        return ['left', 'right', 'fill'].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style lang="scss">
.banner {
  height: 70vh;

  position: relative;
  overflow: visible;

  background-size: cover;
  background-repeat: no-repeat;

  .content {
    position: absolute;
    top: 30%;
    width: 35%;
    left: 10%;

    &.right {
      left: 55%;
    }
  }

  &.parallax {
    background-attachment: fixed;
    background-size: cover;
    background-position: center;

    &.parallax-left {
      background-size: 60%;
      background-position: left;
    }

    &.parallax-right {
      background-size: 60%;
      background-position: right;
    }
  }
}
</style>
