<template>
  <div
    class="teedev-drop-down"
    :class="{ 'open': open }"
  >
    <div
      class="title-bar"
      @click="toggleOpen"
    >
      <p>Title</p>
      <font-awesome-icon :icon="faChevronDown" />
    </div>
    <div
      class="content"
      :style="{ 'height': `${contentHeight}px` }"
    >
      <div ref="innerContent" class="inner">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import { faChevronDown } from '@fortawesome/pro-light-svg-icons/faChevronDown';

export default {
  name: 'teedev-drop-down',
  data() {
    return {
      faChevronDown,
      open: false,
      contentHeight: 0,
    };
  },
  methods: {
    onToggled() {
      console.log('onToggled');
    },
    toggleOpen() {
      this.open = !this.open;

      if (this.open) {
        this.contentHeight = this.$refs.innerContent.clientHeight;
      } else {
        this.contentHeight = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>


.teedev-drop-down {
  .title-bar {
    position: relative;
    padding: 1em;
    cursor: pointer;

    p { margin: 0; }

    svg {
      position: absolute;
      top: 1.5em;
      right: 1.5em;
      font-size: 0.5em;
      transition: transform $anim-time-m;
    }
  }

  .content {
    position: relative;
    overflow: hidden;
    transition: height $anim-time-m;

    .inner {
      position: absolute;
      bottom: 0;
      width: 100%;
      // padding: 1em;
    }
  }

  &.open {
    border-bottom: 1px solid rgba(0,0,0,0.05);

    &:last-child {
      border-bottom: none;
    }

    .title-bar {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
