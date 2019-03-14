<template>
  <div class="teedev-input">
    <!-- <span class="prefix">https://</span> -->
    <input type="text" v-model="internalValue" />
    <!-- <span class="suffix">.teemill.com</span> -->
  </div>
</template>

<script>
export default {
  name: 'teedev-input',

  props: {
    value: [String, Number],
  },

  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.teedev-input {
  display: flex;
  align-items: center;

  background-color: $color-highlight;
  border-radius: $border-radius;
  padding: 0 1em;

  input {
    padding: 1em 0;
    flex-grow: 1;
    
    background: none;
    border: none;
    
    font-family: $font-family;
    font-size: 1em;
    color: $color-text;

    &:focus {
      outline: none;
    }
  }
}
</style>
