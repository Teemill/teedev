<template>
  <div class="teedev-action-bar">
    <a
      v-for="(item, index) in items"
      :key="index"
      class="action click-transition"
      :class="{ 'active': active === index }"
      @click="setActive(index)"
      :href="item.href"
    >
      <font-awesome-icon
        class="icon"
        :icon="item.icon"
      />
      <small
        class="text"
      >
        {{item.text | capitalise}}
      </small>
    </a>
  </div>
</template>

<script>
import { faHome } from '@fortawesome/pro-light-svg-icons/faHome';
import { faTerminal } from '@fortawesome/pro-light-svg-icons/faTerminal';
import { faBars } from '@fortawesome/pro-light-svg-icons/faBars';
import { faMugHot } from '@fortawesome/pro-light-svg-icons/faMugHot';
import { faLightbulb } from '@fortawesome/pro-light-svg-icons/faLightbulb';

export default {
  name: 'teedev-action-bar',

  data: () => ({
    faHome,
    faTerminal,
    faBars,
    faMugHot,
    faLightbulb,

    active: 1,

    items: [
      {
        text: 'Home',
        icon: faHome,
        href: '/',
      },
      {
        text: 'Eval',
        icon: faTerminal,
        href: '/eval/',
      },
      {
        text: 'Menu',
        icon: faBars,
        action: () => { console.log('Open Menu'); },
      },
      {
        text: 'Blog',
        icon: faMugHot,
        href: '/blog/',
      },
      {
        text: 'Space',
        icon: faLightbulb,
        href: '/workspace/',
      },
    ],
  }),

  methods: {
    setActive(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.teedev-action-bar {
  position: sticky;
  bottom: 0;
  overflow: hidden;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 0 3px 0 rgba(#000, 0.15);

  display: flex;
  height: 3em;
  transition: height $anim-time-s;

  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0%;
    cursor: pointer;

    padding: 0.5em 0;

    .icon {
      margin: 0.25em 0;
      width: 1.5em;
      height: 1.5em;
    }

    .text {
      position: relative;
      top: 1.8em;

      transition: top $anim-time-s;
    }

    &.active {
      color: $color-primary;
    }
  }

  &:hover {
    height: 4em;

    .action {
      .text {
        top: 0;
      }
    }
  }
}
</style>
