<template>
  <div v-resize="onResize">
    {{mousePosition}}
    {{testAngle.value}}
    <canvas
      ref="canvas"
      class="teedev-canvas"
      :style="{
        width,
        height,
      }"
      :width="canvas ? canvas.size.x : 0"
      :height="canvas ? canvas.size.y : 0"

      @mousemove="onMouseMove"
    >
    </canvas>
  </div>
</template>

<script>
import {
  Canvas,
  CanvasImage,
  CanvasRectangle,
  Vector,
  Angle,
} from '@/global/classes';
import resize from 'vue-resize-directive';

export default {
  name: 'teedev-canvas',

  directives: {
    resize,
  },

  props: {
    width: {
      type: String,
      default: '100%',
    },

    height: {
      type: String,
      default: '800px',
    },
  },
  
  data: () => ({
    canvas: null,
    mousePosition: new Vector(0, 0),
    testAngle: new Angle(0),
  }),

  methods: {
    onResize() {
      const canvasBounds = this.$refs.canvas.getBoundingClientRect();

      this.canvas.size.x = canvasBounds.width;
      this.canvas.size.y = canvasBounds.height;

      this.$nextTick(() => {
        this.onRender();
      });
    },

    onRender() {
      this.canvas.render();
    },

    onMouseMove(e) {
      this.mousePosition.x = e.clientX - 200;
      this.mousePosition.y = e.clientY - 200;

      this.testAngle.value = e.clientX - 200;

      this.canvas.render();
    },
  },

  mounted() {
    this.canvas = new Canvas({
      context: this.$refs.canvas.getContext('2d'),
      size: new Vector(100, 100),
    });

    this.canvas.addObject(
      new CanvasRectangle({
        position: new Vector(0, 0),
        size: this.canvas.size,
        fill: '#000',
      })
    );

    this.canvas.addObject(
      new CanvasRectangle({
        position: new Vector(136, 104),
        size: new Vector(5, 5),
        fill: '#fff',
      })
    );

    // this.canvas.addObject(
    //   new CanvasRectangle({
    //     position: new Vector(100, 200),
    //     size: new Vector(1, 220),
    //     fill: '#fff',
    //   })
    // );

    // this.canvas.addObject(
    //   new CanvasRectangle({
    //     position: new Vector(100, 200),
    //     size: new Vector(110, 1),
    //     fill: '#fff',
    //   })
    // );

    this.canvas.addObject(
      new CanvasRectangle({
        position: new Vector(300, 200),
        angle: new Angle(20), // this.testAngle,
        size: new Vector(100, 100),
        fill: '#fff',
        children: [

          new CanvasRectangle({
            position: new Vector(0, 0),
            size: new Vector(10, 10),
            fill: '#0f0',
            beforeRender: (obj, ctx) => {
              const transform = ctx.getTransform().copy();

              const dx = (this.mousePosition.x - transform.m31);
              const dy = (this.mousePosition.y - transform.m32);

              obj.position.x = (dx * transform.m11) + (dy * transform.m12);
              obj.position.y = (dx * transform.m21) + (dy * transform.m22);
            },
          }),
          new CanvasRectangle({
            position: new Vector(100, 0),
            size: new Vector(10, 10),
            fill: '#f00',
            beforeRender: (obj, ctx) => {
              obj.position.x = this.mousePosition.x;
              obj.position.y = this.mousePosition.y;
            },
          }),

          // new CanvasRectangle({
          //   position: new Vector(10, 10),
          //   size: new Vector(10, 10),
          //   fill: '#f00',
          // }),
          // new CanvasRectangle({
          //   position: new Vector(30, 30),
          //   size: new Vector(50, 50),
          //   angle: new Angle(-22.5),
          //   fill: '#000',
          //   children: [
          //     new CanvasImage({
          //       position: new Vector(10, 10),
          //       size: new Vector(30, 30),
          //       src: 'https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=1080',
          //       fill: '#fff',
          //       stroke: '#fff',
          //     }),
          //   ],
          // }),
        ],
      })
    );

    // this.canvas.addObject(
    //   new CanvasImage({
    //     position: new Vector(110, 320),
    //     size: new Vector(100, 100),
    //     src: 'https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=1080',
    //     fill: '#fff',
    //     stroke: '#fff',
    //   }),
    // );

    this.onResize();
  },
}
</script>

<style lang="scss" scoped>
.teedev-canvas {
  display: block;
  box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
}
</style>



