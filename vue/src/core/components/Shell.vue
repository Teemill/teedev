<template>
  <div id="app">
    <theme theme="default">
      <slot/>
    </theme>
  </div>
</template>

<script>
import Theme from './Theme';

export default {
  name: 'shell',

  components: {
    Theme,
  },
};
</script>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
    overflow-y: scroll;
  }
</style>
