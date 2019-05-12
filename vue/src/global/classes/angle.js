const degreesToRadians = Math.PI / 180;
const radiansToDegrees = 180 / Math.PI;

export default class Angle {
  /**
   * @param {Number} angle
   */
  constructor(
    angle = 0,
    unit  = 'degrees',
  ) {
    this.angle = angle;
    this.unit = unit;
  }

  set value(value) {
    this.angle = value;
  }

  get value() {
    return this.angle;
  }

  get radians() {
    return this.angle * degreesToRadians;
  }

  get degrees() {
    return this.angle * radiansToDegrees;
  }

  add(value) {
    if (value instanceof Angle) {
      this.angle += value.angle;
    } else if (typeof value === 'number') {
      this.angle += value;
    }

    return this;
  }

  subtract(value) {
    if (value instanceof Angle) {
      this.angle -= value.angle;
    } else if (typeof value === 'number') {
      this.angle -= value;
    }

    return this;
  }

  multiply(value) {
    this.angle *= value;
    return this;
  }

  divide(value) {
    this.angle /= value;
    return this;
  }

  toDegrees() {
    this.angle = this.degrees;
    return this;
  }

  toRadians() {
    this.angle = this.radians;
    return this;
  }
}
