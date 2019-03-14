<template>
  <div
    class="teedev-debug-overlay"
    :class="{ 'open': open }"
    :style="{
      'transform': `translateX(${offset.x}px) translateY(${offset.y}px)`
    }"
  >
    <div
      class="bug"
      @click="onToggle"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    >
      <font-awesome-icon :icon="faBug" />
    </div>
    <div class="menu" v-if="open">
      <div class="header">
        <div class="title">
          <b>TeeDev Debugger</b>
        </div>
      </div>
      <div class="content">
        <div class="item"
          v-for="(item, index) in tab.content"
          :key="index"
        >
          <span class="name">{{item.name}} :</span>
          <span class="value">{{item.value}}</span>
        </div>
        <div v-if="!tab.content || !tab.content.length">
          <p>Nothing to be found here.</p>
        </div>
      </div>
      <div class="tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="item"
          :class="{ 'selected': index === selectedTab }"
          @click="selectedTab = index"
        >
          <font-awesome-icon :icon="tab.icon" />
          <div class="inner"><b>{{tab.text}}</b></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faClipboard,
  faBug,
  faCog,
  faSitemap,
  faStore,
  faTag,
  faTags,
  faShoppingCart,
  faCodeBranch,
} from '@fortawesome/pro-light-svg-icons';

export default {
  name: 'teedev-debug-overlay',
  data() {
    return {
      faClipboard,
      faBug,
      faCog,
      faSitemap,
      faStore,
      faTag,
      faTags,
      faShoppingCart,
      faCodeBranch,

      open: true,
      holding: false,
      hasMoved: false,
      offset: {
        x: 0,
        y: 0,
      },

      selectedTab: 0,

      now: 0,
      performanceTiming: {},
    };
  },
  computed: {
    tab() {
      return this.tabs[this.selectedTab];
    },
    tabs() {
      return [
        {
          icon: faCog,
          text: 'Settings',
          content: [
            { name: 'Test State', value: this.$store.state.stateManager.testState },
            { name: 'Other State', value: this.$store.state.stateManager.otherState },
          ],
        },
        {
          icon: faSitemap,
          text: 'Route',
          content: [
            { name: 'Name', value: this.$store.state.route.name },
            { name: 'Path', value: this.$store.state.route.path },
            { name: 'Full Path', value: this.$store.state.route.fullPath },
          ],
        },
        {
          icon: faStore,
          text: 'Store',
          content: [
            { name: 'Name', value: 'Teedev Store' },
            { name: 'Subdomain Id', value: '154123' },
            { name: 'Division Id', value: '134234' },
            { name: 'Manufacturer Id', value: '1231233' },
            { name: 'Charity', value: '987347' },
          ],
        },
        {
          icon: faTag,
          text: 'Product',
          content: [
            { name: 'Name', value: 'Magic T-Shirt' },
            { name: 'Id', value: '12387993' },
            { name: 'Price', value: '£19' },
          ],
        },
        {
          icon: faTags,
          text: 'Collection',
          content: [
            { name: 'Name', value: 'All Products' },
            { name: 'Id', value: '541233' },
            { name: 'Products', value: '34' },
          ],
        },
        {
          icon: faShoppingCart,
          text: 'Cart',
          content: [
            { name: 'Items', value: '2' },
            { name: 'Unique Items', value: '5' },
            { name: 'Total', value: '£120' },
          ],
        },
        {
          icon: faCodeBranch,
          text: 'Network',
          content: [
            { name: 'Now', value: Math.floor(this.now) },
            { name: 'Now', value: Math.floor(performance.now()) },
            { name: 'Connection Start', value: performance.timing.connectStart },
            { name: 'Connection End', value: performance.timing.connectEnd },
            {
              name: 'Connection Time',
              value: performance.timing.connectEnd - performance.timing.connectStart,
            },
            {
              name: 'Connected',
              value: Math.floor(
                performance.now() - (performance.timing.connectStart * 0.001),
              ),
            },

            // { name: 'connectEnd', value: '1538085193828' },
            // { name: 'connectStart', value: '1538085193828' },
            // { name: 'domComplete', value: '1538085194572' },
            // { name: 'domContentLoadedEventEnd', value: '1538085194322' },
            // { name: 'domContentLoadedEventStart', value: '1538085194268' },
            // { name: 'domInteractive', value: '1538085194268' },
            // { name: 'domLoading', value: '1538085193877' },
            // { name: 'domainLookupEnd', value: '1538085193828' },
            // { name: 'domainLookupStart', value: '1538085193828' },
            // { name: 'fetchStart', value: '1538085193828' },
            // { name: 'loadEventEnd', value: '1538085194572' },
            // { name: 'loadEventStart', value: '1538085194572' },
            // { name: 'navigationStart', value: '1538085193827' },
            // { name: 'redirectEnd', value: '0' },
            // { name: 'redirectStart', value: '0' },
            // { name: 'requestStart', value: '1538085193831' },
            // { name: 'responseEnd', value: '1538085193837' },
            // { name: 'responseStart', value: '1538085193832' },
            // { name: 'secureConnectionStart', value: '0' },
            // { name: 'unloadEventEnd', value: '1538085193874' },
            // { name: 'unloadEventStart', value: '1538085193873' },
          ],
        },
      ];
    },
  },
  methods: {
    onToggle() {
      if (!this.hasMoved) {
        this.open = !this.open;
      }
    },
    onMouseDown() {
      this.holding = true;
      this.hasMoved = false;

      window.addEventListener('mousemove', this.onMouseMove, false);
      window.addEventListener('mouseup', this.onMouseUp, false);
    },
    onMouseUp() {
      this.holding = false;

      window.removeEventListener('mousemove', this.onMouseMove);
    },
    onMouseMove(e) {
      this.hasMoved = true;
      this.offset.x += e.movementX;
      this.offset.y += e.movementY;
    },
    onResize() {
      console.dir(window);
      console.dir(this.$el);

      const overlayEl = this.$el;
      console.log();
      console.log(window.innerWidth - (overlayEl.offsetLeft + overlayEl.offsetWidth));
    },
  },
  mounted() {
    // window.addEventListener('resize', this.onResize, false);

    console.log(performance);
    // setTimeout(() => {
    setInterval(() => {
      this.now = performance.now();
      this.performanceTiming = performance.toJSON();
      // console.log(performance);

      // const jsHeapUsage = performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize;
      // const jsHeapUsageLimit =
      //   performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;

      // console.log(performance.memory.jsHeapSizeLimit);
      // console.log(performance.memory.totalJSHeapSize);
      // console.log(performance.memory.usedJSHeapSize);
      // console.log((jsHeapUsageLimit * 100).toFixed(2));
      // console.log((jsHeapUsage * 100).toFixed(2));
      // console.log('------------------------');
    }, 1000);
  },
  destroyed() {
    // window.removeEventListener('resize', this.onResize, false);
  },
};
</script>

<style lang="scss" scoped>
.teedev-debug-overlay {
  position: fixed;
  top: 5em;
  left: 20em;
  border-radius: $border-radius;
  z-index: 9000;
  background-color: #444;
  color: #fff;

  .bug {
    position: absolute;
    width: 3em;
    height: 3em;
    background-color: #444;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s, border-radius 0.3s 0.1s;

    svg {
      margin: 1em;
      width: 1em;
      height: 1em;
      transition: transform 0.3s;
    }

    &:hover {
      background-color: #333;
      svg {
        transform: rotate(45deg);
      }
    }
  }

  &.open {
    .bug {
      border-radius: $border-radius;
      transition: background-color 0.3s, border-radius 0.3s;
      svg {
        transform: rotate(45deg);
      }
    }
  }

  .header {
    display: flex;
    margin-left: 3em;

    .title {
      padding: 1em;
      user-select: none;
    }
    .settings {
      width: 3em;
      height: 3em;
      border-radius: $border-radius;
      cursor: pointer;
      transition: background-color 0.3s;

      svg {
        margin: 1em;
        width: 1em;
        height: 1em;
        transition: transform 0.3s;
      }

      &:hover {
        background-color: #333;
        svg {
          transform: rotate(45deg);
        }
      }
    }
  }

  .content {
    padding: 1em;
    min-width: 18em;
    min-height: 12em;
    border-radius: $border-radius;
    overflow: hidden;

    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75em;

      .name {
        margin-right: 0.5em;
      }

      .value {
        padding: 0.2em 0.25em;
        margin: -0.2em 0;
        background-color: #333;
        border-radius: $border-radius;
      }
    }
  }

  .tabs {
    position: absolute;
    top: 1em;
    left: 100%;
    overflow: hidden;

    .item {
      display: flex;
      float: left;
      margin-bottom: 0.25em;
      white-space: nowrap;
      transition: transform 0.15s, color 0.15s;

      .inner {
        padding: 0.25em;
        padding-left: 2em;
        background-color: #333;
        color: transparent;
        border-radius: 0 $border-radius $border-radius 0;
        cursor: pointer;

        transform: translateX(-100%);
        transition: transform 0.15s, color 0.15s;

        &:hover {
          color: inherit;
          transform: translateX(-2em);
        }
      }

      svg {
        width: 1.5em;
        height: 1.5em;
        padding: 0.3em 0.1em;
        background-color: #333;
        color: #fff;
        border-radius: 0 $border-radius $border-radius 0;
        z-index: 1;
        pointer-events: none;
        transition: width 0.15s;
      }

      &.selected {
        svg {
          width: 2em;
        }
      }
    }
  }
}
</style>
