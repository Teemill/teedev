<template>
  <div class="layout-standard">
    <shell-header />
    <div class="content">
      <slot/>
    </div>
    <shell-action-bar />
  </div>
</template>

<script>
import ShellHeader from '@/global/shell/Header';
import ShellActionBar from '@/global/shell/ActionBar';

export default {
  name: 'layout-standard',

  components: {
    ShellHeader,
    ShellActionBar,
  },
};
</script>

<style lang="scss" scoped>
.layout-standard{
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    flex-grow: 1;
  }
}
</style>
