<template>
  <div class="swish-line w-full h-1 mb-4"></div>
</template>

<script>
export default {
  name: 'fe-swish-line',
};
</script>

<style scoped lang="scss">
.swish-line {
  width: 100%;
  background-color: #77b800;
  transform: translateX(-0.5em);

  &::before {
    content: '';
    display: block;
    border-width: 0.5em;
    width: 0em;
    height: 0em;
    border-color: transparent transparent transparent #77b800;
    transform: rotate(45deg) translate(-45%, 10%);
  }
}
</style>
