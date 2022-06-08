import { BouncerComponent } from "@/components/BouncerComponent";
import { Canvas } from "../core/Canvas";
import { Point } from "../core/Point";
import { Vector } from "../core/Vector";
import { Ball } from "./Ball";

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

    this.balls.push(new Ball(this.canvasTable, "ball1"));
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
    this.balls.forEach((ball) => {
      ball.redraw();
    });
    if (this.checkAllStoped() && this.isStarted()) {
      this.stop();
    }
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
  onMousedown(e) {
    // if (this.intervalId) {
    //   this.stop();
    //   return;
    // }
    // document.onmouseup = this.onClick.bind(this);
    // this.start();
  }
  onMouseup(e) {
    const ballPos = this.activeBall.position;
    const rect = this.canvasTable.coords;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dX = x - ballPos.x;
    const dY = y - ballPos.y;
    const velocity = Math.sqrt(dX * dX + dY * dY);
    let alphaRad = Math.atan(Math.abs(dY / dX));
    const alpha = Vector.radToGrad(alphaRad);
    this.activeBall.setAngle(alpha);
    if (dX < 0) {
      this.activeBall.mirrorX();
    }
    if (dY < 0) {
      this.activeBall.mirrorY();
    }
    this.activeBall.setVelocity(velocity);

    this.start();
  }
  onMousemove(e) {
    if (!this.isStarted()) {
      const ballPos = this.activeBall.position;
      const rect = this.canvasTable.coords;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const currentPosition = new Point(x, y);
      this.redraw();
      // eslint-disable-next-line no-debugger
      // debugger;
      this.canvasTable.line({ point1: currentPosition, point2: ballPos });
    }
  }
}
