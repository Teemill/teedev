export default class CanvasLayer {
  constructor(index) {
    this.index = index;
    this.objects = [];
  }

  addObject(object) {
    this.objects.push(object);
  }

  render(context) {
    this.objects.forEach((object) => {
      object.render(context);
    });
  }
}
