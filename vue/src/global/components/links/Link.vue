<template>
  <a
    class="anchor"
    :class="{ 'invert': invert }"
    :href="href"
    :name="name"
    @click="onClick"
    rel="noopener"
  ><slot/></a>
</template>

<script>
export default {
  name: 'teedev-anchor',
  props: {
    href: String,
    name: String,
    invert: Boolean,
  },

  methods: {
    onClick(event) {
      this.$emit('click');
      if (this.href) {
        if (this.href === '#') {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        this.$router.push(this.href);
      }
    },
  },
  theme: $theme => (`
    .anchor {
      color: ${$theme.colors.text};

      &.invert {
        color: ${$theme.colors.background};
      }

      &:hover {
        color: ${$theme.colors.primary};
      }
    }
  `),
};
</script>

<style lang="scss" scoped>

.anchor {
  text-decoration: none;
  color: $color-text;

  &.invert {
    color: $color-background;
  }

  &:hover {
    color: $color-primary;
  }
}

</style>
