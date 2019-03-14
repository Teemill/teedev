<template>
  <div class="teedev-nav-bar">
    <teedev-selection-highlighter>
      <div class="item left" @click="$router.push('/')">Home</div>
      <div class="item left" @click="$router.push('/docs/')">Docs</div>
      <div class="item left" @click="$router.push('/about/')">About</div>
      <div class="item left" @click="$router.push('/components/')">Components</div>
      <div class="item right">Contact</div>
      <div class="item right">Our Story</div>
    </teedev-selection-highlighter>
  </div>
</template>

<script>
export default {
  name: 'teedev-nav-bar',
};
</script>

<style lang="scss" scoped>


.teedev-nav-bar {
  width: 100%;
  padding: 0 0em;
  background-color: $color-background;

  .item {
    padding: 1em 1em;
    text-align: center;
    cursor: pointer;

    &.left {
      float: left;
    }
    &.right {
      float: right;
    }
  }
}
</style>
