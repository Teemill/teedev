<template>
  <div class="page-login">
    <teedev-floating-container max-width="400px">
      <teedev-link invert class="home" href="#" @click.native="goBack">
        <font-awesome-icon :icon="faArrowLeft"/> Go Back
      </teedev-link>
      <teedev-box>
        <teedev-form name="login" class="login-form">
          <teedev-logo height="200px" />

          <teedev-input
            name="email"
            placeholder="Email"
          />
          <teedev-input
            name="password"
            placeholder="Password"
            password
          />

          <teedev-button
            text="Login"
            href="#"
            primary
            @click.native="login"
          />
        </teedev-form>
        <teedev-error-message class="login-error" v-if="errorMessage" :message="errorMessage" />
      </teedev-box>
      <teedev-link invert class="register" href="/register">Want to become a Teedev?</teedev-link>
    </teedev-floating-container>
  </div>
</template>

<script>
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons/faArrowLeft';

export default {
  name: 'page-login',

  data: () => ({
    faArrowLeft,
    stage: 1,
  }),

  computed: {
    errorMessage() {
      return this.$store.getters['auth/loginError'];
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

    login() {
      this.$store.commit('auth/NULL_LOGIN_ERROR_MESSAGE');

      const credentials = this.$store.getters['forms/getValues']('login');

      this.$store.dispatch('auth/login', credentials)
        .then(() => {
          if (this.$store.getters['auth/check']) {
            if (this.$route.query.redirect) {
              // eslint-disable-next-line
              console.log(this.$route.query.redirect);
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push('/');
            }
          }
        });
    },
  },

  theme: $theme => (`
    .page-login {
      background: linear-gradient(45deg, ${$theme.colors.gradientPrimary}, ${$theme.colors.primary});
    }
  `),
};

</script>

<style lang="scss" scoped>
.page-login {
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

  .register {
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

  .login-error {
    margin-top: 2rem;
  }

  @media (min-width: 425px) {
    .teedev-box {
      padding: 3em;
    }
  }
}
</style>
