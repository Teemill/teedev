import { Vector } from '@/global/plugins/physics';
import Shadow from './shadow';

export default class Planet {
  constructor() {
    this.radius = 200;
    this.position = new Vector(250, 250);

    this.materials = {
      base: '#9F6552',
    };

    this.lightDirection = -0.5;

    this.shadow = new Shadow(this);
  }
}
