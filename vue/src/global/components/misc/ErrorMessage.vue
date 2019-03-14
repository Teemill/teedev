<template>
  <div class="error-message">
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>

export default {
  name: 'teedev-error-message',
  props: {
    message: {
      required: true,
      type: String,
    },
  },
};

</script>

<style lang="scss" scoped>

.error-message {
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 0.75rem;
  border: 1px solid $color-error;
  border-radius: $border-radius;

  .message {
    color: $color-error;
    margin: 0;
  }
}

</style>
