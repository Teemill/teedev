<template>
  <div
    class="gbro-box w-full p-12"
    :style="{
      backgroundColor: background,
      backgroundImage: `url(${backgroundImage})`,
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'gbro-box',

  props: {
    background: {
      type: String,
    },
    backgroundImage: {
      type: String,
    },
  },
};
</script>

<style>
.gbro-box {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>
