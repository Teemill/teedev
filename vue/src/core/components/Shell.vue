<template>
  <div id="app">
    <theme theme="default">
      <div class="content">
        <layout>
          <transition name="page-fade" mode="out-in">
            <div :key="$route.path">
              <slot/>
            </div>
          </transition>
        </layout>
      </div>
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

<style lang="scss" scoped>
#app {
  .content {
    filter: blur(0px);
  }
}
</style>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  overflow-y: scroll;
}
</style>
