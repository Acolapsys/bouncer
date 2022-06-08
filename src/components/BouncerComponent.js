import { DomListener } from "@/core/DomListener";

export class BouncerComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options?.listeners);
    this.name = options?.name;
    this.observer = options?.observer;
  }
  toHTML() {}
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }
}
