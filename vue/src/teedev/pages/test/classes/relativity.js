import { Vector } from '@/global/classes';

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
    this._onAutoScroll = this._onAutoScroll.bind(this);

    this.onClickHandler = onClick;
    this.onGrabHandler = onGrab;
    this.onDragHandler = onDrag;
    this.onDropHandler = onDrop;

    this._containerPos = new Vector(0, 0);
    this._mouseStartPos = new Vector(0, 0);
    this._mouseDelta = new Vector(0, 0);
    this._mousePos = new Vector(0, 0);
    this._mouseMovement = new Vector(0, 0);
    this._relativePos = new Vector(0, 0);
    this._scrollStartPos = null;
    this._scrollDelta = 0;

    this._touchDragDelay = 150;

    this._autoScrollPosition = 0;
    this._autoScrollSpeed = 0;
    this._autoScrollDirection = 0;
    this._isAutoScrolling = false;

    this.mouseState = 'up';
    this.isHolding = false;

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
    return this._mousePos.copy();
  }

  get mouseDelta() {
    return this._mouseDelta.copy();
  }

  get mouseMovement() {
    return this._mouseMovement.copy();
  }

  get relativePosition() {
    return this._relativePos.copy();
  }

  setElement(element, event) {
    this.element = element;

    this.element.addEventListener('mousedown', this._onMouseDown);
    this.element.addEventListener('touchstart', this._onMouseDown);

    if (event) {
      this._onMouseDown(event);
    }
  }

  setContainer(element) {
    this.container = element;
  }

  updateMousePos(position) {
    this._mousePos = position;

    this.updateMouseDelta();
  }

  updateMouseDelta() {
    const newDelta = this._mousePos.copy()
      .subtract(this._mouseStartPos)
      .add(new Vector(0, this._scrollDelta));

    this._mouseMovement = newDelta.copy().subtract(this._mouseDelta);
    this._mouseDelta = newDelta;
  }

  updateRelativePosition() {
    this._relativePos.add(this._mouseMovement);
  }

  updateScrollPosition() {
    const scrollPos = this.container.getBoundingClientRect().top;

    if (!this._scrollStartPos) {
      this._scrollStartPos = scrollPos;
    }

    this._scrollDelta = this._scrollStartPos - scrollPos;
  }

  setMouseStartPos(position) {
    this._mouseStartPos = position;
  }

  _getEventData(e) {
    const eventData = {};

    if (e.type.match(/^touch/)) {
      eventData.type = 'touch';
      eventData.mousePos = new Vector(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY,
      );
    } else {
      eventData.type = 'mouse';
      eventData.mousePos = new Vector(
        e.clientX,
        e.clientY,
      );
    }

    return eventData;
  }

  _onScroll() {
    this.updateScrollPosition();
    this.updateMouseDelta();
    this.updateRelativePosition();

    if (this.onDragHandler && this.isHolding) {
      this.onDragHandler(this);
    }
  }

  _onAutoScroll() {
    this._autoScrollPosition += this._autoScrollSpeed * this._autoScrollDirection * 50;
    window.scrollTo(0, this._autoScrollPosition);

    if (this._isAutoScrolling) {
      window.requestAnimationFrame(this._onAutoScroll);
    }
  }

  _onMouseMove(e) {
    if (this.isHolding) {
      e.preventDefault();
    }

    const eventData = this._getEventData(e);
    this.updateMousePos(eventData.mousePos);
    this.updateRelativePosition();

    if (this.onDragHandler && this.isHolding) {
      this.onDragHandler(this);
    }

    if (this.isHolding) {
      const normalisedMouseY = (eventData.mousePos.y / window.innerHeight) - 0.5;

      this._autoScrollSpeed = Math.max(Math.abs(2 * normalisedMouseY) - 0.5, 0);
      this._autoScrollDirection = Math.abs(normalisedMouseY) / normalisedMouseY;

      if (this._autoScrollSpeed > 0) {
        if (!this._isAutoScrolling) {
          this._isAutoScrolling = true;

          this._autoScrollPosition = window.scrollY;
          this._onAutoScroll();
        }
      } else {
        this._isAutoScrolling = false;
      }
    }
  }

  _onMouseDown(e) {
    this.mouseState = 'down';

    this._scrollStartPos = null;
    this._scrollDelta = 0;

    const eventData = this._getEventData(e);
    this.setMouseStartPos(eventData.mousePos);
    this.updateMousePos(eventData.mousePos);

    if (eventData.type === 'touch') {
      setTimeout(() => {
        if (
          this.mouseState === 'down' &&
          this._mouseDelta.magnitude() + Math.abs(this._scrollDelta) < 5
        ) {
          e.preventDefault();
          this.isHolding = true;

          if (this.onGrabHandler) {
            this.onGrabHandler(this);
          }
        }
      }, this._touchDragDelay);
    } else {
      e.preventDefault();
      this.isHolding = true;

      if (this.onGrabHandler) {
        this.onGrabHandler(this);
      }
    }

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

    if (
      this.onClickHandler &&
      this._mouseDelta.magnitude() + Math.abs(this._scrollDelta) < 5
    ) {
      this.onClickHandler(this);
    }

    if (this.onDropHandler && this.isHolding) {
      this.onDropHandler(this);
    }

    this.isHolding = false;
    this._isAutoScrolling = false;

    // ? Used e.target. instead of simply window. because on mobile the events
    // ? would break if the dom changed significantly (Even though it was the window).
    window.removeEventListener('scroll', this._onScroll, { passive: false });
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove, { passive: false });
    e.target.removeEventListener('touchend', this._onMouseUp);
    e.target.removeEventListener('touchmove', this._onMouseMove, { passive: false });
  }
}