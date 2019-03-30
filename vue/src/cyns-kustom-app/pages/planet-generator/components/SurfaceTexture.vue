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
        style="fill: #000; opacity: 0.03;"
        :style="{
          transform: `
            translate(${Math.random() * 300 - 150}px,${Math.random() * 300 - 150}px)
            scale(${Math.random() * 1.5 + 0.5},${Math.random() * 1.5 + 0.5})
            rotate(${Math.random() * 360}deg)
          `,
        }"
        :d="path"
      />
    </template>
  </teedev-svg-mask>
</template>

<script>
import { Angle } from '@/global/plugins/physics';

export default {
  name: 'planet-surface-texture',

  props: {
    size: Number,
    planetRadius: Number,
  },

  computed: {
    path() {
      const points = [];
      let path = '';

      for (let i = 0; i < 10; i += 1) {
        const angle = new Angle(i * (360 / 10));

        const point = {
          x: Math.sin(angle.radians) * (100 + (Math.random() * 100 - 50)),
          y: Math.cos(angle.radians) * (100 + (Math.random() * 100 - 50)),
          angle: angle.radians - (Math.PI / 2) + ((Math.random() * 2) - 1),
          distance: Math.random() * 50,
        };

        if (path === '') {
          path += `M${point.x},${point.y}`;
        } else {
          const prevPoint = points[points.length - 1];

          const prevAnchor = {
            x: prevPoint.x + (Math.sin(prevPoint.angle) * -prevPoint.distance),
            y: prevPoint.y + (Math.cos(prevPoint.angle) * -prevPoint.distance),
          };

          const curAnchor = {
            x: point.x + (Math.sin(point.angle) * point.distance),
            y: point.y + (Math.cos(point.angle) * point.distance),
          };

          path += ` C${prevAnchor.x},${prevAnchor.y},${curAnchor.x},${curAnchor.y},${point.x},${point.y}`;
        }

        points.push(point);
      }

      path += 'Z';

      return path;
    },
  },
};
</script>
