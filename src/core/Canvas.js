import { BouncerComponent } from "@/components/BouncerComponent";
import { $ } from "./dom";

export class Canvas {
  constructor(id, className, width, height) {
    this.id = id;
    this.$el = $.create("canvas", className);
    this.$el.attrs({ width, height });
    this.ctx = this.$el.getContext("2d");
  }

  clear() {
    this.ctx.clearRect(0, 0, this.coords.width, this.coords.height);
  }
  line({ point1, point2, lineWidth = 1, strokeStyle = "black" }) {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(point1.x, point1.y);
    this.ctx.lineTo(point2.x, point2.y);
    this.ctx.stroke();
  }
  circle({ centerPoint, radius, stroke = false, style }) {
    this.ctx.beginPath();
    this.ctx.arc(centerPoint.x, centerPoint.y, radius, 0, Math.PI * 2, false);
    if (stroke) {
      this.ctx.strokeStyle = style;
      this.ctx.stroke();
    } else {
      this.ctx.fillStyle = style;
      this.ctx.fill();
    }
    this.ctx.closePath();
  }
  rectangle() {}
  get coords() {
    return this.$el.getCoords();
  }
}
