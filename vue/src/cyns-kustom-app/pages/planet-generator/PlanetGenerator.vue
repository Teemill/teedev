<template>
  <div class="page-planet-generator">
    <teedev-svg ref="svg">
      <planet
        :position="position"
        :radius="radius"
        :lightDirection="lightDirection"

        :atmosphere-thickness="atmosphereThickness"
        :atmosphere-density="atmosphereDensity"
      />
    </teedev-svg>
    <label>Light Direction</label>
    <input type="range" min="-2" max="2" step="0.1" v-model.number="lightDirection" style="width: 100%;"/>
    <label>Planet Size</label>
    <input type="range" min="50" max="225" step="0.1" v-model.number="radius" style="width: 100%;"/>
    <label>Atmosphere Thickness</label>
    <input type="range" min="0" max="20" step="0.1" v-model.number="atmosphereThickness" style="width: 100%;"/>
    <label>Atmosphere Density</label>
    <input type="range" min="0" max="0.8" step="0.1" v-model.number="atmosphereDensity" style="width: 100%;"/>
    <label>Day/Night Cycle</label>
    <input type="checkbox" v-model.number="dayNightCycle" style="width: 100%;"/>
  </div>
</template>

<script>
import { Vector, Angle } from '@/global/plugins/physics';

import Planet from './components/Planet';

export default {
  name: 'page-planet-generator',

  components: {
    Planet,
  },

  data: () => ({
    position: new Vector(250, 250),
    radius: 200,

    lightDirection: -0.5,

    atmosphereThickness: 10,
    atmosphereDensity: 0.3,
    dayNightCycle: false,
  }),

  methods: {
    onDayNightCycle() {
      this.lightDirection += 0.01;

      if (this.lightDirection > 2) {
        this.lightDirection = -2;
      }
    },
  },

  mounted() {
    setInterval(() => {
      if (this.dayNightCycle) {
        this.onDayNightCycle();
      }
    }, 16);
  },
}
</script>

<style lang="scss" scoped>
.page-planet-generator {
  .base {
    fill: rgba(0,0,0,0.1);
  }

  .crater {
    fill: rgba(0,0,0,0.5);
  }
}
</style>

