import Vector from './vector';

export default class Relativity {
  constructor(
    {
      element,
      containerElement,
    },
    {
      onClickHandler,
      onGrabHandler,
      onDragHandler,
      onDropHandler,
    },
  ) {
    this.mouseDown = false;

    this.elementStartPos = new Vector(0, 0);
    this.mouseStartPos = new Vector(0, 0);
    this.mouseDelta = new Vector(0, 0);
    this.mousePos = new Vector(0, 0);

    this._onScroll = this._onScroll.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onAutoScroll = this._onAutoScroll.bind(this);
    this._autoScroll = 0;

    this.onClickHandler = onClickHandler;
    this.onGrabHandler = onGrabHandler;
    this.onDragHandler = onDragHandler;
    this.onDropHandler = onDropHandler;

    if (element) {
      this.setElement(element);
    }

    this.containerElement = containerElement;
  }

  setElement(element, event) {
    this.element = element;

    if (!event) {
      this.element.addEventListener('mousedown', this._onMouseDown);
      this.element.addEventListener('touchstart', this._onMouseDown);
    } else {
      this._onMouseDown(event);
    }
  }

  update() {
    if (this.mouseDown) {
      this._setMouseDelta();
    }
  }

  _getEventMousePos(e) {
    const mousePos = new Vector(0, 0);

    if (e.type.match(/^touch/)) {
      mousePos.x += e.changedTouches[0].clientX;
      mousePos.y += e.changedTouches[0].clientY;
    } else {
      mousePos.x += e.clientX;
      mousePos.y += e.clientY;
    }

    return mousePos;
  }

  _onScroll(e) {
    this._onMouseMove(e);
  }

  _onMouseUp(e) {
    this._updateMousePos(e);
    this._setMouseDelta();

    this._autoScroll = 0;

    if (this.onClickHandler
     && Math.abs(this.mouseDelta.x) < 10
     && Math.abs(this.mouseDelta.y) < 10
    ) {
      this.onClickHandler(this, e);
    }

    if (this.onDropHandler) {
      this.onDropHandler(this, e);
    }

    this.mouseDown = false;

    // ? Used e.target. instead of simply window. because on mobile the events
    // ? would break if the dom changed significantly (Even though it was the window).
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
    e.target.removeEventListener('touchend', this._onMouseUp);
    e.target.removeEventListener('touchmove', this._onMouseMove);

    this.mouseDelta.x = 0;
    this.mouseDelta.y = 0;
  }

  _onMouseDown(e) {
    e.preventDefault();

    this.mouseDown = true;

    this.setElementStartPos();
    this.setMouseStartPos(e);
    this._updateMousePos(e);
    this._setMouseDelta();

    // ? Used e.target. instead of simply window. because on mobile the events
    // ? would break if the dom changed significantly (Even though it was the window).
    window.addEventListener('scroll', this._onScroll, { passive: false });
    window.addEventListener('mouseup', this._onMouseUp);
    window.addEventListener('mousemove', this._onMouseMove, { passive: false });
    e.target.addEventListener('touchend', this._onMouseUp);
    e.target.addEventListener('touchmove', this._onMouseMove, { passive: false });

    if (this.onGrabHandler) {
      this.onGrabHandler(this, e);
    }
  }

  _onMouseMove(e) {
    e.preventDefault();

    if (e.type.match(/^touch/)) {
      const mouseY = e.touches[0].clientY;
      const gradient = 0.1;
      const offset = 100;

      const centreDelta = mouseY - (window.outerHeight * 0.5);

      const scrollSpeed = Math.clamp(
        Math.abs(centreDelta) - offset,
        0,
        100,
      ) * gradient;

      const scrollDirection = centreDelta / Math.abs(centreDelta);

      if (this._autoScroll === 0) {
        this._autoScroll = scrollSpeed * scrollDirection;

        this._onAutoScroll();
      } else {
        this._autoScroll = scrollSpeed * scrollDirection;
      }
    }

    if (e.type !== 'scroll') {
      this._updateMousePos(e);
    }

    this._setMouseDelta();

    if (this.onDragHandler && (this._autoScroll < 2 && this._autoScroll > -2)) {
      this.onDragHandler(this, e);
    }
  }

  setMouseStartPos(e) {
    this.mouseStartPos = this._getEventMousePos(e);
  }

  _setMouseDelta() {
    this.mouseDelta = this.mousePos.subtract(this.mouseStartPos);

    this.mouseDelta = this.mouseDelta.add(
      this.elementStartPos.subtract(this.getElementParentPos()),
    );
  }

  _updateMousePos(e) {
    this.mousePos = this._getEventMousePos(e);
  }

  _onAutoScroll() {
    document.documentElement.scrollTop += this._autoScroll;

    this._setMouseDelta();

    if (this._autoScroll !== 0) {
      window.requestAnimationFrame(this._onAutoScroll);
    }
  }

  setElementStartPos() {
    this.elementStartPos = this.getElementParentPos();
  }

  getElementParentPos() {
    const boundingRect = this.element
      .parentElement
      .getBoundingClientRect();

    return new Vector(
      boundingRect.x,
      boundingRect.y,
    );
  }
}
-