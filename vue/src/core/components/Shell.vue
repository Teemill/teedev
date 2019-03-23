<template>
  <div id="app">
    <theme theme="default">
      <layout>
        <slot/>
      </layout>
    </theme>
  </div>
</template>

<script>
import Layout from './Layout';
import Theme from './Theme';

export default {
  name: 'shell',

  components: {
    Layout,
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
