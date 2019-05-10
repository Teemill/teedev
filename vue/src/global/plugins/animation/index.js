import Bezier from 'bezier-js';
import FrameQueue from '@/global/plugins/helpers/frameQueue';
import Vector from '@/global/plugins/physics/vector';

const frameQueue = new FrameQueue();

export default class Animation {
  constructor(type, callback) {
    this.type = type || 'number';
    this.callback = callback;

    switch (this.type) {
      case 'number':
      default:
        this.startValue = 0;
        this.endValue = 0;
        break;

      case 'vector':
        this.startValue = new Vector(0, 0);
        this.endValue = new Vector(0, 0);
        break;
    }

    this.time = 0;
    this.currentTime = 0;

    this._prevTime = null;
    this._frameWaiting = false;
    this._halt = false;

    this._endResolve = null;
  }

  _calcDeltaTime(time) {
    if (!this._prevTime) {
      this._prevTime = time;
    }

    const dt = time - this._prevTime;
    this._prevTime = time;

    return dt;
  }

  _update(time) {
    this._frameWaiting = false;

    if (!this._halt) {
      const dt = this._calcDeltaTime(time);

      this.currentTime += dt;

      if (this.currentTime < this.time) {
        if (!this._frameWaiting) {
          this._frameWaiting = true;
          frameQueue.add(this._update.bind(this));
        }
      } else {
        this.currentTime = this.time;
        this._endResolve(this);
      }

      if (this.callback) {
        this.callback({
          lerp: this.lerp,
          berp: this.berp,
        });
      }
    } else {
      this._halt = false;
    }
  }

  start(startValue, endValue, time) {
    return new Promise((resolve) => {
      this._endResolve = resolve;

      if (startValue !== null) {
        this.startValue = startValue;
      }

      if (endValue !== null) {
        this.endValue = endValue;
      }

      this.time = time;

      this.reset();
    });
  }

  stop() {
    if (this._frameWaiting) {
      this._halt = true;
    }

    this.currentTime = 0;
  }

  reset() {
    this.currentTime = 0;

    this._prevTime = null;
    this._update(0);
  }

  _computeValue(progress) {
    switch (this.type) {
      case 'number':
      default:
        return (progress * (this.endValue - this.startValue)) + this.startValue;

      case 'vector':
        return new Vector(
          (progress * (this.endValue.x - this.startValue.x)) + this.startValue.x,
          (progress * (this.endValue.y - this.startValue.y)) + this.startValue.y,
        );
    }
  }

  get lerp() {
    return this._computeValue(this.currentTime / this.time);
  }

  get berp() {
    const curve = new Bezier(
      { x: -0.001, y: 0 },
      { x: 0.5, y: 0 },
      { x: 0.5, y: 1 },
      { x: 1.001, y: 1 },
    );

    const x = this.time ? (this.currentTime / this.time) : 0;

    return this._computeValue(
      curve.get(
        curve.intersects({
          p1: { x, y: 0 },
          p2: { x, y: 1 },
        })[0],
      ).y,
    );
  }
}