<template>
  <div
    class="teedev-toggle"
    :class="{ 'toggled': internalValue }"
    @click="internalValue = !internalValue"
  >
    <div class="toggle">
      <div class="slide"></div>
      <div class="thumb"></div>
    </div>
    <div class="placeholder">{{placeholder}}</div>
  </div>
</template>

<script>
import mixin from './_mixins';

export default {
  name: 'teedev-toggle',
  mixins: [mixin],
  props: {
    name: {
      required: true,
      type: String,
    },
    placeholder: String,
  },
  theme: $theme => (`
    .teedev-toggle {
      &.toggled {
        .thumb {
          background-color: ${$theme.colors.primary};
        }

        .slide {
          background-color: ${$theme.colors.primary};
          opacity: 0.5;
        }
      }
    }
  `),
};
</script>


<style lang="scss" scoped>


.teedev-toggle {
  float: left;
  width: 100%;
  padding: 0.75em;
  margin-bottom: 0.5em;
  float: left;
  clear: both;

  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $anim-time-m;

  .toggle {
    position: relative;
    .slide {
      float: left;
      position: relative;
      top: 0em;
      left: 0em;
      width: 3em;
      height: 1.5em;
      background-color: rgba(0,0,0,0.1);
      border-radius: 99px;
      transition: background-color $anim-time-m;
    }
    .thumb {
      position: absolute;
      top: 0em;
      left: 0em;
      width: 1.5em;
      height: 1.5em;
      background-color: $color-background;
      box-shadow: 0 1px 4px -2px #000;
      border-radius: 99px;
      transition: left $anim-time-m, background-color $anim-time-m;
    }
  }

  &.holding {
    .toggle {
      .thumb {
        transition: left 0s, background-color $anim-time-m;
      }
    }
  }

  &.toggled {
    .toggle {
      .slide {
        background-color: rgba($color-primary, 0.5);
      }
      .thumb {
        left: 1.5em;
        background-color: $color-primary;
      }
    }
  }

  &:hover {
    background-color: $color-highlight;
  }

  .placeholder {
    margin-left: 4em;
    text-align: left;
    line-height: 1.5em;
  }
}
</style>
