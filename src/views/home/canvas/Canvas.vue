<template>
  <div class="teedev-canvas">
    [Canvas]
    <canvas ref="canvas" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
  Canvas,
  CanvasLayer,
  CanvasRectangle
} from '@teedev/canvas';

import {
  Vector,
  Angle,
} from '@teedev/core';

const mousePos = new Vector();

export default Vue.extend({
  name: 'teedev-canvas',

  data: () => ({
    canvas: null,
  }),

  methods: {
    onRender(e) {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      this.canvas.render();

      // window.requestAnimationFrame(this.onRender);
    },
  },

  mounted() {
    this.canvas = new Canvas({
        canvas: this.$refs.canvas as HTMLCanvasElement,
        size: new Vector(800, 600),
      })
      .addObjects([
        new CanvasRectangle({
          position: new Vector(10, 10),
          size: new Vector(100, 100),
          fill: '#f00',
        }),
        new CanvasRectangle({
          position: new Vector(30, 30),
          size: new Vector(100, 100),
          angle: new Angle(45),
          fill: '#0f0',
          children: [
            new CanvasRectangle({
              position: new Vector(10, 10),
              size: new Vector(50, 50),
              fill: '#00f',
              afterRender(obj, ctx) {
                ctx.fillStyle = '#000';

                const transform = ctx.getTransform();
                const position = new Vector(transform.e, transform.f);

                const yDelta = mousePos.y - transform.f;
                const xDelta = mousePos.x - transform.e;

                position.x = (transform.m11 * yDelta) + (transform.m21 * -xDelta);
                position.y = (transform.m12 * yDelta) + (transform.m22 * -xDelta);
                
                ctx.fillRect(
                  position.x,
                  position.y,
                  10,
                  10,
                );
              },
            }),
          ],
        }),
      ])
      .render();

    // window.requestAnimationFrame(this.onRender);
    window.addEventListener('mousemove', this.onRender);
  },

  destroyed() {
    window.removeEventListener('mousemove', this.onRender);
  },
});
</script>
