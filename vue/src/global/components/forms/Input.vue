<template>
  <div
    class="teedev-input"
    :class="{
      'occupied': internalValue,
      'error': errorMessage,
      'left': left,
      'right': right,
      'no-margin': noMargin,
    }"
  >
    <div>
      <input
        :type="password && passwordHidden ? 'password' : 'text'"
        v-model="internalValue"
        @keydown.enter.prevent
        @keyup.enter.prevent="$emit('submit')"
      />
      <div class="placeholder">{{placeholder}}</div>
      <div class="error-message">{{errorMessage}}</div>
      <div v-if="!password" class="suffix"><span class="value">
        {{internalValue}}
        </span>{{suffix}}
      </div>
      <div
        v-if="password"
        class="password-eye"
        @click.stop="togglePasswordVisibility"
      >
        <font-awesome-icon :icon="passwordHidden ? faEyeSlash : faEye" />
      </div>
      <div class="underline"></div>
    </div>
  </div>
</template>

<script>
import { faEye } from '@fortawesome/pro-light-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/pro-light-svg-icons/faEyeSlash';

import mixin from './_mixins';

export default {
  name: 'teedev-input',
  mixins: [mixin],
  props: {
    name: {
      required: true,
      type: String,
    },
    placeholder: String,
    suffix: String,
    password: Boolean,
    left: Boolean,
    right: Boolean,
    noMargin: Boolean,
  },
  data() {
    return {
      errorMessage: '',
      passwordHidden: true,
      faEye,
      faEyeSlash,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordHidden = !this.passwordHidden;
    },
  },
  theme: $theme => (`
    .teedev-input {
      .underline {
        background-color: ${$theme.colors.primary};
      }

      input:focus ~ .placeholder {
        color: ${$theme.colors.primary};
      }
      &.error input:focus ~ .placeholder {
        color: ${$theme.colors.primary};
      }
    }
  `),
};
</script>


<style lang="scss" scoped>


.teedev-input {
  display: block;
  position: relative;
  border-radius: 0px;
  margin: 1em 0;
  width: 100%;
  float: left;
  clear: both;

  div {
    position: relative;
  }

  &.no-margin {
    margin: 0;
  }

  &.left {
    width: 50%;
    float: left;
    clear: left;
    padding-right: 8px;
  }
  &.right {
    width: 50%;
    float: right;
    clear: right;
    padding-left: 8px;
  }

  input {
    width: 100%;
    padding: 0.75em 0.75em;
    color: $color-text;
    border: none;
    // border-bottom: 1px solid $color-secondary;
    // border-top-left-radius: $border-radius;
    // border-top-right-radius: $border-radius;
    border-radius: $border-radius;
    background-color: $color-highlight;
    font-size: 1em;
    transition: background-color $anim-time-m;

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 300px white inset;
      box-shadow: 0 0 0 300px white inset;
    }

    &:focus {
      outline: none;
    }
  }

  &.error input {
    border-color: $color-error;
  }

  .underline {
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 2px;
    width: 0%;
    margin: 0 auto;
    background-color: $color-primary;
    transition: width $anim-time-m, left $anim-time-m;
  }

  &.error .underline {
    background-color: $color-error;
  }

  input:focus ~ .underline {
    width: 100%;
    left: 0%;
  }

  .suffix {
    position: absolute;
    top: 0.75em;
    left: 2em;
    pointer-events: none;
    color: $color-secondary;
    opacity: 0;
    transition: left $anim-time-m, opacity $anim-time-m;

    .value {
      opacity: 0;
    }
  }
  input:focus ~ .suffix,
  &.occupied .suffix {
    left: 0.75em;
    opacity: 1;
  }

  .placeholder {
    position: absolute;
    top: 0.95em;
    left: 0.75em;
    pointer-events: none;
    color: $color-text;
    transition: font-size $anim-time-m, top $anim-time-m, left $anim-time-m, color $anim-time-m;
  }

  input:focus ~ .placeholder,
  &.occupied .placeholder {
    top: -1.5em;
    left: 0em;
    font-size: 0.75em;
  }

  input:focus ~ .placeholder {
    color: $color-primary;
  }
  &.error input:focus ~ .placeholder {
    color: $color-primary;
  }

  .error-message {
    position: absolute;
    bottom: -1.5em;
    right: 0em;
    color: $color-primary;
    font-size: 0.75em;
    pointer-events: none;
  }

  .password-eye {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 0.75em;

    svg {
      height: 100%;
    }
  }
}
</style>
