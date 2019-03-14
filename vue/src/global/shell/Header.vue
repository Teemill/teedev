<template>
  <div class="shell-header full">
    <!-- <shell-logo /> -->
    <h4 style="margin: 0 0 0 1em;">{{$store.state.route.meta.title}}</h4>
    <div style="display: flex; align-items: center;">
      <font-awesome-icon style="margin-right: 1em;" :icon="faBell" />
      <font-awesome-icon style="margin-right: 0.5em;" :icon="faCommentDots" />
      <teedev-user-profile-icon />
    </div>
  </div>
</template>

<script>
import ShellLogo from './Logo';

import { faBars, faBell, faCommentDots } from '@fortawesome/pro-light-svg-icons';

export default {
  name: 'teedev-header',

  components: {
    ShellLogo,
  },

  data: () => ({
    faBars,
    faBell,
    faCommentDots,
  }),
};
</script>

<style lang="scss" scoped>
.shell-header {
  display: flex;
  align-items: center;
  justify-content: space-between; 

  font-size: 1.25em;

  position: sticky;
  top: 0;
  overflow: hidden;
  z-index: 1000;
  background-color: #fffd;
  box-shadow: 0 0 3px 0 rgba(#000, 0.15);
}
</style>
