<template>
  <div class="checkbox-wrapper">

     <input
      type="checkbox"
      :name="name"
      v-model="internalValue"
    >

    <label :for="name">
      {{ label }}
    </label>

  </div>
</template>

<script>
import mixin from './_mixins';

export default {
  name: 'teedev-checkbox',
  mixins: [mixin],
  props: {
    name: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  padding: 0.25rem 0;

  label {
    font-size: 14px;
  }
}
</style>
