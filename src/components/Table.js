import { BouncerComponent } from "@/components/BouncerComponent";
import { Angle } from "../core/Angle";
import { Canvas } from "../core/Canvas";
import { Point } from "../core/Point";
import { Vector2D } from "../core/Vector2D";
import { Ball2D } from "./Ball2D";

import { getVectorByTwoPoints } from "../utils/vector";

export class Table extends BouncerComponent {
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousemove", "mouseup"],
      ...options
    });
    this.balls = [];
    this.activeBall = null;
  }

  static className = "bouncer__table";
  static tag = "div";
  toHTML() {
    return `
    `;
  }
  init() {
    super.init();
    this.canvasTable = new Canvas("table_canvas", "table_canvas", 400, 250);
    this.$root.append(this.canvasTable.$el);

    this.balls.push(
      new Ball2D({
        canvas: this.canvasTable,
        id: "ball1",
        position: new Point(5, 5),
        radius: 5
      }),
      new Ball2D({
        canvas: this.canvasTable,
        id: "ball2",
        position: new Point(100, 100),
        radius: 5,
        stroke: false,
        style: "blue"
      }),
      new Ball2D({
        canvas: this.canvasTable,
        id: "ball3",
        position: new Point(150, 100),
        radius: 15,
        stroke: false,
        style: "green"
      }),
      new Ball2D({
        canvas: this.canvasTable,
        id: "ball3",
        position: new Point(250, 10),
        radius: 7,
        stroke: false,
        style: "red"
      })
    );
    this.activeBall = this.balls[0];
    this.draw();
    this.observer.$on("button:stop", this.stop.bind(this));
  }
  draw() {
    this.balls.forEach((ball) => {
      ball.draw();
    });
  }

  redraw() {
    this.canvasTable.clear();
    if (this.isStarted()) {
      this.balls.forEach((ball) => {
        if (ball.velocity > 0) {
          ball.nextPosition();
        }
      });
      this.balls.forEach((ball) => {
        ball.checkBounds();
      });

      this.checkCollisions(this.balls);
    }

    this.balls.forEach((ball) => {
      ball.draw();
    });
    if (this.checkAllStoped() && this.isStarted()) {
      this.stop();
    }
  }
  checkCollisions(balls) {
    if (this.isStarted()) {
      for (let i = 0; i < balls.length - 1; i++) {
        for (let j = i + 1; j <= balls.length - 1; j++) {
          this.checkTwoBallsCollision(balls[i], balls[j]);
        }
      }
    }
  }
  checkTwoBallsCollision(ball1, ball2) {
    const dist = this.canvasTable.getDistance(ball1.position, ball2.position);
    if (dist < ball1.radius + ball2.radius) {
      this.calculateMirror(ball1, ball2);
    }
  }


  calculateMirror(ball1, ball2) {
    // eslint-disable-next-line no-debugger
    // debugger
    const N = new Vector2D(ball2.position.x - ball1.position.x, ball1.position.y - ball2.position.y);
  
  
    const normal  = N.normalize()
    const a1 = ball1.dotProduct(normal);
    const a2 = ball2.dotProduct(normal);
    
    const  v1 = ball1.substract(normal.scaleBy(a1 - a2));
    const  v2 = ball2.add(normal.scaleBy(a1 - a2));
    ball1.setVector(v1);
    ball2.setVector(v2);
    ball1.position.add(ball1.dX, ball1.dY);
    ball2.position.add(ball2.dX, ball2.dY);

  }

  cursorPosition(e) {
    const rect = this.canvasTable.coords;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return new Point(x, y);
  }
  checkAllStoped() {
    return this.balls.every((ball) => ball.velocity === 0);
  }
  isStarted() {
    return !!this.intervalId;
  }
  start() {
    this.intervalId = setInterval(this.redraw.bind(this), 1);
    this.observer.$emit("table:start");
  }
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.balls.forEach((ball) => {
      ball.stop();
    });
    this.observer.$emit("table:stop");
  }

  onMouseup(e) {
    if (!this.isStarted()) {
      const ballPos = this.activeBall.position;
      const cursorPosition = this.cursorPosition(e);

      const newVector = getVectorByTwoPoints(cursorPosition, ballPos);
      this.activeBall.setVector(newVector.scaleBy(0.01));

      this.start();
    }
  }
  onMousemove(e) {
    if (!this.isStarted()) {
      this.redraw();
      this.canvasTable.line({
        point1: this.cursorPosition(e),
        point2: this.activeBall.position
      });
    }
  }
}
