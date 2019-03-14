import FrameQueue from '@/global/plugins/helpers/frameQueue';

const frameQueue = new FrameQueue();

export default class Spring {
  constructor(stiffness, damping, precision) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.precision = precision;

    this._value = 0;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;

    this.update();
  }

  update() {
    if (this._value > 0.01) {
      this._value *= 0.99;

      frameQueue.add(this.update.bind(this));
    } else {
      this._value = 0;
    }
  }
}
