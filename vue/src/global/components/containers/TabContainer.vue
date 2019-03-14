<template>
  <div class="teedev-tab-container">
    <div class="tabs">
      <teedev-selection-highlighter>
        <div
          v-for="(tab, index) in $slots.default"
          :key="index"
          class="tab"
          :class="{ 'selected': index === selectedTabIndex }"
          @click="selectedTabIndex = index"
        >
          {{tab.componentOptions.propsData.name}}
          <div class="underline"></div>
        </div>
      </teedev-selection-highlighter>
    </div>
    <div class="content">
      <transition :name="`slide-${slideDirection}`" mode="out-in">
        <keep-alive include="teedev-tab">
          <v-node :index="selectedTabIndex" :node="$slots.default[selectedTabIndex]" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
const vNode = {
  functional: true,
  render: (h, ctx) => {
    const { index, node } = ctx.props;

    if (node) {
      node.key = `tab-${index}-${node.componentOptions.propsData.name}`;

      return node;
    }

    return null;
  },
};

export default {
  name: 'teedev-tab-container',

  components: {
    vNode,
  },

  data() {
    return {
      selectedTabIndex: 0,
      slideDirection: 'left',
    };
  },

  watch: {
    selectedTabIndex(newValue, oldValue) {
      if (newValue < oldValue) {
        this.slideDirection = 'left';
      } else {
        this.slideDirection = 'right';
      }
    },
  },

  theme($theme) {
    return `
      .teedev-tab-container {
        .underline {
          background-color: ${$theme.colors.primary};
        }
      }
    `;
  },
};
</script>

<style lang="scss" scoped>
.teedev-tab-container {
  margin-bottom: 1em;

  .tabs {
    border-bottom: 1px solid $color-secondary;

    .tab {
      position: relative;
      float: left;
      padding: 1em;
      margin-bottom: -1px;
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
      cursor: pointer;

      .underline {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0%;
        height: 2px;
        background-color: $color-primary;
        transition: left $anim-time-m, width $anim-time-m;
      }

      &.selected {
        .underline {
          left: 0%;
          width: 100%;
        }
      }
    }
  }

  .content {
    position: relative;
    overflow: hidden;

    > .teedev-tab {
      width: 100%;

      &.slide-left-enter-active {
        animation: slide-left $anim-time-m reverse ease-in;
      }
      &.slide-left-leave-active {
        animation: slide-right $anim-time-m ease-in;
      }
      &.slide-right-enter-active {
        animation: slide-right $anim-time-m reverse ease-in;
      }
      &.slide-right-leave-active {
        animation: slide-left $anim-time-m ease-in;
      }
    }
  }
}

@keyframes slide-left {
  0% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(-40px);
    opacity: 0;
  }
}
@keyframes slide-right {
  0% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(40px);
    opacity: 0;
  }
}
</style>
