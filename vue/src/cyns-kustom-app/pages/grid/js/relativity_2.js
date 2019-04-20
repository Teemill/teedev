import { Vector } from '@/global/plugins/physics';

export default class Relativity {
  constructor(
    {
      element,
      container,
    },
    {
      onClick,
      onGrab,
      onDrag,
      onDrop,
    },
  ) {
    this._onScroll = this._onScroll.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    // this._onAutoScroll = this._onAutoScroll.bind(this);

    this.onClickHandler = onClick;
    this.onGrabHandler = onGrab;
    this.onDragHandler = onDrag;
    this.onDropHandler = onDrop;

    // this._elementStartPos = new Vector(0, 0);
    this._containerPos = new Vector(0, 0);
    this._mouseStartPos = new Vector(0, 0);
    this._mouseDelta = new Vector(0, 0);
    this._mousePos = new Vector(0, 0);
    this._mouseMovement = new Vector(0, 0);
    this._relativePos = new Vector(0, 0);

    this.mouseState = 'up';

    if (container) {
      this.setContainer(container);
    }

    if (element) {
      this.setElement(element);
    }
  }

  get isMouseUp() {
    return this.mouseState === 'up';
  }

  get isMouseDown() {
    return this.mouseState === 'down';
  }

  get mousePosition() {
    return this._mousePos;
  }

  get mouseDelta() {
    return this._mouseDelta;
  }

  get mouseMovement() {
    return this._mouseMovement;
  }

  get relativePosition() {
    return this._relativePos;
  }

  setElement(element) {
    this.element = element;

    this.element.addEventListener('mousedown', this._onMouseDown);
    this.element.addEventListener('touchstart', this._onMouseDown);
  }

  setContainer(element) {
    this.container = element;
  }

  updateMousePos(position) {
    this._mousePos = position;

    this.updateMouseDelta();
  }

  updateMouseDelta() {
    const newDelta = this._mousePos.copy().subtract(this._mouseStartPos);

    this._mouseMovement = newDelta.copy().subtract(this._mouseDelta);
    this._mouseDelta = newDelta;
  }

  updateRelativePosition() {
    this._relativePos.add(this._mouseMovement);
  }

  setMouseStartPos(position) {
    this._mouseStartPos = position;
  }

  _getEventData(e) {
    const eventData = {};

    if (e.type.match(/^touch/)) {
      eventData.mousePos = new Vector(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY,
      );
    } else {
      eventData.mousePos = new Vector(
        e.clientX,
        e.clientY,
      );
    }

    return eventData;
  }

  _onScroll(e) {
    // this.updateMousePos(eventData.mousePos);
    this.updateRelativePosition();
  }

  _onMouseMove(e) {
    e.preventDefault();

    const eventData = this._getEventData(e);
    this.updateMousePos(eventData.mousePos);
    this.updateRelativePosition();
  }

  _onMouseDown(e) {
    e.preventDefault();

    this.mouseState = 'down';

    const eventData = this._getEventData(e);
    this.setMouseStartPos(eventData.mousePos);
    this.updateMousePos(eventData.mousePos);

    // ? Used e.target. instead of simply window. because on mobile the events
    // ? would break if the dom changed significantly (Even though it was the window).
    window.addEventListener('scroll', this._onScroll, { passive: false });
    window.addEventListener('mouseup', this._onMouseUp);
    window.addEventListener('mousemove', this._onMouseMove, { passive: false });
    e.target.addEventListener('touchend', this._onMouseUp);
    e.target.addEventListener('touchmove', this._onMouseMove, { passive: false });
  }

  _onMouseUp(e) {
    e.preventDefault();

    this.mouseState = 'up';

    const eventData = this._getEventData(e);
    this.updateMousePos(eventData.mousePos);
    this.updateRelativePosition();

    // ? Used e.target. instead of simply window. because on mobile the events
    // ? would break if the dom changed significantly (Even though it was the window).
    window.removeEventListener('scroll', this._onScroll, { passive: false });
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove, { passive: false });
    e.target.removeEventListener('touchend', this._onMouseUp);
    e.target.removeEventListener('touchmove', this._onMouseMove, { passive: false });
  }
}
