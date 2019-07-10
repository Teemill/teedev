import uuid from 'uuid/v4';

export default class MasonryGridItem {
  constructor(index, vNode) {
    this.vNode = vNode;
    this.index = index;
    this.slotIndex = vNode.slotIndex;

    if (this.componentProps.uid) {
      this.uid = this.componentProps.uid;
    } else {
      this.uid = uuid();
    }
  }

  get component() {
    return this.vNode.componentInstance;
  }

  get componentProps() {
    return this.vNode.componentOptions.propsData;
  }

  get size() {
    const size = this.vNode.componentOptions.propsData.size.copy();

    if (
      this.component &&
      this.component.correctedHeight
    ) {
      size.y = this.component.correctedHeight;
    }

    return size;
  }

  get order() {
    return this.componentProps.order;
  }
}
