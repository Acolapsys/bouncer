export class Vector {
  constructor(angle, velocity) {
    this.angle = angle;
    this.velocity = velocity;
  }
  setAngle(value) {
    this.angle = value;
  }
  setVelocity(value) {
    this.velocity = value / 100;
  }
  mirrorY() {
    this.angle = -this.angle;
  }
  mirrorX() {
    this.angle = 180 - this.angle;
  }
  static radToGrad(angle) {
    return (angle * 180) / Math.PI
  }
  static gradToRad(angle) {
    return (angle * Math.PI) / 180;
  }
}
