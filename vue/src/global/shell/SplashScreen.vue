<template>
  <div class="shell-splash-screen" :class="stage">
    <div class="background"></div>
    <teedev-floating-container>
      <div class="box">
        <div class="backer"></div>
        <div class="inner">
          <teedev-spinner class="spinner" height="100%" width="100%" />
          <teedev-logo class="logo" height="100%" width="100%" />
          <h2 class="message">Welcome to Teedev</h2>
        </div>
      </div>
    </teedev-floating-container>
  </div>
</template>

<script>
export default {
  name: 'shell-splash-screen',

  data: () => ({
    stage: 'loading',
  }),

  mounted() {
    setTimeout(() => {
      this.stage = 'logo';
    }, 500);

    setTimeout(() => {
      this.stage = 'message';
    }, 2000);

    setTimeout(() => {
      this.stage = 'fade';
    }, 3500);

    setTimeout(() => {
      this.$emit('loaded');
    }, 4000);
  },

  theme: $theme => (`
    .shell-splash-screen {
      .background {
        background: linear-gradient(45deg, ${$theme.colors.gradientPrimary}, ${$theme.colors.primary});
      }
    }
  `),
};
</script>

<style lang="scss" scoped>
.shell-splash-screen {
  position: fixed;
  background-color: $color-background;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 9001;

  transition: opacity $anim-time-l ease;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #484d99, $color-primary);
  }

  .box {
    position: relative;
    width: 350px;
    height: 350px;

    @media (max-width: 400px) {
      width: 300px;
      height: 300px;
    }

    .backer {
      position: absolute;
      background-color: $color-background;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }

    .inner {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;

      .logo {
        padding: 3em;
      }

      .message {
        width: 100%;
        text-align: center;
      }
    }
  }

  .spinner,
  .logo,
  .message {
    position: absolute;
    opacity: 0;

    transition: opacity $anim-time-l ease;
  }

  .background {
    transition: opacity $anim-time-l ease,
  }

  .backer {
    transition:
      opacity $anim-time-l ease,
      transform $anim-time-l ease;
  }

  .message {
    transform: translateY(280px);
  }

  .logo,
  .message {
    transition: transform $anim-time-l ease;
  }


  &.loading {
    .backer {
      transform: scale(0.2);
    }

    .spinner {
      opacity: 1;
    }

    .logo {
      transform: scale(0.8);
    }
  }

  &.logo {
    .backer {
      transform: scale(1);
    }

    .logo {
      opacity: 1;
      transition:
        opacity $anim-time-l $anim-time-l ease,
        transform $anim-time-l $anim-time-l ease;
    }
  }

  &.message {
    .background {
      opacity: 0;
    }

    .backer {
      transform: scale(2);
      opacity: 0;
    }

    .logo {
      transform: translateY(-50px);
      opacity: 1;
    }

    .message {
      opacity: 1;
      transform: translateY(250px);
      transition:
        opacity $anim-time-l $anim-time-l ease,
        transform $anim-time-l $anim-time-l ease;
    }
  }

  &.fade {
    .background,
    .backer {
      opacity: 0;
    }

    .logo {
      transform: translateY(-50px);
      opacity: 1;
    }

    .message {
      opacity: 1;
      transform: translateY(250px);
    }

    opacity: 0;
  }
}
</style>
