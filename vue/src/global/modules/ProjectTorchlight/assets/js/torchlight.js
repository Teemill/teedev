import Vector from './vector';

export default class Torchlight {
  /**
   * Props
   */
  cnv = false;
  ctx = false;

  width = 400;
  height = 400;

  objects = [];
  activeObject;

  mousePosition;
  mouseDown = false;

  /**
   * Constructor
   */
  constructor(element) {
    this.cnv = document.createElement('canvas');
    this.ctx = this.cnv.getContext('2d');

    this.cnv.width = this.width;
    this.cnv.height = this.height;

    element.appendChild(this.cnv);

    this.registerEventHandlers();

    return this;
  }

  /**
   * Methods
   */
  addObject(object) {
    this.objects.push(object);
    object._initialise(this);
    object._render();
  }

  render() {
    this.clearCanvas();
    const objects = this.listObjects();

    for (let i = 0, l = objects.length; i < l; ++i) {
      objects[i]._render();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  listObjects(inverse = false) {
    if (inverse) {
      return this.objects.sort(this.inverseSortObjectsByZ);
    }
    return this.objects.sort(this.sortObjectsByZ);
  }

  sortObjectsByZ(a, b) {
    return a.z - b.z;
  }

  inverseSortObjectsByZ(a, b) {
    return b.z - a.z;
  }

  /**
   * Event methods
   */
  registerEventHandlers() {
    this.cnv.addEventListener('mousedown', (e) => {
      this.onMouseDown(e)
    });
    this.cnv.addEventListener('mousemove', (e) => {
      this.onMouseMove(e)
    });
    document.addEventListener('mouseup', (e) => {
      this.onMouseUp(e)
    });
  }

  onMouseDown(e) {
    this.mouseDown = true;

    const clickVector = this.getMousePositionFromEvent(e);

    this.mousePosition = clickVector;

    const activeObject = this.findObjectAtPosition(clickVector);

    if (activeObject) {
      this.activeObject = activeObject;
      return;
    } else {
      this.activeObject = false;
    }
  }

  onMouseMove(e) {
    const clickVector = this.getMousePositionFromEvent(e);
    if (this.mouseDown && this.mousePosition && this.activeObject) {
      this.activeObject.position.translate(
        clickVector.x - this.mousePosition.x,
        clickVector.y - this.mousePosition.y,
      );
      this.render();
    }

    this.mousePosition = clickVector;
  }

  onMouseUp(e) {
    this.mouseDown = false;
  }

  getMousePositionFromEvent(e) {
    const cnvBounds = this.cnv.getBoundingClientRect();
    return new Vector(
      e.clientX - cnvBounds.x,
      e.clientY - cnvBounds.y,
    );
  }

  findObjectAtPosition(clickVector) {
    const objects = this.listObjects(true);
    for (let i = 0, l = objects.length; i < l; ++i) {
      const obj = objects[i];
      if (
        clickVector.x > obj.position.x
        && clickVector.x < obj.position.x + obj.width
        && clickVector.y > obj.position.y
        && clickVector.y < obj.position.y + obj.height
      ) {
        return obj;
      }
    }
  }
}