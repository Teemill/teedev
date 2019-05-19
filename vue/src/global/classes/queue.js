import uuid from 'uuid/v1';

export class QueueItem {
  constructor(item, queue) {
    this.uid = uuid();
    this.item = item;
    this.queue = queue;
  }

  pull() {
    if (this.queue) {
      this.queue.pull(this);
    } else {
      console.error('QueueItem is not linked to a Queue.');
    }
  }
}

export class Queue {
  static queues = [];

  constructor(name = 'default') {
    this.name = name;
    this.items = [];
  }

  push(item) {
    const queueItem = new QueueItem(item, this);

    this.items.push(queueItem);

    return queueItem;
  }

  pull(item) {
    console.log(this, item);
  }
}

export default Queue;
