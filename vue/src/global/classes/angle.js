export default class Angle {
  constructor(angle = 0) {
    this.angle = angle;
  }

  get radians() {
    return (this.angle / 180) * Math.PI;
  }

  get degrees() {
    return this.angle * (180 / Math.PI);
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