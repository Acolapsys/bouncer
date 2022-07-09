import { $ } from "../core/dom";
import { Point } from "../core/Point";
import { Vector } from "../core/Vector";

const SLOW_COEFFICIENT = 0.998;
const BREAK_LIMIT = 0.03;
export class Ball extends Vector {
  constructor({
    canvas,
    id,
    position,
    angle = 45,
    velocity = 0,
    radius = 5,
    stroke = true,
    style = "black"
  }) {
    super(angle, velocity);
    this.canvas = canvas;
    this.id = id;
    this.radius = radius;
    this.position = position;
    this.intervalId = null;
    this.stroke = stroke;
    this.style = style;
  }

  static className = "ball";

  draw() {
    this.canvas.circle({
      centerPoint: this.position,
      radius: this.radius,
      stroke: this.stroke,
      style: this.style
    });
  }

  stop() {
    this.setVelocity(0);
  }
  nextPosition() {
    const dY = Math.sin(this.angle.toRad()) * this.velocity;
    const dX = Math.cos(this.angle.toRad()) * this.velocity;

    this.velocity *= SLOW_COEFFICIENT;

    if (this.velocity < BREAK_LIMIT) {
      this.stop();
    }

    this.position.add(dX, dY);
  }
  checkBounds() {
    if (this.position.y + this.radius > this.canvas.coords.height) {
      this.position.setY(
        2 * this.canvas.coords.height - this.position.y - 2 * this.radius
      );
      this.angle.mirrorY();
    }
    if (this.position.y - this.radius < 0) {
      this.position.setY(2 * this.radius - this.position.y);
      this.angle.mirrorY();
    }
    if (this.position.x + this.radius > this.canvas.coords.width) {
      this.position.setX(
        2 * this.canvas.coords.width - this.position.x - 2 * this.radius
      );
      this.angle.mirrorX();
    }
    if (this.position.x - this.radius < 0) {
      this.position.setX(2 * this.radius - this.position.x);
      this.angle.mirrorX();
    }
  }
}
