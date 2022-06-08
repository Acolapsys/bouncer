import { $ } from "../core/dom";
import { Point } from "../core/Point";
import { Vector } from "../core/Vector";

export class Ball extends Vector {
  constructor(canvas, id, angle = 45, velocity = 0, radius = 5) {
    super(angle, velocity);
    this.canvas = canvas;
    this.id = id;
    this.radius = radius;
    this.position = new Point(radius, radius);
    this.intervalId = null;
    this.init();
  }

  static className = "ball";

  init() {
    // const { width, height } = this.ctx.canvas;
    // this.tableSize = { width, height };
  }
  redraw() {
    if (this.velocity > 0) {
      this.nextPosition();
    }
    this.draw();
  }
  draw() {
    // this.ctx.clearRect(0, 0, this.tableSize.width, this.tableSize.height);
    // this.ctx.beginPath();
    // this.ctx.arc(
    //   this.position.x,
    //   this.position.y,
    //   this.radius,
    //   0,
    //   Math.PI * 2,
    //   false
    // );
    // this.ctx.strokeStyle = "black";
    // this.ctx.stroke();
    // this.ctx.closePath();
    this.canvas.circle({
      centerPoint: this.position,
      radius: this.radius,
      stroke: true,
      style: "black"
    });
  }

  stop() {
    this.setVelocity(0);
  }
  nextPosition() {
    const dY = Math.sin(Vector.gradToRad(this.angle)) * this.velocity;
    const dX = Math.cos(Vector.gradToRad(this.angle)) * this.velocity;

    this.velocity *= .998;

    if (this.velocity < 0.03) {
      this.velocity = 0;
    }

    this.position.add(dX, dY);
    this.checkBounds();
  }
  checkBounds() {
    if (this.position.y + this.radius > this.canvas.coords.height) {
      this.position.setY(
        2 * this.canvas.coords.height - this.position.y - 2 * this.radius
      );
      this.mirrorY();
    }
    if (this.position.y - this.radius < 0) {
      this.position.setY(2 * this.radius - this.position.y);
      this.mirrorY();
    }
    if (this.position.x + this.radius > this.canvas.coords.width) {
      this.position.setX(
        2 * this.canvas.coords.width - this.position.x - 2 * this.radius
      );
      this.mirrorX();
    }
    if (this.position.x - this.radius < 0) {
      this.position.setX(2 * this.radius - this.position.x);
      this.mirrorX();
    }
  }
}
