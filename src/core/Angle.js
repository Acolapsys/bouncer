export class Angle {
  constructor(value, ) {
    this.value = value;
  }

  setAngle(angle) {
    this.value = angle;
  }
  mirrorY() {
    this.value = -this.value;
  }
  mirrorX() {
    this.value = 180 - this.value;
  }

  static radToGrad(angle) {
    return new Angle((angle * 180) / Math.PI);
  }
  toRad() {
    return (this.value * Math.PI) / 180;
  }

  static getAngleByTwoPoints(point1, point2) {
    const dX = point1.x - point2.x;
    const dY = point1.y - point2.y;
    const alphaRad = Math.atan(Math.abs(dY / dX));
    const angle = Angle.radToGrad(alphaRad)
    if (dX < 0) {
      angle.mirrorX();
    }
    if (dY < 0) {
      angle.mirrorY();
    }
    return angle;
  }
}
