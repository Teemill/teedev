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
      'only-icon': !text && icon
    }"
    @click="$emit('click')"
  >
    <teedev-spinner v-if="loading" class="spinner"/>
    <span class="content">
      <font-awesome-icon v-if="icon" class="mr-2" :icon="icon" />
      {{text}}
    </span>
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
  padding: 1em 2em;
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
    svg {
      margin-bottom: -1px;
      width: 1em;
      height: 1em;
    }
  }

  &.fill {
    display: flex;
  }

  &.only-icon {
    padding: 1em;

    .content svg {
      margin-right: 0 !important;
    }
  }
}
// .teedev-button {
//   display: inline-flex;
//   position: relative;
//   padding: calc(0.75rem - 1px) 2em;
//   cursor: pointer;

//   background-color: $color-highlight;
//   border: 1px solid transparent;
//   border-radius: $border-radius;
//   overflow: hidden;
//   user-select: none;

//   transition: background-color $anim-time-m, box-shadow $anim-time-m;

//   &:hover {
//     background-color: rgba(0,0,0,0.1);
//   }

//   &.primary {
//     color: $color-background;
//     background-color: $color-primary;
//     border-color: $color-primary;

//     &:hover {
//       background-color: rgba($color-primary, 0.75);
//     }
//   }

//   &.fill {
//     width: 100%;
//     text-align: center;
//   }

//   &.loading {
//     .content {
//       opacity: 0;
//     }

//     .spinner {
//       position: absolute;
//       top: 0;
//       left: 0;
//       bottom: 0;
//       right: 0;
//     }
//   }
// }
</style>
