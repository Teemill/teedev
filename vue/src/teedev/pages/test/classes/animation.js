import Bezier from 'bezier-js';
import { Vector, FrameQueue } from '@/global/classes';

const frameQueue = new FrameQueue();

/**
 * @name Animation
 * @description The animation class is used to provide smooth animations between
 *              two distinct values. A value can be both a single number or a vector.
 */
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

  /**
   * @name _calcDeltaTime
   * @description Calculates the amount of time pasted since the previous animation frame.
   *
   * @param {Number} time Current frame timestamp
   *
   * @return {Number} Frame delta time.
   */
  _calcDeltaTime(time) {
    if (!this._prevTime) {
      this._prevTime = time;
    }

    const dt = time - this._prevTime;
    this._prevTime = time;

    return dt;
  }

  /**
   * @name _update
   * @description Advances to the animation to the next frame and queues a new frame if needed.
   *
   * @param {Number} time Current frame timestamp.
   */
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
        this.currentTime = time;
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

  /**
   * @name _computeValue
   * @description Interpolates a value between the current start and end values
   *
   * @param {Number} progress Value between 0 and 1.
   *
   * @return {Number|Vector}
   */
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

  /**
   * @name start
   * @description Starts the animation.
   *
   * @param {Number|Vector} startValue Value the animation should start at. If null them it will use
   *                                   the previously set startValue.
   * @param {Number|Vector} endValue   Value the animation should end at. If null them it will use
   *                                   the previously set endValue.
   * @param {Number} time              How long (in milliseconds) the animation should take.
   *
   * @return {Promise} Promise that is resolved when the animation finishes.
   */
  start(startValue, endValue, time) {
    return new Promise((resolve) => {
      this._endResolve = resolve;

      if (startValue) {
        this.startValue = startValue;
      }

      if (endValue) {
        this.endValue = endValue;
      }

      this.time = time;

      this.reset();
    });
  }

  /**
   * @name stop
   * @description Stops the current animation.
   */
  stop() {
    if (this._frameWaiting) {
      this._halt = true;
    }

    this.currentTime = 0;
  }

  /**
   * @name reset
   * @description Resets the animation to returns all values back to 0.
   */
  reset() {
    this.currentTime = 0;

    this._prevTime = null;
    this._update(0);
  }

  /**
   * @name lerp
   * @description Get the current animation value using linear interpolation.
   *
   * @return {Number|Vector}  Linear interpolation.
   */
  get lerp() {
    return this._computeValue(this.currentTime / this.time);
  }

  /**
   * @name berp
   * @description Get the current animation value using bezier interpolation.
   *
   * @return {Number|Vector} Bezier interpolation.
   */
  get berp() {
    // -0.001 was used to avoid the intersect going past the end of the curve.
    const curve = new Bezier(
      { x: -0.001, y: 0 },
      { x: 0.5, y: 0 },
      { x: 0.5, y: 1 },
      { x: 1, y: 1 },
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
