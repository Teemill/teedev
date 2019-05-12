import {
  Vector,
  CanvasObject,
} from '@/global/classes';

export default class CanvasRectangle extends CanvasObject {
  constructor({
    size   = new Vector(0, 0),

    fill   = '',
    stroke = '',
  } = {}) {
    super(...arguments);

    this.size   = size;

    this.fill   = fill;
    this.stroke = stroke;
  }

  render(context) {
    super.render(
      context,
      () => {
        context.fillStyle = this.fill;
        context.strokeStyle = this.stroke;

        context.fillRect(
          0,
          0,
          this.size.x,
          this.size.y,
        );
      },
    );
  }
}
