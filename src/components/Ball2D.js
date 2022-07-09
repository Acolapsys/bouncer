import { $ } from "../core/dom";
import { Point } from "../core/Point";
import { Vector2D } from "../core/Vector2D";

const SLOW_COEFFICIENT = 0.998;
const BREAK_LIMIT = 0.03;
export class Ball2D extends Vector2D {
  constructor({
    canvas,
    id,
    position,
    dX = 0,
    dY = 0,
    radius = 5,
    stroke = true,
    style = "black"
  }) {
    super(dX, dY);
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
    this.setVector({ dX: 0, dY: 0 });
  }
  nextPosition() {
    this.setVector(this.withLength(this.length * SLOW_COEFFICIENT));

    if (this.length < BREAK_LIMIT) {
      this.stop();
    }

    this.position.add(this.dX, this.dY);
  }
  checkBounds() {
    if (this.position.y + this.radius >= this.canvas.coords.height) {
      this.position.setY(
        2 * this.canvas.coords.height - this.position.y - 2 * this.radius
      );
      this.mirrorWall(
        new Point(this.position.x, this.canvas.coords.height + this.radius)
      );
    }
    if (this.position.y - this.radius <= 0) {
      this.position.setY(2 * this.radius - this.position.y);
      this.mirrorWall(new Point(this.position.x, 0));
    }
    if (this.position.x + this.radius >= this.canvas.coords.width) {
      this.position.setX(
        2 * this.canvas.coords.width - this.position.x - 2 * this.radius
      );
      this.mirrorWall(new Point(this.canvas.coords.width, this.position.y));
    }
    if (this.position.x - this.radius <= 0) {
      this.position.setX(2 * this.radius - this.position.x);
      this.mirrorWall(new Point(0, this.position.y));
    }
  }

  mirrorWall(wallPoint) {
    // eslint-disable-next-line no-debugger
    // debugger;
    const N = new Vector2D(
      wallPoint.x - this.position.x,
       this.position.y - wallPoint.y
    );

    const project = this.projectOn(N);
    const v1 = this.substract(project.scaleBy(2));
    this.setVector(v1);
    this.position.add(this.dX, this.dY);
  }

  get velocity() {
    return this.length;
  }
}
