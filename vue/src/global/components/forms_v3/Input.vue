<template>
  <div
    class="teedev-input"
    :class="{
      'has-label': label,
    }"
  >
    <label v-if="label">
      {{label}}
    </label>

    <font-awesome-icon
      v-if="leftIcon"
      class="icon-left"
      :icon="leftIcon"
    />

    <div class="input">
      <span
        v-if="prefix"
        class="prefix"
      >{{prefix}}</span>
      <input
        :value="getValue()"
        @input="setValue($event.target.value)"
      />
      <span
        v-if="suffix"
        class="suffix"
      >
        <span>{{prefix}}{{getValue()}}</span>{{suffix}}
      </span>
    </div>

    <font-awesome-icon
      v-if="rightIcon"
      class="icon-right"
      :icon="rightIcon"
    />
  </div>
</template>

<script>
export default {
  name: 'teedev-input',

  props: {
    name: String,
    value: [String, Number],
    label: String,
    prefix: String,
    suffix: String,

    leftIcon: {
      type: Object,
      validator(value) {
        return value.icon;
      },
    },
    rightIcon: {
      type: Object,
      validator(value) {
        return value.icon;
      },
    },
  },

  inject: {
    setFieldValue: {
      default: null,
    },
    getFieldValue: {
      default: null,
    },
  },

  data: () => ({
    internalValue: null,
  }),
  
  methods: {
    setValue(value) {
      this.internalValue = value;

      if (this.name && this.setFieldValue) {
        this.setFieldValue(
          this.name,
          value,
        );
      }

      this.$emit('input', value);
    },

    getValue() {
      return this.internalValue
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.setValue(value);
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.teedev-input {
  display: flex;
  position: relative;
  margin: 1em 0;

  border: 1px solid $color-border;
  border-radius: $border-radius;

  &.has-label {
    margin-top: 2em;
  }

  label {
    position: absolute;
    top: -1.5em;
    left: 0;

    font-size: 0.75em;
  }

  .input {
    display: flex;
    flex-grow: 1;
    position: relative;

    input {
      flex-grow: 1;
      padding: calc(1em - 1px);
      margin: 0;
      border: none;
      background: none;
      font-size: 1em;

      &:focus {
        outline: none;
      }
    }

    .prefix,
    .suffix {
      padding: 1em 0 1em 1em;
      pointer-events: none;
    }

    .prefix {
      cursor: text;

      +input {
        padding-left: 0;
      }
    }

    .suffix {
      position: absolute;
      top: 0;
      left: 0;

      span {
        opacity: 0;
        pointer-events: none;
      }
    }
  }

  .icon-left {
    margin: 1em 0 1em 1em;
  }

  .icon-right {
    margin: 1em 1em 1em 0;
  }
}
</style>

