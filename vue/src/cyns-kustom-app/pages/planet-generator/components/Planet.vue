<template>
  <teedev-svg-group
    class="planet"
    :x="position.x"
    :y="position.y"
  >
    <planet-atmosphere
      :planet-radius="radius"
      :light-direction="lightDirection"
      :thickness="atmosphereThickness"
      :density="atmosphereDensity"
    />

    <teedev-svg-circle
      class="base"
      :r="radius"
    />

    <!-- <planet-surface-texture
      :planet-radius="radius"
    />
    <planet-surface-texture
      :planet-radius="radius"
    />
    <planet-surface-texture
      :planet-radius="radius"
    />
    <planet-surface-texture
      :planet-radius="radius"
    /> -->

    <!-- <planet-surface-crack
      :planet-radius="radius"
    /> -->

    <planet-ice-caps
      :size="0.8"
      :planet-radius="radius"
    />

    <teedev-svg-group
      class="craters"
    >
      <planet-crater
        v-for="(crater, index) in craters"
        :key="index"
        :offset="crater.offset"
        :angle="crater.angle"
        :radius="crater.size"
        :planet-radius="radius"
      />
    </teedev-svg-group>

    <planet-shadow
      :planet-radius="radius"
      :light-direction="lightDirection"
    />
  </teedev-svg-group>
</template>

<script>
import { Vector } from '@/global/plugins/physics';

import PlanetCrater from './Crater';
import PlanetShadow from './Shadow';
import PlanetIceCaps from './IceCaps';
import PlanetAtmosphere from './Atmosphere';
import PlanetSurfaceCrack from './SurfaceCrack';
import PlanetSurfaceTexture from './SurfaceTexture';

export default {
  name: 'planet',

  components: {
    PlanetCrater,
    PlanetShadow,
    PlanetIceCaps,
    PlanetAtmosphere,
    PlanetSurfaceCrack,
    PlanetSurfaceTexture,
  },

  props: {
    position: Vector,
    radius: Number,
    lightDirection: Number,
    atmosphereThickness: Number,
    atmosphereDensity: Number,
  },

  data: () => ({
    craters: [],
  }),

  methods: {
    createCrater() {
      let iterationLimit = 10;
      let crater = null;

      while (iterationLimit > 0) {
        iterationLimit -= 1;

        crater = {
          angle: (Math.random() * 360) - 180,
          size: (Math.random() * 10) + 1,
          offset: (Math.random() ** 0.5) * 0.9,
        };

        if (!this.craterCollision(crater)) {
          break;
        } else {
          crater = null;
        }
      }

      return crater;
    },

    craterCollision(crater) {
      // console.log(crater);
      return false;
    },
  },

  mounted() {
    for (let i = 0; i < 30; i += 1) {
      const crater = this.createCrater();

      if (crater) {
        this.craters.push(crater);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.planet {
  .base {
    fill: #9F6552;
  }

  .craters {
    opacity: 0.1;
  }
}
</style>
