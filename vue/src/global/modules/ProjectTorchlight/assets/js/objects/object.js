import Vector from "../vector";

export default class BaseObject {
  /**
   * Props
   */
  position = new Vector(0, 0);
  z = 0;
  width = 100;
  height = 100;
  colour = 'black';

  controller = false;
  ctx = false;

  /**
   * Constructor
   */
  constructor(props) {
    if (props && typeof props === 'object') {
      Object.keys(props).forEach((prop) => {
        this[prop] = props[prop];
      });

      if (props.x || props.y) {
        this.position = new Vector(
          props.x || 0,
          props.y || 0,
        );
      }
    }

    return this;
  }

  /**
   * Methods
   */
  _initialise(controller) {
    this.controller = controller;
    this.ctx = controller.ctx;
  }

  _render() {
    this.ctx.fillStyle = this.colour;
    this.beforeRender();
    this.render();
    this.afterRender();
  }

  beforeRender() {
  }

  render() {
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  afterRender() {
  }
}