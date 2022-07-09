import { toDegrees } from "../utils/convertors";

export class Vector2D {
  constructor(dX, dY) {
    this.setVector({ dX, dY });
  }

  setVector({ dX, dY }) {
    this.dX = dX;
    this.dY = dY;
  }

  add({ dX, dY }) {
    return new Vector2D(this.dX + dX, this.dY + dY);
  }

  substract({ dX, dY }) {
    return new Vector2D(this.dX - dX, this.dY - dY);
  }

  scaleBy(num) {
    return new Vector2D(this.dX * num, this.dY * num);
  }

  get length() {
    return Math.hypot(this.dX, this.dY);
  }

  dotProduct({ dX, dY }) {
    return this.dX * dX + this.dY * dY;
  }

  normalize() {
    return this.scaleBy(1 / this.length);
  }

  angleBetween(other) {
    return toDegrees(
      Math.acos(this.dotProduct(other) / (this.length * other.length))
    );
  }

  negate() {
    return this.scaleBy(-1);
  }

  projectOn(other) {
    const normalized = other.normalize();
    return normalized.scaleBy(this.dotProduct(normalized));
  }

  withLength(newLength) {
    return this.normalize().scaleBy(newLength);
  }
}
