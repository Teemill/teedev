import {
  Transform,
  Vector,
  Angle,
} from '@/global/classes';

export default (context) => {
  console.log(context);

  const originalSetTransform = context.setTransform.bind(context);
  const originalTranslate = context.translate.bind(context);
  const originalScale = context.scale.bind(context);
  const originalRotate = context.rotate.bind(context);
  const originalSave = context.save.bind(context);
  const originalRestore = context.restore.bind(context);

  const applyTransform = () => {
    originalSetTransform(
      context._transform.m11,
      context._transform.m12,
      context._transform.m21,
      context._transform.m22,
      context._transform.m31,
      context._transform.m32,
    );
  };

  context._transform = new Transform();

  context.translate = (x, y) => {
    context._transform.translate(new Vector(x, y));

    applyTransform();
  };

  context.scale = (x, y) => {
    context._transform.scale(new Vector(x, y));

    applyTransform();
  };

  context.rotate = (a) => {
    context._transform.rotate(new Angle(a));

    applyTransform();
  };

  context.getTransform = () => context._transform;

  context.setTransform = (transform) => {
    context._transform = transform;
  };

  context.save = () => {
    context._transform.push();
    originalSave();
  };

  context.restore = () => {
    context._transform.pop();
    applyTransform();
    originalRestore();
  };
};
