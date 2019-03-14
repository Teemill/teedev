export default class Angle {
  constructor(angle) {
    this.angle = angle;
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
    this.angle = this.angle * (180 / Math.PI);
    return this;
  }

  toRadians() {
    this.angle = (this.angle / 180) * Math.PI;
    return this;
  }
}
