import { Angle } from "./Angle";

export class Vector {
  constructor(angle, velocity) {
    this.angle = new Angle(angle);
    this.velocity = velocity;
  }
  setAngle(value) {
    if (value instanceof Angle) {
      this.angle = value;
    } else {
      this.angle.setAngle(value);
    }
  }
  setVelocity(value) {
    this.velocity = value;
  }
}
