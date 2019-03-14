<template>
  <div class="teedev-sub-footer">
    <span class="signiture">Teedev Project: <span class="light">Fueled By Teemill Devs</span></span>
    <span class="version">Version: <span class="light">2.1.0</span></span>
  </div>
</template>

<script>
export default {
  name: 'teedev-sub-footer',
};
</script>

<style lang="scss" scoped>


.teedev-sub-footer {
  background-color: $color-background;
  box-shadow: 0 2px 4px 0 #000;
  font-size: 0.75em;

  .signiture {
    float: left;
    padding: 1em;
  }

  .version {
    float: right;
    padding: 1em;
  }
}
</style>
