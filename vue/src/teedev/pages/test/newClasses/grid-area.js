import { Vector } from '@/global/classes';

export default class GridArea {
  constructor({
    position = new Vector(0, 0),
    size     = new Vector(0, 0),
    content  = null,
  }  = {}) {
    this.position = position;
    this.size     = size;
    this.content  = content;
  }
}
