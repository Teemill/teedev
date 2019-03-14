<template>
  <div class="nav-bar-container" v-if="isMobile">
    <div
      class="nav-item-container"
      v-for="(navItem, key) in navItems"
      :key="key"
      :class="{ 'active': activeTab === key }"
      @click="onClick($event, key, navItem)"
    >
      <teedev-link
        class="nav-item"
        :class="{ 'with-icon': navItem.icon }"
        :href="navItem.href"
      >
        <div class="nav-item-content">
          <font-awesome-icon
            class="nav-item-icon"
            v-if="navItem.icon"
            :icon="navItem.icon"
          />
          <span class="nav-item-title">
            {{ navItem.title }}
          </span>
        </div>
      </teedev-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teedev-mobile-nav-bar',
  props: {
    /**
     * The Vuex state name for the element
     */
    name: {
      required: true,
      type: String,
    },
    /**
     * The items that make up the navbar, can be used to route in router mode
     * or supports a custom action
     *
     * @param Array [{
     *   title(String),
     *   href(String),
     *   icon(Object),
     *   action(Function),
     *   preSelected(Boolean)
     * }]
     */
    navItems: {
      required: true,
      type: Array,
    },
    /**
     * Used for nav based on the $router. Should only be used for the app
     * shell navigator
     */
    routerMode: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // eslint-disable-next-line
      windowWidth: window.innerWidth,
    };
  },

  computed: {
    isMobile() {
      return this.windowWidth < 768;
    },
    /**
     * If in routerMode, the active tab property is defined by the nav item
     * in the store where the current matches the nav item href attribute
     *
     * If not in routerMode, the active property of the nav item is set to
     * true in the navbar state
     */
    activeTab() {
      if (this.routerMode) {
        return this.$store.getters['navigationElements/activeRouterTab'](this.name, this.$route.fullPath);
      }
      return this.$store.getters['navigationElements/activeTab'](this.name);
    },
  },

  methods: {
    onClick(event, key, navItem) {
      event.preventDefault();
      /**
       * Change the active tab manually if the navbar is not in routerMode
       */
      if (!this.routerMode) {
        this.$store.dispatch('navigationElements/changeActive', {
          name: this.name,
          key,
        });
      }
      if (navItem.href && navItem.href !== '#') {
        this.$router.push(navItem.href);
      }
      /**
       * If there is a function passed with the nav item, call it, and give
       * it the current Vue instance as its context
       */
      if (navItem.action) {
        navItem.action.call(this, event, key, navItem);
      }
    },
  },

  created() {
    // eslint-disable-next-line
    window.addEventListener('resize', () => {
      // eslint-disable-next-line
      this.windowWidth = window.innerWidth;
    });

    /**
     * Registers the navbar if the module does not already exist in the state
     */
    if (!this.$store.state.navigationElements[this.name]) {
      this.$store.dispatch('navigationElements/register', {
        name: this.name,
        navItems: this.navItems,
      });
    }
  },

  theme: $theme => (`
    .nav-item-container {
      &.active {
        .nav-item {
          .nav-item-content {
            color: ${$theme.colors.primary} !important;
          }
        }
      }
    }
  `),
};
</script>

<style lang="scss" scoped>
.nav-bar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: $nav-box-shadow;
  display: flex;
  align-items: center;

  .nav-item-container {
    display: flex;
    justify-content: center;
    flex: 1;
    &.active {
      .nav-item {
        .nav-item-content {
          color: $color-primary !important;
        }
      }
    }
    .nav-item {
      display: flex;
      justify-content: center;
      flex: 1;
      padding: 0.8rem 0;
      .nav-item-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $color-text;
      }
      &.with-icon {
        .nav-item-content {
          svg {
            margin: 0 0 0.4rem 0;
            font-size: 1.4rem;
          }
          span {
            font-size: 70%;
            line-height: 100%;
            font-weight: bold;
            text-transform: uppercase;
          }
        }
      }
      &:not(.with-icon) {
        padding: 1.2rem 0;
        .nav-item-content {
          span {
            font-size: 80%;
            line-height: 100%;
            font-weight: bold;
            text-transform: uppercase;
          }
        }
      }
    }
  }
}
</style>
