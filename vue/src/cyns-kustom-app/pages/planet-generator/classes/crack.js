export default class Crack {
  constructor(yOffset = 0, length = 100, pointCount = 10, spread = 8, wanderRange = 10) {
    this.points = [];

    this.yOffset = yOffset;
    this.length = length;
    this.pointCount = pointCount;
    this.spread = spread;
    this.wanderRange = wanderRange;

    this.generatePoints();
  }

  generatePoints() {
    this.points = [];

    let offset = 0;

    for (let i = 0; i <= this.pointCount; i += 1) {
      offset += (Math.random() * this.wanderRange) - (this.wanderRange * 0.5);

      const point = {
        x: i * (this.length / this.pointCount) - (this.length * 0.5),
        y: offset + this.yOffset,
        angle: (Math.PI * 0.5) + (Math.random() * 2) - 1,
        distance: Math.random() * 20,
        yOffsetA: ((Math.random() ** 4) * this.spread) + 2,
        yOffsetB: -(((Math.random() ** 4) * this.spread) + 2),
      };

      this.points.push(point);
    }
  }

  generatePath() {
    let path = '';

    this.points.forEach((point, index) => {
      if (path === '') {
        path += `M${point.x},${point.y + point.yOffsetA}`;
      } else {
        path += this.generatePathPoint(point, this.points[index - 1], 1);
      }
    });

    this.points.reverse().forEach((point, index) => {
      if (index !== 0) {
        path += this.generatePathPoint(point, this.points[index - 1], -1);
      }
    });

    return path;
  }

  // eslint-disable-next-line
  generatePathPoint(point, previousPoint, direction) {
    let currentOffset = 0;
    let previousOffset = 0;

    if (direction < 0) {
      currentOffset = point.yOffsetA;
      previousOffset = previousPoint.yOffsetA;
    } else {
      currentOffset = point.yOffsetB;
      previousOffset = previousPoint.yOffsetB;
    }

    const prevAnchor = {
      x: previousPoint.x + (Math.sin(previousPoint.angle) * (previousPoint.distance * direction)),
      y: previousPoint.y + (Math.cos(previousPoint.angle) * (previousPoint.distance * direction)) + previousOffset,
    };

    const curAnchor = {
      x: point.x + (Math.sin(point.angle) * (point.distance * -direction)),
      y: point.y + (Math.cos(point.angle) * (point.distance * -direction)) + currentOffset,
    };

    return ` C${prevAnchor.x},${prevAnchor.y},${curAnchor.x},${curAnchor.y},${point.x},${point.y + currentOffset}`;
  }
}
