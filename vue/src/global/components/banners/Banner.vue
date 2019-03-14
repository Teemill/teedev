<template>
  <div
    class="teedev-banner"
    :style="{
      'height': height,
      'background-image': `url('${image}')`,
      'background-position-y': `-${yOffset}px`,
    }"
  >
    <div
      v-if="showOverlay"
      class="overlay"
      :style="{ 'background-image': `url('${overlayImage}')` }"
    ></div>
    <div class="content">
      <div class="inner">
        <div
          class="blured"
          :style="{
            'background-image': `url('${image}')`,
            'background-position-y': `-${yOffset}px`,
          }"
        ></div>
        <div class="inner-content">
          <img v-if="logo" :src="logo" width="200px"/>
          <h2 v-if="title">{{title}}</h2>
          <p v-if="subTitle">{{subTitle}}</p>
        </div>
      </div>
    </div>
    <div class="scroll-down">
      <teedev-scroll-down-icon/>
    </div>
    <div class="signiture">
      {{signiture}}
    </div>
  </div>
</template>

<script>
import overlayImage from '@/global/assets/img/pixel_overlay.png';

export default {
  name: 'teedev-banner',
  props: {
    logo: String,
    title: String,
    subTitle: String,
    signiture: String,
    image: String,
    height: String,
    showOverlay: Boolean,
    yOffset: Number,
  },
  data() {
    return {
      overlayImage,
    };
  },
};
</script>

<style lang="scss" scoped>


.teedev-banner {
  position: relative;
  width: 100%;
  height: 600px;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;

  .overlay {
    width: 100%;
    height: 100%;

    background-attachment: fixed;

    filter: invert(1);
    opacity: 0.2;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .inner {
      position: relative;
      border-radius: $border-radius;
      overflow: hidden;

      .blured {
        position: absolute;
        top: 0;
        left: 0;
        filter: blur(6px);
        width: 100%;
        height: 100%;
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
      }

      .inner-content {
        position: relative;
        padding: 2em 3em;
        background-color: rgba(255,255,255,0.2);
        color: $color-text;
        text-align: center;

        *:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .scroll-down {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: 4em;
    right: 0;
  }

  .signiture {
    position: absolute;
    bottom: 1em;
    right: 1em;
    color: $color-background;
    opacity: 0.1;
  }
}
</style>
