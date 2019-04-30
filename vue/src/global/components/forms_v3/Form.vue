<template>
  <form class="teedev-form">
    <p>Form</p>
    {{fields}}
    <slot />
  </form>
</template>

<script>
const fields = {};

export default {
  name: 'teedev-form',

  data: () => ({
    fields,
  }),

  provide: () => ({
    setFieldValue(name, value) {
      console.log(this, name);
      if (!fields[name]) {
        fields[name] = {
          value: null,
          valid: false,
        };
      }

      fields[name].value = value;
    },

    getFieldValue(name) {
      if (!this.fields[name]) {
        return null;
      }

      return this.fields[name].value;
    },
  }),
}
</script>

<style lang="scss" scoped>
.teedev-form {
  margin: 1em 0;
  padding: 1em 1em 0 1em;
  border: 1px solid;
}
</style>

