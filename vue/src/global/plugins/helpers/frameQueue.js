export default class FrameQueue {
  constructor() {
    this.queue = [];
    this.waitingForFrame = false;
  }

  add(item) {
    this.queue.push(item);

    this.runQueue();
  }

  runQueue() {
    if (!this.waitingForFrame) {
      this.waitingForFrame = true;

      window.requestAnimationFrame(this.processQueue.bind(this));
    }
  }

  processQueue() {
    const queueBuffer = this.queue;
    this.queue = [];

    queueBuffer.forEach((item) => {
      if (typeof item === 'function') {
        item();
      }
    });

    this.waitingForFrame = false;

    if (this.queue.length > 0) {
      this.runQueue();
    }
  }
}
