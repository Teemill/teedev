import Angle from '@/global/plugins/helpers/angle';

function round(value, decimals) {
  const multiple = 10 ** decimals;
  return Math.round(value * multiple) / multiple;
}

export default class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  add(value) {
    if (value instanceof Vector) {
      this.x += value.x;
      this.y += value.y;
    } else if (typeof value === 'number') {
      this.x += value;
      this.y += value;
    }

    return this;
  }

  subtract(value) {
    if (value instanceof Vector) {
      this.x -= value.x;
      this.y -= value.y;
    } else if (typeof value === 'number') {
      this.x -= value;
      this.y -= value;
    }

    return this;
  }

  multiply(value) {
    if (value instanceof Vector) {
      this.x *= value.x;
      this.y *= value.y;
    } else if (typeof value === 'number') {
      this.x *= value;
      this.y *= value;
    }

    return this;
  }

  divide(value) {
    if (value instanceof Vector) {
      this.x /= value.x;
      this.y /= value.y;
    } else if (typeof value === 'number') {
      this.x /= value;
      this.y /= value;
    }

    return this;
  }

  getMagnitude() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2));
  }

  getDirection() {
    return this.divide(this.getMagnitude());
  }

  getAngle() {
    return new Angle(Math.atan2(this.y, this.x));
  }

  getCompassDirection() {
    const direction = this.getAngle().toDegrees().angle;

    if (this.x === 0 && this.y === 0) {
      return null;
    }

    if (direction < -135) {
      return 'W';
    }

    if (direction < -45) {
      return 'N';
    }

    if (direction > 135) {
      return 'W';
    }

    if (direction > 45) {
      return 'S';
    }

    return 'E';
  }

  rotateAround(vector, angle) {
    angle = angle.toRadians().angle;

    const xDiff = this.x - vector.x;
    const yDiff = this.y - vector.y;

    this.x = round(
      xDiff * Math.cos(angle) - yDiff * Math.sin(angle) + vector.x,
      12,
    );
    this.y = round(
      yDiff * Math.cos(angle) - xDiff * Math.sin(angle) + vector.y,
      12,
    );

    return this;
  }
}
