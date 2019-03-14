import Vector from '@/global/plugins/helpers/vector';

export default class Relativity {
  constructor(element) {
    this.mouseDown = false;

    this.elementStartPos = new Vector(0, 0);
    this.mouseStartPos = new Vector(0, 0);
    this.mouseDelta = new Vector(0, 0);
    this.mousePos = new Vector(0, 0);

    this.testPos = new Vector(0, 0);

    this._onMouseUp = this._onMouseUp.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);

    if (element) {
      this.setElement(element);

      const observer = new MutationObserver((mutationsList, observerSomething) => {
        console.log(mutationsList, observerSomething);
      });

      observer.observe(element);
    }
  }

  setElement(element) {
    this.element = element;

    this.element.addEventListener('mousedown', this._onMouseDown);
  }

  update() {
    if (this.mouseDown) {
      this.setMouseDelta();
    }
  }

  _onMouseUp() {
    this.mouseDown = false;

    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);

    this.mouseDelta.x = 0;
    this.mouseDelta.y = 0;
  }

  _onMouseDown(e) {
    this.mouseDown = true;

    this.setElementStartPos();
    this.setMouseStartPos(e);
    this.updateMousePos(e);
    this.setMouseDelta();

    window.addEventListener('mouseup', this._onMouseUp);
    window.addEventListener('mousemove', this._onMouseMove);
  }

  _onMouseMove(e) {
    this.updateMousePos(e);

    this.setMouseDelta();
  }

  setMouseStartPos(e) {
    this.mouseStartPos.x = e.clientX;
    this.mouseStartPos.y = e.clientY;
  }

  setMouseDelta() {
    this.mouseDelta = this.mousePos
      .copy()
      .subtract(this.mouseStartPos);

    this.mouseDelta.add(this.elementStartPos.copy().subtract(this.getElementPos()));
  }

  updateMousePos(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  }

  setElementStartPos() {
    this.elementStartPos = this.getElementPos();
  }

  getElementPos() {
    const boundingRect = this.element.parentElement.getBoundingClientRect();

    return new Vector(
      boundingRect.x,
      boundingRect.y,
    );
  }
}
