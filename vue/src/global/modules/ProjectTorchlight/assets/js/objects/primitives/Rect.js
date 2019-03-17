import BaseObject from '../object';

export default class Rect extends BaseObject {
  cornerRadius = 0;

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
  
    if (props && typeof props === 'object') {
      Object.keys(props).forEach((prop) => {
        if (typeof this[prop] !== 'undefined') {
          this[prop] = props[prop];
        }
      });
    }

    return this;
  }

  render() {
    const [
      cornerRadius,
      x,
      y,
      width,
      height,
    ] = [
      this.cornerRadius,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    ];

    this.ctx.beginPath();
    this.ctx.moveTo(x, y + cornerRadius);
    this.ctx.lineTo(x, (y - cornerRadius) + height);
    this.ctx.arcTo(x, y + height, x + cornerRadius, y + height, cornerRadius);
    this.ctx.lineTo((x - cornerRadius) + width, y + height);
    this.ctx.arcTo(x + width, y + height, x + width, y + height - cornerRadius, cornerRadius);
    this.ctx.lineTo(x + width, y + cornerRadius);
    this.ctx.arcTo(x + width, y, x + width - cornerRadius, y, cornerRadius);
    this.ctx.lineTo(x + cornerRadius, y);
    this.ctx.arcTo(x, y, x, y + cornerRadius, cornerRadius);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
