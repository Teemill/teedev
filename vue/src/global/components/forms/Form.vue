<script type="documentation">
/**
 * @name Form
 * @description A form is used to contain and control user inputs. All input components require
 * a form.
 *
 * @prop { String } name The name of the form. Should be unique form other forms on the page.
 *
 * @example <teedev-button {{ props }} {{ events }} />
 */
</script>

<template>
  <form class="teedev-form">
    <slot/>
  </form>
</template>

<script>
export default {
  name: 'teedev-form',
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  methods: {
    registerField(fieldName, options) {
      if (!this.$store.state.forms[this.name][fieldName]) {
        this.$store.commit('forms/registerField', {
          fieldName,
          formName: this.name,
          value: options.value || null,
        });
      }
    },
    setFieldValue(fieldName, value) {
      this.$store.commit('forms/setFieldValue', {
        fieldName,
        formName: this.name,
        value,
      });
    },
    getFieldValue(fieldName) {
      return this.$store.state.forms[this.name][fieldName].value;
    },
  },
  provide() {
    return {
      register: this.registerField,
      setValue: this.setFieldValue,
      getValue: this.getFieldValue,
    };
  },
  created() {
    if (!this.$store.state.forms[this.name]) {
      this.$store.commit('forms/registerForm', {
        name: this.name,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.teedev-form {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
