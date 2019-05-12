import {
  Vector,
  CanvasObject,
} from '@/global/classes';

export default class CanvasImage extends CanvasObject {
  constructor({
    size   = new Vector(0, 0),

    src    = '',
    fill   = '',
    stroke = '',
  } = {}) {
    super(...arguments);

    this.size   = size;

    this.image  = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.src    = src;

    this.fill   = fill;
    this.stroke = stroke;
  }

  set src(value) {
    this.image.src = value;
  }

  onImageLoaded() {
    if (this.canvas) {
      this.canvas.render();
    }
  }

  render(context) {
    super.render(
      context,
      () => {
        context.fillStyle = this.fill;
        context.strokeStyle = this.stroke;

        context.drawImage(
          this.image,
          0,
          0,
          this.size.x,
          this.size.y,
        );
      },
    );
  }
}
