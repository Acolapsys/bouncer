export class Point {
  constructor(x, y) {
    this.setCoords(x, y);
  }

  setCoords(x, y) {
    this._x = x;
    this._y = y;
  }

  setX(x) {
    this._x = x;
  }
  setY(y) {
    this._y = y;
  }

  add(x, y) {
    this._x += x;
    this._y += y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
