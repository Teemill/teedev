<template>
  <div class="teedev-scroll-down-icon">
    <div class="inner">

    </div>
  </div>
</template>

<script>
export default {
  name: 'teedev-scroll-down-icon',
};
</script>

<style lang="scss" scoped>
.teedev-scroll-down-icon {
  height: 4em;
  padding: 0.75em;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 99px;

  .inner {
    width: 6px;
    height: 6px;
    background-color: $color-background;
    border-radius: 99px;
    opacity: 0;
    transition: transform $anim-time-m;

    animation: scrolly-down-plz $anim-time-l * 4;
    animation-iteration-count: infinite;
  }

  @keyframes scrolly-down-plz {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    37% {
      opacity: 1;
    }
    75% {
      transform: translateY(calc(2.5em - 6px));
      opacity: 0;
    }
    100% {
      transform: translateY(calc(2.5em - 6px));
      opacity: 0;
    }
  }
}
</style>
