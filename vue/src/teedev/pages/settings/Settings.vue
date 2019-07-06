<template>
  <div class="page-settings">
    <p><font-awesome-icon :icon="faSlidersH" /> Settings Page</p>
    <teedev-button
      primary
      text="Hello There"
      class="mb-3"
    />
    <br>
    <teedev-button
      text="Hello There"
      class="mb-3"
    />
    <br>
    <teedev-button
      primary
      :icon="faBell"
      class="mb-3"
    />
    <br>
    <teedev-button
      :icon="faBell"
      class="mb-3"
    />
    <br>
    <teedev-button
      :icon="faBell"
      just-icon
      class="mb-3"
    />
    <br>
    <teedev-button
      primary
      text="Hello There"
      :icon="faBell"
      class="mb-3"
    />
    <br>
    <teedev-button
      text="Hello There"
      :icon="faBell"
      class="mb-3"
    />
    <br>
    <teedev-button
      primary
      text="Hello There"
      :loading="true"
      class="mb-3"
    />
    <br>

    <div class="swatch primary"></div>
    <div class="swatch secondary"></div>
    <div class="swatch error"></div>
    <div class="swatch text"></div>
    <div class="swatch background"></div>
    <div class="swatch highlight"></div>
    <div class="swatch border"></div>
  </div>
</template>

<script>
import {
  faSlidersH,
  faBell,
} from '@fortawesome/pro-light-svg-icons';

export default {
  name: 'page-settings',

  data: () => ({
    faSlidersH,
    faBell,
  }),
};
</script>

<style lang="scss" scoped>
.page-settings {
  padding: 4em;

  .swatch {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 1em 1em 0 0;
    border-radius: $border-radius;

    &.primary { background-color: $color-primary; }
    &.secondary { background-color: $color-secondary; }
    &.error { background-color: $color-error; }
    &.text { background-color: $color-text; }
    &.background { background-color: $color-background; }
    &.highlight { background-color: $color-highlight; }
    &.border { background-color: $color-border; }
  }
}
</style>
