import {
  CanvasLayer,
  Transform,
} from '@/global/classes';
import Test from '../test';

export default class Canvas {
  constructor({
    context,
    size,
  }) {
    this.context = context;
    this.size    = size;
    this.layers  = [];

    this._renderingFrame = false;

    Test(this.context);
  }

  getLayer(index) {
    // eslint-disable-next-line
    const layer = this.layers.find(layer => layer.index === index);

    if (layer) {
      return layer;
    }

    return this.addLayer(index);
  }

  addLayer(index) {
    const newLayer = new CanvasLayer(index);
    this.layers.push(newLayer);

    return newLayer;
  }

  addObject(object, layerIndex = 0) {
    this.getLayer(layerIndex).addObject(object);

    object.load(this);
  }

  render() {
    if (!this._renderingFrame) {
      this._renderingFrame = true;

      this.context.setTransform(new Transform());
      this.context.clearRect(0, 0, this.size.x, this.size.y);

      this.layers.sort((a, b) => a.index - b.index);
      this.layers.forEach((layer) => {
        layer.render(this.context);
      });

      window.requestAnimationFrame(() => {
        this._renderingFrame = false;
      });
    }
  }
}
