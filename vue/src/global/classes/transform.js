import { Matrix } from '@/global/classes';

export default class Transform extends Matrix {
  constructor(...params) {
    super(...params);

    this.stack = [];
  }

  push() {
    this.stack.push(this.copy());
  }

  pop() {
    Object.assign(
      this,
      this.stack.pop(),
    );

    return this;
  }
}
