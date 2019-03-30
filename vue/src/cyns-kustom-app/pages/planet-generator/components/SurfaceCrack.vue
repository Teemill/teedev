<template>
  <teedev-svg-mask class="planet-surface-texture">
    <template slot="mask">
      <teedev-svg-circle
        style="fill: #fff;"
        :r="planetRadius"
      />
    </template>
    <template>
      <path
        style="stroke: rgba(255,255,255,0.1); stroke-width: 4px; fill: #000; opacity: 0.15;"
        :d="path"
      />
    </template>
  </teedev-svg-mask>
</template>

<script>
import { Angle } from '@/global/plugins/physics';
import Crack from '../classes/crack';

export default {
  name: 'planet-surface-crack',

  props: {
    size: Number,
    planetRadius: Number,
  },

  data: () => ({
    length: 400,
  }),

  computed: {
    path() {
      const t = performance.now();
      console.log('Compute Points');

      let path = '';

      path += (new Crack(-100, 400, 25, 20, 20)).generatePath();
      path += (new Crack(-66, 400, 25, 20, 20)).generatePath();
      path += (new Crack(-33, 400, 25, 20, 20)).generatePath();
      path += (new Crack(0, 400, 25, 20, 20)).generatePath();
      path += (new Crack(33, 400, 25, 20, 20)).generatePath();
      path += (new Crack(66, 400, 25, 20, 20)).generatePath();
      path += (new Crack(100, 400, 25, 20, 20)).generatePath();

      console.log(performance.now() - t);

      return path;
    },
  },
};
</script>
