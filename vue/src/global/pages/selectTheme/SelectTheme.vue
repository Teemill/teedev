<template>
  <div class="page-select-theme" :class="[stage, selectedTheme]">
    <div class="background"></div>
    <teedev-floating-container>
      <div class="theme-container">
        <div class="backer"></div>
        <div class="theme-bubble purple-theme" @click="setTheme('purple')">
          <teedev-theme theme="purple">
            <teedev-logo height="100%" />
          </teedev-theme>
        </div>
        <div class="theme-bubble orange-theme" @click="setTheme('orange')">
          <teedev-theme theme="orange">
            <teedev-logo height="100%" />
          </teedev-theme>
        </div>
        <div class="theme-bubble cynical-theme" @click="setTheme('cynical')">
          <teedev-theme theme="cynical">
            <teedev-logo height="100%" />
          </teedev-theme>
        </div>
        <div class="hate-theme" @click="setTheme()">
          <span v-if="seenPurple && seenOrange && seenCynical">
            I hate it all
          </span>
          <span v-else>
            I hate it
          </span>
        </div>
        <div class="love-theme" @click="stage = 'fill'">
          I love it
        </div>
      </div>
    </teedev-floating-container>
  </div>
</template>

<script>
export default {
  name: 'page-select-theme',

  data: () => ({
    stage: 'display',
    selectedTheme: null,
    seenPurple: false,
    seenOrange: false,
    seenCynical: false,
  }),

  methods: {
    setTheme(themeName) {
      if (themeName) {
        this.stage = 'focused';
        this.selectedTheme = `${themeName}-theme`;
        this.$store.commit('theme/set', themeName);

        if (themeName === 'purple') {
          this.seenPurple = true;
        } else if (themeName === 'orange') {
          this.seenOrange = true;
        } else if (themeName === 'cynical') {
          this.seenCynical = true;
        }
      } else {
        this.stage = 'display';
      }
    },
  },

  theme: $theme => (`
    .page-select-theme {
      .background {
        background: linear-gradient(45deg, ${$theme.colors.gradientPrimary}, ${$theme.colors.primary});
      }

      .backer {
        background-color: ${$theme.colors.background};
      }

      .hate-theme,
      .love-theme {
        color: ${$theme.colors.background};
      }
    }
  `),
};

</script>

<style lang="scss" scoped>
.page-select-theme {
  height: 100vh;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  .theme-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    position: relative;
    width: 250px;
    height: 250px;

    .backer {
      position: absolute;
      top: 0;
      left: 0;
      width: 250px;
      height: 250px;
      background-color: $color-background;
      border-radius: 50%;
    }

    .theme-bubble {
      position: absolute;
      top: 0;
      left: 0;

      width: 250px;
      height: 250px;
      padding: 2em;
      // margin: 2em;
      background-color: $color-background;
      border-radius: 50%;
      cursor: pointer;
      transition: transform $anim-time-m;

      &.purple-theme {
        transform: translateX(-300px);
      }

      &.cynical-theme {
        transform: translateX(300px);
      }

      &:hover {
        &.purple-theme {
          transform: translateX(-300px) scale(1.1);
        }

        &.orange-theme {
          transform: translateX(0) scale(1.1);
        }

        &.cynical-theme {
          transform: translateX(300px) scale(1.1);;
        }
      }
    }

    .hate-theme,
    .love-theme {
      position: absolute;
      top: calc(50% - 0.5em);

      color: #fff;
      font-size: 1.25em;
      opacity: 0;
      cursor: pointer;
      user-select: none;
      transition: transform $anim-time-m, opacity $anim-time-m;
    }

    .hate-theme {
      left: -10em;
      transform: translateX(20px);
    }

    .love-theme {
      right: -10em;
      transform: translateX(-20px);
    }
  }

  &.purple-theme {.theme-bubble.purple-theme { z-index: 2; }}
  &.orange-theme {.theme-bubble.orange-theme { z-index: 2; }}
  &.cynical-theme {.theme-bubble.cynical-theme { z-index: 2; }}

  &.focused,
  &.fill {
    &.purple-theme {
      .theme-bubble {
        transform: scale(0.8) translateX(0) !important;
      }

      .theme-bubble.purple-theme {
        transform: scale(1.2) translateX(0) !important;
      }
    }

    &.orange-theme {
      .theme-bubble {
        transform: scale(0.8) translateX(0) !important;
      }

      .theme-bubble.orange-theme {
        transform: scale(1.2) translateX(0) !important;
      }
    }

    &.cynical-theme {
      .theme-bubble {
        transform: scale(0.8) translateX(0) !important;
      }

      .theme-bubble.cynical-theme {
        transform: scale(1.2) translateX(0) !important;
      }
    }

    .love-theme,
    .hate-theme {
      transform: translateX(0);
      opacity: 1;
      transition: transform $anim-time-m $anim-time-s, opacity $anim-time-m $anim-time-s;
    }
  }

  &.fill {
    .love-theme,
    .hate-theme {
      transform: translateX(0);
      opacity: 0;
      transition: transform $anim-time-m, opacity $anim-time-m;
    }

    .background {
      opacity: 0;
      transition: opacity $anim-time-l;
    }

    .backer {
      transform: scale(4);
      transition: transform $anim-time-l, opacity $anim-time-l;
    }

    .theme-bubble {
      .teedev-logo {
        transform: scale(0.8);
        opacity: 0;
        transition: transform $anim-time-l $anim-time-m, opacity $anim-time-l $anim-time-m;
      }
    }
  }
}
</style>
