<template>
  <div class="teedev-user-profile-icon">
    <div class="inner">
      <font-awesome-icon :icon="faUser" />
    </div>
  </div>
</template>

<script>
import { faUser } from '@fortawesome/pro-light-svg-icons/faUser';

export default {
  name: 'teedev-user-profile-icon',

  data: () => ({
    faUser,
  }),
};
</script>

<style lang="scss" scoped>
.teedev-user-profile-icon {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.5em;
  height: 2.5em;
  padding: 0.25em;

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: $color-highlight;
    overflow: hidden;
  }
}
</style>
