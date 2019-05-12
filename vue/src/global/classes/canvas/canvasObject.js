import {
  Angle,
  Vector,
} from '@/global/classes';

export default class CanvasObject {
  constructor({
    angle    = new Angle(0),
    scale    = new Vector(1, 1),
    position = new Vector(0, 0),

    children = [],

    onRender,
    beforeRender,
  } = {}) {
    this.canvas = null;

    this.angle    = angle;
    this.scale    = scale;
    this.position = position;

    this.children = children;

    this.onRenderHandler = onRender;
    this.beforeRenderHandler = beforeRender;
  }

  load(canvas, callback) {
    // TODO - Might need to be an array so element can be rendered on multiple canvases.
    this.canvas = canvas;

    if (callback) {
      callback(canvas);
    }
  }

  render(context, callback) {
    if (this.beforeRenderHandler) {
      this.beforeRenderHandler(this, context);
    }

    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.angle.radians);
    context.scale(this.scale.x, this.scale.y);

    if (callback) {
      callback();
    }

    if (this.onRenderHandler) {
      this.onRenderHandler(this, context);
    }

    this.children.forEach((child) => {
      child.render(context);
    });

    context.restore();
  }
}
