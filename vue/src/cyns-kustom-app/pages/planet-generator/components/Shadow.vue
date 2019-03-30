<template>
  <teedev-svg-mask class="planet-shadow">
    <template slot="mask">
      <teedev-svg-circle
        style="fill: #fff;"
        :r="planetRadius"
      />
      <teedev-svg-box
        :style="`fill: #000;`"
        :x="0"
        :y="-planetRadius - 10"
        :h="(planetRadius + 10) * 2"
        :w="(planetRadius + 10) * (lightDirection > 0 ? 1 : -1)"
      />
      <teedev-svg-circle
        :style="`fill: ${maskColour};`"
        :sx="scale"
        :r="planetRadius"
      />
    </template>
    <teedev-svg-circle
      class="shadow"
      :x="0"
      :y="0"
      :r="planetRadius"
    />
  </teedev-svg-mask>
</template>

<script>
export default {
  name: 'planet-shadow',

  props: {
    lightDirection: {
      type: Number,
      default: -0.5,
    },
    planetRadius: Number,
  },

  computed: {
    scale() {
      return Math.cos(this.lightDirection * (Math.PI * 0.5));
    },

    maskColour() {
      if (this.lightDirection > 1 || this.lightDirection < -1) {
        return '#fff';
      }

      return '#000';
    },
  },
};
</script>

<style lang="scss" scoped>
.planet-shadow {
  .shadow {
    fill: rgba(0,0,0,0.2);
  }
}
</style>
