<script type="documentation">
/**
 * @ignore
 * @name Button
 * @description A thing you click on to make things happen. These components are commonly used in
 * websites because I'm running out of things to write.
 *
 * @prop { String, Number } text What text is inside the button.
 * @prop { String } href The link the button directs to if not a #.
 * @prop { Boolean } primary Is the button a primary button?
 *
 * @event click.native Used to trigger a method when the user clicks on the button.
 *
 * @example <teedev-button {{ props }} {{ events }} />
 */
</script>

<template>
  <div
    class="teedev-button"
    :class="{
      'primary': primary,
      'fill': fill,
      'loading': loading,
      'only-icon': !text && icon,
      'just-icon': justIcon,
    }"
    @click="$emit('click')"
  >
    <teedev-spinner v-if="loading" class="spinner"/>
    <div class="content">
      <font-awesome-icon v-if="icon" class="mr-2" :icon="icon" />
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'teedev-button',

  props: {
    text: String,
    href: String,
    primary: Boolean,
    loading: Boolean,
    fill: Boolean,
    icon: Object,
    justIcon: Boolean,
  },

  theme: $theme => (`
    .teedev-button {
      background-color: ${$theme.colors.highlight};

      &.primary {
        color: ${$theme.colors.background};
        background-color: ${$theme.colors.primary};
        border-color: ${$theme.colors.primary};

        &:hover {
          background-color: ${$theme.colors.primary}aa;
        }
      }
    }
  `),
};
</script>

<style lang="scss" scoped>
.teedev-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  position: relative;
  padding: 1rem 2rem;
  background-color: $color-highlight;
  border-radius: $border-radius;
  cursor: pointer;

  transition: background-color $anim-time-s;
  user-select: none;

  &:hover {
    background-color: rgba(0,0,0, 0.1);
  }

  &.primary {
    color: $color-background;
    background-color: $color-primary;

    &:hover {
      background-color: rgba($color-primary, 0.75);
    }
  }

  .spinner {
    position: absolute;

    ~.content {
      opacity: 0;
    }
  }

  .content {
    transform: translateY(1px);

    svg {
      font-size: 1.25rem;
      margin: -0.125rem;
    }
  }

  &.fill {
    display: flex;
  }

  &.only-icon {
    padding: 1rem;

    .content svg {
      margin-right: 0 !important;
    }
  }

  &.just-icon {
    background: none;

    .content svg {
      transition: color $anim-time-s;
    }

    &:hover {
      .content svg {
        color: $color-primary;
      }
    }
  }
}
</style>
