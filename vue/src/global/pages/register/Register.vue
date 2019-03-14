<template>
  <div class="page-register" :class="`stage-${stage}`">
    <teedev-floating-container max-width="400px">
      <teedev-link invert class="home" href="#" @click.native="goBack">
        <font-awesome-icon :icon="faArrowLeft"/> Go Back
      </teedev-link>
      <teedev-box>
        <teedev-form name="register" class="register-form">
          <teedev-logo height="200px" />

          <div class="stage-container">
            <div class="stage-1">
              <h5>Who are you?</h5>
              <teedev-input
                name="name"
                placeholder="Name"
              />
              <teedev-input
                name="email"
                placeholder="Email"
              />
            </div>
            <div class="stage-2">
              <h5>Whats your TmlSecure password?</h5>
              <teedev-input
                name="password"
                placeholder="Password"
                password
              />
              <teedev-input
                name="confirm-password"
                placeholder="Confirm Password"
                password
              />
            </div>
            <div class="stage-3">
              <h5>Are you a real Teedev?</h5>
              <teedev-input
                name="secret-password"
                placeholder="Secret"
                password
              />
            </div>
          </div>

          <teedev-button
            :text="buttonText"
            href="#"
            primary
            @click.native="next"
          />
        </teedev-form>
        <teedev-error-message class="register-error" v-if="errorMessage" :message="errorMessage" />
      </teedev-box>
      <teedev-link invert class="login" href="/login">Already a confirmed Teedev?</teedev-link>
    </teedev-floating-container>
  </div>
</template>

<script>
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons/faArrowLeft';

export default {
  name: 'page-register',

  data: () => ({
    faArrowLeft,
    stage: 1,
  }),

  computed: {
    errorMessage() {
      return this.$store.getters['auth/registerError'];
    },
    buttonText() {
      if (this.stage < 3) {
        return 'Next';
      }

      return 'Register';
    },
  },

  methods: {
    goBack() {
      if (this.stage > 1) {
        this.stage -= 1;
      } else {
        this.$router.back();
      }
    },

    next() {
      if (this.stage < 3) {
        this.stage += 1;
      } else {
        this.register();
      }
    },

    register() {
      this.$store.commit('auth/NULL_REGISTER_ERROR_MESSAGE');

      const credentials = this.$store.getters['forms/getValues']('register');

      this.$store.dispatch('auth/register', credentials)
        .then(() => {
          if (this.$store.getters['auth/check']) {
            this.$router.push('/');
          }
        });
    },
  },

  theme: $theme => (`
    .page-register {
      background: linear-gradient(45deg, ${$theme.colors.gradientPrimary}, ${$theme.colors.primary});
    }
  `),
};

</script>

<style lang="scss" scoped>
.page-register {
  background: linear-gradient(45deg, #484d99, $color-primary);
  height: 100vh;

  .teedev-box {
    position: relative;
    margin: 2em 0;
  }

  .frontend-logo {
    display: block;
    height: 200px;
    margin: 0 auto;
  }

  .teedev-button {
    float: right;
    margin-top: 1em;
  }

  .login {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
  }

  .home {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
  }

  .register-error {
    margin-top: 2rem;
  }

  @media (min-width: 425px) {
    .teedev-box {
      padding: 3em;
    }
  }


  .stage-container {
    position: relative;
    height: 12em;
    transition: height $anim-time-l;
  }

  .stage-1,
  .stage-2,
  .stage-3 {
    position: absolute;
    top: 0;
    width: 100%;
    pointer-events: none;

    h5 {
      opacity: 0;
      transform: translateX(10px);
      transition:
        opacity $anim-time-m,
        transform $anim-time-l;
    }

    .teedev-input {
      opacity: 0;
      transform: translateY(10px);
      transition:
        opacity $anim-time-m,
        transform $anim-time-l;
    }
  }

  &.stage-1 {
    .stage-1 {
      pointer-events: all;

      h5 {
        opacity: 1;
        transform: translateX(0);
        transition:
          opacity $anim-time-m $anim-time-m,
          transform $anim-time-l $anim-time-m;
      }

      .teedev-input {
        opacity: 1;
        transform: translateY(0);
        transition:
          opacity $anim-time-m $anim-time-m,
          transform $anim-time-l $anim-time-m;
      }
    }
  }
  &.stage-2 {
    .stage-2 {
      pointer-events: all;

      h5 {
        opacity: 1;
        transform: translateX(0);
        transition:
          opacity $anim-time-m $anim-time-m,
          transform $anim-time-l $anim-time-m;
      }

      .teedev-input {
        opacity: 1;
        transform: translateY(0);
        transition:
          opacity $anim-time-m $anim-time-m,
          transform $anim-time-l $anim-time-m;
      }
    }
  }
  &.stage-3 {
    .stage-container {
      transition: height $anim-time-l $anim-time-s;
      height: 7.25em;
    }

    .stage-3 {
      pointer-events: all;

      h5 {
        opacity: 1;
        transform: translateX(0);
        transition:
          opacity $anim-time-m $anim-time-m,
          transform $anim-time-l $anim-time-m;
      }

      .teedev-input {
        opacity: 1;
        transform: translateY(0);
        transition:
          opacity $anim-time-m $anim-time-m,
          transform $anim-time-l $anim-time-m;
      }
    }
  }
}
</style>
