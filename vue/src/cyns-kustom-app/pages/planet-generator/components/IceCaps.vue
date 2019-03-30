<template>
  <teedev-svg-mask class="planet-ice-caps">
    <template slot="mask">
      <teedev-svg-circle
        style="fill: #fff;"
        :r="planetRadius"
      />
    </template>
    <template>
      <teedev-svg-circle
        class="ice-cap"
        :x="0"
        :y="planetRadius"
        :r="size * planetRadius"
        :sy="size * 0.2"
      />
      <teedev-svg-circle
        class="ice-cap"
        :x="0"
        :y="-planetRadius"
        :r="size * planetRadius"
        :sy="size * 0.2"
      />
    </template>
  </teedev-svg-mask>
</template>

<script>
export default {
  name: 'planet-ice-caps',

  props: {
    size: Number,
    planetRadius: Number,
  },
};
</script>

<style lang="scss" scoped>
.planet-ice-caps {
  .ice-cap {
    fill: rgba(255,255,255,0.8);
  }
}
</style>
